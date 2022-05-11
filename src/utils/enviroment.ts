export const isProduction = () => {
  return window.location.hostname === 'br.dealers.aracargroup.com' ? true : false;
};

export const isTest = () => {
  return window.location.hostname === 'br.dealers.test.aracargroup.com' ? true : false;
};
