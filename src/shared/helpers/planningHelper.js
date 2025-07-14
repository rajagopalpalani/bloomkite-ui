import { MONTHS, MONEY } from '../constants/appConstants';

export const formatMoney = (value) => {
    if (value) {
        value = value.toString();
        let [main, decimal] = value.split('.');
        let lastThree = main.substring(main.length - 3);
        const otherNumbers = main.substring(0, main.length - 3);
        if (otherNumbers != '') {
            lastThree = ',' + lastThree;
        }
        let num = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
        if (decimal) {
            if (decimal.length > 2) {
                num += '.' + decimal.substring(0, 2);
            } else {
                num += '.' + decimal;
            }
        }
        return num;
    }
    return '0';
};

export const toDateString = (date) => {
    return `${MONTHS[date.month]}-${date.year}`;
};

export const formatLoanAmount = (amount, amountInLaksh, fromfutureValue) => {
    if (amountInLaksh) {
        return formatMoney(parseInt(amount) * MONEY.LAKSH);
    }
    return formatMoney(parseInt(amount) * MONEY.CRORE);
};

export const calculateLoanAmount = (amount, amountInLaksh) => {
    if (amountInLaksh) {
        return amount * MONEY.LAKSH;
    }
    return amount * MONEY.CRORE;
};

export const composeWmiPaymentsData = (amortisation) => {
    let payments = [];
    for (let index = 0; index < amortisation.length; index++) {
        let item = amortisation[index];
        let year = +item.date.split('-')[1];
        let payment = payments.find((p) => p.year === year);

        if (payment) {
            payment.principal += Math.round(item.totalPrincipal);
            payment.interest += Math.round(item.interest);
            payment.balance = Math.round(item.closing);
        } else {
            payment = {
                year,
                principal: Math.round(item.totalPrincipal),
                interest: Math.round(item.interest),
                balance: Math.round(item.opening)
            };
            payments.push(payment);
        }
    }
    let wmiPayments = [['Year', 'Principal', 'Interest']];
    for (let index = 0; index < payments.length; index++) {
        wmiPayments.push([payments[index].year, payments[index].principal, payments[index].interest]);
    }
    return wmiPayments;
};

export const composeAmortisation = (amortisation) => {
    let items = amortisation.map((p) => {
        let [month, year] = p.date.split('-');
        year = parseInt(year);
        return {
            month: month,
            year: year,
            date: p.date,
            closing: Math.round(p.closing),
            interest: Math.round(p.interest),
            loanPaid: Math.round(p.loanPaid),
            months: Math.round(p.months),
            opening: Math.round(p.opening),
            totalPrincipal: Math.round(p.totalPrincipal)
        };
    });
    let result = items.reduce((r, a) => {
        r[a.year] = r[a.year] || [];
        r[a.year].push(a);
        return r;
    }, Object.create(null));

    let arr = [];
    let index = 1;
    for (let year in result) {
        let len = result[year].length;
        let p = result[year][len - 1];
        let totalPrincipal = result[year].reduce((a, b) => a + (b.totalPrincipal || 0), 0);
        let interest = result[year].reduce((a, b) => a + (b.interest || 0), 0);
        arr.push({
            key: index++,
            month: p.month,
            year: p.year,
            date: p.date,
            closing: Math.round(p.closing),
            loanPaid: Math.round(p.loanPaid),
            months: Math.round(p.months),
            opening: Math.round(result[year][0].opening),
            interest: Math.round(interest),
            totalPrincipal: Math.round(totalPrincipal),
            items: result[year]
        });
    }

    return arr;
};

export const percentage = (value, total) => {
    let num = +((value / total) * 100);
    if (Number.isNaN(num)) {
        return 0;
    }
    return Math.round(num);
};

export const Helper = {
    loanAmountConfig: (value, isSwitchOn) => {
        if (isSwitchOn) {
            return {
                step: 1,
                max: 100,
                labels: [0, 20, 40, 60, 80, 100]
            };
        }
        return {
            step: 0.1,
            max: 10,
            labels: [0, 2, 4, 6, 8, 10]
        };
    },
    tenureConfig: (value, isSwitchOn) => {
        if (isSwitchOn) {
            return {
                step: 1,
                max: 30,
                labels: [0, 5, 10, 15, 20, 25, 30]
            };
        }
        return {
            step: 12,
            max: 360,
            labels: [0, 60, 120, 180, 240, 300, 360]
        };
    },
    interestRateConfig: (value, isSwitchOn) => {
        return {
            step: 0.05,
            max: 15,
            labels: [5, 7, 9, 11, 13, 15]
        };
    },
    rateConfig: (value, isSwitchOn) => {
        return {
            step: 0.25,
            max: 20,
            labels: [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20]
        };
    },
    goalAmountConfig: (value, isSwitchOn) => {
        return {
            step: 1,
            max: 250,
            labels: [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250]
        };
    },
    invRateConfig: (value, isSwitchOn) => {
        return {
            step: 0.05,
            max: 15,
            labels: [1, 3, 5, 7, 9, 11, 13, 15]
        };
    }
};
