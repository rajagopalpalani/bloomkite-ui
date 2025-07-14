import React from 'react';
import loadable from '@loadable/component';
import Loader from './shared/components/common/loader';

export const Advisor = loadable(() => import('./shared/containers/advisor/advisor'), {
    fallback: <Loader loading={true} />
});
export const Investor = loadable(() => import('./shared/containers/investor/investor'), {
    fallback: <Loader loading={true} />
});
export const Corporate = loadable(() => import('./shared/containers/corporate/corporate'), {
    fallback: <Loader loading={true} />
});
export const Planning = loadable(() => import('./shared/containers/planning/planning'), {
    fallback: <Loader loading={true} />
});
export const PlanningLanding = loadable(() => import('./shared/containers/planning/planningLanding'), {
    fallback: <Loader loading={true} />
});
export const PlanningStatic = loadable(() => import('./shared/containers/planning/planningStatic'), {
    fallback: <Loader loading={true} />
});
export const Explore = loadable(() => import('./shared/containers/explore/explore'), {
    fallback: <Loader loading={true} />
});
export const Blog = loadable(() => import('./shared/containers/blog/blog'), {
    fallback: <Loader loading={true} />
});
export const Product = loadable(() => import('./shared/containers/product/product'), {
    fallback: <Loader loading={true} />
});
export const Howitworks = loadable(() => import('./shared/containers/howItWorks/howItWorks'), {
    fallback: <Loader loading={true} />
});
export const Academy = loadable(() => import('./shared/containers/academy/academy'), {
    fallback: <Loader loading={true} />
});

export const Privacy = loadable(() => import('./shared/containers/privacy'), {
    fallback: <Loader loading={true} />
});
export const NotFound = loadable(() => import('./shared/containers/notFound'), {
    fallback: <Loader loading={true} />
});
export const Login = loadable(() => import('./shared/containers/login'), {
    fallback: <Loader loading={true} />
});
export const Signup = loadable(() => import('./shared/containers/signup'), {
    fallback: <Loader loading={true} />
});
export const Profile = loadable(() => import('./shared/containers/profile'), {
    fallback: <Loader loading={true} />
});
export const ResetPassword = loadable(() => import('./shared/containers/accountDetails/resetPassword'), {
    fallback: <Loader loading={true} />
});
export const ForgetPassword = loadable(() => import('./shared/containers/accountDetails/forgetPassword'), {
    fallback: <Loader loading={true} />
});
export const MailVerification = loadable(() => import('./shared/containers/accountDetails/mailVerification'), {
    fallback: <Loader loading={true} />
});
export const WhyUs = loadable(() => import('./shared/containers/whyUs/whyUs'), {
    fallback: <Loader loading={true} />
});
export const Calculator = loadable(() => import('./shared/containers/calculator/calculator'), {
    fallback: <Loader loading={true} />
});
export const ErrorBoundary = loadable(() => import('./shared/containers/errorBoundary'), {
    fallback: <Loader loading={true} />
});
export const DashBoard = loadable(() => import('./shared/containers/dashBoard'), {
    fallback: <Loader loading={true} />
});
export const TermsAndConditions = loadable(() => import('./shared/containers/terms&Conditions'), {
    fallback: <Loader loading={true} />
});
export const Faq = loadable(() => import('./shared/containers/faq'), {
    fallback: <Loader loading={true} />
});

