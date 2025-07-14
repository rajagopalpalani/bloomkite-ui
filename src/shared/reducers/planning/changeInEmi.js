import { CHANGE_IN_EMI, PLANNING } from '../../actions/actionTypes'
import { toDateString, composeAmortisation, composeWmiPaymentsData, percentage, calculateLoanAmount } from '../../helpers/planningHelper';
import { MONEY } from '../../constants/appConstants';

const today = new Date();
const initialState = {
    emiChangeId: 0,
    loanAmount: 0,
    tenure: 5,
    interestRate: 5,
    date: toDateString({
        year: today.getFullYear(),
        month: today.getMonth()
    }),
    loanAmountInLakshs: true,
    tenureInYear: true,
    tabKey: 'emiChange1',
    emiChange1: {
        startDate: null,
        emiChangedDate: null,
        currentEmi: 0,
        increasedEmi: 0,
        disabled: true
    },
    emiChange2: {
        startDate: null,
        emiChangedDate: null,
        currentEmi: 0,
        increasedEmi: 0,
        disabled: true
    },
    emiChange3: {
        startDate: null,
        emiChangedDate: null,
        currentEmi: 0,
        increasedEmi: 0,
        disabled: true
    },
    emiChange4: {
        startDate: null,
        emiChangedDate: null,
        currentEmi: 0,
        increasedEmi: 0,
        disabled: true
    },
    response: {
        loanAmount: 0,
        loanTerm: null,
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

const isValid = (p) => {
    return p.emiChangedDate !== null && p.increasedEmi > 0;
};

export const changeInEmiReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_IN_EMI.ON_VALUE_CHANGE_SUCCESS: {
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
                let setProps = { ...state[prop] };
                if (innerProp == 'emiChangedDate') {
                    setProps = { ...setProps, emiChangedDate: value }
                }
                if (innerProp == 'increasedEmi') {
                    setProps = { ...setProps, increasedEmi: value }
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
            let emiChange1 = { ...state.emiChange1 };
            let emiChange2 = { ...state.emiChange2 };
            let emiChange3 = { ...state.emiChange3 };
            let emiChange4 = { ...state.emiChange4 };
            let date = state.date;
            if (name == "loanDate") {
                emiChange1 = { ...state.emiChange1, startDate: action.payload.value };
                emiChange2 = { ...state.emiChange2, startDate: action.payload.value };
                emiChange3 = { ...state.emiChange3, startDate: action.payload.value };
                emiChange4 = { ...state.emiChange4, startDate: action.payload.value };
                date = action.payload.value;
            }
            return {
                ...state,
                tenure,
                loanAmount,
                emiChange1,
                emiChange2,
                emiChange3,
                emiChange4,
                date,
                [action.payload.name]: action.payload.value
            };
        }
        case CHANGE_IN_EMI.CALCULATE_EMI_CHANGE_REQUEST_START:
            return {
                ...state,
                isLoading: true
            };
        case CHANGE_IN_EMI.CLEAR_CHANGE_IN_EMI:
            return {
                ...state,
                emiChangeId: 0,
                loanAmount: 25,
                tenure: 10,
                interestRate: 5,
                date: toDateString({
                    year: today.getFullYear(),
                    month: today.getMonth()
                }),
                loanAmountInLakshs: true,
                tenureInYear: true,
                tabKey: 'emiChange1',
                emiChange1: {
                    startDate: null,
                    emiChangedDate: null,
                    currentEmi: 0,
                    increasedEmi: 0,
                    disabled: true
                },
                emiChange2: {
                    startDate: null,
                    emiChangedDate: null,
                    currentEmi: 0,
                    increasedEmi: 0,
                    disabled: true
                },
                emiChange3: {
                    startDate: null,
                    emiChangedDate: null,
                    currentEmi: 0,
                    increasedEmi: 0,
                    disabled: true
                },
                emiChange4: {
                    startDate: null,
                    emiChangedDate: null,
                    currentEmi: 0,
                    increasedEmi: 0,
                    disabled: true
                },
                response: {
                    loanAmount: 0,
                    loanTerm: null,
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
        case CHANGE_IN_EMI.CALCULATE_EMI_CHANGE_RESPONSE: {
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
                    revisedEmi: payload.revisedEmi ? Math.round(payload.revisedEmi) : null,
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
            let { emiChange, emiCalculator } = action.payload;
            let modifiedState = {
                ...state,
                requestCount: state.requestCount + 1
            };
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
                if (emiChange.length === 0) {
                    modifiedState = {
                        ...modifiedState,
                        emiChange1: {
                            ...modifiedState.emiChange1,
                            startDate: emiCalculator.date
                        }
                    };
                } else {
                    loanStartDate = emiCalculator.date;
                }
            }
            if (emiChange.length > 0) {
                let emiChangeKey = 'emiChange';
                for (let index = 0; index < emiChange.length; index++) {
                    let change = emiChange[index];
                    let prop = emiChangeKey + (index + 1);

                    modifiedState = {
                        ...modifiedState,
                        emiChangeId: change.emiChangeId,
                        [prop]: {
                            ...modifiedState[prop],
                            emiChangedDate: change.emiChangedDate,
                            startDate: loanStartDate,
                            increasedEmi: change.increasedEmi,
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
        case CHANGE_IN_EMI.CHANGE_IN_EMI_BUTTON_CLICKED: {
            return {
                ...state,
                buttonClicked: true
            };
        }
        default:
            return state;
    }
};
