/**
 * Watwa's solutions, rewritten from the product pages and the printed
 * catalogue on the current watwagroup.com. Pages, sitemap, llms.txt,
 * Markdown versions, JSON-LD and the MCP server all render from this file.
 */

export type CategoryId = "water-treatment" | "wastewater-treatment" | "water-recycle" | "zero-liquid-discharge" | "components";

export const CATEGORIES: { id: CategoryId; title: string; tagline: string }[] = [
  { id: "water-treatment", title: "Water Treatment", tagline: "Raw water in, process-grade water out." },
  { id: "wastewater-treatment", title: "Wastewater Treatment", tagline: "Sewage and effluent, treated to Pollution Control Board norms." },
  { id: "water-recycle", title: "Water Recycle", tagline: "Treated water returned to work, not to the drain." },
  { id: "zero-liquid-discharge", title: "Zero Liquid Discharge", tagline: "Nothing leaves the plant as liquid waste." },
  { id: "components", title: "Components & Consumables", tagline: "The parts, pumps, chemicals and instruments that keep plants running." },
];

export type Solution = {
  slug: string;
  title: string;
  short: string;
  category: CategoryId;
  image: string;
  summary: string;
  body: string[];
  highlights: { heading: string; points: string[] };
  specs?: { caption: string; columns: string[]; rows: string[][] };
};

export const SOLUTIONS: Solution[] = [
  {
    slug: "effluent-treatment-plants",
    title: "Effluent Treatment Plants",
    short: "ETP",
    category: "wastewater-treatment",
    image: "/images/solutions/etp.jpg",
    summary: "Compact, tailor-made ETPs that treat industrial effluent to the limits set by the Pollution Control Board.",
    body: [
      "Industrial wastewater carries a mix of organic and inorganic pollutants, dissolved, suspended or as a separate phase. Some, such as heavy metals, mineral oils, solvents, strong acids and alkalis, harm the receiving environment directly.",
      "Watwa's ETPs are designed around your effluent, not a catalogue model. They need very little floor space, are energy efficient, and can upgrade or modify an existing ETP so it meets the limits laid down by the Pollution Control Board.",
    ],
    highlights: {
      heading: "Treatment stages",
      points: [
        "Preliminary: removes rags, sticks, grit and grease that damage equipment (physical)",
        "Primary: removes floating and settleable solids and organic matter (physical and chemical)",
        "Secondary: removes biodegradable organic matter and suspended solids (biological and chemical)",
        "Tertiary: removes residual suspended and dissolved solids (physical, chemical and biological)",
      ],
    },
  },
  {
    slug: "sewage-treatment-plants",
    title: "Sewage Treatment Plants",
    short: "STP",
    category: "wastewater-treatment",
    image: "/images/solutions/stp.jpg",
    summary: "Package and decentralised STPs for hospitals, hotels, campuses, housing and industry, built on MBBR, SAFF, SBR and MBR.",
    body: [
      "Sewage treatment removes physical, chemical and biological contaminants from domestic wastewater, leaving an environmentally safe effluent and a treated sludge suitable for disposal or reuse, often as farm fertiliser.",
      "Watwa designs, fabricates, supplies, erects and commissions STPs for industry, large colonies, hotels, hospitals, IT parks and commercial buildings. The compact package plants use minimal power, land and consumables, and are built in MS epoxy-coated, stainless steel or FRP to suit the site.",
      "With tertiary treatment the water can be recovered for gardening, flushing and other utilities.",
    ],
    highlights: {
      heading: "Technologies",
      points: [
        "MBBR: Moving Bed Bio Reactor",
        "CWT: Constructed Wetland Technology",
        "SAFF: Submerged Aerated Fixed Film",
        "SBR: Sequential Batch Reactor",
        "MBR: Membrane Bio Reactor",
      ],
    },
  },
  {
    slug: "green-sewage-treatment-plant",
    title: "Green STP (W-CWT System)",
    short: "W-CWT",
    category: "wastewater-treatment",
    image: "/images/solutions/green-stp.jpg",
    summary: "A constructed-wetland STP that looks like a garden and cuts treatment electricity by 80–90%.",
    body: [
      "The W-CWT (constructed wetland) system treats sewage through a planted reed bed instead of power-hungry machinery. It looks like part of the campus landscaping.",
      "Sewage treatment with W-CWT costs only about ₹3–5 per 1,000 litres, and the treated water meets Pollution Control Board norms. It is reused for gardening and toilet flushing, which also recharges groundwater.",
    ],
    highlights: {
      heading: "Why W-CWT",
      points: [
        "Saves about 80–90% of the electricity of conventional treatment",
        "Simple to operate: mainly housekeeping and gardening",
        "No moving parts except pumps, so maintenance is negligible",
        "Handles fluctuating flows consistently",
        "Meets Green Building criteria",
        "Garden look, part of the landscape",
      ],
    },
  },
  {
    slug: "reverse-osmosis-plants",
    title: "Reverse Osmosis (RO) Plants",
    short: "RO",
    category: "water-treatment",
    image: "/images/solutions/ro-plant.jpg",
    summary: "Skid-mounted RO plants that strip dissolved salts, bacteria and organics for process and drinking water.",
    body: [
      "Reverse osmosis, also called hyperfiltration, purifies water by forcing it through a selective membrane. It rejects salts, bacteria, sugars, proteins, particles, dyes and anything above roughly 150–250 daltons.",
      "Watwa RO plants are supplied complete on a single skid, in mild steel or stainless steel with SS or UPVC piping, and are also used to recycle treated wastewater.",
    ],
    highlights: {
      heading: "Standard features",
      points: [
        "Feed pump for raw water",
        "Sand filter for suspended solids",
        "Anti-scalant dosing to protect the membranes",
        "5-micron cartridge filter",
        "High-pressure pump at reverse-osmosis pressure",
        "RO membranes to remove total dissolved solids",
      ],
    },
  },
  {
    slug: "dm-water-filtration-plants",
    title: "DM Water & Filtration Plants",
    short: "DM",
    category: "water-treatment",
    image: "/images/solutions/dm-plant.jpg",
    summary: "Demineralisation plants down to 0.05 µS/cm, from 50 m³/hr in FRP to 200 m³/hr and beyond with twin trains.",
    body: [
      "Watwa DM plants combine weak and strong cation and anion exchangers, with an optional degasser for CO₂ removal, configured from your raw-water report.",
      "Mixed-bed units polish the output to below 0.5 µS/cm, or to 0.05 µS/cm with two mixed beds in series, for applications that need extremely pure water. Systems are built in FRP or rubber-lined mild steel.",
    ],
    highlights: {
      heading: "Configurations",
      points: ["SAC – SBA", "SAC – WBA – SBA", "WAC – SAC – WBA – SBA – MB1 – MB2", "WAC – SAC – DG – WBA – SBA – MB1 – MB2"],
    },
  },
  {
    slug: "edi-systems",
    title: "Electro-deionisation (EDI) Systems",
    short: "EDI",
    category: "water-treatment",
    image: "/images/solutions/edi.jpg",
    summary: "Chemical-free ultrapure water: membranes and electricity replace acid and caustic regeneration.",
    body: [
      "EDI is a continuous electrochemical purification process. Ion-specific membranes, mixed-bed resin and a DC voltage replace the acid and caustic regeneration of a conventional deioniser.",
      "Placed after an RO unit, EDI runs 24/7 with no regeneration stops, no hazardous chemical handling and no salty neutralisation waste.",
    ],
    highlights: {
      heading: "Used in",
      points: ["Power and utilities", "Biotechnology and pharmaceuticals", "Semiconductors and electronics", "Surface finishing (automotive)", "Consumer goods and cosmetics", "General industry"],
    },
  },
  {
    slug: "water-softeners",
    title: "Water Softeners",
    short: "SF",
    category: "water-treatment",
    image: "/images/solutions/softener.jpg",
    summary: "Ion-exchange softeners from 1,000 to 5,000 LPH that stop scale before it reaches your boilers and lines.",
    body: [
      "Softening exchanges the calcium and magnesium ions that cause hardness for sodium ions, turning scale-forming salts into soluble ones by simple filtration through the resin.",
      "Watwa softeners use a compact multiport control valve with a built-in ejector.",
    ],
    highlights: {
      heading: "Why soften",
      points: ["Protects boilers, cooling towers and pipelines from scale", "Simple filtration process with periodic brine regeneration", "Standard range from 1,000 to 5,000 LPH"],
    },
    specs: {
      caption: "Watwa softener standard range",
      columns: ["Model", "Flow (LPH)", "Resin (L)", "Vessel (in)", "OBR (m³)", "Line size"],
      rows: [
        ["SF-1000", "1,000", "75", "13 × 54", "11.5", "1″"],
        ["SF-2000", "2,000", "125", "14 × 65", "20", "1″"],
        ["SF-3000", "3,000", "200", "18 × 65", "31", "1″"],
        ["SF-4000", "4,000", "250", "21 × 62", "40", "1.5″"],
      ],
    },
  },
  {
    slug: "ultra-filtration-systems",
    title: "Ultra & Nano Filtration",
    short: "UF/NF",
    category: "water-recycle",
    image: "/images/solutions/uf-system.jpg",
    summary: "Cross-flow membrane filtration for wastewater reuse, drinking-water disinfection and RO pre-treatment.",
    body: [
      "Ultrafiltration (UF) and nanofiltration (NF) are cross-flow membrane processes: pressure drives purified water through the membrane while the rejected stream carries the contaminants away.",
      "UF removes colloids, bacteria, viruses, endotoxins and other pathogens with low applied pressure, which makes it an efficient barrier ahead of RO.",
    ],
    highlights: {
      heading: "Applications",
      points: ["Wastewater treatment and reuse", "Drinking-water purification and disinfection", "Pre-treatment for reverse osmosis plants"],
    },
  },
  {
    slug: "zero-liquid-discharge",
    title: "Zero Liquid Discharge (ZLD)",
    short: "ZLD",
    category: "zero-liquid-discharge",
    image: "/images/solutions/zld.jpg",
    summary: "Recover virtually all wastewater and leave only dry solids: no effluent leaves the plant.",
    body: [
      "A ZLD plant discharges no wastewater at all. Effluent is pre-treated, then evaporated until the dissolved solids crystallise. The crystals are removed and dewatered, and the condensed vapour returns to the process.",
      "Legislation and industry increasingly demand ZLD. Watwa integrates whichever technologies your effluent needs into one system.",
    ],
    highlights: {
      heading: "Technologies integrated",
      points: ["Precipitation and chemical oxidation", "Membrane filtration and ion exchange", "Electrolytic separation and adsorption", "Air and steam stripping", "Evaporation, crystallisation and distillation", "Biological oxidation or reduction"],
    },
  },
  {
    slug: "evaporators",
    title: "Evaporators",
    short: "EVP",
    category: "zero-liquid-discharge",
    image: "/images/solutions/evaporator.jpg",
    summary: "Mechanical evaporators that concentrate salts and hazardous solutes and give back reusable distillate.",
    body: [
      "Evaporation concentrates or removes salts, heavy metals and hazardous materials, recovers useful by-products, and shrinks liquid waste before final disposal. It also produces high-quality, reusable distillate.",
      "Solar ponds need land, good weather and odour control. Mechanical evaporators are compact, reliable and efficient.",
    ],
    highlights: {
      heading: "What evaporation does",
      points: ["Concentrates liquid waste before disposal", "Recovers by-products from solution", "Produces reusable distillate", "Completes the ZLD chain"],
    },
  },
  {
    slug: "uf-membranes",
    title: "UF Membranes",
    short: "UFM",
    category: "components",
    image: "/images/solutions/uf-membrane.jpg",
    summary: "0.1–0.001 micron ultrafiltration membranes with high flux at low pressure.",
    body: [
      "Ultrafiltration membranes, with pores of 0.1 to 0.001 micron, remove high-molecular-weight substances, colloids and polymeric molecules while letting low-molecular-weight ions pass.",
      "Because the osmotic pressure difference is negligible, they deliver 50–200 GFD at around 50 psig. Reverse osmosis membranes give 10–30 GFD at 200–400 psig.",
    ],
    highlights: { heading: "Key figures", points: ["Pore size 0.1–0.001 µm", "Flux 50–200 GFD", "Operating pressure ≈ 50 psig", "Cross-flow operation"] },
  },
  {
    slug: "high-pressure-pumps",
    title: "High-Pressure Pumps",
    short: "HPP",
    category: "components",
    image: "/images/solutions/hp-pump.jpg",
    summary: "Variable-speed pumping that matches demand instead of burning energy at fixed speed.",
    body: [
      "Changing water levels change the head a pump must deliver. A single-speed pump sized for the lowest level wastes energy whenever the level is high.",
      "A variable-speed pump adjusts to the level and the demand, which saves energy across the whole operating range.",
    ],
    highlights: { heading: "Where they fit", points: ["RO feed at membrane pressure", "Variable-level lifting", "Pressure boosting"] },
  },
  {
    slug: "dosing-pumps",
    title: "Dosing Pumps",
    short: "DP",
    category: "components",
    image: "/images/solutions/dosing-pump.jpg",
    summary: "Peristaltic dosing for ferric, hypo, lime, caustic and polymers, with SCADA-ready control.",
    body: [
      "Hose and tube peristaltic pumps dose treatment chemicals accurately and repeatably, and also handle sludge transfer and filter-press feed.",
      "They solve the classic problems: abrasive lime that clogs diaphragm pumps, hypochlorite that off-gases and vapour-locks, shear-sensitive polymers, and gritty sludges. Smart tube pumps interface with SCADA for remote dosing.",
    ],
    highlights: { heading: "Doses", points: ["Ferric chloride and sodium hypochlorite", "Lime and caustic soda", "Powdered activated carbon", "Polymers"] },
  },
  {
    slug: "water-treatment-chemicals",
    title: "Water Treatment Chemicals",
    short: "CHEM",
    category: "components",
    image: "/images/solutions/chemicals.jpg",
    summary: "Chemicals and know-how to treat the dirtiest water for reuse or safe discharge.",
    body: [
      "Watwa supplies a suite of chemicals and technologies for water and wastewater. Treated water can be reused or safely discharged, reducing your environmental impact.",
      "For complex wastewater, Watwa integrates chemistry with the right equipment into one solution.",
    ],
    highlights: { heading: "Range", points: ["RO and water treatment chemicals", "Filter media", "Ion-exchange resins for softeners and DM plants", "Settling media and MBBR/FAB media"] },
  },
  {
    slug: "testing-instruments",
    title: "Testing Instruments",
    short: "TDS",
    category: "components",
    image: "/images/solutions/testing.jpg",
    summary: "Handheld and in-line TDS, EC, pH and ORP meters, including dual in-line TDS monitors.",
    body: [
      "Handheld and portable TDS, EC, pH and ORP testers, plus in-line monitors and controllers for RO systems, purification plants, hydroponics, aquariums and pools.",
      "Dual in-line TDS monitors read feed and product water at the same time, so you can see membrane rejection at a glance.",
    ],
    highlights: { heading: "Instruments", points: ["TDS and EC meters", "pH and ORP testers", "Dual in-line TDS monitors", "Rotameters and online pH controllers"] },
  },
];

export const solutionPath = (slug: string) => `/solutions/${slug}`;

export const solutionsIn = (category: CategoryId) => SOLUTIONS.filter((s) => s.category === category);

export const getSolution = (slug: string) => SOLUTIONS.find((s) => s.slug === slug);

/** Field services that sit alongside the plants (home page hero line, catalogue "Services"). */
export const FIELD_SERVICES = ["Operation & Maintenance", "Annual Maintenance Contracts", "Water Audits", "Water Testing", "Spares"];
