import { EMI_CALCULATOR, PLANNING } from '../../actions/actionTypes';
import { toDateString, composeWmiPaymentsData, composeAmortisation, percentage } from '../../helpers/planningHelper';
import { MONEY } from '../../constants/appConstants';

const today = new Date();
const initialState = {
    emiCalculatorId: 0,
    loanAmount: 0,
    tenure: 5,
    interestRate: 5,
    loanDate: toDateString({
        year: today.getFullYear(),
        month: today.getMonth()
    }),
    loanAmountInLakshs: true,
    tenureInYear: true,
    response: {
        total: 0,
        emi: 0,
        interestPayable: 0,
        interestInPercent: 0,
        principalLoanAmountInPercent: 0,
        amortisation: [],
        wmiPayments: []
    },
    isLoading: false,
    requestCount: 0,
    buttonClicked: false
};

export const emiCalculatorReducer = (state = initialState, action) => {
    switch (action.type) {
        case EMI_CALCULATOR.ON_VALUE_CHANGE_SUCCESS: {
            let { name, value } = action.payload;
            let tenure = state.tenure;
            if (name === 'tenureInYear') {
                if (value && state.tenure > 30) {
                    tenure = state.tenure / 12;
                } else if (!value && state.tenure <= 30) {
                    tenure = state.tenure * 12;
                }
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
            return {
                ...state,
                tenure,
                loanAmount,
                isLoading: true,
                [action.payload.name]: value
            };
        }
        case EMI_CALCULATOR.CALCULATE_EMI_RESPONSE: {
            let { payload } = action;
            let wmiPayments = composeWmiPaymentsData(payload.amortisationResponse);
            let amortisation = composeAmortisation(payload.amortisationResponse);
            return {
                ...state,
                isLoading: false,
                emiCalculatorId: 1, // since the id is not coming from response
                requestCount: state.requestCount + 1,
                response: {
                    total: Math.round(payload.total),
                    emi: Math.round(payload.emi),
                    interestPayable: Math.round(payload.interestPayable),
                    principalLoanAmountInPercent: percentage(payload.loanAmount, payload.total),
                    interestInPercent: percentage(payload.interestPayable, payload.total),
                    amortisation,
                    wmiPayments
                }
            };
        }
        case PLANNING.FETCH_LOAN_PLANNING_SUCCESS:
            let { emiCalculator } = action.payload;
            if (emiCalculator) {
                let loanAmount = emiCalculator.loanAmount;
                let loanAmountInLakshs = false;
                if (loanAmount < MONEY.CRORE) {
                    loanAmountInLakshs = true;
                    loanAmount = loanAmount / MONEY.LAKSH;
                } else {
                    loanAmount = loanAmount / MONEY.CRORE;
                }
                return {
                    ...state,
                    requestCount: state.requestCount + 1,
                    loanAmount,
                    loanAmountInLakshs,
                    emiCalculatorId: emiCalculator.emiCalculatorId,
                    loanDate: emiCalculator.date,
                    tenure: emiCalculator.tenure,
                    tenureInYear: emiCalculator.tenureType === 'YEAR',
                    interestRate: emiCalculator.interestRate
                };
            }
            return {
                ...state,
                requestCount: state.requestCount + 1
            };
        case EMI_CALCULATOR.CHANGE_EMI_CALCULATOR_BUTTON_CLICKED: {
            return {
                ...state,
                buttonClicked: true
            };
        }

        case EMI_CALCULATOR.CLEAR_EMI_CALCULATOR: {
            return {
                ...state,
                emiCalculatorId: 0,
                loanAmount: 25,
                tenure: 10,
                interestRate: 5,
                loanDate: toDateString({
                    year: today.getFullYear(),
                    month: today.getMonth()
                }),
                loanAmountInLakshs: true,
                tenureInYear: true,
                response: {
                    total: 0,
                    emi: 0,
                    interestPayable: 0,
                    interestInPercent: 0,
                    principalLoanAmountInPercent: 0,
                    amortisation: [],
                    wmiPayments: []
                },
                isLoading: false,
                requestCount: 0,
                buttonClicked: false
            };
        }
        default:
            return state;
    }
};
