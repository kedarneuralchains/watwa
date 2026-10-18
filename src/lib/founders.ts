/**
 * The founders. Watwa's market reputation rests on these two faces, so
 * they get a hero-sized section on the home page and the About page.
 *
 * TODO(client): portraits, Kuldeep's surname, and approval of the bios
 * and quotes below. They are DRAFT copy written for the redesign, not facts.
 * Until `photo` is set, <FounderPortrait> renders a monogram placeholder.
 */

export type Founder = {
  slug: string;
  name: string;
  /** How clients address them; used where space is tight. */
  shortName: string;
  role: string;
  initials: string;
  photo?: string;
  bio: string;
  quote: string;
  phone?: string;
};

export const FOUNDERS: Founder[] = [
  {
    slug: "shashi-kant",
    name: "Shashi Kant Vishwakarma",
    shortName: "Shashi Kant",
    role: "Founder & Director",
    initials: "SK",
    bio: "Shashi Kant founded Watwa to solve water problems on the ground, across Uttar Pradesh and beyond: plant by plant and client by client. Most of Watwa's customers met him before they ever saw a brochure, and many still call him directly.",
    quote: "Clients don't remember a brochure. They remember who stood at the plant with them on commissioning day.",
    phone: "+91 97608 58777",
  },
  {
    slug: "kuldeep",
    name: "Kuldeep",
    shortName: "Kuldeep",
    role: "Co-Founder",
    initials: "K",
    bio: "Kuldeep leads Watwa's growth and execution, carrying the company from hospital STPs to industrial ETP and ZLD systems for some of India's best-known manufacturers.",
    quote: "Every plant we commission carries our name. It has to keep running long after we leave.",
  },
];
