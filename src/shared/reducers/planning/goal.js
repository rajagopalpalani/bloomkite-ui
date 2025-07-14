import { PLANNING, MY_GOAL } from '../../actions/actionTypes';
import { MONEY } from '../../constants/appConstants';

const initialState = {
    goalId: 0,
    goalName: null,
    referenceId: null,
    tenure: 0,
    tenureInYear: true,
    goalAmount: 0,
    inflationRate: 0,
    currentAmount: 0,
    growthRate: 0,
    annualInvestmentRate: 0,
    annualInv: 0,
    finalCorpus: 0,
    futureCost: 0,
    futureValue: 0,
    monthlyInv: 0,
    rateOfReturn: 0,
    goals: [],
    isLoading: false,
    goalAmountInLakshs: true,
    currentAmountInLakshs: true,
    requestCount: 0
};

const updateGoal = (state, goal, goals) => {
    let goalAmount = goal.goalAmount;
    let currentAmount = goal.currentAmount;
    let goalAmountInLakshs = true;
    let currentAmountInLakshs = true;
    // if (goalAmountInLakshs){
    //     currentAmountInLakshs = true;
    // }
    if (goalAmount < MONEY.CRORE) {
        goalAmountInLakshs = true;
        goalAmount = goalAmount / MONEY.LAKSH;
    } else {
        goalAmount = goalAmount / MONEY.CRORE;
    }
    if (currentAmount < MONEY.CRORE) {
        currentAmountInLakshs = true;
        currentAmount = currentAmount / MONEY.LAKSH;
    } else {
        currentAmount = currentAmount / MONEY.CRORE;
    }
    return {
        ...state,
        goalId: goal.goalId,
        goalName: goal.goalName,
        referenceId: goal.referenceId,
        tenure: goal.tenure,
        tenureInYear: goal.tenureType === 'YEAR',
        goalAmount: goalAmount,
        goalAmountInLakshs,
        inflationRate: goal.inflationRate,
        currentAmount: currentAmount,
        currentAmountInLakshs,
        growthRate: goal.growthRate,
        annualInvestmentRate: goal.annualInvestmentRate,
        annualInv: Math.round(goal.annualInv),
        finalCorpus: Math.round(goal.finalCorpus),
        futureCost: Math.round(goal.futureCost),
        futureValue: Math.round(goal.futureValue),
        monthlyInv: Math.round(goal.monthlyInv),
        rateOfReturn: goal.rateOfReturn,
        requestCount: state.requestCount + 1,
        isLoading: false,
        goals: goals
    };
};

export const goalReducer = (state = initialState, action) => {
    switch (action.type) {

        case MY_GOAL.ON_VALUE_CHANGE_SUCCESS: {
            let { name, value } = action.payload;
            let tenure = state.tenure;
            if (name === 'tenureInYear') {
                if (value && state.tenure > 30) {
                    tenure = state.tenure / 12;
                } else if (!value && state.tenure <= 30) {
                    tenure = state.tenure * 12;
                }
            }
            let currentAmountInLakshs = state.currentAmountInLakshs;
            let goalAmount = state.goalAmount;
            if (name === 'goalAmountInLakshs') {
                if (value) {
                    currentAmountInLakshs = true;
                    if (state.goalAmount < 1) {
                        goalAmount = state.goalAmount * 100;
                    } else {
                        goalAmount = 1 * 100;
                    }
                } else if (!value && state.goalAmount > 10) {
                    goalAmount = state.goalAmount / 100;
                } else if (!value){
                    currentAmountInLakshs = false;
                }

            }
            let goalAmountInLakshs = state.goalAmountInLakshs;
            let currentAmount = state.currentAmount;
            if (name === 'currentAmountInLakshs') {
                if (value) {
                    goalAmountInLakshs = true;
                    if (state.currentAmount < 1) {
                        currentAmount = state.currentAmount * 100;
                    } else {
                        currentAmount = 1 * 100;
                    }
                } else if (!value && state.currentAmount > 10) {
                    currentAmount = state.currentAmount / 100;
                } else if (!value){
                    currentAmountInLakshs = false;
                }
            }
            if (name === 'goalName') {
                let goal = state.goals.find((p) => p.goalName === value);
                if (goal) {
                    return updateGoal(state, goal, state.goals);
                }
            }
            return {
                ...state,
                currentAmountInLakshs,
                goalAmountInLakshs,
                tenure,
                goalAmount,
                currentAmount,
                isLoading: true,
                [action.payload.name]: value
            };
        }
        case MY_GOAL.CLEAR_GOALVALUE: {
            return {
                ...state,
                goalId: 0,
                // goalName: null,
                referenceId: null,
                tenure: 0,
                tenureInYear: true,
                goalAmount: 0,
                inflationRate: 0,
                currentAmount: 0,
                growthRate: 0,
                annualInvestmentRate: 0,
                annualInv: 0,
                finalCorpus: 0,
                futureCost: 0,
                futureValue: 0,
                monthlyInv: 0,
                rateOfReturn: 0,
                goalAmountInLakshs: true,
                currentAmountInLakshs: true,
                requestCount: 0
            }
        }
        case MY_GOAL.CALCULATE_RESPONSE: {
            let { payload } = action;
            let goal;
            if (payload && payload.length > 0) {
                goal = payload.find((p) => p.goalName === state.goalName);
            } else {
                payload = [payload];
                goal = payload.find((p) => p.goalName === state.goalName);
            }
            return updateGoal(state, goal, payload);
        }
        case MY_GOAL.RESET:
            return initialState;
        case MY_GOAL.FETCH_GOAL_PLANNING_RESPONSE:
            if (action.payload && action.payload.goal && action.payload.goal.length > 0) {
                return {
                    ...state,
                    goals: action.payload.goal
                };
            }
            return state;
        default:
            return state;
    }
};
