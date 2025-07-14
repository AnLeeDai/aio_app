export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "AIO APPS",
  description: "AIO APPS is a collection of useful applications.",

  routes: {
    home: "/",
    nameGenerate: "/name-generate",
    passwordGenerate: "/password-generate",
    dobGenerate: "/dob-generate",
    passportGenerate: "/passport-generate",
    passportExpireGenerate: "/passport-expire-generate",
    ibanGenerate: "/iban-generate",
    locationGenerate: "/location-generate",
  },

  links: {
    sponsor: "https://github.com/AnLeeDai/aio_app",
  },
};
