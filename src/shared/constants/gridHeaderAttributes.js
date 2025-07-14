import { admins, roles } from './apiAttributes';

const businessHeaderData = [
    {
        "title": "#",
        "key": "checkbox"
    },
    {
        "title": "Business Name",
        "key": "businessName"
    },
    {
        "title": "Business Type",
        "key": "businessType"
    },
    {
        "title": "Business Sub Type",
        "key": "businessSubType"
    },
    {
        "title": "Phone",
        "key": "phone"
    },
    {
        "title": "Status",
        "key": "status"
    },
    {
        "title": "Featured Date",
        "key": "fDate"
    },
    {
        "title": "More",
        "key": "more"
    },
    {
        "title": "Action",
        "key": "action",
        "access": admins,
        "showStatus": true
    }
];

const couponsHeaderData = [
    {
        "title": "#",
        "key": "checkbox"
    },
    {
        "title": "Coupon Title",
        "key": "title"
    },
    {
        "title": "Created Date",
        "key": "createdAt"
    },
    {
        "title": "Expiry Date",
        "key": "expiryDate"
    },
    {
        "title": "Customer Business",
        "key": "customerBusinessName"
    },
    {
        "title": "Region Specific",
        "key": "regionSpecific"
    },
    {
        "title": "Coupon Details",
        "key": "more"
    },
    {
        "title": "Status",
        "key": "status"
    },
    {
        "title": "Action",
        "key": "action",
        "access": admins,
        "showStatus": true
    }
];

const eventsHeaderData = [
    {
        "title": "#",
        "key": "checkbox"
    },
    {
        "title": "Event Name",
        "key": "eventName"
    },
    {
        "title": "Event Type",
        "key": "eventType"
    },
    {
        "title": "Business Name",
        "key": "customerName"
    },
    {
        "title": "Venue",
        "key": "venue"
    },
    {
        "title": "Event Dates",
        "key": "eventDates"
    },
    {
        "title": "Featured Date",
        "key": "fDate"
    },
    {
        "title": "Event Details",
        "key": "more"
    },
    {
        "title": "Action",
        "key": "action",
        "access": admins,
        "showStatus": false
    }
];

const adventuresHeaderData = [
    {
        "title": "#",
        "key": "checkbox"
    },
    {
        "title": "Adventure Name",
        "key": "title"
    },
    {
        "title": "Category",
        "key": "category"
    },
    {
        "title": "Phone",
        "key": "phone"
    },
    {
        "title": "Sponsors",
        "key": "adventureSponsors"
    },
    {
        "title": "Seasonal Dates",
        "key": "adventureSeasonalDates"
    },
    {
        "title": "Status",
        "key": "status"
    },
    {
        "title": "Featured Date",
        "key": "fDate"
    },
    {
        "title": "Action",
        "key": "action",
        "access": admins
    }
];
const addsHeaderData = [
    {
        "title": "#",
        "key": "checkbox"
    },
    {
        "title": "Add Name",
        "key": "name"
    },
    {
        "title": "Description",
        "key": "description"
    },
    {
        "title": "Add Type",
        "key": "referenceType"
    },
    {
        "title": "Add Details",
        "key": "addDetails"
    },
    {
        "title": "Start Date",
        "key": "startDate"
    },
    {
        "title": "End Date",
        "key": "endDate"
    },
    {
        "title": "Status",
        "key": "status"
    },
    {
        "title": "Action",
        "key": "action",
        "access": admins
    }
];
let homeTaskHeaders = [{ "title": "Task", "key": "name" }, { "title": "Status", "key": "status" }, { "title": "Due Date", "key": "dueDate" }, { "title": "Action", "key": "action" }];
let homePerformanceHeaders = [{ "title": "Recruiter", "key": "recruiter" }, { "title": "Campaign", "key": "campaign" }, { "title": "Target", "key": "target" }, { "title": "Call Status", "key": "callStatus" }, { "title": "Email Status", "key": "emailStatus" }];

export {
    businessHeaderData,
    eventsHeaderData,
    couponsHeaderData,
    adventuresHeaderData,
    addsHeaderData,
    homeTaskHeaders,
    homePerformanceHeaders
};