"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.investorSelector = void 0;

var investorSelector = function investorSelector(state) {
  return {
    investorDetails: state.investorReducer.investorDetails,
    invInterest: state.investorReducer.invInterest,
    investorList: state.investorReducer.investorList,
    categoryList: state.advisorReducer.categoryList
  };
};

exports.investorSelector = investorSelector;