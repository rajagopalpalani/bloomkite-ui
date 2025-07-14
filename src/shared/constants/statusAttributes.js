const candidateStatusList = [
    { value: 'available', label: 'Available' },
    { value: 'notinterested', label: 'Not Interested' },
    { value: 'callbacklater', label: 'Call Back Later' },
    { value: 'mailthedetails', label: 'Mail the details' },
    { value: 'offerthedetails', label: 'Offer the details' },
    { value: 'abroad', label: 'Abroad' }
];
const callStatusList = [
    { value: 'callbacklater', label: 'Call Back Later' },
    { value: 'callcompleted', label: 'Call Completed' },
    { value: 'ringingnoresponse', label: 'Ringing no response' },
    { value: 'notreachable', label: 'Not Reachable' },
    { value: 'numbernotvalid', label: 'Number not valid' },
    { value: 'switchedoff', label: 'Switched Off' },
    { value: 'abroad', label: 'Abroad Number' }
];
const emailStatusList = [
    { value: 'requirementEmail', label: 'Requirement Email' },
    { value: 'interviewConfirmation', label: 'Interview Confirmation' },
    { value: 'jobOfferLetter', label: 'Job Offer Letter' },
    { value: 'documentDetails', label: 'Document Details' }
];

export {
    candidateStatusList,
    callStatusList,
    emailStatusList
};