import { ADVISOR } from './actionTypes';
import { FETCH_ADVISOR } from './actionTypes';

//import store from '../core/configureStore';

//export const action = type => store.dispatch({ type });

/**
 * This method is used to create the ADD_TODO action.
 * It is dispatched to the reducer and handled by it.
 *
 * @param name Name of the todo item
 * @returns {{type: string, payload: {name: *}}} ADD_TODO action
 */
export const advisorBrandDetails = (value) => ({
    type: ADVISOR.ADVISOR_BRAND_INFO,
    payload: value
});

export const advisorPersonalDetails = (value) => ({
    type: ADVISOR.ADVISOR_PERSONAL_INFO,
    payload: value
});
export const advisorProdDetails = (value) => ({
    type: ADVISOR.ADVISOR_PROD_INFO,
    payload: value
});
export const advisorProfessionalDetails = (value) => ({
    type: ADVISOR.ADVISOR_PROFESSIONAL_INFO,
    payload: value
});
export const advisorVideoDetails = (value) => ({
    type: ADVISOR.ADVISOR_VIDEO,
    payload: value
});

export const fetchByAdvisorID = (value) => ({
    type: FETCH_ADVISOR.FETCH_BY_ADVISOR_ID,
    payload: value
});

export const fetchByPublicAdvisorID = (value) => ({
    type: FETCH_ADVISOR.FETCH_BY_PUBLIC_ADVISOR_ID,
    payload: value
});

export const fetchByAdvisorIDSuccess = (value) => ({
    type: FETCH_ADVISOR.FETCH_BY_ADVISOR_ID_SUCCESS,
    payload: value
});

export const fetchAdvisorList = () => ({
    type: FETCH_ADVISOR.FETCH_ADVISOR_LIST
});

export const fetchBrandList = () => ({
    type: FETCH_ADVISOR.FETCH_BRAND_LIST
});

export const fetchCategoryList = () => ({
    type: FETCH_ADVISOR.FETCH_CATEGORY_LIST
});

export const fetchCategoryTypeList = () => ({
    type: FETCH_ADVISOR.FETCH_CATEGORY_TYPE_LIST
});

export const fetchForumCategoryList = () => ({
    type: FETCH_ADVISOR.FETCH_FORUM_CATEGORY_LIST
});

export const fetchForumStatusList = () => ({
    type: FETCH_ADVISOR.FETCH_FORUM_STATUS_LIST
});

export const fetchForumSubCategoryList = () => ({
    type: FETCH_ADVISOR.FETCH_FORUM_SUB_CATEGORY_LIST
});

export const fetchLicenseList = () => ({
    type: FETCH_ADVISOR.FETCH_LICENSE_LIST
});

export const fetchPartyStatusList = () => ({
    type: FETCH_ADVISOR.FETCH_PARTY_STATUS_LIST
});

export const fetchProductList = () => ({
    type: FETCH_ADVISOR.FETCH_PRODUCT_LIST
});

export const fetchAllServiceAndBrand = () => ({
    type: FETCH_ADVISOR.FETCH_ALL_SERVICE_AND_BRAND
});

export const fetchRemunerationList = () => ({
    type: FETCH_ADVISOR.FETCH_REMUNERATION_LIST
});

export const fetchRiskQuestionaireList = () => ({
    type: FETCH_ADVISOR.FETCH_RISK_QUESTIONAIRE_LIST
});

export const fetchRoleList = () => ({
    type: FETCH_ADVISOR.FETCH_ROLE_LIST
});

export const fetchServiceList = () => ({
    type: FETCH_ADVISOR.FETCH_SERVICE_LIST
});

export const fetchAllStateCityPincodeUser = () => ({
    type: FETCH_ADVISOR.FETCH_ALL_STATE_CITY_PINCODE_USER
});

export const fetchAllStateCityPincode = () => ({
    type: FETCH_ADVISOR.FETCH_ALL_STATE_CITY_PINCODE
});

export const fetchAdvBrandRankByAdvId = (value) => ({
    type: FETCH_ADVISOR.FETCH_ADV_BRAND_RANK_BY_ADV_ID,
    payload: value
});

export const modifyAdvisor = (value) => ({
    type: FETCH_ADVISOR.MODIFY_ADVISOR,
    payload: value
});

export const modifyAdvisorProduct = (value) => ({
    type: FETCH_ADVISOR.MODIFY_ADVISOR_PRODUCT,
    payload: value
});

export const modifyAdvProfessionalInfo = (value) => ({
    type: FETCH_ADVISOR.MODIFY_ADV_PROFESSIONAL_INFO,
    payload: value
});

export const deleteAdvisor = (value) => ({
    type: FETCH_ADVISOR.DELETE_ADVISOR,
    payload: value
});

export const changePassword = (value, roleId) => ({
    type: FETCH_ADVISOR.CHANGE_PASSWORD,
    payload: { value, roleId }
});

export const fetchAllConstantData = () => ({
    type: FETCH_ADVISOR.FETCH_ALL_ADVISOR_CONSTANTS
});

export const updateAdvisorWorkflow = (payload) => ({
    type: FETCH_ADVISOR.UPDATE_ADVISOR_WORKFLOW,
    payload
});

export const searchCity = () => ({
    type: FETCH_ADVISOR.SEARCH_CITY
});

export const fetchDashboardCount = (value) => ({
    type: FETCH_ADVISOR.FETCH_DASHBOARD_COUNT,
    payload: value
});

export const validatePassword = (value) => ({
    type: FETCH_ADVISOR.VALIDATE_PASSWORD,
    payload: value
});
export const clearValidatePassword = (value) => ({
    type: FETCH_ADVISOR.CLEAR_VALIDATE_PASSWORD,
    payload: value
});
