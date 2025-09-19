export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "DROP SHIPPING TOOLS",
  description: "DROP SHIPPING TOOLS is a collection of useful applications.",

  routes: {
    home: "/",
    nameGenerate: "/name-generate",
    passwordGenerate: "/password-generate",
    dobGenerate: "/dob-generate",
    passportGenerate: "/passport-generate",
    passportExpireGenerate: "/passport-expire-date-generate",
    passportmrzGenerate: "/passport-mrz",
    ibanGenerate: "/iban-generate",
    locationGenerate: "/location-generate",
    hotmailGenerate: "/hotmail-generate",
    phoneGenerate: "/phone-generate",
    pactualBankGenerate: "/pactual-bank-generate",
    banrisulBankGenerate: "/banrisul-bank-generate",
    brazilGasBillGenerate: "/brazil-gas-bill-generate",
    brazilBillGenerate: "/brazil-bill-generate",
    donate: "/donate",
  },

  links: {
    sponsor: "https://github.com/AnLeeDai/aio_app",
  },
};
