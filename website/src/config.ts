// Single source of truth for business data and feature flags.
// Name, address and phone (NAP) must stay identical everywhere, so every
// component reads them from here.

export const business = {
  // Full name, e.g. for page titles and the Google Business Profile.
  brand: 'Mainblick Reinigung & Gebäudeservice Frankfurt',
  // Short forms: the wordmark in the logo and the line under it.
  shortName: 'Mainblick',
  descriptor: 'Reinigung & Gebäudeservice',
  // Must match the trade registration (Gewerbeanmeldung) exactly.
  legalName: 'Mainblick Reinigung & Gebäudeservice Frankfurt, Inh. Rasheed Khodjazada',
  owner: 'Rasheed Khodjazada',
  street: 'Grazer Weg 38',
  postalCode: '60599',
  city: 'Frankfurt am Main',
  country: 'DE',
  phoneDisplay: '0176 80012487',
  phoneHref: 'tel:+4917680012487',
  phoneSchema: '+49 176 80012487',
  whatsappNumber: '4917680012487',
  email: 'afgrasheed301@gmail.com',
  claim: 'Sauberkeit mit System',
} as const;

export const flags = {
  // Trade is registered but not on the flyer. Needs the owner's confirmation.
  autoaufbereitung: false,
  // Town pages for the surrounding area. Needs a confirmed service area.
  cityPages: false,
  // Real Google reviews only. Section stays hidden while this is empty.
  reviews: false,
  // Intro video: set to true once /assets/video/intro-16x9.mp4 exists.
  introVideo: false,
  // The before/after images are AI-generated and are labelled as such.
  beforeAfterIsSymbolic: true,
} as const;

export function whatsappLink(text = 'Hallo Mainblick, ich interessiere mich für ein unverbindliches Angebot.') {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const mailLink = `mailto:${business.email}`;
