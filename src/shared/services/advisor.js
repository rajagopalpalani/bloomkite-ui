import { API } from './api';
import { API as simpleApi } from './simpleApi';
import { pageURI } from '../constants/apiAttributes';

export const loginHandle = (payload) => {
    return API.post(`${pageURI.login}`, payload).then((response) => {
        return response.data;
    });
};
export const validateUniqueFields = (payload) => {
    return API.post(`${pageURI.validateUniqueFields}`, payload).then((response) => {
        return response.data;
    });
};

export const addAdvBrandInfo = (payload) => {
    return API.post(`${pageURI.addAdvBrandInfo}`, payload).then((response) => {
        return response.data;
    });
};

export const addAdvPersonalInfo = (payload) => {
    return API.post(`${pageURI.addAdvPersonalInfo}`, payload).then((response) => {
        return response.data;
    });
};

export const addAdvProdInfo = (payload) => {
    return API.post(`${pageURI.addAdvProdInfo}`, payload).then((response) => {
        return response.data;
    });
};

export const addAdvProfessionalInfo = (payload) => {
    return API.post(`${pageURI.addAdvProfessionalInfo}`, payload).then((response) => {
        return response.data;
    });
};

export const addVideo = (payload) => {
    return API.post(`${pageURI.addVideo}`, payload).then((response) => {
        return response.data;
    });
};

export const fetchByAdvisorID = (advId) => {
    return API.post(`${pageURI.fetchByAdvisorID}`, {
        advId
    }).then((response) => {
        return response.data;
    });
};

export const fetchByPublicAdvisorID = (advId) => {
    return API.post(`${pageURI.fetchByPublicAdvisorID}`, {
        advId
    }).then((response) => {
        return response.data;
    });
};

export const addKeyPeople = (payload) => {
    return API.post(`${pageURI.keyPeopleSignup}`, payload).then((response) => {
        return response.data;
    });
};

export const fetchTeam = (advId) => {
    return API.post(`${pageURI.fetchTeam}`, {
        id: advId
    }).then((response) => {
        return response.data;
    });
};

export const fetchKeyPeopleByParentId = (advId) => {
    return API.post(`${pageURI.fetchkeyPeopleByParentId}`, {
        id: advId
    }).then((response) => {
        return response.data;
    });
};

export const fetchAdvisorList = () => {
    return API.get(`${pageURI.fetchAdvisorList}`).then((response) => {
        return response.data;
    });
};

export const fetchBrandList = () => {
    return API.get(`${pageURI.fetchBrandList}`).then((response) => {
        return response.data;
    });
};

export const fetchCategoryList = () => {
    return API.get(`${pageURI.fetchCategoryList}`).then((response) => {
        return response.data;
    });
};

export const fetchCategoryTypeList = () => {
    return API.get(`${pageURI.fetchCategoryTypeList}`).then((response) => {
        return response.data;
    });
};

export const fetchForumCategoryList = () => {
    return API.get(`${pageURI.fetchForumCategoryList}`).then((response) => {
        return response.data;
    });
};

export const fetchForumSubCategoryList = () => {
    return API.get(`${pageURI.fetchForumSubCategoryList}`).then((response) => {
        return response.data;
    });
};

export const fetchForumStatusList = () => {
    return API.get(`${pageURI.fetchForumStatusList}`).then((response) => {
        return response.data;
    });
};

export const fetchLicenseList = () => {
    return API.get(`${pageURI.fetchLicenseList}`).then((response) => {
        return response.data;
    });
};

export const fetchPartyStatusList = () => {
    return API.get(`${pageURI.fetchPartyStatusList}`).then((response) => {
        return response.data;
    });
};

export const fetchProductList = () => {
    return API.get(`${pageURI.fetchProductList}`).then((response) => {
        return response.data;
    });
};

export const fetchAllServiceAndBrand = () => {
    return API.get(`${pageURI.fetchAllServiceAndBrand}`).then((response) => {
        return response.data;
    });
};

export const fetchRemunerationList = () => {
    return API.get(`${pageURI.fetchRemunerationList}`).then((response) => {
        return response.data;
    });
};

export const fetchRiskQuestionaireList = () => {
    return API.get(`${pageURI.fetchRiskQuestionaireList}`).then((response) => {
        return response.data;
    });
};

export const fetchRoleList = () => {
    return API.get(`${pageURI.fetchRoleList}`).then((response) => {
        return response.data;
    });
};

export const fetchServiceList = () => {
    return API.get(`${pageURI.fetchServiceList}`).then((response) => {
        return response.data;
    });
};

export const fetchAllStateCityPincode = () => {
    return simpleApi.get(`${pageURI.fetchAllStateCityPincode}`).then((response) => {
        return response.data;
    });
};

export const fetchAllStateCityPincodeUser = () => {
    return API.get(`${pageURI.fetchAllStateCityPincode}`).then((response) => {
        return response.data;
    });
};

export const fetchAdvBrandRankByAdvId = (payload) => {
    return API.post(`${pageURI.fetchAdvBrandRankByAdvId}`, payload).then((response) => {
        return response.data;
    });
};

export const modifyAdvisor = (payload) => {
    return API.put(`${pageURI.modifyAdvisor}`, payload).then((response) => {
        return response.data;
    });
};

export const modifyKeyPeople = (payload) => {
    return API.put(`${pageURI.modifyKeyPeople}`, payload).then((response) => {
        return response.data;
    });
};

export const modifyAdvisorProduct = (payload) => {
    return API.put(`${pageURI.modifyAdvisorProduct}`, payload).then((response) => {
        return response.data;
    });
};

export const modifyAdvProfessionalInfo = (payload) => {
    return API.put(`${pageURI.modifyAdvProfessionalInfo}`, payload).then((response) => {
        return response.data;
    });
};

export const deleteAdvisor = (payload) => {
    return API.delete(`${pageURI.deleteAdvisor}`, payload).then((response) => {
        return response.data;
    });
};

export const changePassword = (payload) => {
    return API.put(`${pageURI.changePassword}`, payload).then((response) => {
        return response.data;
    });
};

export const teamMemberDeactivate = (payload) => {
    return API.post(`${pageURI.teamMemberDeactivate}`, payload).then((response) => {
        return response.data;
    });
};
export const deleteKeypeople = (payload) => {
    let param = { id: payload.keyPeopleId };
    return API.post(`${pageURI.deleteKeypeople}`, param).then((response) => {
        return response.data;
    });
};

export const updateWorkFlow = (payload) => {
    return API.post(`${pageURI.workFlowStatus}`, payload).then((response) => response.data);
};

export const searchCity = (cityName) => {
    return API.post(`${pageURI.searchCity}?cityName=${cityName}`).then((response) => {
        return response.data;
    });
};

export const fetchAdvisorByUserName = (userName) => {
    return API.post(`${pageURI.fetchAdvisorByUserName}`, {
        userName
    }).then((response) => {
        return response.data;
    });
};

export const fetchAdvisorByUserNameWithOutToken = (userName) => {
    return API.post(`${pageURI.fetchAdvisorByUserNameWithOutToken}`, {
        userName
    }).then((response) => {
        return response.data;
    });
};

export const updateSubscription = (payload) => {
    return API.post(`${pageURI.updateSubscription}`, payload).then((response) => {
        return response.data;
    });
};

export const fetchAllMembershipPlan = (payload) => {
    return API.post(`${pageURI.fetchAllMembershipPlan}`, payload).then((response) => {
        return response.data;
    });
};

export const createSubscription = (payload) => {
    return API.post(`${pageURI.createSubscription}`, payload).then((response) => {
        return response.data;
    });
};

export const cancelSubscription = (payload) => {
    return API.post(`${pageURI.cancelSubscription}`, payload).then((response) => {
        return response.data;
    });
};

export const createSinglePaymentOrder = (payload) => {
    return API.post(`${pageURI.createSinglePaymentOrder}`, payload).then((response) => {
        return response.data;
    });
};

export const verifySinglePayment = (payload) => {
    return API.post(`${pageURI.verifySinglePayment}`, payload).then((response) => {
        return response.data;
    });
};

export const fetchDashboardCount = (payload) => {
    return API.post(`${pageURI.fetchDashboardCount}`, payload).then((response) => {
        return response.data;
    });
};

export const validatePassword = (payload) => {
    return API.put(`${pageURI.validatePassword}`, payload).then((response) => {
        return response.data;
    });
};

export const verifySubscription = (payload) => {
    return API.post(`${pageURI.verifySubscription}`, payload).then((response) => {
        return response.data;
    });
};

export const fetchSubscription = (payload) => {
    return API.post(`${pageURI.fetchSubscription}`, payload).then((response) => {
        return response.data;
    });
};

export const createOrderNumber = (payload) => {
    return API.post(`${pageURI.createOrderNumber}`, payload).then((response) => {
        return response.data;
    });
};

export const updateOrderDetail = (payload) => {
    return API.post(`${pageURI.updateOrderDetail}`, payload).then((response) => {
        return response.data;
    });
};
