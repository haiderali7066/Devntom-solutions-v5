export type VatCountry = {
  slug: string;
  name: string;
  taxName: 'VAT' | 'GST' | 'Sales Tax';
  rate: number;
  currency: string; // ISO 4217
  authority: string;
  threshold?: string;
  arabicTitle?: string;
  about: string;
  notes: string[];
};

export const VAT_COUNTRIES: VatCountry[] = [
  {
    slug: 'saudi-arabia',
    name: 'Saudi Arabia',
    taxName: 'VAT',
    rate: 15,
    currency: 'SAR',
    authority: 'ZATCA (Zakat, Tax and Customs Authority)',
    threshold: 'SAR 375,000 in annual taxable supplies (mandatory registration)',
    arabicTitle: 'حاسبة ضريبة القيمة المضافة في السعودية',
    about:
      'Saudi Arabia raised its VAT rate from 5% to 15% in July 2020. VAT is collected by ZATCA and applies to most goods and services sold in the Kingdom, with exceptions such as zero-rated exports and certain financial services.',
    notes: [
      'The standard rate is 15%, applied to most taxable supplies.',
      'Exports of goods and international transport are generally zero-rated.',
      'Simplified (B2C) tax invoices must carry a ZATCA e-invoice QR code.',
      'VAT returns are filed monthly or quarterly depending on your turnover.',
    ],
  },
  {
    slug: 'uae',
    name: 'UAE',
    taxName: 'VAT',
    rate: 5,
    currency: 'AED',
    authority: 'Federal Tax Authority (FTA)',
    threshold: 'AED 375,000 in annual taxable supplies (mandatory registration)',
    arabicTitle: 'حاسبة ضريبة القيمة المضافة في الإمارات',
    about:
      'The UAE introduced VAT in January 2018 at 5%, one of the lowest rates in the world. The Federal Tax Authority administers it, and it applies to most goods and services across all seven emirates.',
    notes: [
      'The standard rate is 5%.',
      'Some supplies are zero-rated (such as exports and certain education and healthcare services) or exempt (such as residential rent and some financial services).',
      'Businesses above the registration threshold must register with the FTA and charge VAT on taxable supplies.',
      'Designated free zones can have special VAT treatment, so check the rules for your zone.',
    ],
  },
  {
    slug: 'bahrain',
    name: 'Bahrain',
    taxName: 'VAT',
    rate: 10,
    currency: 'BHD',
    authority: 'National Bureau for Revenue (NBR)',
    threshold: 'BHD 37,500 in annual taxable supplies (mandatory registration)',
    arabicTitle: 'حاسبة ضريبة القيمة المضافة في البحرين',
    about:
      'Bahrain introduced VAT in 2019 at 5% and raised it to 10% in January 2022. The National Bureau for Revenue administers it.',
    notes: [
      'The standard rate is 10%.',
      'Bahraini dinar amounts use three decimal places, and this calculator rounds accordingly.',
      'Exports and certain essential goods and services can be zero-rated.',
    ],
  },
  {
    slug: 'oman',
    name: 'Oman',
    taxName: 'VAT',
    rate: 5,
    currency: 'OMR',
    authority: 'Oman Tax Authority',
    threshold: 'OMR 38,500 in annual taxable supplies (mandatory registration)',
    arabicTitle: 'حاسبة ضريبة القيمة المضافة في عمان',
    about:
      'Oman introduced VAT at 5% in April 2021. The Oman Tax Authority administers it, and it applies to most goods and services.',
    notes: [
      'The standard rate is 5%.',
      'Omani rial amounts use three decimal places, and this calculator rounds accordingly.',
      'A number of basic foodstuffs, healthcare and education services are zero-rated or exempt.',
    ],
  },
  {
    slug: 'pakistan',
    name: 'Pakistan',
    taxName: 'Sales Tax',
    rate: 18,
    currency: 'PKR',
    authority: 'Federal Board of Revenue (FBR)',
    about:
      'Pakistan charges a federal sales tax on goods at a standard rate of 18%, collected by the Federal Board of Revenue. Services are taxed under separate federal and provincial rules, and some provinces apply their own rates, so check which regime applies to your supply.',
    notes: [
      'The standard federal sales tax rate on goods is 18%.',
      'Some goods are subject to reduced rates, further tax or fixed-rate regimes.',
      'Services are often taxed by provincial authorities at their own rates, so use the editable rate field when your rate differs from 18%.',
      'Registered sellers issue sales tax invoices and file monthly returns.',
    ],
  },
  {
    slug: 'australia',
    name: 'Australia',
    taxName: 'GST',
    rate: 10,
    currency: 'AUD',
    authority: 'Australian Taxation Office (ATO)',
    threshold: 'AUD 75,000 in annual GST turnover (AUD 150,000 for non-profits)',
    about:
      'Australia charges a flat 10% Goods and Services Tax on most goods, services and other items sold or consumed in the country. The Australian Taxation Office administers it.',
    notes: [
      'GST is 10% of the price of the taxable supply, so a GST-inclusive price is divided by 11 to find the GST portion.',
      'GST-free items include most basic food, some health and education services, and exports.',
      'Businesses above the turnover threshold must register for GST and report it on their Business Activity Statement.',
    ],
  },
];

export const getCountry = (slug: string) => VAT_COUNTRIES.find((c) => c.slug === slug);