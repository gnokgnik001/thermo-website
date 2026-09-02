/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Translation {
  // Navigation
  navHome: string;
  navServices: string;
  navProjects: string;
  navWhyUs: string;
  navKnowledge: string;
  navAbout: string;
  navContact: string;
  btnQuote: string;
  btnQuoteFree: string;
  btnViewAll: string;
  btnReadMore: string;
  btnViewDetails: string;

  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  feature1: string;
  feature2: string;
  feature3: string;

  // Services Section
  servicesTitle: string;
  servicesSubtitle: string;
  service1Title: string;
  service1Desc: string;
  service2Title: string;
  service2Desc: string;
  service3Title: string;
  service3Desc: string;
  service4Title: string;
  service4Desc: string;
  service5Title: string;
  service5Desc: string;

  // Projects Section
  projectsTitle: string;
  projectsSubtitle: string;
  project1Title: string;
  project1Location: string;
  project2Title: string;
  project2Location: string;
  project3Title: string;
  project3Location: string;
  project4Title: string;
  project4Location: string;

  // Why Choose Us Section
  whyTitle: string;
  whySubtitle: string;
  whyItem1Title: string;
  whyItem1Desc: string;
  whyItem2Title: string;
  whyItem2Desc: string;
  whyItem3Title: string;
  whyItem3Desc: string;
  whyItem4Title: string;
  whyItem4Desc: string;
  whyItem5Title: string;
  whyItem5Desc: string;

  // Knowledge Center Section
  knowledgeTitle: string;
  knowledgeSubtitle: string;
  articleBadge: string;
  article1Title: string;
  article1Date: string;
  article2Title: string;
  article2Date: string;
  article3Title: string;
  article3Date: string;
  article4Title: string;
  article4Date: string;

  // About Us Section
  aboutTitle: string;
  aboutSubtitle: string;
  aboutDescription: string;
  stat1Num: string;
  stat1Label: string;
  stat2Num: string;
  stat2Label: string;
  stat3Num: string;
  stat3Label: string;
  stat4Num: string;
  stat4Label: string;

  // Contact / CTA Section
  ctaText: string;
  ctaSub: string;
  contactTitle: string;
  contactAddressLabel: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  contactWeb: string;

  // Contact Form
  contactFormName: string;
  contactFormCompany: string;
  contactFormPhone: string;
  contactFormEmail: string;
  contactFormInterest: string;
  contactFormDetails: string;
  contactFormSubmit: string;
  contactFormSuccess: string;
  contactFormValidation: string;

  // Footer Titles
  footerServices: string;
  footerCompany: string;
  footerKnowledge: string;
  footerContact: string;
  footerTagline: string;
}

export interface ServiceCardData {
  id: string;
  titleKey: keyof Translation;
  descKey: keyof Translation;
  imgName: string;
  iconName: string;
}

export interface ProjectCardData {
  id: string;
  titleKey: keyof Translation;
  locationKey: keyof Translation;
  imgName: string;
}

export interface WhyChooseUsData {
  id: string;
  iconName: string;
  titleKey: keyof Translation;
  descKey: keyof Translation;
}

export interface ArticleCardData {
  id: string;
  titleKey: keyof Translation;
  dateKey: keyof Translation;
  imgName: string;
}

export interface StatCardData {
  id: string;
  numKey: keyof Translation;
  labelKey: keyof Translation;
  iconName: string;
}
