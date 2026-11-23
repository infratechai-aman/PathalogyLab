import { SITE_URL, LAB, PACKAGES, FAQS, getPackage, includedList, testCount, fullAddress } from './data/lab.js';

/** Resolve a pathname to a route. Shared by the browser and the prerender script. */
export function resolveRoute(pathname = '/') {
  const path = pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/+$/, '') || '/';
  if (path === '/') return { type: 'home', path: '/' };
  if (path === '/tests') return { type: 'tests', path: '/tests' };
  const m = path.match(/^\/packages\/([a-z0-9-]+)$/);
  if (m && getPackage(m[1])) return { type: 'package', path, pkg: getPackage(m[1]) };
  return { type: 'notfound', path };
}

/** Every indexable route, used for prerendering and the sitemap. */
export const ROUTES = ['/', '/tests', ...PACKAGES.map((p) => `/packages/${p.slug}`)];

const businessId = `${SITE_URL}/#business`;

const businessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['MedicalBusiness', 'DiagnosticLab'],
  '@id': businessId,
  name: LAB.name,
  alternateName: ['Accurate Pathology Lab Mohammadwadi', 'Accurate Pathology Lab Sayyad Nagar Hadapsar'],
  slogan: LAB.taglines[0],
  url: `${SITE_URL}/`,
  telephone: `+91${LAB.phones[0]}`,
  email: LAB.email,
  image: [`${SITE_URL}/og-image.jpg`, `${SITE_URL}/images/hero-lab.webp`],
  logo: `${SITE_URL}/images/logo.webp`,
  priceRange: '₹299 – ₹3399',
  currenciesAccepted: 'INR',
  medicalSpecialty: 'Pathology',
  address: {
    '@type': 'PostalAddress',
    streetAddress: LAB.address.street,
    addressLocality: LAB.address.locality,
    addressRegion: LAB.address.region,
    postalCode: LAB.address.postalCode,
    addressCountry: LAB.address.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: LAB.geo.lat, longitude: LAB.geo.lng },
  hasMap: LAB.mapsLink,
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  contactPoint: LAB.phones.map((p) => ({
    '@type': 'ContactPoint',
    telephone: `+91${p}`,
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi', 'Marathi'],
  })),
  areaServed: LAB.homeCollectionAreas.map((name) => ({ '@type': 'Place', name: `${name}, Pune` })),
  ...(LAB.sameAs.length ? { sameAs: LAB.sameAs } : {}),
});

const productSchema = (pkg) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': `${SITE_URL}/packages/${pkg.slug}#product`,
  name: pkg.name,
  description: pkg.about,
  image: `${SITE_URL}${pkg.image}`,
  url: `${SITE_URL}/packages/${pkg.slug}`,
  category: 'Diagnostic test package',
  brand: { '@type': 'Brand', name: LAB.name },
  additionalProperty: [{ '@type': 'PropertyValue', name: 'Parameters', value: testCount(pkg) }],
  ...(pkg.price
    ? {
        offers: {
          '@type': 'Offer',
          price: String(pkg.price),
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}/packages/${pkg.slug}`,
          seller: { '@id': businessId },
        },
      }
    : {}),
});

const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE_URL}${it.path}` })),
});

const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

/** Questions shown on a package page (unique per package). */
export function packageFaqs(pkg) {
  return [
    { q: `Is fasting required for the ${pkg.name}?`, a: pkg.fasting },
    {
      q: `When will I get the ${pkg.shortName} report?`,
      a: pkg.reportTime
        ? `${pkg.reportTime}. The report is sent on WhatsApp.`
        : 'Most reports are ready the same day and are sent to you on WhatsApp. Our team will tell you the exact time when you book.',
    },
    {
      q: `Is home sample collection available for the ${pkg.shortName}?`,
      a: pkg.freeHomeCollection
        ? `Yes, home collection for this panel is FREE across ${LAB.homeCollectionAreas.slice(0, 5).join(', ')} and nearby areas.`
        : `Yes, home sample collection is available across ${LAB.homeCollectionAreas.slice(0, 5).join(', ')} and nearby areas of Pune.`,
    },
  ];
}

/** Title, description, canonical and JSON-LD for a route. */
export function getHead(route) {
  if (route.type === 'package') {
    const pkg = route.pkg;
    return {
      title: pkg.seoTitle,
      description: pkg.seoDescription,
      canonical: `${SITE_URL}/packages/${pkg.slug}`,
      ogImage: `${SITE_URL}${pkg.image}`,
      jsonLd: [
        productSchema(pkg),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Health Packages', path: '/#packages' },
          { name: pkg.name, path: `/packages/${pkg.slug}` },
        ]),
        faqSchema(packageFaqs(pkg)),
      ],
    };
  }
  if (route.type === 'tests') {
    return {
      title: 'All Blood Tests Directory | Accurate Pathology Lab Hadapsar, Pune',
      description: `Search every blood test we offer, from CBC, thyroid and HbA1c to dengue, malaria, typhoid and hormone tests. ${LAB.allTestsLine}. Home collection in Hadapsar, Pune.`,
      canonical: `${SITE_URL}/tests`,
      ogImage: `${SITE_URL}/og-image.jpg`,
      jsonLd: [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Tests Directory', path: '/tests' }])],
    };
  }
  if (route.type === 'notfound') {
    return {
      title: 'Page not found | Accurate Pathology Laboratory',
      description: 'This page does not exist. Browse our health checkup packages or call us to book a blood test at home.',
      canonical: `${SITE_URL}/`,
      ogImage: `${SITE_URL}/og-image.jpg`,
      noindex: true,
      jsonLd: [],
    };
  }
  return {
    title: 'Pathology Lab in Mohammadwadi, Pune | Blood Test at Home 24×7 – Accurate Pathology',
    description:
      'Pathology lab on Mohammad Wadi Road, Sayyad Nagar (Hadapsar, Pune). Open 24×7. Blood test at home, full body checkup (85 tests) ₹1800, thyroid & dengue tests. Call 8840658081.',
    canonical: `${SITE_URL}/`,
    ogImage: `${SITE_URL}/og-image.jpg`,
    jsonLd: [
      businessSchema(),
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: LAB.name,
        url: `${SITE_URL}/`,
        inLanguage: 'en-IN',
        publisher: { '@id': businessId },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Health checkup packages',
        itemListElement: PACKAGES.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/packages/${p.slug}`,
          name: p.name,
        })),
      },
      faqSchema(FAQS),
    ],
  };
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Serialise head tags for the prerendered HTML. */
export function renderHeadTags(head) {
  const tags = [
    `<title>${esc(head.title)}</title>`,
    `<meta name="description" content="${esc(head.description)}" />`,
    `<meta name="robots" content="${head.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    `<link rel="canonical" href="${head.canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${head.canonical}" />`,
    `<meta property="og:title" content="${esc(head.title)}" />`,
    `<meta property="og:description" content="${esc(head.description)}" />`,
    `<meta property="og:image" content="${head.ogImage}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:site_name" content="${LAB.name}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(head.title)}" />`,
    `<meta name="twitter:description" content="${esc(head.description)}" />`,
    `<meta name="twitter:image" content="${head.ogImage}" />`,
    ...head.jsonLd.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`),
  ];
  return tags.join('\n    ');
}

export { includedList, fullAddress };
