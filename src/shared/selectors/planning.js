import { createSelector } from 'reselect';

const cashFlow = (state) => state.planningReducer.cashFlow;

export const filterByCashFlowItemTypeId = (id, cashFlow, lable) => {
    if (cashFlow) {
        const cashFlowItems = cashFlow
            .filter(({ cashFlowItemTypeId }) => cashFlowItemTypeId === id)
            .map(({ cashFlowItemId, cashFlowItem, actualAmt, budgetAmt }) => {
                return {
                    cashFlowItemId,
                    cashFlowItem,
                    budgetAmt,
                    actualAmt
                };
            });

        const budgetAmt = cashFlowItems.reduce((totalValue, cashFlow) => totalValue + cashFlow.budgetAmt, 0);
        const actualAmt = cashFlowItems.reduce((totalValue, cashFlow) => totalValue + cashFlow.actualAmt, 0);
        return {
            formValues: cashFlowItems,
            totalSum: {
                lable,
                totalBudgetAmt: budgetAmt,
                totalActualAmt: actualAmt
            }
        };
    } else {
        return {
            formValues: [],
            totalSum: {
                lable: '',
                totalBudgetAmt: 0,
                totalActualAmt: 0
            }
        };
    }
};

const cashFlowFormatter = createSelector(cashFlow, (items) => ({
    mandatoryHouseholdExpenses: filterByCashFlowItemTypeId(1, items, 'Household Expenses'),
    lifeStyleExpenses: filterByCashFlowItemTypeId(2, items, 'Life Style Expenses'),
    reccuringLoanRepayments: filterByCashFlowItemTypeId(3, items, 'Loan Payments'),
    reccuringInvestments: filterByCashFlowItemTypeId(4, items, 'Investments'),
    reccuringIncome: filterByCashFlowItemTypeId(5, items, 'Income')
}));

export const cashFlowSelector = (state) => ({
    advisorDetails: state.advisorReducer.advisorDetails,
    cashFlow: cashFlowFormatter(state),
    cashFlowSummary: state.planningReducer.cashFlowSummary,
    isLoading: state.planningReducer.isLoading
});

export const filterByAccountTypeId = (id, networth) => {
    const networthItems = networth
        ? networth
              .filter(({ accountTypeId }) => accountTypeId === id)
              .map(({ accountEntryId, accountEntry, futureValue, value }) => {
                  return {
                      accountEntryId,
                      accountEntry,
                      futureValue,
                      value
                  };
              })
        : [];
    const value = networthItems.reduce((totalValue, networth) => totalValue + networth.value, 0);
    const futureValue = networthItems.reduce((totalValue, networth) => totalValue + networth.futureValue, 0);
    return {
        formValues: networthItems,
        totalSum: {
            lable: id === 1 ? 'Total Assets' : 'Total Liabilities',
            totalValue: value,
            totalFutureValue: futureValue
        }
    };
};

const networth = (state) => state.planningReducer.networth;

const networthFormatter = createSelector(networth, (items) => ({
    assets: filterByAccountTypeId(1, items),
    liabilities: filterByAccountTypeId(2, items)
}));

export const networthSelector = (state) => ({
    networth: networthFormatter(state),
    networthSummary: state.planningReducer.networthSummary,
    advisorDetails: state.advisorReducer.advisorDetails,
    isLoading: state.planningReducer.isLoading
});

export const prioritySelector = (state) => ({
    priorities: state.planningReducer.priority,
    advisorDetails: state.advisorReducer.advisorDetails,
    isLoading: state.planningReducer.isLoading
});

export const insuranceSelector = (state) => {
    let { insurance } = state.planningReducer;
    // if (insurance) {
    //     insurance.stability.value = insurance.stability.value || '';
    //     insurance.predictability.value = insurance.predictability.value || '';
    // }
    return {
        insurance,
        advisorDetails: state.advisorReducer.advisorDetails,
        isLoading: state.planningReducer.isLoading
    };
};

export const riskProfileSelector = (state) => ({
    advisorDetails: state.advisorReducer.advisorDetails,
    riskProfile: state.planningReducer.riskProfile,
    riskSummary: state.planningReducer.riskSummary,
    riskQuestionaire: state.planningReducer.riskQuestionaire,
    isLoading: state.planningReducer.isLoading
});

export const planningSelector = (state) => ({
    loggedDetails: state.planningReducer.loginReducer,
    advisorDetails: state.advisorReducer.advisorDetails,
    investorDetails: state.investorReducer.investorDetails,
    planUsers: state.planningReducer.planUsers,
    planDetails: state.planningReducer.planDetails,
    teamDetails: state.teamSignupReducer && state.teamSignupReducer.teamDetails,
    isLoading: state.appStateReducer ? state.appStateReducer.isLoading : false,
    cashFlowSummary: state.planningReducer.cashFlowSummary,
    networthSummary: state.planningReducer.networthSummary,
    priorities: state.planningReducer.priority,
    insurance: state.planningReducer.insurance,
    riskProfile: state.planningReducer.riskProfile,
    riskSummary: state.planningReducer.riskSummary,
    riskQuestionaire: state.planningReducer.riskQuestionaire,
    cashFlow: cashFlowFormatter(state),
    networth: networthFormatter(state),
    environment: state.environment,
    sharedPlans: state.planningReducer.sharedPlans,
    mySharedPlans: state.planningReducer.mySharedPlans,
    verifyOtpDetails: state.verifyOtpReducer,
    mySharedPlansByRef: state.planningReducer.mySharedPlansByRef,
    followersRequest: state.followersReducer.followersRequest
});
