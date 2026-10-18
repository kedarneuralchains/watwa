/**
 * Clients. FEATURED_BRANDS are the national names shown large on the home
 * page; add more here (with `logo` once the files arrive) as the client
 * confirms them. INSTALLATIONS is the reference list from the current site's
 * Client Portfolio page.
 */

export type Brand = {
  name: string;
  sector: string;
  /** Path under /public once the official logo file is supplied. */
  logo?: string;
  note: string;
};

export const FEATURED_BRANDS: Brand[] = [
  {
    name: "JK Cement",
    sector: "Cement",
    note: "One of India's leading cement manufacturers, and a Watwa client.",
  },
];

export type Installation = { client: string; location: string; plant: string; capacityKld: number };

export const INSTALLATIONS: Installation[] = [
  { client: "MNIT", location: "Prayagraj", plant: "STP / CWT", capacityKld: 50 },
  { client: "Akash Buildtech", location: "Bareilly", plant: "STP / MBBR", capacityKld: 40 },
  { client: "Jeevan Jyoti Hospital", location: "Sonbhadra", plant: "STP / MBBR + ETP", capacityKld: 22 },
  { client: "Dev Deepa Hospital", location: "Pilibhit", plant: "STP / MBBR", capacityKld: 15 },
  { client: "Vipin Hospital", location: "Bareilly", plant: "STP / MBBR + ETP", capacityKld: 12 },
  { client: "Madhu Shree Resort", location: "Ranthambore", plant: "STP / CWT ×3", capacityKld: 10 },
  { client: "Gokhle Hospital", location: "Pilibhit", plant: "STP / MBBR", capacityKld: 10 },
  { client: "Ram Niwas Gupta Hospital", location: "Sahaswan", plant: "STP / MBBR", capacityKld: 10 },
  { client: "SK Clinic", location: "Bareilly", plant: "STP / MBBR", capacityKld: 10 },
  { client: "Rakam Exports", location: "Farrukhabad", plant: "STP / MBBR", capacityKld: 10 },
  { client: "Sumit Varsh Hospital", location: "Bareilly", plant: "STP / MBBR", capacityKld: 8 },
  { client: "New Life Hospital", location: "Bareilly", plant: "STP / MBBR", capacityKld: 8 },
  { client: "Tandon Hospital", location: "Bareilly", plant: "STP / MBBR", capacityKld: 8 },
  { client: "Raj Rani Hospital", location: "Bareilly", plant: "STP / MBBR + ETP", capacityKld: 7 },
  { client: "SN International", location: "Farrukhabad", plant: "ETP", capacityKld: 5 },
  { client: "Uchit International", location: "Farrukhabad", plant: "ETP", capacityKld: 5 },
  { client: "Shakti Dyeing", location: "Kanpur", plant: "ETP", capacityKld: 5 },
  { client: "Sarvodaya Dyeing", location: "Kanpur", plant: "ETP", capacityKld: 5 },
  { client: "Hazari Lal Eye Hospital", location: "Bareilly", plant: "STP / MBBR", capacityKld: 5 },
  { client: "Bus Station", location: "Gonda", plant: "ETP", capacityKld: 5 },
];

export const INDUSTRIES = [
  "Automobiles",
  "Textile Processing",
  "Food Processing",
  "Pharmaceutical",
  "Pulp & Paper",
  "Cement",
  "Power",
  "Construction",
  "Shopping Complexes",
  "Residential Towers",
  "Educational Institutions",
  "Hospitals",
] as const;
