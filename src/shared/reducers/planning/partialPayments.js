import { PARTIAL_PAYMENTS, PLANNING, EMI_CALCULATOR } from '../../actions/actionTypes';
import { toDateString, composeAmortisation, composeWmiPaymentsData, percentage, calculateLoanAmount } from '../../helpers/planningHelper';
import { MONEY } from '../../constants/appConstants';

const today = new Date();
const initialState = {
    partialPaymentId: 0,
    loanAmount: 0,
    tenure: 5,
    interestRate: 5,
    date: toDateString({
        year: today.getFullYear(),
        month: today.getMonth()
    }),
    loanAmountInLakshs: true,
    tenureInYear: true,
    tabKey: 'partialPayment1',
    partialPayment1: {
        startDate: null,
        partPayDate: null,
        partPayAmount: 0,
        disabled: true
    },
    partialPayment2: {
        startDate: null,
        partPayDate: null,
        partPayAmount: 0,
        disabled: true
    },
    partialPayment3: {
        startDate: null,
        partPayDate: null,
        partPayAmount: 0,
        disabled: true
    },
    partialPayment4: {
        startDate: null,
        partPayDate: null,
        partPayAmount: 0,
        disabled: true
    },
    isLoading: false,
    requestCount: 0,
    buttonClicked: false,
    response: {
        total: 0,
        emi: 0,
        interestPayable: 0,
        interestInPercent: 0,
        principalLoanAmountInPercent: 0,
        amortisation: [],
        wmiPayments: [],
        loanTerm: null,
        loanAmount: 0,
        revisedTerm: null
    }
};

const isValid = (partialPayment) => {
    return partialPayment.partPayDate !== null && partialPayment.partPayAmount > 0;
}

export const partialPaymentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PARTIAL_PAYMENTS.ON_VALUE_CHANGE_SUCCESS: {
            let { name, value } = action.payload;
            let tenure = state.tenure;
            if (name === 'tenureInYear') {
                if (value && state.tenure > 30) {
                    tenure = state.tenure / 12;
                } else if (!value && state.tenure <= 30) {
                    tenure = state.tenure * 12;
                }
            }
            if (name === 'tabKey') {
                state = {
                    ...state,
                    [value]: {
                        ...state[value],
                        startDate: state[state.tabKey].startDate
                    }
                };
            }
            let loanAmount = state.loanAmount;
            if (name === 'loanAmountInLakshs') {
                if (value) {
                    if (state.loanAmount < 1) {
                        loanAmount = state.loanAmount * 100;
                    } else {
                        loanAmount = 1 * 100;
                    }
                }
                else if (!value && state.loanAmount > 10) {
                    loanAmount = state.loanAmount / 100;
                }
            }

            let [prop, innerProp] = action.payload.name.split('.');
            if (innerProp) {
                let disabled = !isValid(state[prop]);
                return {
                    ...state,
                    tenure,
                    loanAmount,
                    [prop]: {
                        ...state[prop],
                        disabled,
                        [innerProp]: action.payload.value
                    }
                };
            }
            let partialPayment1 = { ...state.partialPayment1 };
            let partialPayment2 = { ...state.partialPayment2 };
            let partialPayment3 = { ...state.partialPayment3 };
            let partialPayment4 = { ...state.partialPayment4 };
            let date = state.date;
            if (name == "loanDate") {
                partialPayment1 = { ...state.partialPayment1, startDate: action.payload.value };
                partialPayment2 = { ...state.partialPayment2, startDate: action.payload.value };
                partialPayment3 = { ...state.partialPayment3, startDate: action.payload.value };
                partialPayment4 = { ...state.partialPayment4, startDate: action.payload.value };
                date = action.payload.value;
            }
            return {
                ...state,
                tenure,
                loanAmount,
                partialPayment1,
                partialPayment2,
                partialPayment3,
                partialPayment4,
                date,
                [action.payload.name]: action.payload.value
            };
        }
        case PARTIAL_PAYMENTS.CALCULATE_PARTIAL_PAYMENTS_REQUEST_START:
            return {
                ...state,
                isLoading: true
            };
        case PARTIAL_PAYMENTS.CALCULATE_PARTIAL_PAYMENTS_RESPONSE: {
            let { payload } = action;
            let { loanAmount, loanAmountInLakshs } = state;
            let amortisationResponse = payload.amortisationResponse || payload.amortisation;
            let wmiPayments = composeWmiPaymentsData(amortisationResponse);
            loanAmount = calculateLoanAmount(loanAmount, loanAmountInLakshs);
            let amortisation = composeAmortisation(amortisationResponse);
            return {
                ...state,
                isLoading: false,
                partialPaymentId: 1,
                requestCount: state.requestCount + 1,
                response: {
                    loanAmount,
                    total: Math.round(payload.total),
                    emi: Math.round(payload.emi),
                    interestPayable: Math.round(payload.interestPayable),
                    principalLoanAmountInPercent: percentage(payload.loanAmount, payload.total),
                    interestInPercent: percentage(payload.interestPayable, payload.total),
                    amortisation,
                    loanTerm: state.tenure + `${state.tenureInYear ? ' Yrs' : ' Months'}`,
                    revisedTerm: payload.revisedTenure ? `${payload.revisedTenure} ${state.tenureInYear ? ' Yrs' : ' Months'}` : null,
                    wmiPayments
                }
            };
        }
        case PLANNING.FETCH_LOAN_PLANNING_SUCCESS:
            let modifiedState = {
                ...state,
                requestCount: state.requestCount + 1
            };
            let { partialPayment,emiCalculator } = action.payload;

            let loanStartDate = toDateString({
                year: today.getFullYear(),
                month: today.getMonth()
            });
            if (emiCalculator) {
                let loanAmount = emiCalculator.loanAmount;
                let loanAmountInLakshs = false;
                if (loanAmount < MONEY.CRORE) {
                    loanAmountInLakshs = true;
                    loanAmount = loanAmount / MONEY.LAKSH;
                } else {
                    loanAmount = loanAmount / MONEY.CRORE;
                }
                modifiedState = {
                    ...modifiedState,
                    loanAmount,
                    loanAmountInLakshs,
                    tenure: emiCalculator.tenure,
                    tenureInYear: emiCalculator.tenureType === 'YEAR',
                    interestRate: emiCalculator.interestRate,
                    date: emiCalculator.date
                };
                if (partialPayment.length === 0) {
                    modifiedState = {
                        ...modifiedState,
                        partialPayment1: {
                            ...modifiedState.partialPayment1,
                            startDate: partialPayment.date
                        }
                    };
                } else {
                    loanStartDate = emiCalculator.date;
                }
            }
            if (partialPayment.length > 0) {
                let partialPaymentKey = 'partialPayment';
                for (let index = 0; index < partialPayment.length; index++) {
                    let payment = partialPayment[index];
                    let prop = partialPaymentKey + (index + 1);

                    modifiedState = {
                        ...modifiedState,
                        partialPaymentId: payment.partialPaymentId,
                        [prop]: {
                            ...modifiedState[prop],
                            partPayAmount: payment.partPayAmount,
                            partPayDate: payment.partPayDate,
                            startDate: loanStartDate,
                            disabled: !isValid(payment)
                        }
                    }
                }
            }
            // return modifiedState;
            return {
                ...state,
                modifiedState,
                requestCount: state.requestCount + 1
            };
        case PARTIAL_PAYMENTS.CHANGE_PARTIAL_PAYMENTS_BUTTON_CLICKED: {
            return {
                ...state,
                buttonClicked: true
            };
        }
        case PARTIAL_PAYMENTS.CLEAR_PARTIAL_PAYMENTS: {
            return {
                ...state,
                partialPaymentId: 0,
                loanAmount: 25,
                tenure: 10,
                interestRate: 5,
                date: toDateString({
                    year: today.getFullYear(),
                    month: today.getMonth()
                }),
                loanAmountInLakshs: true,
                tenureInYear: true,
                tabKey: 'partialPayment1',
                partialPayment1: {
                    startDate: null,
                    partPayDate: null,
                    partPayAmount: 0,
                    disabled: true
                },
                partialPayment2: {
                    startDate: null,
                    partPayDate: null,
                    partPayAmount: 0,
                    disabled: true
                },
                partialPayment3: {
                    startDate: null,
                    partPayDate: null,
                    partPayAmount: 0,
                    disabled: true
                },
                partialPayment4: {
                    startDate: null,
                    partPayDate: null,
                    partPayAmount: 0,
                    disabled: true
                },
                isLoading: false,
                requestCount: 0,
                buttonClicked: false,
                response: {
                    total: 0,
                    emi: 0,
                    interestPayable: 0,
                    interestInPercent: 0,
                    principalLoanAmountInPercent: 0,
                    amortisation: [],
                    wmiPayments: [],
                    loanTerm: null,
                    loanAmount: 0,
                    revisedTerm: null
                }
            };
        }
        default:
            return state;
    }
};
