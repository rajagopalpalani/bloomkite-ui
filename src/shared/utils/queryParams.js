export const serialize = (obj) => {
    if (obj && Object.keys(obj).length) {
        let str = [];
        Object.keys(obj).forEach((item) => {
            if (obj.hasOwnProperty(item)) {
                str.push(encodeURIComponent(item) + "=" + encodeURIComponent(obj[item]));
            }
        });
        return `?${str.join('&')}`;
    }
    return '';
};
