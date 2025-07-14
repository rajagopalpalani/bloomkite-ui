import moment from 'moment';

export const download = (blob, fileName) => {
    if (window && window.document) {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = `${fileName}_${moment().unix()}`;
        a.click();
        window.URL.revokeObjectURL(url);
    };
};

export const toCamelCase = (str) => {
    return str ? str
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase()) :
        '';
};

export const debounce = (func, delay) => {
    let inDebounce;
    return function () {
        const context = this
        const args = arguments
        clearTimeout(inDebounce)
        inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
};

export const typeOfUser = (str = '') => {
    const isAdvisor = str.startsWith("ADV");
    if (isAdvisor) {
        return 1;
    }
    const isInvestor = str.startsWith("INV");
    if (isInvestor) {
        return 2;
    }
    return 3;
};

export const canFollow = (currentId, profileId) => {
    const currentUserType = typeOfUser(currentId);
    const profileUserType = typeOfUser(profileId);
    if (currentUserType > 0 && profileUserType === 1) {
        return true;
    }
    return false;
};

