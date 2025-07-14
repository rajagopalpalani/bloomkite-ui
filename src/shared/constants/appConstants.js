export const MONEY = {
    LAKSH: 100000,
    CRORE: 10000000
};

export const MONTHS = {
    0: 'JAN',
    1: 'FEB',
    2: 'MAR',
    3: 'APR',
    4: 'MAY',
    5: 'JUN',
    6: 'JUL',
    7: 'AUG',
    8: 'SEP',
    9: 'OCT',
    10: 'NOV',
    11: 'DEC'
};

export const STATUSES = {
    DRAFT: 1,
    CREATED: 2,
    APPROVE: 4,
    DECLINE: 6
};

export const calcMenu = ['goal', 'financial', 'riskprofile', 'investment', 'loan'];

export const showMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const changeDateFormat = () => {
    return showMonth[new Date().getMonth()] + '-' + new Date().getFullYear();
};
