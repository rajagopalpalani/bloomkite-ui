

import axios from "axios";
import { apibaseURI, pageURI } from '../constants/apiAttributes';
import { FETCH_ADVISOR } from './actionTypes';

import { toastrError, toastrSuccess } from "../helpers/toastrHelper";
import { toastrMessage } from '../constants/toastrMessage';
//import store from '../core/configureStore';

//export const action = type => store.dispatch({ type });


/**
 * This method is used to create the ADD_TODO action.
 * It is dispatched to the reducer and handled by it.
 *
 * @param name Name of the todo item
 * @returns {{type: string, payload: {name: *}}} ADD_TODO action
 */
export const advisorIDDetails = (value) => ({
    type: FETCH_ADVISOR.ADVISOR_ID_DETAILS,
    payload: value
});
export const advisorListDetails = (value) => ({
    type: FETCH_ADVISOR.ADVISOR_LIST_DETAILS,
    payload: value
});
export const BrandListDetails = (value) => ({
    type: FETCH_ADVISOR.BRAND_LIST_DETAILS,
    payload: value
});
export const CategoryListDetails = (value) => ({
    type: FETCH_ADVISOR.CATEGORY_LIST_DETAILS,
    payload: value
});
export const CategoryTypeListDetails = (value) => ({
    type: FETCH_ADVISOR.CATEGORY_TYPE_LIST_DETAILS,
    payload: value
});
export const ForumCategoryListDetails = (value) => ({
    type: FETCH_ADVISOR.FORUM_CATEGORY_LIST_DETAILS,
    payload: value
});
export const ForumStatusListDetails = (value) => ({
    type: FETCH_ADVISOR.FORUM_STATUS_LIST_DETAILS,
    payload: value
});
export const ForumSubCategoryListDetails = (value) => ({
    type: FETCH_ADVISOR.FORUM_SUB_CATEGORY_LIST_DETAILS,
    payload: value
});
export const GoalsServedListDetails = (value) => ({
    type: FETCH_ADVISOR.GOALS_SERVED_LIST_DETAILS,
    payload: value
});
export const LicenseListDetails = (value) => ({
    type: FETCH_ADVISOR.LICENSE_LIST_DETAILS,
    payload: value
});
export const PartyStatusListDetails = (value) => ({
    type: FETCH_ADVISOR.PARTY_STATUS_LIST_DETAILS,
    payload: value
});
export const ProductListDetails = (value) => ({
    type: FETCH_ADVISOR.PRODUCT_LIST_DETAILS,
    payload: value
});
export const AllServiceAndBrandDetails = (value) => ({
    type: FETCH_ADVISOR.ALL_SERVICE_AND_BRAND_DETAILS,
    payload: value
});
export const RenumerationListDetails = (value) => ({
    type: FETCH_ADVISOR.RENUMERATION_LIST_DETAILS,
    payload: value
});
export const RiskQuestionaireListDetails = (value) => ({
    type: FETCH_ADVISOR.RISK_QUESTIONAIRE_LIST_DETAILS,
    payload: value
});
export const RoleListDetails = (value) => ({
    type: FETCH_ADVISOR.ROLE_LIST_DETAILS,
    payload: value
});
export const ServiceListDetails = (value) => ({
    type: FETCH_ADVISOR.SERVICE_LIST_DETAILS,
    payload: value
});
export const SpecialisedSkillsDetails = (value) => ({
    type: FETCH_ADVISOR.SPECIALISED_SKILLS_DETAILS,
    payload: value
});
export const AllStateCityPincodeDetails = (value) => ({
    type: FETCH_ADVISOR.ALL_STATE_CITY_PINCODE_DETAILS,
    payload: value
});
export const AdvBrandRankByAdvIdDetails = (value) => ({
    type: FETCH_ADVISOR.ADVBRAND_RANK_BY_ADVID_DETAILS,
    payload: value
});
export const AccountListDetails = (value) => ({
    type: FETCH_ADVISOR.ACCOUNT_LIST_DETAILS,
    payload: value
});
export const AccountTypeListDetails = (value) => ({
    type: FETCH_ADVISOR.ACCOUNT_TYPE_LIST_DETAILS,
    payload: value
});
export const CashFlowItemListDetails = (value) => ({
    type: FETCH_ADVISOR.CASH_FLOW_ITEM_LIST_DETAILS,
    payload: value
});
export const CashFlowItemTypeListDetails = (value) => ({
    type: FETCH_ADVISOR.CASH_FLOW_ITEM_TYPE_LIST_DETAILS,
    payload: value
});
export const PriorityItemListDetails = (value) => ({
    type: FETCH_ADVISOR.PRIORITY_ITEM_LIST_DETAILS,
    payload: value
});
export const RiskPortfolioListDetails = (value) => ({
    type: FETCH_ADVISOR.RISK_PORTFOLIO_LIST_DETAILS,
    payload: value
});
export const UrgencyListDetails = (value) => ({
    type: FETCH_ADVISOR.URGENCY_LIST_DETAILS,
    payload: value
});


export const fetchByAdvisorID = (options) => (dispatch, getState) => {
    axios.post(`${apibaseURI}${pageURI.fetchByAdvisorID}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.advisorSuccessId);
            dispatch(advisorIDDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}


export const fetchAdvisorList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchAdvisorList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.advisorSuccessList);
            dispatch(advisorListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchBrandList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchBrandList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.brandSuccessList);
            dispatch(BrandListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchCategoryList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchCategoryList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.categorySuccessList);
            dispatch(CategoryListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchCategoryTypeList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchCategoryTypeList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.categoryTypeSuccessList);
            dispatch(CategoryTypeListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchForumCategoryList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchForumCategoryList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.forumCategorySuccessList);
            dispatch(ForumCategoryListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchForumStatusList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchForumStatusList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.forumStatusSuccessList);
            dispatch(ForumStatusListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchForumSubCategoryList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchForumSubCategoryList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.forumSubCategorySuccessList);
            dispatch(ForumSubCategoryListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchGoalsServedList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchGoalsServedList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.goalServedSuccessList);
            dispatch(GoalsServedListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchLicenseList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchLicenseList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.licenseSuccessList);
            dispatch(LicenseListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchPartyStatusList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchPartyStatusList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.partyStatusSuccessList);
            dispatch(PartyStatusListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchProductList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchProductList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.productSuccessList);
            dispatch(ProductListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchAllServiceAndBrand = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchAllServiceAndBrand}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.allServiceSuccessList);
            dispatch(AllServiceAndBrandDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchRemunerationList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchRemunerationList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.renumerationSuccessList);
            dispatch(RenumerationListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchRiskQuestionaireList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchRiskQuestionaireList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.questionaireSuccessList);
            dispatch(RiskQuestionaireListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchRoleList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchRoleList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.roleSuccessList);
            dispatch(RoleListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchServiceList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchServiceList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.serviceSuccessList);
            dispatch(ServiceListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchSpecialisedSkills = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchSpecialisedSkills}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.skillSuccessList);
            dispatch(SpecialisedSkillsDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchAllStateCityPincode = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchAllStateCityPincode}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.allStateSuccessList);
            dispatch(AllStateCityPincodeDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchAdvBrandRankByAdvId = (options) => (dispatch, getState) => {
    axios.post(`${apibaseURI}${pageURI.fetchAdvBrandRankByAdvId}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.brandBankSuccessList);
            dispatch(AdvBrandRankByAdvIdDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchAccountList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchAccountList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.accountSuccessList);
            dispatch(AccountListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchAccountTypeList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchAccountTypeList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.accountTypeSuccessList);
            dispatch(AccountTypeListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchCashFlowItemList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchCashFlowItemList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.cashFlowSuccessList);
            dispatch(CashFlowItemListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchCashFlowItemTypeList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchCashFlowItemTypeList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.cashFlowItemSuccessList);
            dispatch(CashFlowItemTypeListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchPriorityItemList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchPriorityItemList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.riskPortfolioSuccessList);
            dispatch(PriorityItemListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}

export const fetchRiskPortfolioList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchRiskPortfolioList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.riskPortfolioSuccessList);
            dispatch(RiskPortfolioListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}


export const fetchUrgencyList = (options) => (dispatch, getState) => {
    axios.get(`${apibaseURI}${pageURI.fetchUrgencyList}`, options)
        .then(response => {
            toastrSuccess(toastrMessage.urgencySuccessList);
            dispatch(UrgencyListDetails(response.data));
        }).catch(error => {
            toastrError(toastrMessage.loginErrorFound + error);
        });
}