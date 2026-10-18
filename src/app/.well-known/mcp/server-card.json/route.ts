/**
 * /.well-known/mcp/server-card.json — describes the /mcp server (MCP server
 * card, SEP-1649) so agents can discover it without connecting first. The
 * server info and tool list are read from the live server over an in-memory
 * connection, so the card cannot drift from what /mcp actually serves.
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { LATEST_PROTOCOL_VERSION } from "@modelcontextprotocol/sdk/types.js";
import { MCP_PATH } from "@/lib/ai/knowledge";
import { createWatwaMcpServer } from "@/lib/ai/mcp-server";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

async function serverCard() {
  const server = createWatwaMcpServer();
  const client = new Client({ name: "server-card", version: "1.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  try {
    const { tools } = await client.listTools();
    return {
      version: "1.0",
      protocolVersion: LATEST_PROTOCOL_VERSION,
      serverInfo: client.getServerVersion(),
      description: SITE_DESCRIPTION,
      instructions: client.getInstructions(),
      documentationUrl: `${SITE_URL}/llms.txt`,
      transport: { type: "streamable-http", endpoint: `${SITE_URL}${MCP_PATH}` },
      capabilities: client.getServerCapabilities(),
      authentication: { required: false },
      tools,
    };
  } finally {
    await client.close();
  }
}

export async function GET() {
  return new Response(JSON.stringify(await serverCard(), null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
