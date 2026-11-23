/**
 * Single source of truth for lab details, packages, tests and FAQs.
 * Every page, section, schema block and the sitemap is rendered from this file.
 * Only data supplied by the lab is used here — do not invent prices or claims.
 */

/**
 * @typedef {{ key: string, label: string }} IncludedTest
 * @typedef {{ name: string, count: number, tests?: string[] }} TestGroup
 * @typedef {'daily'|'fullbody'|'fever'|'hormones'|'fitness'} CategoryId
 * @typedef {{
 *   slug: string, name: string, shortName: string, price: number|null, mrp?: number,
 *   parameters?: number, categories: CategoryId[], tagline: string,
 *   includes?: IncludedTest[], groups?: TestGroup[], fasting: string,
 *   reportTime?: string, freeHomeCollection?: boolean, badge?: string,
 *   image: string, seoTitle: string, seoDescription: string,
 *   whoShouldTake: string[], preparation: string[], about: string,
 * }} LabPackage
 */

export const SITE_URL = 'https://www.accuratepathologylaboratory.in';

/** Feature flags for claims that need the lab's confirmation before going live. */
export const FLAGS = {
  /** Flyer claims "Billion+ samples processed" and "World-Class Technology". Keep OFF until confirmed. */
  showScaleClaims: false,
};

export const LAB = {
  name: 'Accurate Pathology Laboratory',
  shortName: 'Accurate Pathology',
  taglines: ['Trusted Reports | Better Health', 'Your Health, Our Priority'],
  allTestsLine: 'All types of blood tests done here',
  phones: ['8840658081', '8080246449', '8888155545', '7758099626'],
  whatsapp: '8840658081',
  email: 'accuratepathologylab@gmail.com',
  address: {
    street: 'Lane No 15/A, Mohammad Wadi Road, Autadwadi Handewadi, Sayyad Nagar',
    locality: 'Hadapsar',
    city: 'Pune',
    region: 'Maharashtra',
    postalCode: '411028',
    country: 'IN',
  },
  geo: { lat: 18.4715, lng: 73.9327 },
  hours: 'Open 24 Hours (24×7)',
  mapsEmbed: 'https://maps.google.com/maps?q=Mohammad+Wadi+Road+Hadapsar+Pune+411028&t=&z=15&ie=UTF8&iwloc=&output=embed',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=Accurate+Pathology+Laboratory+Mohammad+Wadi+Road+Hadapsar+Pune+411028',
  /** Add Google Business Profile / Facebook / Instagram URLs here when available. */
  sameAs: [],
  /** Primary areas first: the lab is on Mohammad Wadi Road in Sayyad Nagar. */
  primaryAreas: ['Mohammadwadi', 'Sayyad Nagar'],
  homeCollectionAreas: ['Mohammadwadi', 'Sayyad Nagar', 'Hadapsar', 'Autadwadi', 'Handewadi', 'Undri', 'Wanowrie', 'Kondhwa', 'Magarpatta', 'Fursungi'],
  disclaimer: 'Tests are for diagnostic purposes. Consult your doctor for interpretation.',
};

export const fullAddress = `${LAB.address.street}, ${LAB.address.locality}, ${LAB.address.city} ${LAB.address.postalCode}`;

/** "8840658081" -> "+91 88406 58081" */
export const formatPhone = (p) => `+91 ${p.slice(0, 5)} ${p.slice(5)}`;
export const telHref = (p = LAB.phones[0]) => `tel:+91${p}`;
export const waHref = (message) =>
  `https://wa.me/91${LAB.whatsapp}?text=${encodeURIComponent(message)}`;
export const waPackageMessage = (pkg) =>
  `Hello Accurate Pathology, I want to book the ${pkg.name}${pkg.price ? ` (₹${pkg.price})` : ''}. Please share available slots for home collection.`;

export const formatPrice = (n) => `₹${n.toLocaleString('en-IN')}`;

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'daily', label: 'Daily Health' },
  { id: 'fullbody', label: 'Full Body' },
  { id: 'fever', label: 'Fever' },
  { id: 'hormones', label: 'Hormones' },
  { id: 'fitness', label: 'Fitness' },
];

/** Rows of the comparison table (Mini 1 → Gym Pro). Labels follow the flyer wording. */
export const COMPARISON_ROWS = [
  { key: 'cbc', label: 'CBC (Complete Blood Count)' },
  { key: 'sugar', label: 'Blood Sugar' },
  { key: 'hba1c', label: 'HbA1c' },
  { key: 'cholesterol', label: 'Cholesterol' },
  { key: 'lipid', label: 'Lipid Profile' },
  { key: 'tft', label: 'Thyroid (TFT)' },
  { key: 'gpkidney', label: 'GP Kidney Test' },
  { key: 'rft', label: 'Kidney Function (RFT)' },
  { key: 'lft', label: 'Liver Function (LFT)' },
  { key: 'iron', label: 'Iron Profile' },
  { key: 'urine', label: 'Urine Routine' },
  { key: 'b12', label: 'Vitamin B12' },
  { key: 'd3', label: 'Vitamin D3' },
  { key: 'hscrp', label: 'Hs-CRP' },
  { key: 'homocysteine', label: 'Homocysteine' },
  { key: 'testosterone', label: 'Testosterone Total' },
];

const t = (key, label) => ({ key, label });

/** @type {LabPackage[]} */
export const PACKAGES = [
  {
    slug: 'complete-mini-1',
    name: 'Complete Mini 1',
    shortName: 'Mini 1',
    price: 299,
    categories: ['daily'],
    tagline: 'Basic yearly screening',
    includes: [t('sugar', 'Sugar'), t('cholesterol', 'Cholesterol'), t('tft', 'Thyroid'), t('gpkidney', 'GP Kidney Test'), t('cbc', 'CBC')],
    fasting: 'Fasting of 8–12 hours is recommended because the package includes blood sugar and cholesterol. Water is allowed.',
    image: '/images/packages/complete-mini-1.webp',
    seoTitle: 'Complete Mini 1 Health Checkup ₹299 in Hadapsar, Pune | Sugar, Thyroid, CBC',
    seoDescription: 'Complete Mini 1 at ₹299: Sugar, Cholesterol, Thyroid, GP Kidney Test and CBC. Home sample collection in Hadapsar, Pune. Book on call or WhatsApp.',
    about: 'Complete Mini 1 is our most affordable starter checkup. In one blood sample it covers blood sugar, cholesterol, thyroid, a general kidney test and a complete blood count, the basic markers most doctors ask for in a routine yearly check.',
    whoShouldTake: [
      'Adults who want a low-cost yearly screening',
      'Anyone who has not had a blood test in the last year',
      'People with a family history of diabetes or thyroid problems',
    ],
    preparation: [
      'Fast for 8–12 hours before the sample (water is allowed)',
      'Take your regular medicines unless your doctor says otherwise',
      'Book a morning home collection slot to make fasting easier',
    ],
  },
  {
    slug: 'complete-mini-2',
    name: 'Complete Mini 2',
    shortName: 'Mini 2',
    price: 599,
    categories: ['daily'],
    tagline: 'Sugar, kidney, cholesterol & urine',
    includes: [t('cbc', 'CBC'), t('sugar', 'Sugar (Fasting)'), t('rft', 'RFT'), t('lipid', 'Lipid Profile'), t('urine', 'Urine Routine')],
    fasting: 'Fasting of 8–12 hours is required for Fasting Sugar and Lipid Profile. Water is allowed.',
    image: '/images/packages/complete-mini-2.webp',
    seoTitle: 'Complete Mini 2 Checkup ₹599 Hadapsar, Pune | CBC, Lipid, RFT, Urine',
    seoDescription: 'Complete Mini 2 at ₹599: CBC, Fasting Sugar, Kidney Function (RFT), Lipid Profile and Urine Routine. Home collection in Hadapsar & nearby areas.',
    about: 'Complete Mini 2 adds a full lipid profile, a kidney function test (RFT) and a urine routine to the essentials. It is a practical routine checkup for adults who want to keep an eye on sugar, cholesterol and kidney health.',
    whoShouldTake: [
      'Adults above 30 doing a routine health check',
      'People with high blood pressure or a sedentary lifestyle',
      'Anyone whose doctor asked for sugar, lipid and kidney tests together',
    ],
    preparation: [
      'Fast for 8–12 hours before the sample (water is allowed)',
      'Collect the first morning urine sample if possible',
      'Avoid heavy, oily food and alcohol the night before',
    ],
  },
  {
    slug: 'complete-mini-3',
    name: 'Complete Mini 3',
    shortName: 'Mini 3',
    price: 999,
    categories: ['daily'],
    badge: 'Popular',
    tagline: 'Liver, kidney, iron, HbA1c & thyroid',
    includes: [
      t('cbc', 'CBC'), t('sugar', 'Sugar Fasting'), t('lft', 'LFT'), t('rft', 'RFT'), t('lipid', 'Lipid Profile'),
      t('iron', 'Iron Profile'), t('hba1c', 'HbA1c'), t('tft', 'TFT'), t('urine', 'Urine Routine'),
    ],
    fasting: 'Fasting of 8–12 hours is required for Fasting Sugar and Lipid Profile. Water is allowed.',
    image: '/images/packages/complete-mini-3.webp',
    seoTitle: 'Complete Mini 3 Health Checkup ₹999 Hadapsar, Pune | LFT, RFT, Thyroid, HbA1c',
    seoDescription: 'Complete Mini 3 at ₹999 with CBC, Fasting Sugar, LFT, RFT, Lipid Profile, Iron Profile, HbA1c, Thyroid (TFT) and Urine Routine. Home collection available.',
    about: 'Complete Mini 3 is a broad health checkup at under ₹1,000. Along with sugar and cholesterol it checks liver (LFT) and kidney (RFT) function, iron levels, three-month average sugar (HbA1c), thyroid and urine.',
    whoShouldTake: [
      'Adults who want a wide checkup without a large budget',
      'People who feel tired often and want iron and thyroid checked',
      'People with diabetes tracking HbA1c along with liver and kidney health',
    ],
    preparation: [
      'Fast for 8–12 hours before the sample (water is allowed)',
      'Collect the first morning urine sample if possible',
      'Tell our phlebotomist about any medicines you take regularly',
    ],
  },
  {
    slug: 'complete-advance',
    name: 'Complete Advance',
    shortName: 'Advance',
    price: 1499,
    categories: ['daily', 'fullbody'],
    tagline: 'Adds Vitamin B12 & Vitamin D3',
    includes: [
      t('cbc', 'CBC'), t('sugar', 'Sugar Fasting'), t('lft', 'LFT'), t('rft', 'RFT'), t('lipid', 'Lipid Profile'),
      t('iron', 'Iron Profile'), t('hba1c', 'HbA1c'), t('tft', 'TFT'), t('b12', 'Vitamin B12'), t('d3', 'Vitamin D3'),
    ],
    fasting: 'Fasting of 8–12 hours is required for Fasting Sugar and Lipid Profile. Water is allowed.',
    image: '/images/packages/complete-advance.webp',
    seoTitle: 'Complete Advance Checkup ₹1499 Hadapsar, Pune | Vitamin B12 & D3 Test',
    seoDescription: 'Complete Advance at ₹1499: CBC, Sugar, LFT, RFT, Lipid, Iron, HbA1c, Thyroid, Vitamin B12 and Vitamin D3. Blood test at home in Hadapsar, Pune.',
    about: 'Complete Advance covers the main organ and metabolic markers and adds Vitamin B12 and Vitamin D3, two deficiencies that are common in India and often linked to tiredness, weakness and body pain.',
    whoShouldTake: [
      'Adults with fatigue, body pain or low energy',
      'Vegetarians and people with little sun exposure (B12 and D3)',
      'Senior citizens who want a thorough yearly checkup',
    ],
    preparation: [
      'Fast for 8–12 hours before the sample (water is allowed)',
      'Continue regular medicines unless your doctor advises otherwise',
      'Mention any vitamin supplements you take when you book',
    ],
  },
  {
    slug: 'complete-gym-pro',
    name: 'Complete Gym Pro',
    shortName: 'Gym Pro',
    price: 3399,
    categories: ['fitness'],
    tagline: 'For active lifestyles & fitness goals',
    includes: [
      t('cbc', 'CBC'), t('sugar', 'Sugar Fasting'), t('hba1c', 'HbA1c'), t('hscrp', 'Hs-CRP'), t('homocysteine', 'Homocysteine'),
      t('iron', 'Iron Profile'), t('lft', 'LFT'), t('rft', 'RFT'), t('lipid', 'Lipid Profile'), t('testosterone', 'Testosterone Total'),
      t('tft', 'TFT'), t('b12', 'Vitamin B12'), t('d3', 'Vitamin D3'),
    ],
    fasting: 'Fasting of 8–12 hours is required for Fasting Sugar and Lipid Profile. Water is allowed.',
    image: '/images/packages/complete-gym-pro.webp',
    seoTitle: 'Complete Gym Pro Blood Test ₹3399 Pune | Testosterone, Hs-CRP, Vitamins',
    seoDescription: 'Complete Gym Pro at ₹3399 for gym-goers: Testosterone Total, Hs-CRP, Homocysteine, Iron, LFT, RFT, Lipid, HbA1c, Thyroid, Vitamin B12 & D3. Home collection in Hadapsar.',
    about: 'Complete Gym Pro is built for people who train regularly. Besides the core organ markers it measures Testosterone Total, Hs-CRP (an inflammation marker) and Homocysteine, along with iron, Vitamin B12 and Vitamin D3 levels.',
    whoShouldTake: [
      'Gym-goers, athletes and people on a fitness program',
      'Anyone using supplements who wants a baseline before and after',
      'People with slow recovery, low stamina or frequent fatigue',
    ],
    preparation: [
      'Fast for 8–12 hours before the sample (water is allowed)',
      'Avoid intense workouts for 24 hours before the test',
      'Give the sample in the morning, as testosterone levels vary through the day',
    ],
  },
  {
    slug: 'full-body-profile',
    name: 'Full Body Profile',
    shortName: 'Full Body',
    price: 1800,
    mrp: 2500,
    parameters: 85,
    categories: ['fullbody'],
    badge: 'Special Offer',
    tagline: '85 parameters in one package',
    groups: [
      { name: 'CBC', count: 22 },
      { name: 'HbA1c', count: 2 },
      { name: 'Lipid Profile', count: 8 },
      { name: 'Liver Function Test', count: 11 },
      { name: 'Kidney Function Test', count: 8 },
      { name: 'Serum Electrolytes', count: 3 },
      { name: 'Thyroid Profile (TFT)', count: 3 },
      { name: 'Iron Profile', count: 3 },
      { name: 'Vitamin Profile', count: 2 },
      { name: 'Testosterone', count: 1 },
      { name: 'Hs-CRP', count: 1 },
      { name: 'Phosphorus', count: 1 },
      { name: 'Urinogram', count: 20 },
    ],
    fasting: '10–12 hours of fasting is compulsory before this test. Water is allowed.',
    image: '/images/packages/full-body-profile.webp',
    seoTitle: 'Full Body Checkup ₹1800 (85 Tests) in Hadapsar, Pune | Home Collection',
    seoDescription: 'Full Body Profile with 85 parameters at a special offer of ₹1800 (MRP ₹2500): CBC, LFT, KFT, Lipid, Thyroid, Iron, Vitamins, HbA1c, Urine. Home collection in Hadapsar.',
    about: 'The Full Body Profile checks 85 parameters in one visit: blood count, sugar (HbA1c), cholesterol, liver, kidney, electrolytes, thyroid, iron, vitamins, testosterone, Hs-CRP, phosphorus and a complete urine analysis (urinogram). It gives your doctor a complete picture in a single report.',
    whoShouldTake: [
      'Adults who want one complete yearly health checkup',
      'People above 40 or with a family history of diabetes, heart or thyroid disease',
      'Anyone advised a "full body checkup" by their doctor',
    ],
    preparation: [
      '10–12 hours of fasting is compulsory (water is allowed)',
      'Collect the first morning urine sample for the urinogram',
      'Avoid alcohol and heavy meals the evening before',
    ],
  },
  {
    slug: 'monsoon-fever-panel',
    name: 'Monsoon Fever Panel Advanced',
    shortName: 'Fever Panel (MFPA)',
    price: null,
    parameters: 32,
    categories: ['fever'],
    badge: 'Monsoon Special',
    freeHomeCollection: true,
    reportTime: 'Reports within 4 hours after the sample reaches the laboratory',
    tagline: 'Dengue, Malaria, Typhoid & CBC in one panel',
    groups: [
      { name: 'Dengue NS1 Antigen Rapid Test', count: 1 },
      { name: 'Malarial Antigen', count: 2, tests: ['Plasmodium Vivax', 'Plasmodium Falciparum'] },
      { name: 'Typhoid Test', count: 2, tests: ['Typhoid IgG', 'Typhoid IgM'] },
      { name: 'CBC', count: 24 },
      { name: 'Dengue Rapid Test IgG/IgM', count: 1 },
      { name: 'C-Reactive Protein', count: 1 },
      { name: 'ESR', count: 1 },
    ],
    fasting: 'No fasting is needed for this panel. The sample can be given at any time of day.',
    image: '/images/packages/monsoon-fever-panel.webp',
    seoTitle: 'Dengue, Malaria & Typhoid Test | Monsoon Fever Panel (32 Tests) Hadapsar Pune',
    seoDescription: 'Monsoon Fever Panel Advanced: Dengue NS1, Dengue IgG/IgM, Malaria antigen, Typhoid IgG/IgM, CBC, CRP and ESR. Reports in 4 hours. Free home collection in Hadapsar, Pune.',
    about: 'Fever during the monsoon can come from dengue, malaria, typhoid or a common viral infection, and the symptoms often look alike. The Monsoon Fever Panel Advanced checks for all of these together, plus a CBC (including platelets), CRP and ESR, so your doctor can decide treatment quickly.',
    whoShouldTake: [
      'Anyone with fever for more than 2 days, especially in the monsoon',
      'Fever with body ache, headache, chills, rash or vomiting',
      'Patients whose doctor advised dengue, malaria or typhoid tests',
    ],
    preparation: [
      'No fasting needed — give the sample as soon as your doctor advises',
      'Tell us the number of days you have had fever when booking',
      'Free home collection, so the patient does not need to travel',
    ],
  },
  {
    slug: 'hormonal-evaluation',
    name: 'Hormonal Evaluation',
    shortName: 'Hormonal',
    price: 2800,
    parameters: 12,
    categories: ['hormones'],
    tagline: 'Thyroid, fertility & reproductive hormones',
    groups: [
      { name: 'Thyroid Profile', count: 3, tests: ['Total T3', 'Total T4', 'Ultrasensitive TSH'] },
      { name: 'Progesterone', count: 1 },
      { name: 'Testosterone', count: 1 },
      { name: 'Prolactin (PRL)', count: 1 },
      { name: 'Sex Hormone Binding Globulin (SHBG)', count: 1 },
      { name: 'FSH', count: 1 },
      { name: 'Anti-Mullerian Hormone (AMH)', count: 1 },
      { name: 'LH', count: 1 },
      { name: 'Estradiol (E2) / Oestrogen', count: 1 },
      { name: 'Free Testosterone', count: 1 },
    ],
    fasting: 'Fasting is usually not required. Some hormones are best tested on specific days of the menstrual cycle — follow your doctor’s advice on timing.',
    image: '/images/packages/hormonal-evaluation.webp',
    seoTitle: 'Hormone Test ₹2800 in Hadapsar, Pune | AMH, FSH, LH, Thyroid, Prolactin',
    seoDescription: 'Hormonal Evaluation (12 tests) at ₹2800: Thyroid (T3, T4, TSH), AMH, FSH, LH, Prolactin, Estradiol, Progesterone, Testosterone, Free Testosterone, SHBG. Home collection available.',
    about: 'The Hormonal Evaluation measures 12 hormones in one sample: the thyroid profile along with the reproductive hormones doctors commonly check for irregular periods, PCOS, fertility planning or low testosterone, including AMH, FSH, LH, prolactin and estradiol.',
    whoShouldTake: [
      'Women with irregular periods, PCOS symptoms or planning a pregnancy',
      'Men with low energy or symptoms of low testosterone',
      'Anyone whose doctor advised a hormone or fertility panel',
    ],
    preparation: [
      'Ask your doctor which day of your cycle to give the sample',
      'A morning sample is preferred for testosterone and prolactin',
      'Avoid stress and heavy exercise just before the sample',
    ],
  },
];

export const getPackage = (slug) => PACKAGES.find((p) => p.slug === slug);

/** Count of parameters/tests shown on a card. */
export const testCount = (pkg) =>
  pkg.parameters ?? pkg.includes?.length ?? pkg.groups?.reduce((n, g) => n + g.count, 0) ?? 0;

/** Flat list of what a package includes, as display strings. */
export const includedList = (pkg) =>
  pkg.includes
    ? pkg.includes.map((i) => i.label)
    : pkg.groups.map((g) => (g.tests ? `${g.name}: ${g.tests.join(', ')}` : g.count > 1 ? `${g.name} (${g.count})` : g.name));

export const TRUST_BADGES = [
  { id: 'accurate', label: 'Accurate Results' },
  { id: 'tech', label: 'Advanced Technology' },
  { id: 'care', label: 'Trusted Care' },
  { id: 'skilled', label: 'Highly Skilled Technicians' },
  { id: 'hygienic', label: 'Safe & Hygienic Home Collection' },
  { id: 'free', label: 'Free Home Collection' },
];

/** Shown only when FLAGS.showScaleClaims is true. */
export const SCALE_CLAIMS = ['Billion+ samples processed', 'World-Class Technology'];

export const STEPS = [
  { title: 'Book', desc: 'Call, WhatsApp or book online. Pick a package and a time slot.' },
  { title: 'Sample Collection', desc: 'A trained phlebotomist collects the sample at your home, or visit the lab 24×7.' },
  { title: 'Report', desc: 'Get your report on WhatsApp. Share it with your doctor for interpretation.' },
];

export const FAQS = [
  {
    q: 'Is there a pathology lab near me in Mohammadwadi or Sayyad Nagar?',
    a: `Yes. Accurate Pathology Laboratory is on Mohammad Wadi Road (Lane No 15/A) in Sayyad Nagar, close to Autadwadi and Handewadi, and is open 24×7. You can walk in for a blood test any time, or book a home sample collection anywhere in Mohammadwadi, Sayyad Nagar and Hadapsar by calling ${formatPhone('8840658081')}.`,
  },
  {
    q: 'Is fasting required before a blood test?',
    a: 'Fasting of 8–12 hours is recommended for Fasting Sugar, Lipid Profile and most health checkup packages. For the Full Body Profile, 10–12 hours of fasting is compulsory. The Monsoon Fever Panel and most hormone tests do not need fasting. Water is allowed.',
  },
  {
    q: 'How quickly will I get my report?',
    a: 'Monsoon Fever Panel reports are ready within 4 hours after the sample reaches the laboratory. Routine tests such as CBC, blood sugar and urine routine are usually ready within 4 to 6 hours, and larger packages within 12–24 hours. Reports are sent on WhatsApp.',
  },
  {
    q: 'Do you provide blood test at home in Hadapsar?',
    a: `Yes. Home sample collection is available on all packages across ${LAB.homeCollectionAreas.join(', ')} and nearby areas of Pune. Home collection for the Monsoon Fever Panel is free.`,
  },
  {
    q: 'Can I see a sample report before booking?',
    a: `Yes. Message us on WhatsApp at ${formatPhone(LAB.whatsapp)} and we will share a sample report for the package you are interested in.`,
  },
  {
    q: 'How much does a full body checkup cost in Hadapsar?',
    a: 'Our Full Body Profile covers 85 parameters and is available at a special offer price of ₹1800 (MRP ₹2500). Smaller checkups start at ₹299 with Complete Mini 1.',
  },
  {
    q: 'Where is Accurate Pathology Laboratory located?',
    a: `We are at ${fullAddress}. The lab is ${LAB.hours.toLowerCase()}. Call ${formatPhone(LAB.phones[0])} for directions.`,
  },
];

/**
 * Tests directory — every individual test that appears in a package, with the
 * packages that include it. Individual tests can be added here later.
 * @type {{ name: string, packages: string[] }[]}
 */
export const TESTS_DIRECTORY = (() => {
  const map = new Map();
  const add = (name, slug) => {
    const k = name.toLowerCase();
    if (!map.has(k)) map.set(k, { name, packages: [] });
    const entry = map.get(k);
    if (!entry.packages.includes(slug)) entry.packages.push(slug);
  };
  for (const pkg of PACKAGES) {
    if (pkg.includes) pkg.includes.forEach((i) => add(i.label, pkg.slug));
    if (pkg.groups) pkg.groups.forEach((g) => (g.tests ? g.tests.forEach((x) => add(x, pkg.slug)) : add(g.name, pkg.slug)));
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
})();

/** Descriptive alt text for each package photo (photos: Unsplash License, see public/images/packages/CREDITS.txt). */
export const IMAGE_ALT = {
  'complete-mini-1': 'Phlebotomist drawing a blood sample from a patient’s arm for a routine health checkup',
  'complete-mini-2': 'Lab technician placing blood sample tubes in a rack for testing',
  'complete-mini-3': 'Rows of colour-coded blood collection tubes ready for a health checkup panel',
  'complete-advance': 'Gloved hand adjusting a laboratory microscope for blood analysis',
  'complete-gym-pro': 'Woman lifting a barbell in a gym — fitness blood test package',
  'full-body-profile': 'Lab technician transferring a blood sample into a test tube for a full body checkup',
  'monsoon-fever-panel': 'Aedes mosquito on human skin — dengue and malaria test during monsoon',
  'hormonal-evaluation': 'Doctor discussing hormone test results with a patient',
};
export const packageImage = (pkg) => ({
  src: pkg.image,
  srcSet: `${pkg.image.replace('.webp', '-480.webp')} 480w, ${pkg.image.replace('.webp', '-640.webp')} 640w, ${pkg.image} 800w`,
  alt: IMAGE_ALT[pkg.slug] ?? pkg.name,
});
