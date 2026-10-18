/**
 * Contact details, from watwagroup.com/contact.html and the printed
 * catalogue. Every page, llms.txt, JSON-LD and the MCP server read from here.
 */

export const CONTACT = {
  legalName: "Watwa Engineers Private Limited",
  cin: "U90009UP2017PTC099412",
  founded: "2017-12-15",
  email: "info@watwagroup.com",
  phones: ["+91 96345 28182", "+91 97608 58777"],
  phoneHref: "tel:+919760858777",
  whatsapp: "https://wa.me/919760858777",
  whatsappChat: `https://wa.me/919760858777?text=${encodeURIComponent("Hello Watwa, I'd like to discuss a water treatment requirement.")}`,
  headOffice: {
    city: "Bareilly",
    street: "45, Mega Dream Homes, Karamchari Nagar",
    region: "Uttar Pradesh",
    postalCode: "243122",
  },
  location: "Bareilly, Uttar Pradesh, India",
};

export type Office = { city: string; kind: string; address: string; phones?: string[] };

export const OFFICES: Office[] = [
  { city: "Bareilly", kind: "Head Office", address: "45, Mega Dream Homes, Karamchari Nagar, Bareilly, UP 243122" },
  { city: "Sandila", kind: "Factory", address: "I-4, I-5 UPSIDC Industrial Area Phase-1, Sandila, Hardoi, UP 201204" },
  { city: "Noida", kind: "Branch", address: "D-54, Sector 10, Noida, UP 201301" },
  { city: "Mathura", kind: "Branch", address: "26 A, Govind Nagar, Mathura, UP 281001", phones: ["98709 79186", "91053 33366"] },
  { city: "Dehradun", kind: "Branch", address: "C-206, Vanshika Green, near Helipad, Sahastradhara Road, Dehradun 248013", phones: ["82734 94958"] },
  { city: "Jhansi", kind: "Branch", address: "V.R.S. Plaza, opp. Nagar Nigam, Elite Chauraha, Jhansi, UP 284001", phones: ["94155 63419", "91053 33366"] },
  { city: "Gwalior", kind: "Branch", address: "I-8, Site No. 1, City Centre, Gwalior, MP 474011", phones: ["99777 66092", "91053 33366"] },
  { city: "Jodhpur", kind: "Branch", address: "67 Vaishali City (Ext.), near Indane Gas Godown, Dhinana ki Dhani, Jodhpur 342008" },
];

export const SOCIAL_LINKS = {
  linkedin: "https://in.linkedin.com/company/watwa-engineers-private-limited",
  x: "https://twitter.com/watwaengineers",
  facebook: "https://www.facebook.com/Watwa-1031023863713715",
} as const;

export const CATALOGUE_PDF = "/docs/watwa-catalogue.pdf";
