import { put, takeLatest, call, all } from 'redux-saga/effects';
import { toastrError } from '../helpers/toastrHelper';
import { ADVISOR, FETCH_ADVISOR, APP_STATE, INVESTOR } from '../actions/actionTypes';
import * as advisorService from '../services/advisor';
import { toastrMessage } from '../constants/toastrMessage';

function* advisorLoading({ payload }) {
    yield put({
        type: FETCH_ADVISOR.ADVISOR_LOADING,
        payload
    });
}

function* addAdvBrandInfo({ payload }) {
    try {
        const data = yield call(advisorService.addAdvBrandInfo, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield call(fetchByAdvisorID, { payload: payload.advId });
            yield put({
                type: ADVISOR.ADVISOR_BRAND_INFO_SUCCESS,
                payload: data.responseMessage.responseDescription
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        toastrError(toastrMessage.somethingError);
    }
}

function* addAdvPersonalInfo({ payload }) {
    try {
        const data = yield call(advisorService.addAdvPersonalInfo, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield call(fetchByAdvisorID, { payload: payload.advId });
            yield put({
                type: ADVISOR.ADVISOR_PERSONAL_INFO_SUCCESS,
                payload: data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* addAdvProdInfo({ payload }) {
    try {
        const data = yield call(advisorService.addAdvProdInfo, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield call(fetchByAdvisorID, { payload: payload.advId });
            yield put({
                type: ADVISOR.ADVISOR_PROD_INFO_SUCCESS,
                payload: data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* addAdvProfessionalInfo({ payload }) {
    try {
        const data = yield call(advisorService.addAdvProfessionalInfo, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield call(fetchByAdvisorID, { payload: payload.advId });
            yield put({
                type: ADVISOR.ADVISOR_PROFESSIONAL_INFO_SUCCESS,
                payload: data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* addVideo({ payload }) {
    try {
        const data = yield call(advisorService.addVideo, payload);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: ADVISOR.ADVISOR_VIDEO_SUCCESS,
                payload: data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* fetchByAdvisorID({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(advisorService.fetchByAdvisorID, payload);
        if (data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_BY_ADVISOR_ID_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* fetchByPublicAdvisorID({ payload }) {
    try {
        const data = yield call(advisorService.fetchByPublicAdvisorID, payload);
        if (data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_BY_PUBLIC_ADVISOR_ID_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* fetchAdvisorList() {
    try {
        const data = yield call(advisorService.fetchAdvisorList);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_ADVISOR_LIST_SUCCESS
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* fetchBrandList() {
    try {
        const data = yield call(advisorService.fetchBrandList);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_BRAND_LIST_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* fetchCategoryList() {
    try {
        const data = yield call(advisorService.fetchCategoryList);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_CATEGORY_LIST_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* fetchCategoryTypeList() {
    try {
        const data = yield call(advisorService.fetchCategoryTypeList);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_CATEGORY_TYPE_LIST_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* fetchForumCategoryList() {
    try {
        const data = yield call(advisorService.fetchForumCategoryList);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_FORUM_CATEGORY_LIST_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* fetchForumStatusList() {
    try {
        const data = yield call(advisorService.fetchForumStatusList);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_FORUM_STATUS_LIST_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* fetchForumSubCategoryList() {
    try {
        const data = yield call(advisorService.fetchForumSubCategoryList);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_FORUM_SUB_CATEGORY_LIST_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* fetchLicenseList() {
    try {
        const data = yield call(advisorService.fetchLicenseList);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_LICENSE_LIST_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* fetchPartyStatusList() {
    try {
        const data = yield call(advisorService.fetchPartyStatusList);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_PARTY_STATUS_LIST_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* fetchProductList() {
    try {
        const data = yield call(advisorService.fetchProductList);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_PRODUCT_LIST_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* fetchAllServiceAndBrand() {
    try {
        const data = yield call(advisorService.fetchAllServiceAndBrand);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_ALL_SERVICE_AND_BRAND_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* fetchRemunerationList() {
    try {
        const data = yield call(advisorService.fetchRemunerationList);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_REMUNERATION_LIST_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* fetchRiskQuestionaireList() {
    try {
        const data = yield call(advisorService.fetchRiskQuestionaireList);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_RISK_QUESTIONAIRE_LIST_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* fetchRoleList() {
    try {
        const data = yield call(advisorService.fetchRoleList);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_ROLE_LIST_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* fetchServiceList() {
    try {
        const data = yield call(advisorService.fetchServiceList);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_SERVICE_LIST_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* fetchAllStateCityPincode() {
    try {
        const data = yield call(advisorService.fetchAllStateCityPincode);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_ALL_STATE_CITY_PINCODE_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* fetchAdvBrandRankByAdvId({ payload }) {
    try {
        const data = yield call(advisorService.fetchAdvBrandRankByAdvId, payload);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_ADV_BRAND_RANK_BY_ADV_ID_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        toastrError(toastrMessage.somethingError);
    }
}

function* modifyAdvisor({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(advisorService.modifyAdvisor, payload);
        if (data.responseMessage.responseCode === 6000) {
            yield call(fetchByAdvisorID, { payload: payload.advId });
            yield put({
                type: FETCH_ADVISOR.MODIFY_ADVISOR_SUCCESS,
                payload: data.responseMessage.responseDescription
            });
        } else {
            toastrError(toastrMessage.personalInfoError);
        }
    } catch (error) {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
        toastrError(toastrMessage.personalInfoError);
    }
}

function* modifyAdvisorProduct({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(advisorService.modifyAdvisorProduct, payload);
        if (data.responseMessage.responseCode === 6000) {
            yield call(fetchByAdvisorID, { payload: payload.advId });
            yield put({
                type: FETCH_ADVISOR.MODIFY_ADVISOR_PRODUCT_SUCCESS,
                payload: data.responseMessage.responseDescription
            });
        } else {
            toastrError(toastrMessage.productError);
        }
    } catch (error) {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
        toastrError(toastrMessage.productError);
    }
}

function* modifyAdvProfessionalInfo({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(advisorService.modifyAdvProfessionalInfo, payload);
        if (data.responseMessage.responseCode === 6000) {
            yield call(fetchByAdvisorID, { payload: payload.advId });
            yield put({
                type: FETCH_ADVISOR.MODIFY_ADV_PROFESSIONAL_INFO_SUCCESS,
                payload: data.responseMessage.responseDescription
            });
        } else {
            toastrError(toastrMessage.professionalError);
        }
    } catch (error) {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
        toastrError(toastrMessage.professionalError);
    }
}

function* deleteAdvisor({ payload }) {
    try {
        const data = yield call(advisorService.deleteAdvisor, payload);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.DELETE_ADVISOR_SUCCESS,
                payload: data.responseMessage.responseDescription
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        toastrError(toastrMessage.somethingError);
    }
}

function* changePassword({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(advisorService.changePassword, payload.value);
        if (data.responseMessage.responseCode === 6000) {
            if (payload.roleId == 1 || payload.roleId == 3) {
                yield call(fetchByAdvisorID, { payload: payload.value.roleBasedId });
            }
            if (payload.roleId == 2) {
                yield put({
                    type: INVESTOR.FETCH_BY_INVESTOR_ID,
                    payload: payload.value.roleBasedId
                });
                // yield call(fetchByInvestorId, { payload: payload.value.roleBasedId });
            }
            yield put({
                type: FETCH_ADVISOR.CHANGE_PASSWORD_SUCCESS,
                payload: data.responseMessage.responseDescription
            });
        } else {
            toastrError(data.responseMessage.responseDescription);
        }
    } catch (error) {
        const { response } = error;
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
        toastrError(response.data && response.data.responseMessage && response.data.responseMessage.responseDescription);
    }
}

export function* updateWorkFlow(action) {
    const { payload } = action;
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const response = yield call(advisorService.updateWorkFlow, payload);
        const { responseMessage } = response;
        if (responseMessage && responseMessage.responseCode === 6000) {
            yield call(fetchByAdvisorID, { payload: payload.advId });
            // if(this.props.advisorDetails.updateWorkFlow != 4 || this.props.handleSave){
            //     this.props.advisorDetails.updateWorkFlow == 2
            // }
        }
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    } catch (error) {
        toastrError(toastrMessage.publishAdvisorError);
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* searchCity() {
    try {
        const data = yield call(advisorService.searchCity);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.SEARCH_CITY_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* fetchDashboardCount({ payload }) {
    try {
        const data = yield call(advisorService.fetchDashboardCount, payload);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_DASHBOARD_COUNT_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* validatePassword({ payload }) {
    try {
        const data = yield call(advisorService.validatePassword, payload);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.VALIDATE_PASSWORD_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(data.responseMessage.responseDescription);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

export function* advisorWatcher() {
    yield all([
        takeLatest(ADVISOR.ADVISOR_BRAND_INFO, addAdvBrandInfo),
        takeLatest(ADVISOR.ADVISOR_PERSONAL_INFO, addAdvPersonalInfo),
        takeLatest(ADVISOR.ADVISOR_PROD_INFO, addAdvProdInfo),
        takeLatest(ADVISOR.ADVISOR_PROFESSIONAL_INFO, addAdvProfessionalInfo),
        takeLatest(ADVISOR.ADVISOR_VIDEO, addVideo),
        takeLatest(FETCH_ADVISOR.FETCH_BY_ADVISOR_ID, fetchByAdvisorID),
        takeLatest(FETCH_ADVISOR.FETCH_BY_PUBLIC_ADVISOR_ID, fetchByPublicAdvisorID),
        takeLatest(FETCH_ADVISOR.FETCH_ADVISOR_LIST, fetchAdvisorList),
        takeLatest(FETCH_ADVISOR.FETCH_BRAND_LIST, fetchBrandList),
        takeLatest(FETCH_ADVISOR.FETCH_CATEGORY_LIST, fetchCategoryList),
        takeLatest(FETCH_ADVISOR.FETCH_CATEGORY_TYPE_LIST, fetchCategoryTypeList),
        takeLatest(FETCH_ADVISOR.FETCH_FORUM_CATEGORY_LIST, fetchForumCategoryList),
        takeLatest(FETCH_ADVISOR.FETCH_FORUM_STATUS_LIST, fetchForumStatusList),
        takeLatest(FETCH_ADVISOR.FETCH_FORUM_SUB_CATEGORY_LIST, fetchForumSubCategoryList),
        takeLatest(FETCH_ADVISOR.FETCH_LICENSE_LIST, fetchLicenseList),
        takeLatest(FETCH_ADVISOR.FETCH_PARTY_STATUS_LIST, fetchPartyStatusList),
        takeLatest(FETCH_ADVISOR.FETCH_PRODUCT_LIST, fetchProductList),
        takeLatest(FETCH_ADVISOR.FETCH_ALL_SERVICE_AND_BRAND, fetchAllServiceAndBrand),
        takeLatest(FETCH_ADVISOR.FETCH_REMUNERATION_LIST, fetchRemunerationList),
        takeLatest(FETCH_ADVISOR.FETCH_RISK_QUESTIONAIRE_LIST, fetchRiskQuestionaireList),
        takeLatest(FETCH_ADVISOR.FETCH_ROLE_LIST, fetchRoleList),
        takeLatest(FETCH_ADVISOR.FETCH_SERVICE_LIST, fetchServiceList),
        takeLatest(FETCH_ADVISOR.FETCH_ALL_STATE_CITY_PINCODE_USER, fetchAllStateCityPincode),
        takeLatest(FETCH_ADVISOR.FETCH_ALL_STATE_CITY_PINCODE, fetchAllStateCityPincode),
        takeLatest(FETCH_ADVISOR.FETCH_ADV_BRAND_RANK_BY_ADV_ID, fetchAdvBrandRankByAdvId),
        takeLatest(FETCH_ADVISOR.MODIFY_ADVISOR, modifyAdvisor),
        takeLatest(FETCH_ADVISOR.MODIFY_ADVISOR_PRODUCT, modifyAdvisorProduct),
        takeLatest(FETCH_ADVISOR.MODIFY_ADV_PROFESSIONAL_INFO, modifyAdvProfessionalInfo),
        takeLatest(FETCH_ADVISOR.DELETE_ADVISOR, deleteAdvisor),
        takeLatest(FETCH_ADVISOR.CHANGE_PASSWORD, changePassword),
        takeLatest(FETCH_ADVISOR.ADVISOR_LOADING, advisorLoading),
        takeLatest(FETCH_ADVISOR.UPDATE_ADVISOR_WORKFLOW, updateWorkFlow),
        takeLatest(FETCH_ADVISOR.SEARCH_CITY, searchCity),
        takeLatest(FETCH_ADVISOR.FETCH_DASHBOARD_COUNT, fetchDashboardCount),
        takeLatest(FETCH_ADVISOR.VALIDATE_PASSWORD, validatePassword)
        //takeLatest(FETCH_ADVISOR.FETCH_ALL_ADVISOR_CONSTANTS, advisorAllConstants),
    ]);
}
