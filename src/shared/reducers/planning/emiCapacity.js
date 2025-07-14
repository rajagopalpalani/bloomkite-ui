import { EMI_CAPACITY, PLANNING } from '../../actions/actionTypes';
import { percentage } from '../../helpers/planningHelper';

const initialState = {
    emiCapacityId: 0,
    additionalIncome: 0,
    backUp: 'YES',
    currentAge: null,
    existingEmi: 0,
    houseHoldExpense: 0,
    interestRate: 10,
    netFamilyIncome: 0,
    retirementAge: null,
    stability: 'HIGH',
    requestCount: 0,
    buttonClicked: false,
    response: {
        termOfLoan: null,
        surplusMoney: null,
        surplus: null,
        emiCapacity: null,
        emiPayable: null,
        advisableLoanAmount: null,
        principalLoanAmountInPercent: 0,
        interestInPercent: 0
    }
};

export const emiCapacityReducer = (state = initialState, action) => {
    switch (action.type) {
        case EMI_CAPACITY.ON_VALUE_CHANGE_SUCCESS: {
            return {
                ...state,
                [action.payload.name]: action.payload.value
            };
        }
        case EMI_CAPACITY.CALCULATE_EMI_CAPACITY_RESPONSE: {
            let { payload } = action;
            let total = state.principle + state.interest;
            let principalLoanAmountInPercent = percentage(state.principle, total);
            let interestInPercent = percentage(state.interest, total);
            return {
                ...state,
                requestCount: state.requestCount + 1,
                response: {
                    termOfLoan: payload.termOfLoan,
                    surplusMoney: payload.surplusMoney,
                    surplus: payload.surplus,
                    emiCapacity: Math.round(payload.emiCapacity),
                    emiPayable: payload.emiPayable,
                    advisableLoanAmount: payload.advisableLoanAmount,
                    principalLoanAmountInPercent,
                    interestInPercent,
                    total
                }
            };
        }
        case PLANNING.FETCH_LOAN_PLANNING_SUCCESS:
            let { emiCapacity } = action.payload;
            if (emiCapacity) {
                return {
                    ...state,
                    emiCapacityId: emiCapacity.emiCapacityId,
                    currentAge: emiCapacity.currentAge,
                    retirementAge: emiCapacity.retirementAge,
                    stability: emiCapacity.stability,
                    backUp: emiCapacity.backUp,
                    netFamilyIncome: emiCapacity.netFamilyIncome,
                    existingEmi: emiCapacity.existingEmi,
                    houseHoldExpense: emiCapacity.houseHoldExpense,
                    additionalIncome: emiCapacity.additionalIncome,
                    interestRate: emiCapacity.interestRate
                };
            }
            return {
                ...state,
                state,
                requestCount: state.requestCount + 1
            };
        case EMI_CAPACITY.CHANGE_EMI_CAPACITY_BUTTON_CLICKED: {
            return {
                ...state,
                buttonClicked: true
            };
        }
        case EMI_CAPACITY.CLEAR_EMI_CAPACITY: {
            return {
                ...state,
                emiCapacityId: 0,
                additionalIncome: 0,
                backUp: 'YES',
                currentAge: null,
                existingEmi: 0,
                houseHoldExpense: 0,
                interestRate: 10,
                netFamilyIncome: 0,
                retirementAge: null,
                stability: 'HIGH',
                requestCount: 0,
                buttonClicked: false,
                response: {
                    termOfLoan: null,
                    surplusMoney: null,
                    surplus: null,
                    emiCapacity: null,
                    emiPayable: null,
                    advisableLoanAmount: null,
                    principalLoanAmountInPercent: 0,
                    interestInPercent: 0
                }
            };
        }

        default:
            return state;
    }
};
