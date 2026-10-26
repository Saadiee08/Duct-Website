import { LINKED_COMPANIES, type LinkedCompanyRecord } from './verifiedData.ts';

export type HeaderVariant =
  | 'executive-bar'
  | 'centered-crest'
  | 'architectural-split'
  | 'minimal-monograph'
  | 'editorial-masthead'
  | 'atelier-double';

export type HeroVariant =
  | 'split-portrait'
  | 'panoramic-monograph'
  | 'fullbleed-framed'
  | 'pillar-blueprint'
  | 'arched-inset'
  | 'midnight-marquee'
  | 'stark-gallery'
  | 'craftsman-split'
  | 'broadsheet-lead'
  | 'stepped-architectural';

export type ServicesVariant =
  | 'editorial-ledger-2x2'
  | 'hairline-rows'
  | 'asymmetric-bento'
  | 'four-pillar-columns'
  | 'alternating-editorial'
  | 'dossier-cards'
  | 'numbered-index'
  | 'bookplate-grid'
  | 'broadsheet-salience'
  | 'tabular-directory';

export type AboutVariant =
  | 'asymmetric-monograph'
  | 'three-tier-institutional'
  | 'technical-spec-ledger'
  | 'dual-column-blueprint'
  | 'dropcap-margin-notes'
  | 'boardroom-letter'
  | 'gallery-catalog'
  | 'heritage-pullquote'
  | 'journal-two-column'
  | 'definition-archive';

export type FooterVariant =
  | 'classic-columns'
  | 'minimal-ledger'
  | 'dark-monument'
  | 'editorial-colophon'
  | 'atelier-split';

export type MotionProfile =
  | 'curtain-reveal'
  | 'whisper-stagger'
  | 'slide-mask'
  | 'geometric-wipe'
  | 'organic-settle'
  | 'line-rise'
  | 'monochrome-snap'
  | 'warm-ease'
  | 'page-leaf'
  | 'architectural-parallax';

export interface CompanyPalette {
  readonly canvas: string; // 60% dominant neutral field
  readonly surface: string; // 30% structural card/section surface
  readonly surfaceAlt: string; // Secondary structural contrast surface
  readonly ink: string; // Primary readable text (>= 4.5:1 on canvas/surface)
  readonly inkMuted: string; // Subdued prose/metadata text (>= 4.5:1 on canvas)
  readonly primary: string; // Primary classical brand anchor
  readonly primaryFg: string; // Text on primary button/surface
  readonly accent: string; // 10% refined classical accent
  readonly border: string; // Subtle hairline border
  readonly heroBg: string; // Hero backdrop surface
  readonly heroFg: string; // Hero foreground text
  readonly heroMuted: string; // Hero secondary copy
  readonly footerBg: string; // Footer backdrop
  readonly footerFg: string; // Footer primary text
  readonly footerMuted: string; // Footer muted text
}

export interface CompanyTypography {
  readonly googleFontsUrl: string;
  readonly displayFamily: string;
  readonly bodyFamily: string;
  readonly displayWeight: number;
  readonly wordmarkStyle: 'serif-title' | 'tracked-caps' | 'italic-crest' | 'exact-case';
  readonly radiusScale: 'sharp' | 'tailored' | 'soft-classic' | 'arched';
}

export interface CompanyTheme {
  readonly company: LinkedCompanyRecord;
  readonly themeName: string;
  readonly palette: CompanyPalette;
  readonly typography: CompanyTypography;
  readonly headerVariant: HeaderVariant;
  readonly heroVariant: HeroVariant;
  readonly servicesVariant: ServicesVariant;
  readonly aboutVariant: AboutVariant;
  readonly footerVariant: FooterVariant;
  readonly motionProfile: MotionProfile;
  readonly heroImage: string;
  readonly heroImageAlt: string;
  readonly secondaryImage: string;
  readonly secondaryImageAlt: string;
  readonly aboutImage: string;
  readonly aboutImageAlt: string;
  readonly imageFilterCss: string;
  readonly homeHeadline: string;
  readonly homeIntroduction: string;
  readonly aboutHeadline: string;
  readonly aboutIntroduction: string;
  readonly methodologyStatement: string;
}

const EDITORIAL_IMG = {
  luxuryResidence: '/assets/images/editorial/luxury-residence-air.jpg',
  commercialDuctwork: '/assets/images/editorial/commercial-ductwork.jpg',
  heritageInterior: '/assets/images/editorial/heritage-interior.jpg',
  hepaVentilation: '/assets/images/editorial/hepa-ventilation.jpg',
  cleanAirAtrium: '/assets/images/editorial/clean-air-atrium.jpg',
} as const;

export const COMPANY_THEMES: readonly CompanyTheme[] = [
  {
    company: LINKED_COMPANIES[0]!, // 1. Fresh Air Pros
    themeName: 'Timeless Corporate Luxury',
    palette: {
      canvas: '#FAF8F3',
      surface: '#FFFFFF',
      surfaceAlt: '#F1ECE1',
      ink: '#0F223D',
      inkMuted: '#475569',
      primary: '#0F223D',
      primaryFg: '#FAF8F3',
      accent: '#9A7432',
      border: '#DFD7C8',
      heroBg: '#0F223D',
      heroFg: '#FAF8F3',
      heroMuted: '#CBD5E1',
      footerBg: '#0A182B',
      footerFg: '#FAF8F3',
      footerMuted: '#94A3B8',
    },
    typography: {
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
      displayFamily: "'Playfair Display', Georgia, serif",
      bodyFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      displayWeight: 600,
      wordmarkStyle: 'serif-title',
      radiusScale: 'tailored',
    },
    headerVariant: 'executive-bar',
    heroVariant: 'split-portrait',
    servicesVariant: 'editorial-ledger-2x2',
    aboutVariant: 'asymmetric-monograph',
    footerVariant: 'dark-monument',
    motionProfile: 'curtain-reveal',
    heroImage: EDITORIAL_IMG.luxuryResidence,
    heroImageAlt:
      'Classical living room with integrated linear air diffusers and clean natural light',
    secondaryImage: EDITORIAL_IMG.hepaVentilation,
    secondaryImageAlt:
      'Clean commercial HVAC air handler coil and pleated HEPA filtration assembly',
    aboutImage: EDITORIAL_IMG.cleanAirAtrium,
    aboutImageAlt:
      'Architectural glass atrium with clean linear air distribution diffusers',
    imageFilterCss: 'contrast(1.03) saturate(0.96)',
    homeHeadline: 'Disciplined Air Duct & HVAC Care for Healthy Interiors',
    homeIntroduction:
      'Fresh Air Pros delivers thorough residential and commercial air duct cleaning, HVAC system cleaning, and dryer vent maintenance with clear upfront communication.',
    aboutHeadline: 'Committed to Clean Indoor Air & Mechanical Care',
    aboutIntroduction:
      'Fresh Air Pros provides dedicated ventilation and HVAC cleaning services designed to remove accumulated dust, debris, and airflow obstructions across residential and commercial properties.',
    methodologyStatement:
      'Every appointment focuses on systematic duct inspection, high-powered vacuum extraction, mechanical coil and blower care, and clear post-service walkthroughs.',
  },
  {
    company: LINKED_COMPANIES[1]!, // 2. True Ottawa Air CO.
    themeName: 'Sophisticated Minimalism',
    palette: {
      canvas: '#FFFFFF',
      surface: '#F7F4ED',
      surfaceAlt: '#EFEAE0',
      ink: '#1E2022',
      inkMuted: '#52575C',
      primary: '#1E2022',
      primaryFg: '#FFFFFF',
      accent: '#8A6D3B',
      border: '#E4DEC9',
      heroBg: '#F7F4ED',
      heroFg: '#1E2022',
      heroMuted: '#4A4E53',
      footerBg: '#181A1C',
      footerFg: '#F7F4ED',
      footerMuted: '#A3A8AE',
    },
    typography: {
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@400;500;600&display=swap',
      displayFamily: "'Cormorant Garamond', Georgia, serif",
      bodyFamily: "'DM Sans', system-ui, sans-serif",
      displayWeight: 600,
      wordmarkStyle: 'exact-case',
      radiusScale: 'sharp',
    },
    headerVariant: 'minimal-monograph',
    heroVariant: 'panoramic-monograph',
    servicesVariant: 'hairline-rows',
    aboutVariant: 'three-tier-institutional',
    footerVariant: 'minimal-ledger',
    motionProfile: 'whisper-stagger',
    heroImage: EDITORIAL_IMG.cleanAirAtrium,
    heroImageAlt:
      'Bright architectural interior with clean ceiling ventilation diffusers and natural daylight',
    secondaryImage: EDITORIAL_IMG.luxuryResidence,
    secondaryImageAlt:
      'Refined residential room with unobtrusive architectural air supply vents',
    aboutImage: EDITORIAL_IMG.hepaVentilation,
    aboutImageAlt:
      'Immaculate HVAC evaporator coil and high-efficiency filtration housing',
    imageFilterCss: 'contrast(1.02) saturate(0.9)',
    homeHeadline: 'Quiet Precision in Residential & Commercial Ventilation Cleaning',
    homeIntroduction:
      'True Ottawa Air CO. provides methodical air duct cleaning, HVAC system cleaning, dryer vent clearing, and commercial ductwork maintenance.',
    aboutHeadline: 'A Calm, Methodical Standard for Indoor Air Hygiene',
    aboutIntroduction:
      'True Ottawa Air CO. approaches indoor air care with clarity and restraint—removing particulate buildup, lint hazards, and HVAC system fouling without disruption to your property.',
    methodologyStatement:
      'From initial register inspection through negative-pressure vacuum extraction and dryer exhaust clearing, each step prioritizes cleanliness and unobstructed airflow.',
  },
  {
    company: LINKED_COMPANIES[2]!, // 3. FreshFlow Canada
    themeName: 'Premium Industrial Heritage',
    palette: {
      canvas: '#F6F2EA',
      surface: '#FFFFFF',
      surfaceAlt: '#EAE3D5',
      ink: '#23272A',
      inkMuted: '#4F565D',
      primary: '#23272A',
      primaryFg: '#F6F2EA',
      accent: '#9E5422',
      border: '#D8CFC0',
      heroBg: '#1D2023',
      heroFg: '#F6F2EA',
      heroMuted: '#CBD0D6',
      footerBg: '#171A1C',
      footerFg: '#F6F2EA',
      footerMuted: '#9EA5AD',
    },
    typography: {
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Public+Sans:wght@400;500;600&display=swap',
      displayFamily: "'Playfair Display', Georgia, serif",
      bodyFamily: "'Public Sans', system-ui, sans-serif",
      displayWeight: 600,
      wordmarkStyle: 'tracked-caps',
      radiusScale: 'sharp',
    },
    headerVariant: 'architectural-split',
    heroVariant: 'fullbleed-framed',
    servicesVariant: 'asymmetric-bento',
    aboutVariant: 'technical-spec-ledger',
    footerVariant: 'dark-monument',
    motionProfile: 'slide-mask',
    heroImage: EDITORIAL_IMG.commercialDuctwork,
    heroImageAlt:
      'Galvanized spiral HVAC ductwork and air distribution plenums in a clean commercial structure',
    secondaryImage: EDITORIAL_IMG.hepaVentilation,
    secondaryImageAlt:
      'Precision-cleaned aluminum HVAC coil and pleated filtration unit',
    aboutImage: EDITORIAL_IMG.heritageInterior,
    aboutImageAlt:
      'Classical wood-paneled interior with clean brass ventilation register',
    imageFilterCss: 'contrast(1.06) sepia(0.06)',
    homeHeadline: 'Engineered Airflow Restoration & Complete Duct Maintenance',
    homeIntroduction:
      'FreshFlow Canada delivers comprehensive air duct cleaning, HVAC coil and blower maintenance, dryer vent lint extraction, and commercial ventilation service.',
    aboutHeadline: 'Built Around Mechanical Integrity & Clean Airflow',
    aboutIntroduction:
      'FreshFlow Canada serves homeowners and commercial facilities seeking thorough mechanical cleaning across supply trunks, return air plenums, HVAC coils, and dryer exhaust runs.',
    methodologyStatement:
      'Our technicians combine full-system visual assessment with high-suction extraction and targeted coil, blower, and vent path maintenance.',
  },
  {
    company: LINKED_COMPANIES[3]!, // 4. Canada StormForce
    themeName: 'Architectural Elegance',
    palette: {
      canvas: '#F8FAFC',
      surface: '#FFFFFF',
      surfaceAlt: '#E9EFF5',
      ink: '#152842',
      inkMuted: '#475569',
      primary: '#1E3A5F',
      primaryFg: '#FFFFFF',
      accent: '#3B5B85',
      border: '#CBD5E1',
      heroBg: '#152842',
      heroFg: '#F8FAFC',
      heroMuted: '#CBD5E1',
      footerBg: '#0F1E33',
      footerFg: '#F8FAFC',
      footerMuted: '#94A3B8',
    },
    typography: {
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap',
      displayFamily: "'Barlow Condensed', system-ui, sans-serif",
      bodyFamily: "'Manrope', system-ui, sans-serif",
      displayWeight: 600,
      wordmarkStyle: 'tracked-caps',
      radiusScale: 'tailored',
    },
    headerVariant: 'executive-bar',
    heroVariant: 'pillar-blueprint',
    servicesVariant: 'four-pillar-columns',
    aboutVariant: 'dual-column-blueprint',
    footerVariant: 'classic-columns',
    motionProfile: 'geometric-wipe',
    heroImage: EDITORIAL_IMG.commercialDuctwork,
    heroImageAlt:
      'Symmetric commercial HVAC spiral ductwork and clean overhead air plenums',
    secondaryImage: EDITORIAL_IMG.cleanAirAtrium,
    secondaryImageAlt:
      'Modern commercial glass atrium with architectural supply air diffusers',
    aboutImage: EDITORIAL_IMG.hepaVentilation,
    aboutImageAlt:
      'Clean commercial HVAC air handler interior with HEPA filter frame',
    imageFilterCss: 'contrast(1.04) saturate(0.92)',
    homeHeadline: 'High-Capacity Air Duct & HVAC System Cleaning Solutions',
    homeIntroduction:
      'Canada StormForce provides dependable air duct extraction, complete HVAC system cleaning, dryer vent hazard clearing, and commercial ventilation service.',
    aboutHeadline: 'Structured Ventilation Care for Homes & Commercial Properties',
    aboutIntroduction:
      'Canada StormForce focuses on restoring clean, unrestricted airflow throughout residential duct networks, heating and cooling equipment, and commercial ventilation systems.',
    methodologyStatement:
      'We inspect every accessible trunk and register, extract settled debris under controlled negative pressure, and clear critical dryer and HVAC pathways.',
  },
  {
    company: LINKED_COMPANIES[4]!, // 5. ClearFlow Duct Care
    themeName: 'Refined Natural Classic',
    palette: {
      canvas: '#F5F2EB',
      surface: '#FCFBF8',
      surfaceAlt: '#EAE4D7',
      ink: '#163828',
      inkMuted: '#4A5950',
      primary: '#163828',
      primaryFg: '#FAF8F4',
      accent: '#825832',
      border: '#D6CFC0',
      heroBg: '#F5F2EB',
      heroFg: '#163828',
      heroMuted: '#3E5146',
      footerBg: '#112B1F',
      footerFg: '#F5F2EB',
      footerMuted: '#A5B8AE',
    },
    typography: {
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap',
      displayFamily: "'Fraunces', Georgia, serif",
      bodyFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      displayWeight: 600,
      wordmarkStyle: 'serif-title',
      radiusScale: 'arched',
    },
    headerVariant: 'centered-crest',
    heroVariant: 'arched-inset',
    servicesVariant: 'alternating-editorial',
    aboutVariant: 'dropcap-margin-notes',
    footerVariant: 'atelier-split',
    motionProfile: 'organic-settle',
    heroImage: EDITORIAL_IMG.luxuryResidence,
    heroImageAlt:
      'Sunlit classical living room enjoying clean indoor air circulation',
    secondaryImage: EDITORIAL_IMG.heritageInterior,
    secondaryImageAlt:
      'Warm residential room with clean floor ventilation grille and natural light',
    aboutImage: EDITORIAL_IMG.cleanAirAtrium,
    aboutImageAlt:
      'Daylit interior atrium with clean acoustic ceiling and air diffusers',
    imageFilterCss: 'contrast(1.02) saturate(0.95)',
    homeHeadline: 'Breathe Easier with Thoughtful Duct & Ventilation Care',
    homeIntroduction:
      'ClearFlow Duct Care delivers attentive residential air duct cleaning, HVAC coil and blower cleaning, dryer vent clearing, and commercial air system maintenance.',
    aboutHeadline: 'Dedicated to Clean, Comfortable Indoor Environments',
    aboutIntroduction:
      'ClearFlow Duct Care helps homeowners and facility managers eliminate trapped dust, lint buildup, and airborne particulates from essential heating and cooling pathways.',
    methodologyStatement:
      'By pairing careful system inspection with thorough vacuum extraction and mechanical component cleaning, we support healthier indoor air circulation.',
  },
  {
    company: LINKED_COMPANIES[5]!, // 6. FreshBreathe Air Duct Co.
    themeName: 'Executive Business Luxury',
    palette: {
      canvas: '#F7F8FA',
      surface: '#FFFFFF',
      surfaceAlt: '#ECEFF4',
      ink: '#0A1628',
      inkMuted: '#4B5563',
      primary: '#0A1628',
      primaryFg: '#F7F8FA',
      accent: '#9C7834',
      border: '#D5DCE6',
      heroBg: '#0A1628',
      heroFg: '#F7F8FA',
      heroMuted: '#CBD5E1',
      footerBg: '#07101E',
      footerFg: '#F7F8FA',
      footerMuted: '#94A3B8',
    },
    typography: {
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,500;0,6..96,600;0,6..96,700;1,6..96,500&family=DM+Sans:wght@400;500;600&display=swap',
      displayFamily: "'Bodoni Moda', Georgia, serif",
      bodyFamily: "'DM Sans', system-ui, sans-serif",
      displayWeight: 600,
      wordmarkStyle: 'exact-case',
      radiusScale: 'sharp',
    },
    headerVariant: 'atelier-double',
    heroVariant: 'midnight-marquee',
    servicesVariant: 'dossier-cards',
    aboutVariant: 'boardroom-letter',
    footerVariant: 'dark-monument',
    motionProfile: 'line-rise',
    heroImage: EDITORIAL_IMG.heritageInterior,
    heroImageAlt:
      'Refined classical interior with tailored millwork and clean ventilation register',
    secondaryImage: EDITORIAL_IMG.luxuryResidence,
    secondaryImageAlt:
      'Classical living room with concealed linear ceiling air diffusers',
    aboutImage: EDITORIAL_IMG.hepaVentilation,
    aboutImageAlt:
      'Spotless HVAC air handler coil and HEPA filtration assembly',
    imageFilterCss: 'contrast(1.05) saturate(0.94)',
    homeHeadline: 'Executive-Grade Air Duct & HVAC System Maintenance',
    homeIntroduction:
      'FreshBreathe Air Duct Co. provides comprehensive air duct cleaning, HVAC system cleaning, dryer vent lint removal, and scheduled commercial ductwork care.',
    aboutHeadline: 'Uncompromising Attention to Indoor Air & Ductwork Hygiene',
    aboutIntroduction:
      'FreshBreathe Air Duct Co. serves residential and commercial clients with structured duct inspection, high-powered particulate extraction, and complete HVAC component care.',
    methodologyStatement:
      'Each service visit addresses the full airflow path—from supply and return trunks to coils, blowers, filters, and dryer exhaust lines.',
  },
  {
    company: LINKED_COMPANIES[6]!, // 7. FalconFlow Air Care
    themeName: 'Elegant Monochrome',
    palette: {
      canvas: '#FFFFFF',
      surface: '#F5F5F5',
      surfaceAlt: '#EBEBEB',
      ink: '#111111',
      inkMuted: '#525252',
      primary: '#111111',
      primaryFg: '#FFFFFF',
      accent: '#3F3F46',
      border: '#E0E0E0',
      heroBg: '#FFFFFF',
      heroFg: '#111111',
      heroMuted: '#4B4B4B',
      footerBg: '#111111',
      footerFg: '#FAFAFA',
      footerMuted: '#A3A3A3',
    },
    typography: {
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Manrope:wght@400;500;600&display=swap',
      displayFamily: "'Playfair Display', Georgia, serif",
      bodyFamily: "'Manrope', system-ui, sans-serif",
      displayWeight: 600,
      wordmarkStyle: 'serif-title',
      radiusScale: 'sharp',
    },
    headerVariant: 'minimal-monograph',
    heroVariant: 'stark-gallery',
    servicesVariant: 'numbered-index',
    aboutVariant: 'gallery-catalog',
    footerVariant: 'minimal-ledger',
    motionProfile: 'monochrome-snap',
    heroImage: EDITORIAL_IMG.commercialDuctwork,
    heroImageAlt:
      'Architectural HVAC spiral ductwork photographed in crisp monochrome contrast',
    secondaryImage: EDITORIAL_IMG.hepaVentilation,
    secondaryImageAlt:
      'Precision aluminum HVAC coil fins and clean filtration housing',
    aboutImage: EDITORIAL_IMG.cleanAirAtrium,
    aboutImageAlt:
      'Contemporary glass atrium with crisp architectural air supply vents',
    imageFilterCss: 'grayscale(0.88) contrast(1.08)',
    homeHeadline: 'Pure Airflow Through Disciplined Duct & HVAC Cleaning',
    homeIntroduction:
      'FalconFlow Air Care delivers focused air duct cleaning, HVAC coil and blower restoration, dryer vent cleaning, and commercial ventilation service.',
    aboutHeadline: 'Clarity, Precision & Complete Ventilation Care',
    aboutIntroduction:
      'FalconFlow Air Care eliminates unnecessary complexity—delivering thorough mechanical cleaning across residential ductwork, HVAC assemblies, dryer vents, and commercial air systems.',
    methodologyStatement:
      'Every project follows an orderly protocol: system inspection, negative-air vacuum extraction, targeted component cleaning, and final airflow verification.',
  },
  {
    company: LINKED_COMPANIES[7]!, // 8. Alpine Home Care
    themeName: 'Warm Heritage Design',
    palette: {
      canvas: '#FAF6F0',
      surface: '#FFFFFF',
      surfaceAlt: '#F0E8DC',
      ink: '#2B1E19',
      inkMuted: '#5C4B43',
      primary: '#2B1E19',
      primaryFg: '#FAF6F0',
      accent: '#8F6526',
      border: '#DFD3C3',
      heroBg: '#FAF6F0',
      heroFg: '#2B1E19',
      heroMuted: '#524139',
      footerBg: '#221713',
      footerFg: '#FAF6F0',
      footerMuted: '#B8A99E',
    },
    typography: {
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap',
      displayFamily: "'Cormorant Garamond', Georgia, serif",
      bodyFamily: "'Lora', Georgia, serif",
      displayWeight: 600,
      wordmarkStyle: 'serif-title',
      radiusScale: 'soft-classic',
    },
    headerVariant: 'centered-crest',
    heroVariant: 'craftsman-split',
    servicesVariant: 'bookplate-grid',
    aboutVariant: 'heritage-pullquote',
    footerVariant: 'editorial-colophon',
    motionProfile: 'warm-ease',
    heroImage: EDITORIAL_IMG.heritageInterior,
    heroImageAlt:
      'Warm heritage living room with wood paneling, limestone hearth, and clean brass floor vent',
    secondaryImage: EDITORIAL_IMG.luxuryResidence,
    secondaryImageAlt:
      'Sunlit residential room with coffered ceiling and clean air diffusers',
    aboutImage: EDITORIAL_IMG.hepaVentilation,
    aboutImageAlt:
      'Clean HVAC air handling coil and high-efficiency filter frame',
    imageFilterCss: 'contrast(1.03) sepia(0.08)',
    homeHeadline: 'Attentive Air Duct, Dryer Vent & HVAC Care for Every Home',
    homeIntroduction:
      'Alpine Home Care provides conscientious air duct cleaning, complete HVAC system cleaning, dryer vent lint removal, and commercial ventilation maintenance.',
    aboutHeadline: 'Respectful Craftsmanship in Residential & Commercial Air Care',
    aboutIntroduction:
      'Alpine Home Care treats every property with care—removing settled dust, allergens, and lint obstructions from ductwork, heating and cooling systems, and dryer exhaust lines.',
    methodologyStatement:
      'Our technicians combine thorough inspection, controlled vacuum extraction, and careful HVAC and dryer vent maintenance with transparent communication.',
  },
  {
    company: LINKED_COMPANIES[8]!, // 9. Pride Duct Cleaning
    themeName: 'Premium Editorial Classic',
    palette: {
      canvas: '#FBF8F3',
      surface: '#FFFFFF',
      surfaceAlt: '#F2ECE2',
      ink: '#221F20',
      inkMuted: '#575052',
      primary: '#581C28',
      primaryFg: '#FBF8F3',
      accent: '#581C28',
      border: '#DED5C8',
      heroBg: '#FBF8F3',
      heroFg: '#221F20',
      heroMuted: '#4E4749',
      footerBg: '#241418',
      footerFg: '#FBF8F3',
      footerMuted: '#BCAEB1',
    },
    typography: {
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400&display=swap',
      displayFamily: "'Fraunces', Georgia, serif",
      bodyFamily: "'Source Serif 4', Georgia, serif",
      displayWeight: 600,
      wordmarkStyle: 'serif-title',
      radiusScale: 'sharp',
    },
    headerVariant: 'editorial-masthead',
    heroVariant: 'broadsheet-lead',
    servicesVariant: 'broadsheet-salience',
    aboutVariant: 'journal-two-column',
    footerVariant: 'editorial-colophon',
    motionProfile: 'page-leaf',
    heroImage: EDITORIAL_IMG.luxuryResidence,
    heroImageAlt:
      'Editorial classical living space with clean architectural ventilation diffusers',
    secondaryImage: EDITORIAL_IMG.commercialDuctwork,
    secondaryImageAlt:
      'Clean commercial spiral HVAC ductwork and air distribution plenums',
    aboutImage: EDITORIAL_IMG.heritageInterior,
    aboutImageAlt:
      'Classical heritage residence interior with clean brass ventilation grille',
    imageFilterCss: 'contrast(1.03) saturate(0.95)',
    homeHeadline: 'Thorough Air Duct & HVAC Cleaning Done with Pride',
    homeIntroduction:
      'Pride Duct Cleaning delivers dependable residential air duct cleaning, HVAC coil and blower care, dryer vent fire-hazard clearing, and commercial HVAC maintenance.',
    aboutHeadline: 'Principled Standards in Ductwork & Ventilation Hygiene',
    aboutIntroduction:
      'Pride Duct Cleaning focuses on the fundamentals that matter: thorough inspection, powerful particulate extraction, clean coils and blowers, and clear dryer exhaust pathways.',
    methodologyStatement:
      'Whether servicing a family home or a multi-unit commercial property, we maintain orderly workspaces and upfront service standards.',
  },
  {
    company: LINKED_COMPANIES[9]!, // 10. PureBreeze Duct Care
    themeName: 'Modern Architectural Luxury',
    palette: {
      canvas: '#FFFFFF',
      surface: '#F4F7FA',
      surfaceAlt: '#E8EDF2',
      ink: '#13293D',
      inkMuted: '#4A5D70',
      primary: '#1B4965',
      primaryFg: '#FFFFFF',
      accent: '#2C6E91',
      border: '#D4DEE8',
      heroBg: '#F4F7FA',
      heroFg: '#13293D',
      heroMuted: '#415568',
      footerBg: '#0E2030',
      footerFg: '#F4F7FA',
      footerMuted: '#96AABF',
    },
    typography: {
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Public+Sans:wght@400;500;600&display=swap',
      displayFamily: "'Outfit', system-ui, sans-serif",
      bodyFamily: "'Public Sans', system-ui, sans-serif",
      displayWeight: 600,
      wordmarkStyle: 'serif-title',
      radiusScale: 'tailored',
    },
    headerVariant: 'architectural-split',
    heroVariant: 'stepped-architectural',
    servicesVariant: 'asymmetric-bento',
    aboutVariant: 'dual-column-blueprint',
    footerVariant: 'classic-columns',
    motionProfile: 'architectural-parallax',
    heroImage: EDITORIAL_IMG.cleanAirAtrium,
    heroImageAlt:
      'Modern sunlit glass atrium with clean white architectural supply air diffusers',
    secondaryImage: EDITORIAL_IMG.hepaVentilation,
    secondaryImageAlt:
      'Clean HVAC evaporator coil and pleated HEPA filtration frame',
    aboutImage: EDITORIAL_IMG.commercialDuctwork,
    aboutImageAlt:
      'Immaculate commercial galvanized HVAC ductwork installation',
    imageFilterCss: 'contrast(1.03) saturate(0.98)',
    homeHeadline: 'Clean Architectural Airflow for Homes & Commercial Spaces',
    homeIntroduction:
      'PureBreeze Duct Care specializes in professional air duct cleaning, complete HVAC system cleaning, dryer vent lint extraction, and commercial ventilation care.',
    aboutHeadline: 'Precision Care for Modern Heating, Cooling & Duct Systems',
    aboutIntroduction:
      'PureBreeze Duct Care supports healthier indoor environments through systematic duct cleaning, HVAC coil and blower maintenance, and dryer exhaust clearing.',
    methodologyStatement:
      'Our process addresses accumulated dust, debris, and airflow bottlenecks across residential and commercial ventilation infrastructure.',
  },
  {
    company: LINKED_COMPANIES[10]!, // 11. Ventrix DUCT CARE
    themeName: 'Minimalist Traditional Elegance',
    palette: {
      canvas: '#F4F1EA',
      surface: '#FAF8F4',
      surfaceAlt: '#E6E0D3',
      ink: '#232B22',
      inkMuted: '#515A4F',
      primary: '#2F3E2E',
      primaryFg: '#F4F1EA',
      accent: '#5C4033',
      border: '#D3CCB9',
      heroBg: '#2F3E2E',
      heroFg: '#F4F1EA',
      heroMuted: '#D2D8D0',
      footerBg: '#1E281D',
      footerFg: '#F4F1EA',
      footerMuted: '#A8B2A6',
    },
    typography: {
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@400;500;600&display=swap',
      displayFamily: "'Cormorant Garamond', Georgia, serif",
      bodyFamily: "'DM Sans', system-ui, sans-serif",
      displayWeight: 600,
      wordmarkStyle: 'exact-case',
      radiusScale: 'sharp',
    },
    headerVariant: 'executive-bar',
    heroVariant: 'panoramic-monograph',
    servicesVariant: 'tabular-directory',
    aboutVariant: 'definition-archive',
    footerVariant: 'minimal-ledger',
    motionProfile: 'whisper-stagger',
    heroImage: EDITORIAL_IMG.commercialDuctwork,
    heroImageAlt:
      'Precision commercial spiral ductwork and clean ventilation plenums',
    secondaryImage: EDITORIAL_IMG.heritageInterior,
    secondaryImageAlt:
      'Traditional wood-paneled interior with clean brass ventilation grille',
    aboutImage: EDITORIAL_IMG.hepaVentilation,
    aboutImageAlt:
      'Spotless commercial HVAC air handler coil and filtration housing',
    imageFilterCss: 'contrast(1.04) saturate(0.88)',
    homeHeadline: 'Structured Ductwork & HVAC Maintenance Without Compromise',
    homeIntroduction:
      'Ventrix DUCT CARE provides complete air duct cleaning, HVAC coil and blower cleaning, dryer vent lint removal, and commercial HVAC ductwork maintenance.',
    aboutHeadline: 'Orderly Methodology for Residential & Commercial Duct Care',
    aboutIntroduction:
      'Ventrix DUCT CARE delivers dependable mechanical hygiene across air ducts, heating and cooling components, and dryer exhaust conduits.',
    methodologyStatement:
      'Every service engagement covers inspection, high-powered vacuum extraction, targeted component cleaning, and practical scheduling.',
  },
  {
    company: LINKED_COMPANIES[11]!, // 12. Northern Air Duct Cleaning
    themeName: 'Refined Commercial Premium',
    palette: {
      canvas: '#F9F8F4',
      surface: '#FFFFFF',
      surfaceAlt: '#ECEAE2',
      ink: '#0F2E2F',
      inkMuted: '#495E5F',
      primary: '#0F3D3E',
      primaryFg: '#F9F8F4',
      accent: '#A4552B',
      border: '#D5D2C6',
      heroBg: '#0F3D3E',
      heroFg: '#F9F8F4',
      heroMuted: '#CBE0E0',
      footerBg: '#0A2728',
      footerFg: '#F9F8F4',
      footerMuted: '#99B5B6',
    },
    typography: {
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Public+Sans:wght@400;500;600&display=swap',
      displayFamily: "'Playfair Display', Georgia, serif",
      bodyFamily: "'Public Sans', system-ui, sans-serif",
      displayWeight: 600,
      wordmarkStyle: 'serif-title',
      radiusScale: 'tailored',
    },
    headerVariant: 'architectural-split',
    heroVariant: 'split-portrait',
    servicesVariant: 'broadsheet-salience',
    aboutVariant: 'technical-spec-ledger',
    footerVariant: 'dark-monument',
    motionProfile: 'curtain-reveal',
    heroImage: EDITORIAL_IMG.cleanAirAtrium,
    heroImageAlt:
      'Spacious commercial atrium with clean ceiling supply air diffusers',
    secondaryImage: EDITORIAL_IMG.commercialDuctwork,
    secondaryImageAlt:
      'Galvanized commercial HVAC trunk lines and distribution plenums',
    aboutImage: EDITORIAL_IMG.luxuryResidence,
    aboutImageAlt:
      'Classical residential room with clean architectural ceiling vents',
    imageFilterCss: 'contrast(1.04) saturate(0.95)',
    homeHeadline: 'Dependable Air Duct & HVAC Cleaning Across Every Season',
    homeIntroduction:
      'Northern Air Duct Cleaning delivers thorough residential air duct cleaning, complete HVAC system cleaning, dryer vent clearing, and commercial ventilation care.',
    aboutHeadline: 'Built for Year-Round Heating, Cooling & Ventilation Performance',
    aboutIntroduction:
      'Northern Air Duct Cleaning helps homeowners and commercial operators keep ductwork, coils, blowers, and dryer vents clean through demanding heating and cooling cycles.',
    methodologyStatement:
      'Our technicians remove settled dust, lint, and particulate buildup using controlled extraction and comprehensive system checks.',
  },
  {
    company: LINKED_COMPANIES[12]!, // 13. Trustora Duct Cleaning
    themeName: 'Sophisticated Contemporary Classic',
    palette: {
      canvas: '#FFFFFF',
      surface: '#F6F3EC',
      surfaceAlt: '#EAE3D5',
      ink: '#22252A',
      inkMuted: '#535861',
      primary: '#22252A',
      primaryFg: '#FFFFFF',
      accent: '#7C5832',
      border: '#DFD8C8',
      heroBg: '#EAE3D5',
      heroFg: '#22252A',
      heroMuted: '#494E56',
      footerBg: '#191C20',
      footerFg: '#F6F3EC',
      footerMuted: '#A1A6B0',
    },
    typography: {
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=Lora:ital,wght@0,400;0,500;1,400&display=swap',
      displayFamily: "'Bricolage Grotesque', system-ui, sans-serif",
      bodyFamily: "'Lora', Georgia, serif",
      displayWeight: 600,
      wordmarkStyle: 'serif-title',
      radiusScale: 'soft-classic',
    },
    headerVariant: 'minimal-monograph',
    heroVariant: 'craftsman-split',
    servicesVariant: 'alternating-editorial',
    aboutVariant: 'asymmetric-monograph',
    footerVariant: 'atelier-split',
    motionProfile: 'organic-settle',
    heroImage: EDITORIAL_IMG.luxuryResidence,
    heroImageAlt:
      'Warm sunlit residential room with clean integrated air supply diffusers',
    secondaryImage: EDITORIAL_IMG.hepaVentilation,
    secondaryImageAlt:
      'Immaculate HVAC evaporator coil and pleated HEPA filtration frame',
    aboutImage: EDITORIAL_IMG.heritageInterior,
    aboutImageAlt:
      'Classical interior featuring tailored woodwork and clean floor register',
    imageFilterCss: 'contrast(1.02) saturate(0.96)',
    homeHeadline: 'Transparent, Thorough Air Duct & Ventilation Cleaning',
    homeIntroduction:
      'Trustora Duct Cleaning provides honest, detail-oriented air duct cleaning, HVAC system cleaning, dryer vent lint removal, and commercial ductwork service.',
    aboutHeadline: 'Clarity and Care in Every Ventilation Appointment',
    aboutIntroduction:
      'Trustora Duct Cleaning was established around straightforward communication and thorough mechanical cleaning for residential and commercial ventilation systems.',
    methodologyStatement:
      'From full duct inspection and vacuum extraction to coil, blower, and dryer exhaust cleaning, every step is clear and verifiable.',
  },
  {
    company: LINKED_COMPANIES[13]!, // 14. Ductoryn Air Solutions
    themeName: 'Timeless Luxury Aesthetic',
    palette: {
      canvas: '#FAF7F0',
      surface: '#FFFFFF',
      surfaceAlt: '#EFE9DC',
      ink: '#0D2B22',
      inkMuted: '#475B54',
      primary: '#0D3B2E',
      primaryFg: '#FAF7F0',
      accent: '#9E7B2F',
      border: '#DCD4C2',
      heroBg: '#0D3B2E',
      heroFg: '#FAF7F0',
      heroMuted: '#CDE0DA',
      footerBg: '#08261D',
      footerFg: '#FAF7F0',
      footerMuted: '#99B5AC',
    },
    typography: {
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,500;0,6..96,600;0,6..96,700;1,6..96,500&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap',
      displayFamily: "'Bodoni Moda', Georgia, serif",
      bodyFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      displayWeight: 600,
      wordmarkStyle: 'serif-title',
      radiusScale: 'tailored',
    },
    headerVariant: 'atelier-double',
    heroVariant: 'fullbleed-framed',
    servicesVariant: 'editorial-ledger-2x2',
    aboutVariant: 'boardroom-letter',
    footerVariant: 'dark-monument',
    motionProfile: 'line-rise',
    heroImage: EDITORIAL_IMG.hepaVentilation,
    heroImageAlt:
      'Precision-maintained HVAC air handler coil and HEPA filtration unit',
    secondaryImage: EDITORIAL_IMG.luxuryResidence,
    secondaryImageAlt:
      'Classical residence living room with subtle ceiling air diffusers',
    aboutImage: EDITORIAL_IMG.commercialDuctwork,
    aboutImageAlt:
      'Gleaming commercial spiral ductwork and overhead distribution plenums',
    imageFilterCss: 'contrast(1.04) saturate(0.94)',
    homeHeadline: 'Tailored Air Duct, Dryer Vent & HVAC Cleaning Solutions',
    homeIntroduction:
      'Ductoryn Air Solutions delivers precision air duct cleaning, comprehensive HVAC system cleaning, dryer vent clearing, and commercial ventilation maintenance.',
    aboutHeadline: 'Dedicated Solutions for Clean Ductwork & Efficient Airflow',
    aboutIntroduction:
      'Ductoryn Air Solutions supports residential homeowners and commercial facilities with meticulous ductwork extraction and heating and cooling system care.',
    methodologyStatement:
      'We inspect supply and return networks, extract accumulated debris, service coils and blowers, and clear dryer exhaust pathways.',
  },
  {
    company: LINKED_COMPANIES[14]!, // 15. eliteductcanada
    themeName: 'Modern Executive Classic',
    palette: {
      canvas: '#F8FAFC',
      surface: '#FFFFFF',
      surfaceAlt: '#EDF2F7',
      ink: '#0F2147',
      inkMuted: '#475569',
      primary: '#163269',
      primaryFg: '#FFFFFF',
      accent: '#3B5998',
      border: '#CBD5E1',
      heroBg: '#163269',
      heroFg: '#F8FAFC',
      heroMuted: '#CBD5E1',
      footerBg: '#0C1D40',
      footerFg: '#F8FAFC',
      footerMuted: '#94A3B8',
    },
    typography: {
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Manrope:wght@400;500;600;700&display=swap',
      displayFamily: "'Cormorant Garamond', Georgia, serif",
      bodyFamily: "'Manrope', system-ui, sans-serif",
      displayWeight: 600,
      wordmarkStyle: 'exact-case',
      radiusScale: 'tailored',
    },
    headerVariant: 'executive-bar',
    heroVariant: 'stepped-architectural',
    servicesVariant: 'hairline-rows',
    aboutVariant: 'definition-archive',
    footerVariant: 'classic-columns',
    motionProfile: 'architectural-parallax',
    heroImage: EDITORIAL_IMG.cleanAirAtrium,
    heroImageAlt:
      'Executive glass atrium with clean white architectural supply air vents',
    secondaryImage: EDITORIAL_IMG.commercialDuctwork,
    secondaryImageAlt:
      'Clean galvanized HVAC ductwork inside a modern commercial ceiling',
    aboutImage: EDITORIAL_IMG.luxuryResidence,
    aboutImageAlt:
      'Sunlit classical interior with integrated ceiling ventilation diffusers',
    imageFilterCss: 'contrast(1.03) saturate(0.95)',
    homeHeadline: 'Executive Residential & Commercial Air Duct Care',
    homeIntroduction:
      'eliteductcanada provides professional air duct cleaning, complete HVAC system cleaning, dryer vent lint removal, and commercial HVAC cleaning services.',
    aboutHeadline: 'Elevated Standards in Ductwork & HVAC System Hygiene',
    aboutIntroduction:
      'eliteductcanada serves homeowners and commercial property operators seeking thorough air duct extraction, mechanical coil and blower cleaning, and dryer vent maintenance.',
    methodologyStatement:
      'Every appointment combines systematic inspection, high-powered vacuum extraction, and attentive care for your property and HVAC equipment.',
  },
];

/**
 * Generates an independent per-company CSS stylesheet stored at
 * /<slug>/assets/css/theme.css so each linked company owns its own dedicated
 * theme stylesheet rather than sharing a monolithic CSS bundle.
 */
export function renderCompanyThemeCss(theme: CompanyTheme): string {
  const { palette, typography } = theme;
  const radiusMap: Record<CompanyTypography['radiusScale'], { sm: string; md: string; lg: string }> = {
    sharp: { sm: '0px', md: '2px', lg: '2px' },
    tailored: { sm: '4px', md: '6px', lg: '8px' },
    'soft-classic': { sm: '6px', md: '10px', lg: '14px' },
    arched: { sm: '6px', md: '12px', lg: '140px 140px 10px 10px' },
  };
  const radii = radiusMap[typography.radiusScale];

  const wordmarkTransform =
    typography.wordmarkStyle === 'tracked-caps'
      ? 'text-transform: uppercase; letter-spacing: 0.12em;'
      : typography.wordmarkStyle === 'exact-case'
        ? 'text-transform: none; letter-spacing: 0.01em;'
        : 'text-transform: none; letter-spacing: -0.01em;';

  return `/* Independent Classical Theme Stylesheet — ${theme.company.exactName} (${theme.themeName}) */
:root {
  --brand-canvas: ${palette.canvas};
  --brand-surface: ${palette.surface};
  --brand-surface-alt: ${palette.surfaceAlt};
  --brand-ink: ${palette.ink};
  --brand-ink-muted: ${palette.inkMuted};
  --brand-primary: ${palette.primary};
  --brand-primary-fg: ${palette.primaryFg};
  --brand-accent: ${palette.accent};
  --brand-border: ${palette.border};
  --brand-hero-bg: ${palette.heroBg};
  --brand-hero-fg: ${palette.heroFg};
  --brand-hero-muted: ${palette.heroMuted};
  --brand-footer-bg: ${palette.footerBg};
  --brand-footer-fg: ${palette.footerFg};
  --brand-footer-muted: ${palette.footerMuted};
  --font-display: ${typography.displayFamily};
  --font-body: ${typography.bodyFamily};
  --display-weight: ${typography.displayWeight};
  --radius-sm: ${radii.sm};
  --radius-md: ${radii.md};
  --radius-lg: ${radii.lg};
}

body.brand-body {
  background-color: var(--brand-canvas);
  color: var(--brand-ink);
  font-family: var(--font-body);
}

.brand-wordmark {
  font-family: var(--font-display);
  font-weight: var(--display-weight);
  ${wordmarkTransform}
}

.brand-media-frame img {
  filter: ${theme.imageFilterCss};
}
`;
}
