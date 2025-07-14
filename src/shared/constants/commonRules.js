const contentMethod = (e) => {
    const re = /[a-z A-Z]+/g;
    if (!re.test(e.key)) {
        e.preventDefault();
    }
};

const contentCompanyName = (e) => {
    const re = /[a-z A-Z $&*#@]+/g;
    if (!re.test(e.key)) {
        e.preventDefault();
    }
};

const aplhaNumericMethod = (e) => {
    const re = /[a-z A-Z0-9]+/g;
    if (!re.test(e.key)) {
        e.preventDefault();
    }
};

const aplhaNumericWithoutSpace = (e) => {
    const re = /[a-zA-Z0-9]+/g;
    if (!re.test(e.key)) {
        e.preventDefault();
    }
};

const websiteMethod = (e) => {
    const re = /[a-z A-Z.]+/g;
    if (!re.test(e.key)) {
        e.preventDefault();
    }
};

const pincodeMethod = (e) => {
    const re = /[0-9]+/g;
    if (!re.test(e.key)) {
        e.preventDefault();
    }
};

const yearMethod = (e) => {
    const re = /[0-9]+/g;
    if (!re.test(e.key)) {
        e.preventDefault();
    }
};

const monthMethod = (e) => {
    const re = /[0-9]+/g;
    if (!re.test(e.key)) {
        e.preventDefault();
    }
};

const lakshsMethod = (e) => {
    const re = /[0-9.]+/g;
    if (!re.test(e.key)) {
        e.preventDefault();
    }
};

const croresMethod = (e) => {
    const re = /[0-9.]+/g;
    if (!re.test(e.key)) {
        e.preventDefault();
    }
};

const interestRateMethod = (e) => {
    const re = /[0-9.]+/g;
    if (!re.test(e.key)) {
        e.preventDefault();
    }
};

const addressMethod = (e) => {
    const re = /[0-9 A-Z a-z#,-./]+/g;
    if (!re.test(e.key)) {
        e.preventDefault();
    }
};

const licenseMethod = (e) => {
    const re = /[A-Z 0-9]+/g;
    if (!re.test(e.key)) {
        e.preventDefault();
    }
};

const numberMethod = (e) => {
    const re = /[0-9 +-]+/g;
    if (!re.test(e.key)) {
        e.preventDefault();
    }
};

const panMethod = (e) => {
    const re = /[a-zA-Z pP CcHhAaBbGgJjLlFfTt 0-9]+/g;
    if (!re.test(e.key)) {
        e.preventDefault();
    }
};

const minLength = { pincode: 6 };

const maxLength = {
    age: 2,
    about: 500,
    content: 30,
    pincode: 6,
    panNumber: 10,
    password: 16,
    phoneNumber: 10,
    license: 16,
    issuedBy: 30,
    email: 40,
    year: 2,
    month: 3,
    lakshs: 5,
    crores: 4,
    interestRate: 5
};

const maxNumber = {
    number: 8
};

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validInvestorPANnumberRegex = RegExp(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/);
const validAdvisorPANnumberRegex = RegExp(/^[a-zA-Z]{3}[pP]{1}[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}$/);
const validCorporatePANnumberRegex = RegExp(/^[a-zA-z]{3}[CcHhAaBbGgJjLlFfTt]{1}[a-zA-z]{1}[0-9]{4}[a-zA-Z]{1}$/);
const validPasswordRegex = RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){3,}$/);
const validPhoneNumberRegex = RegExp(/^([0-9]{10})$/);
const validPincodeNumberRegex = RegExp(/^([0-9]{6})$/);
const checkboxTermsAndConditionsMessage = 'Please indicate that you accept the Terms and Conditions';

export {
    validInvestorPANnumberRegex,
    validAdvisorPANnumberRegex,
    validCorporatePANnumberRegex,
    validPasswordRegex,
    validPhoneNumberRegex,
    validPincodeNumberRegex,
    validEmailRegex,
    checkboxTermsAndConditionsMessage,
    maxLength,
    minLength,
    maxNumber,
    aplhaNumericMethod,
    aplhaNumericWithoutSpace,
    contentMethod,
    websiteMethod,
    pincodeMethod,
    addressMethod,
    licenseMethod,
    numberMethod,
    panMethod,
    contentCompanyName,
    yearMethod,
    lakshsMethod,
    croresMethod,
    monthMethod,
    interestRateMethod
};
