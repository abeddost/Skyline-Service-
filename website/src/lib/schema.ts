import { business } from '../config';
import { services, type Service } from '../data/services';

const abs = (path: string, site: URL | undefined) => new URL(path, site).toString();

export function businessSchema(site: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': abs('/#business', site),
    name: business.legalName,
    alternateName: business.brand,
    url: abs('/', site),
    telephone: business.phoneSchema,
    email: business.email,
    slogan: business.claim,
    logo: abs('/assets/brand/logo.svg', site),
    image: abs('/og-default.jpg', site),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.street,
      postalCode: business.postalCode,
      addressLocality: business.city,
      addressCountry: business.country,
    },
    areaServed: [{ '@type': 'City', name: 'Frankfurt am Main' }],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Leistungen',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: abs(`/${s.slug}`, site) },
      })),
    },
  };
}

export function serviceSchema(s: Service, site: URL | undefined, image?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${s.name} Frankfurt`,
    serviceType: s.serviceType,
    description: s.description,
    url: abs(`/${s.slug}`, site),
    ...(image ? { image: abs(image, site) } : {}),
    areaServed: { '@type': 'City', name: 'Frankfurt am Main' },
    provider:
      s.key === 'umzug'
        ? {
            '@type': 'MovingCompany',
            name: business.legalName,
            telephone: business.phoneSchema,
            url: abs('/', site),
            address: {
              '@type': 'PostalAddress',
              streetAddress: business.street,
              postalCode: business.postalCode,
              addressLocality: business.city,
              addressCountry: business.country,
            },
          }
        : { '@id': abs('/#business', site) },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; href: string }[], site: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.href, site),
    })),
  };
}
