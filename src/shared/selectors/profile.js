import { createSelector } from 'reselect';

const productList = (state) => state.advisorReducer.productList;
const serviceList = (state) => state.advisorReducer.serviceList;
const remunerationList = (state) => state.advisorReducer.remunerationList;
const brandList = (state) => state.advisorReducer.brandList;

const getProducts = createSelector(productList, (items) => {
    let list = {};
    if (items && items.length) {
        items.forEach((item) => {
            list = { ...list, [item.prodId]: item };
        });
    }
    return list;
});

const getRemunerations = createSelector(remunerationList, (items) => {
    let list = {};
    if (items && items.length) {
        items.forEach((item) => {
            list = { ...list, [item.remId]: item };
        });
    }
    return list;
});

const getServices = createSelector(serviceList, (items) => {
    let list = {};
    if (items && items.length) {
        items.forEach((item) => {
            list = { ...list, [item.serviceId]: item };
        });
    }
    return list;
});

const getBrands = createSelector(brandList, (items) => {
    let list = {};
    if (items && items.length) {
        items.forEach((item) => {
            list = { ...list, [item.prodId]: item };
        });
    }
    return list;
});

export const profileSelector = (state) => ({
    isLoading: state.appStateReducer.isLoading,
    advisorDetails: state.advisorReducer.advisorDetails,
    investorDetails: state.investorReducer.investorDetails,
    profile: state.profileReducer.profile,
    file: state.uploadFileReducer.uploadFileDetails,
    brandList: getBrands(state),
    productList: getProducts(state),
    allServiceAndBrand: state.advisorReducer.allServiceAndBrand,
    remunerationList: getRemunerations(state),
    serviceList: getServices(state),
    teamList: state.teamSignupReducer.teamDetails,
    keyPeopleList: state.teamSignupReducer && state.teamSignupReducer.keyPeopleDetails,
    followings: state.followersReducer.followersRequest,
    publicAdvisorDetails: state.publicAdvisorReducer.publicAdvisorDetails
});
