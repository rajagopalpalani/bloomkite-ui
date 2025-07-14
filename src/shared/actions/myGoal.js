import { MY_GOAL } from './actionTypes';

export const fetchGoalPlanning = () => ({
    type: MY_GOAL.FETCH_GOAL_PLANNING
});

export const onChange = (name, value, type) => ({
    type: MY_GOAL.ON_VALUE_CHANGE,
    payload: {
        name,
        value,
        type
    }
});

export const calculate = (value) => ({
    type: MY_GOAL.CALCULATE_REQUEST,
    payload: value
});

export const clearGoalValue = () => ({
    type: MY_GOAL.CLEAR_GOALVALUE
});
