import { LOGIN, ADVISOR, FETCH_ADVISOR } from '../actions/actionTypes';
import { fromJS } from 'immutable';

const advisorState = fromJS({
    advisorDetails: {},
    brandList: [],
    categoryList: [],
    categoryTypeList: [],
    forumCategoryList: [],
    forumStatusList: [],
    forumSubCategoryList: [],
    licenseList: [],
    partyStatusList: [],
    productList: [],
    allServiceAndBrand: [],
    remunerationList: [],
    riskQuestionaireList: [],
    roleList: [],
    serviceList: [],
    allStateCityPincode: [],
    citySearch: [],
    dashboard: null,
    loading: false
});

export const advisorReducer = function (state = advisorState, action) {
    switch (action.type) {
        case FETCH_ADVISOR.ADVISOR_LOADING: {
            return {
                ...state,
                loading: action.payload
            };
        }
        case FETCH_ADVISOR.FETCH_BY_ADVISOR_ID_SUCCESS: {
            return {
                ...state,
                advisorDetails: {
                    ...state.advisorDetails,
                    ...action.payload
                }
            };
        }
        case FETCH_ADVISOR.FETCH_BRAND_LIST_SUCCESS: {
            return {
                ...state,
                brandList: action.payload
            };
        }
        case FETCH_ADVISOR.FETCH_CATEGORY_LIST_SUCCESS: {
            return {
                ...state,
                categoryList: action.payload
            };
        }
        case FETCH_ADVISOR.FETCH_CATEGORY_TYPE_LIST_SUCCESS: {
            return {
                ...state,
                categoryTypeList: action.payload
            };
        }
        case FETCH_ADVISOR.FETCH_FORUM_CATEGORY_LIST_SUCCESS: {
            return {
                ...state,
                forumCategoryList: action.payload
            };
        }
        case FETCH_ADVISOR.FETCH_FORUM_STATUS_LIST_SUCCESS: {
            return {
                ...state,
                forumStatusList: action.payload
            };
        }
        case FETCH_ADVISOR.FETCH_FORUM_SUB_CATEGORY_LIST_SUCCESS: {
            return {
                ...state,
                forumSubCategoryList: action.payload
            };
        }
        case FETCH_ADVISOR.FETCH_LICENSE_LIST_SUCCESS: {
            return {
                ...state,
                licenseList: action.payload
            };
        }
        case FETCH_ADVISOR.FETCH_PARTY_STATUS_LIST_SUCCESS: {
            return {
                ...state,
                partyStatusList: action.payload
            };
        }
        case FETCH_ADVISOR.FETCH_PRODUCT_LIST_SUCCESS: {
            return {
                ...state,
                productList: action.payload
            };
        }
        case FETCH_ADVISOR.FETCH_REMUNERATION_LIST_SUCCESS: {
            return {
                ...state,
                remunerationList: action.payload
            };
        }
        case FETCH_ADVISOR.FETCH_RISK_QUESTIONAIRE_LIST_SUCCESS: {
            return {
                ...state,
                riskQuestionaireList: action.payload
            };
        }
        case FETCH_ADVISOR.FETCH_ALL_SERVICE_AND_BRAND_SUCCESS: {
            return {
                ...state,
                allServiceAndBrand: action.payload
            };
        }
        case FETCH_ADVISOR.FETCH_ROLE_LIST_SUCCESS: {
            return {
                ...state,
                roleList: action.payload
            };
        }
        case FETCH_ADVISOR.FETCH_SERVICE_LIST_SUCCESS: {
            return {
                ...state,
                serviceList: action.payload
            };
        }
        case FETCH_ADVISOR.FETCH_ALL_STATE_CITY_PINCODE_SUCCESS: {
            return {
                ...state,
                allStateCityPincode: action.payload
            };
        }
        case FETCH_ADVISOR.SEARCH_CITY_SUCCESS: {
            return {
                ...state,
                citySearch: action.payload
            };
        }
        case FETCH_ADVISOR.FETCH_DASHBOARD_COUNT_SUCCESS: {
            return {
                ...state,
                dashboard: action.payload
            };
        }
        case FETCH_ADVISOR.VALIDATE_PASSWORD_SUCCESS: {
            return {
                ...state,
                isPasswordVerified: action.payload
            };
        }
        case FETCH_ADVISOR.CLEAR_VALIDATE_PASSWORD: {
            return {
                ...state,
                isPasswordVerified: false
            };
        }
        default:
            return state;
    }
};
