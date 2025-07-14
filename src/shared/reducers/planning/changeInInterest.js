import { CHANGE_IN_INTEREST, PLANNING } from '../../actions/actionTypes';
import { toDateString, composeAmortisation, composeWmiPaymentsData, percentage, calculateLoanAmount } from '../../helpers/planningHelper';
import { MONEY } from '../../constants/appConstants';

const today = new Date();
const initialState = {
    interestChangeId: 0,
    loanAmount: 0,
    tenure: 5,
    interestRate: 5,
    date: toDateString({
        year: today.getFullYear(),
        month: today.getMonth()
    }),
    loanAmountInLakshs: true,
    tenureInYear: true,
    tabKey: 'interestChange1',
    interestChange1: {
        startDate: null,
        interestChangedDate: null,
        currentRate: 0,
        changedRate: 0,
        disabled: true
    },
    interestChange2: {
        startDate: null,
        interestChangedDate: null,
        currentRate: 0,
        changedRate: 0,
        disabled: true
    },
    interestChange3: {
        startDate: null,
        interestChangedDate: null,
        currentRate: 0,
        changedRate: 0,
        disabled: true
    },
    interestChange4: {
        startDate: null,
        interestChangedDate: null,
        currentRate: 0,
        changedRate: 0,
        disabled: true
    },
    isLoading: false,
    requestCount: 0,
    buttonClicked: false,
    response: {
        loanAmount: 0,
        total: 0,
        emi: 0,
        interestPayable: 0,
        principalLoanAmountInPercent: 0,
        interestInPercent: 0,
        amortisation: [],
        wmiPayments: [],
        loanTerm: null,
        revisedTerm: null
    }
};

const isValid = (p) => {
    return p.interestChangedDate !== null && p.changedRate > 0;
}

export const changeInInterestReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_IN_INTEREST.ON_VALUE_CHANGE_SUCCESS: {
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
                        startDate: state[state.tabKey].startDate,
                        currentRate: state.interestRate
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
                let setProps = { ...state[prop] };
                if (innerProp == 'interestChangedDate') {
                    setProps = { ...setProps, interestChangedDate: value }
                }
                if (innerProp == 'changedRate') {
                    setProps = { ...setProps, changedRate: value }
                }
                let disabled = !isValid(setProps);
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
            let interestChange1 = { ...state.interestChange1 };
            let interestChange2 = { ...state.interestChange2 };
            let interestChange3 = { ...state.interestChange3 };
            let interestChange4 = { ...state.interestChange4 };
            let date = state.date;
            if (name == "loanDate") {
                interestChange1 = { ...state.interestChange1, startDate: action.payload.value };
                interestChange2 = { ...state.interestChange2, startDate: action.payload.value };
                interestChange3 = { ...state.interestChange3, startDate: action.payload.value };
                interestChange4 = { ...state.interestChange4, startDate: action.payload.value };
                date = action.payload.value;
            }
            return {
                ...state,
                tenure,
                loanAmount,
                interestChange1,
                interestChange2,
                interestChange3,
                interestChange4,
                date,
                [action.payload.name]: action.payload.value
            };
        }
        case CHANGE_IN_INTEREST.CALCULATE_INTEREST_CHANGE_REQUEST_START:
            return {
                ...state,
                isLoading: true
            };
        case CHANGE_IN_INTEREST.CLEAR_CHANGE_IN_INTEREST:
            return {
                ...state,
                interestChangeId: 0,
                loanAmount: 25,
                tenure: 10,
                interestRate: 5,
                date: toDateString({
                    year: today.getFullYear(),
                    month: today.getMonth()
                }),
                loanAmountInLakshs: true,
                tenureInYear: true,
                tabKey: 'interestChange1',
                interestChange1: {
                    startDate: null,
                    interestChangedDate: null,
                    currentRate: 0,
                    changedRate: 0,
                    disabled: true
                },
                interestChange2: {
                    startDate: null,
                    interestChangedDate: null,
                    currentRate: 0,
                    changedRate: 0,
                    disabled: true
                },
                interestChange3: {
                    startDate: null,
                    interestChangedDate: null,
                    currentRate: 0,
                    changedRate: 0,
                    disabled: true
                },
                interestChange4: {
                    startDate: null,
                    interestChangedDate: null,
                    currentRate: 0,
                    changedRate: 0,
                    disabled: true
                },
                isLoading: false,
                requestCount: 0,
                buttonClicked: false,
                response: {
                    loanAmount: 0,
                    total: 0,
                    emi: 0,
                    interestPayable: 0,
                    principalLoanAmountInPercent: 0,
                    interestInPercent: 0,
                    amortisation: [],
                    wmiPayments: [],
                    loanTerm: null,
                    revisedTerm: null
                }
            };
        case CHANGE_IN_INTEREST.CALCULATE_INTEREST_CHANGE_RESPONSE: {
            let { payload } = action;
            let { loanAmount, loanAmountInLakshs } = state;
            let amortisationResponse = payload.amortisationResponse || payload.amortisation;
            let wmiPayments = composeWmiPaymentsData(amortisationResponse);
            loanAmount = calculateLoanAmount(loanAmount, loanAmountInLakshs);
            let amortisation = composeAmortisation(amortisationResponse);
            return {
                ...state,
                isLoading: false,
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
            let { interestChange, emiCalculator } = action.payload;
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

                if (interestChange.length === 0) {
                    modifiedState = {
                        ...modifiedState,
                        interestChange1: {
                            ...modifiedState.interestChange1,
                            currentRate: emiCalculator.interestRate,
                            startDate: emiCalculator.date
                        }
                    };
                } else {
                    loanStartDate = emiCalculator.date;
                }
            }
            if (interestChange.length > 0) {
                let interestChangeKey = 'interestChange';
                for (let index = 0; index < interestChange.length; index++) {
                    let change = interestChange[index];
                    let prop = interestChangeKey + (index + 1);

                    modifiedState = {
                        ...modifiedState,
                        interestChangeId: change.interestChangeId,
                        [prop]: {
                            ...modifiedState[prop],
                            interestChangedDate: change.interestChangedDate,
                            changedRate: change.changedRate,
                            startDate: loanStartDate,
                            currentRate: change.interestRate,
                            disabled: !isValid(change)
                        }
                    }
                }
            }

            return {
                ...state,
                modifiedState,
                requestCount: state.requestCount + 1
            };
        case CHANGE_IN_INTEREST.CHANGE_IN_INTEREST_BUTTON_CLICKED: {
            return {
                ...state,
                buttonClicked: true
            };
        }
        default:
            return state;
    }
};
