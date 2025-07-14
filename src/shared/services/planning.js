import { API } from './api';
import { pageURI } from '../constants/apiAttributes';

export const fetchFinancialPlanning = (id) => {
    return API.post(`${pageURI.fetchFinancialPlanningById}`, {
        id
    }).then((response) => {
        return response.data;
    });
};

export const fetchLoanPlanning = (id) => {
    return API.post(`${pageURI.fetchLoanPlanningById}`, {
        id
    }).then((response) => {
        return response.data;
    });
};

export const fetchInvestmentPlanning = (id) => {
    return API.post(`${pageURI.fetchInvestmentPlanningById}`, {
        id
    }).then((response) => {
        return response.data;
    });
};

export const fetchPlanByReference = (id) => {
    return API.post(`${pageURI.fetchPlanByReferenceId}`, {
        id
    }).then((response) => {
        return response.data;
    });
};

export const fetchPlanByPartyId = (partyId) => {
    return API.post(`${pageURI.fetchPlanByPartyId}`, {
        partyId
    }).then((response) => {
        return response.data;
    });
};

export const addPlan = (payload) => {
    return API.post(`${pageURI.addPlan}`, payload).then((response) => {
        return response.data;
    });
};

export const modifyPlan = (payload) => {
    return API.put(`${pageURI.modifyPlan}`, payload).then((response) => {
        return response.data;
    });
};

export const removePlan = (payload) => {
    return API.post(`${pageURI.removePlan}`, payload).then((response) => {
        return response.data;
    });
};

export const fetchGoalPlanning = (payload) => {
    return API.post(`${pageURI.fetchGoalPlanning}`, payload).then((response) => {
        return response.data;
    });
};

export const calculateGoal = (payload) => {
    return API.post(`${pageURI.calculateGoal}`, payload).then((response) => {
        return response.data;
    });
};

export const calculateCashflow = (payload) => {
    return API.post(`${pageURI.calculateCashFlow}`, payload).then((response) => {
        return response.data;
    });
};

export const calculateNetworth = (payload) => {
    return API.post(`${pageURI.calculateNetworth}`, payload).then((response) => {
        return response.data;
    });
};

export const calculatePriorities = (payload) => {
    return API.post(`${pageURI.calculatePriorities}`, payload).then((response) => {
        return response.data;
    });
};

export const calculateInsurance = (payload) => {
    return API.post(`${pageURI.calculateInsurance}`, payload).then((response) => {
        return response.data;
    });
};

export const fetchRiskPlanning = (payload) => {
    return API.post(`${pageURI.fetchRiskPlanning}`, payload).then((response) => {
        return response.data;
    });
};

export const calculateRiskProfile = (payload) => {
    return API.post(`${pageURI.calculateRiskProfile}`, payload).then((response) => {
        return response.data;
    });
};

export const fetchRiskQuestionaireList = (payload) => {
    return API.get(`${pageURI.fetchAllRiskQuestionaire}`, payload).then((response) => {
        return response.data;
    });
};

export const calculateEmi = (payload) => {
    return API.post(`${pageURI.emiCalculator}`, payload).then((response) => {
        return response.data;
    });
};

export const calculatePartialPayments = (payload) => {
    return API.post(`${pageURI.calculatePartialPayment}`, payload).then((response) => {
        return response.data;
    });
};

export const calculateEmiChange = (payload) => {
    return API.post(`${pageURI.emiChange}`, payload).then((response) => {
        return response.data;
    });
};

export const calculateInterestChange = (payload) => {
    return API.post(`${pageURI.interestChange}`, payload).then((response) => {
        return response.data;
    });
};

export const calculateEmiCapacity = (payload) => {
    return API.post(`${pageURI.emiCapacity}`, payload).then((response) => {
        return response.data;
    });
};

export const calculateFutureValue = (payload) => {
    return API.post(`${pageURI.calculateFutureValue}`, payload).then((response) => {
        return response.data;
    });
};

export const calculateTargetValue = (payload) => {
    return API.post(`${pageURI.calculateTargetValue}`, payload).then((response) => {
        return response.data;
    });
};

export const calculateRateFinder = (payload) => {
    return API.post(`${pageURI.calculateRateFinder}`, payload).then((response) => {
        return response.data;
    });
};

export const calculateTenureFinder = (payload) => {
    return API.post(`${pageURI.calculateTenureFinder}`, payload).then((response) => {
        return response.data;
    });
};

export const createCalcQuery = (payload) => {
    return API.post(`${pageURI.createCalcQuery}`, payload).then((response) => {
        return response.data;
    });
};

export const fetchSharedPlanByPostedPartyId = (partyId) => {
    return API.post(`${pageURI.fetchSharedPlanByPostedPartyId}`, { partyId }).then((response) => {
        return response.data;
    });
};

export const fetchSharedByPartyIdAndRefId = (payload) => {
    return API.post(`${pageURI.fetchSharedByPartyIdAndRefId}`, payload).then((response) => {
        return response.data;
    });
};

export const fetchSharedByRefId = (referenceId) => {
    return API.post(`${pageURI.fetchSharedByRefId}`, { referenceId }).then((response) => {
        return response.data;
    });
};

export const commentQueries = (payload) => {
    return API.post(`${pageURI.commentQueries}`, payload).then((response) => {
        return response.data;
    });
};

export const createCalcAnswer = (payload) => {
    return API.post(`${pageURI.createCalcAnswer}`, payload).then((response) => {
        return response.data;
    });
};

export const fetchQueries = (payload) => {
    return API.post(`${pageURI.fetchQueries}`, payload).then((response) => {
        return response.data;
    });
};

export const fetchCalcAnswer = (id) => {
    return API.post(`${pageURI.fetchCalcAnswer}`, { id }).then((response) => {
        return response.data;
    });
};
