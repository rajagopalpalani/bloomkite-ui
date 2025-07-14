const MASKCHAR = 'X';

export const maskPhoneNumber = (value) => {
  if (value) {
    return String(value).replace(/\d(?=\d{4})/g, MASKCHAR);
  }
  return '';
};

export const maskEmail = (value) => {
  if (value) {
    return String(value).replace(/([^*]+)@([\w.]+)(\.[\w.]+)/g, (m, p1, p2, p3) => {
      const maskCharLength = 1;
      const str1 = p1.substring(0, maskCharLength);
      const str2 = p1.substring(p1.length - maskCharLength, p1.length);
      const length = (p1.length + 1) - (str1.length + str2.length);
      return `${str1}${Array(length).join(MASKCHAR)}${str2}@${p2}${p3}`;
    });
  }
  return '';
};

export const maskPanNumber = (value) => {
  if (value) {
    const maskCharLength = 2;
    const str = String(value);
    const str1 = str.substring(0, maskCharLength);
    const str2 = str.substring(str.length - maskCharLength, str.length);
    const length = (str.length + 1) - (str1.length + str2.length);
    return `${str1}${Array(length).join(MASKCHAR)}${str2}`;
  }
  return '';
};
