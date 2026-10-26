/**
 * Verified business content from https://gtaductmasters.ca/ and the 15 exact
 * company names extracted from the user-provided reference image.
 *
 * STRICT ACCURACY POLICY:
 * - Zero invented addresses, phone numbers, emails, prices, awards, team bios,
 *   founding years, or fabricated reviews.
 * - Parent statistics, credentials, and 6 customer reviews appear on GTA Duct
 *   Masters where verified from the live parent website.
 * - Per explicit user confirmation, all 15 linked companies share the verified
 *   GTA Duct Masters contact channels and present the 4 verified core services.
 */

export interface VerifiedContactInfo {
  readonly phoneDisplay: string;
  readonly phoneHref: string;
  readonly phoneE164: string;
  readonly email: string;
  readonly emailHref: string;
  readonly whatsappQuoteUrl: string;
  readonly whatsappPricingUrl: string;
  readonly hoursDisplay: string;
  readonly hoursSchema: string;
  readonly facebookUrl: string;
  readonly instagramUrl: string;
  readonly locality: string;
  readonly region: string;
  readonly country: string;
}

export interface VerifiedService {
  readonly id: string;
  readonly title: string;
  readonly formOptionValue: string;
  readonly shortSummary: string;
  readonly parentDescription: string;
  readonly features: readonly string[];
  readonly technicalFocus: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
}

export interface ParentAdvantage {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

export interface GalleryPair {
  readonly id: string;
  readonly caption: string;
  readonly category: string;
  readonly beforeSrc: string;
  readonly beforeAlt: string;
  readonly afterSrc: string;
  readonly afterAlt: string;
  readonly afterFallbackSrc?: string;
}

export interface CustomerReview {
  readonly id: string;
  readonly initials: string;
  readonly author: string;
  readonly location: string;
  readonly rating: number;
  readonly quote: string;
  readonly serviceTag: string;
}

export interface ParentPageMeta {
  readonly slug: string; // "" for root, "services", "about", etc.
  readonly urlPath: string; // "/", "/services/", etc.
  readonly navLabel: string;
  readonly title: string;
  readonly metaDescription: string;
}

export interface LinkedCompanyRecord {
  readonly index: number;
  readonly exactName: string;
  readonly slug: string;
  readonly homeUrl: string;
  readonly aboutUrl: string;
}

export const PRIMARY_DOMAIN = 'https://gtaductmasters.ca';

export const VERIFIED_CONTACT: VerifiedContactInfo = {
  phoneDisplay: '647-557-6364',
  phoneHref: 'tel:+16475576364',
  phoneE164: '+16475576364',
  email: 'devintaseff4@gmail.com',
  emailHref: 'mailto:devintaseff4@gmail.com',
  whatsappQuoteUrl:
    'https://wa.me/16475576364?text=Hi%2C%20I%20need%20duct%20cleaning%20service.%20Please%20give%20me%20a%20quote.',
  whatsappPricingUrl:
    'https://wa.me/16475576364?text=Hi%2C%20I%20need%20duct%20cleaning%20service%20at%20my%20location.%20Please%20provide%20pricing.',
  hoursDisplay: 'Mon–Sun, 7:00 AM – 9:00 PM',
  hoursSchema: 'Mo-Su 07:00-21:00',
  facebookUrl: 'https://www.facebook.com/share/18Q6Cqvvo4/?mibextid=wwXIfr',
  instagramUrl:
    'https://www.instagram.com/gtaductmastersca?igsh=eDZtMGFtZTdrZG92&utm_source=qr',
  locality: 'Toronto',
  region: 'ON',
  country: 'CA',
};

export const PARENT_STATS = [
  { value: 5000, suffix: '+', label: 'Homes Served' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Satisfaction Rate' },
  { value: 347, suffix: '+', label: '5-Star Reviews' },
] as const;

export const PARENT_CERTIFICATIONS = [
  'NADCA Certified',
  'EPA Compliant',
  'NATE Certified',
] as const;

export const VERIFIED_SERVICES: readonly VerifiedService[] = [
  {
    id: 'air-duct-cleaning',
    title: 'Air Duct Cleaning',
    formOptionValue: 'Air Duct Cleaning',
    shortSummary:
      'Thorough removal of accumulated dust, airborne allergens, mold spores, and particulate debris across supply and return ductwork.',
    parentDescription:
      'Our professional air duct cleaning service removes years of accumulated dust, allergens, mold spores, and debris from your entire duct system — improving indoor air quality and HVAC efficiency.',
    features: [
      'Full duct system inspection',
      'High-powered vacuum extraction',
      'Sanitization treatment available',
    ],
    technicalFocus:
      'HEPA-filtered negative air extraction paired with agitation brushing along supply trunks and return plenums.',
    imageSrc: '/assets/images/editorial/luxury-residence-air.jpg',
    imageAlt:
      'Sunlit residential interior with clean architectural linear air diffusers integrated into classical crown molding',
  },
  {
    id: 'hvac-system-cleaning',
    title: 'HVAC System Cleaning',
    formOptionValue: 'HVAC System Cleaning',
    shortSummary:
      'Complete mechanical cleaning of coils, blower assemblies, and heat exchangers to restore airflow balance and equipment longevity.',
    parentDescription:
      'Comprehensive HVAC cleaning service covering your entire heating and cooling system — from coils and blowers to heat exchangers — restoring peak efficiency and extending equipment life.',
    features: [
      'Evaporator & condenser coil cleaning',
      'Blower motor & fan cleaning',
      'Filter replacement & check',
    ],
    technicalFocus:
      'Precision cleaning of evaporator fins, blower housings, and filtration frames to maintain unrestricted thermal transfer.',
    imageSrc: '/assets/images/editorial/hepa-ventilation.jpg',
    imageAlt:
      'Spotless commercial HVAC air handler interior showing clean aluminum evaporator coil fins and pleated HEPA filter assembly',
  },
  {
    id: 'dryer-vent-cleaning',
    title: 'Dryer Vent Cleaning',
    formOptionValue: 'Dryer Vent Cleaning',
    shortSummary:
      'Complete lint extraction and exhaust pathway clearing to help prevent residential dryer fires and improve drying performance.',
    parentDescription:
      'Clogged dryer vents are a leading cause of house fires. Our dryer vent cleaning service removes lint buildup, reduces fire risk, and dramatically improves drying efficiency.',
    features: [
      'Complete lint removal',
      'Vent path obstruction check',
      'Fire hazard prevention',
    ],
    technicalFocus:
      'Full-run rotary clearing of compacted lint and exhaust blockages from appliance transition ducts to exterior louver terminations.',
    imageSrc: '/assets/images/editorial/heritage-interior.jpg',
    imageAlt:
      'Classical heritage residence interior featuring clean brass floor register and well-maintained indoor ventilation environment',
  },
  {
    id: 'commercial-cleaning',
    title: 'Commercial Cleaning',
    formOptionValue: 'Commercial HVAC Cleaning',
    shortSummary:
      'Scheduled and after-hours commercial HVAC duct cleaning for offices, restaurants, schools, and multi-unit facilities.',
    parentDescription:
      'Large-scale commercial HVAC cleaning for offices, restaurants, schools, and warehouses. We work around your schedule to minimize disruption and maximize clean air.',
    features: [
      'After-hours scheduling',
      'Multi-unit & large systems',
      'NADCA standard compliance',
    ],
    technicalFocus:
      'Coordinated commercial ventilation maintenance aligned with NADCA standards and off-peak operational schedules.',
    imageSrc: '/assets/images/editorial/commercial-ductwork.jpg',
    imageAlt:
      'Gleaming galvanized spiral HVAC ductwork and air distribution plenums in a clean commercial ceiling structure',
  },
];

export const PARENT_ADVANTAGES: readonly ParentAdvantage[] = [
  {
    id: 'same-day-service',
    number: '01',
    title: 'Same-Day Service',
    description:
      'We offer flexible same-day and next-day scheduling so your home gets fresh air fast — no waiting around for weeks.',
  },
  {
    id: 'upfront-pricing',
    number: '02',
    title: 'Upfront Pricing',
    description:
      "No surprise charges. We provide a clear, itemized quote before work begins. What you're quoted is exactly what you pay.",
  },
  {
    id: 'certified-experts',
    number: '03',
    title: 'Certified Experts',
    description:
      'All our HVAC technicians hold NADCA certification and undergo continuous training on the latest air quality standards and equipment.',
  },
  {
    id: 'satisfaction-guarantee',
    number: '04',
    title: '100% Satisfaction',
    description:
      "We back every air duct cleaning and HVAC cleaning job with our satisfaction guarantee. If you're not happy, we come back — free.",
  },
  {
    id: 'family-owned-local',
    number: '05',
    title: 'Family-Owned & Local',
    description:
      "We're your neighbors, not a faceless franchise. We treat every home like our own and take pride in serving our local community.",
  },
  {
    id: 'licensed-insured',
    number: '06',
    title: 'Fully Licensed & Insured',
    description:
      "Complete peace of mind: we carry full liability insurance and all required licenses so you're fully protected throughout the job.",
  },
];

export const PARENT_GALLERY_PAIRS: readonly GalleryPair[] = [
  {
    id: 'residential-duct',
    caption: 'Residential Air Duct Cleaning',
    category: 'Residential',
    beforeSrc: '/assets/images/gta/img3.jpeg',
    beforeAlt: 'Before: dirty, dusty air duct interior prior to extraction',
    afterSrc: '/assets/images/gta/residential-after.jpg',
    afterAlt: 'After: clean, sanitized air duct interior following service',
    afterFallbackSrc: '/assets/images/gta/img4.jpeg',
  },
  {
    id: 'commercial-hvac',
    caption: 'Commercial HVAC Cleaning',
    category: 'Commercial',
    beforeSrc: '/assets/images/gta/img5.jpeg',
    beforeAlt: 'Before: heavily soiled ductwork interior before cleaning',
    afterSrc: '/assets/images/gta/img6.jpeg',
    afterAlt: 'After: clear, clean ductwork interior after rotary extraction',
  },
  {
    id: 'dryer-vent',
    caption: 'Dryer Vent Cleaning',
    category: 'Dryer Vent',
    beforeSrc: '/assets/images/gta/img7.jpeg',
    beforeAlt: 'Before: obstructed ventilation assembly with accumulated buildup',
    afterSrc: '/assets/images/gta/img8.jpeg',
    afterAlt: 'After: clean, restored ventilation assembly with unobstructed airflow',
  },
];

export const PARENT_REVIEWS: readonly CustomerReview[] = [
  {
    id: 'sarah-m',
    initials: 'SM',
    author: 'Sarah M.',
    location: 'Toronto, ON',
    rating: 5,
    serviceTag: 'Air Duct Cleaning',
    quote:
      'Absolutely incredible service! The technician was professional, on time, and thorough. Our air quality has improved dramatically — my allergies are so much better. Highly recommend GTA Duct Masters for any duct cleaning needs!',
  },
  {
    id: 'james-r',
    initials: 'JR',
    author: 'James R.',
    location: 'Mississauga, ON',
    rating: 5,
    serviceTag: 'HVAC System Cleaning',
    quote:
      "I've tried two other HVAC cleaning companies before — GTA Duct Masters blows them both out of the water. They actually showed me before and after photos, explained every step, and the price was very fair. Will be using them annually!",
  },
  {
    id: 'linda-k',
    initials: 'LK',
    author: 'Linda K.',
    location: 'Brampton, ON',
    rating: 5,
    serviceTag: 'Dryer Vent Cleaning',
    quote:
      'Had my dryer vent cleaned and it was a fire hazard — packed with lint! The tech was super knowledgeable and showed me what he found. Dryer works like new now. Same-day appointment was a lifesaver. Thank you!',
  },
  {
    id: 'mike-d',
    initials: 'MD',
    author: 'Mike D.',
    location: 'Markham, ON',
    rating: 5,
    serviceTag: 'Commercial Cleaning',
    quote:
      'As a property manager overseeing 3 commercial buildings, I need reliable HVAC cleaning partners. GTA Duct Masters handles all three sites efficiently, on schedule, and their NADCA certification gives me confidence in the work quality.',
  },
  {
    id: 'angela-t',
    initials: 'AT',
    author: 'Angela T.',
    location: 'Vaughan, ON',
    rating: 5,
    serviceTag: 'Air Duct Cleaning',
    quote:
      'Called on a Monday morning, they were here by noon. The price was exactly what they quoted — no hidden charges. My home feels fresher and our furnace is running more efficiently already. Five stars all the way!',
  },
  {
    id: 'david-c',
    initials: 'DC',
    author: 'David C.',
    location: 'Richmond Hill, ON',
    rating: 5,
    serviceTag: 'Air Duct Cleaning',
    quote:
      'My kids have asthma and we noticed a huge improvement in their breathing after the air duct cleaning. Worth every penny. The team was respectful, wore shoe covers, and left the house spotless. Exceptional service.',
  },
];

export const PARENT_PAGES: readonly ParentPageMeta[] = [
  {
    slug: '',
    urlPath: '/',
    navLabel: 'Home',
    title: 'GTA Duct Masters | Air Duct Cleaning & HVAC Service',
    metaDescription:
      'Professional air duct cleaning, HVAC system cleaning, and dryer vent cleaning by NADCA-certified technicians. Same-day service and upfront flat-rate quotes.',
  },
  {
    slug: 'services',
    urlPath: '/services/',
    navLabel: 'Services',
    title: 'Duct & HVAC Cleaning Services | GTA Duct Masters',
    metaDescription:
      'Explore residential air duct cleaning, comprehensive HVAC coil & blower cleaning, fire-safe dryer vent clearing, and after-hours commercial HVAC services.',
  },
  {
    slug: 'about',
    urlPath: '/about/',
    navLabel: 'About',
    title: 'About GTA Duct Masters | 15+ Years of Certified Air Care',
    metaDescription:
      'Learn how GTA Duct Masters delivers NADCA-certified air duct and HVAC cleaning with HEPA negative air machines, licensed technicians, and upfront pricing.',
  },
  {
    slug: 'why-us',
    urlPath: '/why-us/',
    navLabel: 'Why Us',
    title: 'Why Choose GTA Duct Masters | Certified & Guaranteed',
    metaDescription:
      'Discover why homeowners and commercial managers choose GTA Duct Masters: same-day scheduling, itemized upfront quotes, NADCA experts, and full insurance.',
  },
  {
    slug: 'gallery',
    urlPath: '/gallery/',
    navLabel: 'Gallery',
    title: 'Before & After Duct Cleaning Gallery | GTA Duct Masters',
    metaDescription:
      'Inspect real before-and-after results from residential air duct cleaning, commercial HVAC ductwork maintenance, and dryer vent lint removal.',
  },
  {
    slug: 'reviews',
    urlPath: '/reviews/',
    navLabel: 'Reviews',
    title: 'Customer Reviews & Testimonials | GTA Duct Masters',
    metaDescription:
      'Read verified customer testimonials from homeowners and commercial property managers across Toronto, Mississauga, Brampton, Markham, Vaughan, and Richmond Hill.',
  },
  {
    slug: 'contact',
    urlPath: '/contact/',
    navLabel: 'Contact',
    title: 'Request a Free Quote | Contact GTA Duct Masters',
    metaDescription:
      'Request a free air duct or HVAC cleaning quote in 60 seconds. Call 647-557-6364, message on WhatsApp, or submit an online estimate inquiry 7 days a week.',
  },
];

/**
 * Exact 15 linked companies extracted verbatim from the reference image
 * (excluding the 3 crossed-out rows).
 */
export const LINKED_COMPANIES: readonly LinkedCompanyRecord[] = [
  {
    index: 1,
    exactName: 'Fresh Air Pros',
    slug: 'fresh-air-pros',
    homeUrl: '/fresh-air-pros/',
    aboutUrl: '/fresh-air-pros/about/',
  },
  {
    index: 2,
    exactName: 'True Ottawa Air CO.',
    slug: 'true-ottawa-air-co',
    homeUrl: '/true-ottawa-air-co/',
    aboutUrl: '/true-ottawa-air-co/about/',
  },
  {
    index: 3,
    exactName: 'FreshFlow Canada',
    slug: 'freshflow-canada',
    homeUrl: '/freshflow-canada/',
    aboutUrl: '/freshflow-canada/about/',
  },
  {
    index: 4,
    exactName: 'Canada StormForce',
    slug: 'canada-stormforce',
    homeUrl: '/canada-stormforce/',
    aboutUrl: '/canada-stormforce/about/',
  },
  {
    index: 5,
    exactName: 'ClearFlow Duct Care',
    slug: 'clearflow-duct-care',
    homeUrl: '/clearflow-duct-care/',
    aboutUrl: '/clearflow-duct-care/about/',
  },
  {
    index: 6,
    exactName: 'FreshBreathe Air Duct Co.',
    slug: 'freshbreathe-air-duct-co',
    homeUrl: '/freshbreathe-air-duct-co/',
    aboutUrl: '/freshbreathe-air-duct-co/about/',
  },
  {
    index: 7,
    exactName: 'FalconFlow Air Care',
    slug: 'falconflow-air-care',
    homeUrl: '/falconflow-air-care/',
    aboutUrl: '/falconflow-air-care/about/',
  },
  {
    index: 8,
    exactName: 'Alpine Home Care',
    slug: 'alpine-home-care',
    homeUrl: '/alpine-home-care/',
    aboutUrl: '/alpine-home-care/about/',
  },
  {
    index: 9,
    exactName: 'Pride Duct Cleaning',
    slug: 'pride-duct-cleaning',
    homeUrl: '/pride-duct-cleaning/',
    aboutUrl: '/pride-duct-cleaning/about/',
  },
  {
    index: 10,
    exactName: 'PureBreeze Duct Care',
    slug: 'purebreeze-duct-care',
    homeUrl: '/purebreeze-duct-care/',
    aboutUrl: '/purebreeze-duct-care/about/',
  },
  {
    index: 11,
    exactName: 'Ventrix DUCT CARE',
    slug: 'ventrix-duct-care',
    homeUrl: '/ventrix-duct-care/',
    aboutUrl: '/ventrix-duct-care/about/',
  },
  {
    index: 12,
    exactName: 'Northern Air Duct Cleaning',
    slug: 'northern-air-duct-cleaning',
    homeUrl: '/northern-air-duct-cleaning/',
    aboutUrl: '/northern-air-duct-cleaning/about/',
  },
  {
    index: 13,
    exactName: 'Trustora Duct Cleaning',
    slug: 'trustora-duct-cleaning',
    homeUrl: '/trustora-duct-cleaning/',
    aboutUrl: '/trustora-duct-cleaning/about/',
  },
  {
    index: 14,
    exactName: 'Ductoryn Air Solutions',
    slug: 'ductoryn-air-solutions',
    homeUrl: '/ductoryn-air-solutions/',
    aboutUrl: '/ductoryn-air-solutions/about/',
  },
  {
    index: 15,
    exactName: 'eliteductcanada',
    slug: 'eliteductcanada',
    homeUrl: '/eliteductcanada/',
    aboutUrl: '/eliteductcanada/about/',
  },
];

export const ALLOWED_COMPANY_NAMES: ReadonlySet<string> = new Set([
  'GTA Duct Masters',
  ...LINKED_COMPANIES.map((c) => c.exactName),
]);

export const ALLOWED_SERVICE_VALUES: ReadonlySet<string> = new Set([
  '',
  'General Service',
  'Air Duct Cleaning',
  'HVAC System Cleaning',
  'Dryer Vent Cleaning',
  'Commercial HVAC Cleaning',
  'Other',
]);

/**
 * Builds the exhaustive set of 37 clean public page URLs across the ecosystem:
 * - 7 parent website pages
 * - 30 linked company pages (15 Home + 15 About Us)
 */
export function getAllPublicPageUrls(): string[] {
  const urls: string[] = PARENT_PAGES.map((p) => p.urlPath);
  for (const company of LINKED_COMPANIES) {
    urls.push(company.homeUrl);
    urls.push(company.aboutUrl);
  }
  return urls;
}
