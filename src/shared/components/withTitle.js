import React from 'react';
import { withRouter } from 'react-router-dom';
import Title from './common/title';
import { routeConstants } from '../constants/routes';
import CustomFragment from './common/customFragment';

const TITLES = {
    '/': 'Online Financial Advisor | Financial Advice | Financial Planning',
    [routeConstants.HOME]: 'Online Financial Advisor | Financial Advice | Financial Planning',
    [routeConstants.PRODUCT]: 'Products | Bloomkite | Financial | Advisors',
    [routeConstants.PLANNING_STATIC]: 'Planning | Bloomkite | Financial | Advisors',
    [routeConstants.EXPERTS]: 'Experts | Bloomkite | Financial | Advisors',
    [routeConstants.PLANS]: 'Plans | Bloomkite | Financial | Advisors',
    [routeConstants.HOWITWORKS]: 'How It Works | Bloomkite | Investors | Advisors',
    [routeConstants.WHY_US]: 'Why Us | Bloomkite | Financial | Advisors',
    [routeConstants.SIGNUP]: 'Signup | Bloomkite | Financial | Advisors',
    [routeConstants.LOGIN]: 'Login | Bloomkite | Financial | Advisors',
    [routeConstants.ADMIN_LOGIN]: 'Admin Login',
    [routeConstants.RESET_PASSWORD]: 'Reset Password | Bloomkite | Financial | Advisors',
    [routeConstants.FORGET_PASSWORD]: 'Forget Password | Bloomkite | Financial | Advisors',
    [routeConstants.MAIL_VERIFICATION]: 'Mail Verification | Bloomkite | Financial | Advisors',
    [routeConstants.USER_PROFILE]: 'Profile | Bloomkite | Financial | Advisors',
    [routeConstants.CORPORTATE_PROFILE]: 'Corporate Profile | Bloomkite | Financial | Advisors',
    [routeConstants.ADVISOR]: 'Advisor | Bloomkite | Financial | Advisors',
    [routeConstants.CORPORATE]: 'Corporate | Bloomkite | Financial | Advisors',
    [routeConstants.PLANNING]: 'Planning | Bloomkite | Financial | Advisors',
    [routeConstants.PLANNING_LIST]: 'Planning | Bloomkite | Financial | Advisors',
    [routeConstants.BLOG]: 'Blog | Bloomkite | Financial | Advisors',
    [routeConstants.ACADEMY]: 'Academy | Bloomkite | Financial | Advisors',
    [routeConstants.INVESTOR]: 'Investor | Bloomkite | Financial | Advisors',
    [routeConstants.DASHBOARD]: 'Dashboard | Bloomkite | Financial | Advisors',
    [routeConstants.NOT_FOUND]: 'Oops!!! Not found',
    [routeConstants.PRIVACY]: 'Privacy Policy | Bloomkite | Financial | Advisors',
    [routeConstants.TERMSANDCONDITIONS]: 'Terms & Conditions | Bloomkite | Financial | Advisors',
    [routeConstants.FAQ]: 'FAQ | Bloomkite | Financial | Advisors'
};

const META_DESCRIPTION = {
    COMMON: 'Manage your Investments online through expert Financial Advisor. Manage Home Loan EMI with expert plan and close your loan at earliest. Create your Financial profile and get advised by expert financial planner',
    '/': 'Manage your Investments online through expert Financial Advisor. Manage Home Loan EMI with expert plan and close your loan at earliest. Create your Financial profile and get advised by expert financial planner',
    [routeConstants.HOME]:
        'Manage your Investments online through expert Financial Advisor. Manage Home Loan EMI with expert plan and close your loan at earliest. Create your Financial profile and get advised by expert financial planner',
    [routeConstants.PRODUCT]: 'Our Products helps you be in control of your income, expenses, investments, and loans such that you can manage your money and achieve your goals',
    [routeConstants.PLANNING_STATIC]:
        'Bloomkite provides multiple tools in the planning, investments and loan section. Personal financials are better managed by planning, recording and projecting your financial futures.',
    [routeConstants.EXPERTS]: '',
    [routeConstants.HOWITWORKS]:
        'Bloomkite provides multiple tools in the planning, investments and loan section. Personal financials are better managed by planning, recording and projecting your financial futures.',
    [routeConstants.WHY_US]: '',
    [routeConstants.FAQ]: '',
    [routeConstants.PRIVACY]: '',
    [routeConstants.DASHBOARD]: '',
    [routeConstants.TERMSANDCONDITIONS]: '',
    [routeConstants.SIGNUP]: '',
    [routeConstants.LOGIN]: '',
    [routeConstants.ADMIN_LOGIN]: '',
    [routeConstants.RESET_PASSWORD]: '',
    [routeConstants.FORGET_PASSWORD]: '',
    [routeConstants.MAIL_VERIFICATION]: '',
    [routeConstants.USER_PROFILE]: '',
    [routeConstants.CORPORTATE_PROFILE]: '',
    [routeConstants.ADVISOR]: '',
    [routeConstants.CORPORATE]: '',
    [routeConstants.PLANNING]:
        'Bloomkite provides multiple tools in the planning, investments and loan section. Personal financials are better managed by planning, recording and projecting your financial futures.',
    [routeConstants.PLANNING_LIST]:
        'Bloomkite provides multiple tools in the planning, investments and loan section. Personal financials are better managed by planning, recording and projecting your financial futures.',
    [routeConstants.BLOG]: '',
    [routeConstants.ACADEMY]: '',
    [routeConstants.INVESTOR]: '',
    [routeConstants.NOT_FOUND]: ''
};

const META_KEYWORDS = {
    COMMON: 'technical analysis of the financial markets, personal loan bajaj finance, personal finance company, financial advisory services, ujjivan small finance bank loan, stock broking, financial advisor, financial, advisor, advisers, financial risk management, bajaj finance company, financial advisor, personal finance, best investment scheme, investment advice, icici banking and financial services, financial planning for individuals, corporate fixed depositicici pru banking & financial services financial mutual funds, mutual fund trade',
    '/': 'technical analysis of the financial markets, personal loan bajaj finance, personal finance company, financial advisory services, ujjivan small finance bank loan, stock broking, financial advisor, financial, advisor, advisers, financial risk management, bajaj finance company, financial advisor, personal finance, best investment scheme, investment advice, icici banking and financial services, financial planning for individuals, corporate fixed depositicici pru banking & financial services financial mutual funds, mutual fund trade',
    [routeConstants.HOME]:
        'technical analysis of the financial markets, personal loan bajaj finance, personal finance company, financial advisory services, ujjivan small finance bank loan, stock broking, financial advisor, financial, advisor, advisers, financial risk management, bajaj finance company, financial advisor, personal finance, best investment scheme, investment advice, icici banking and financial services, financial planning for individuals, corporate fixed depositicici pru banking & financial services financial mutual funds, mutual fund trade',
    [routeConstants.PRODUCT]:
        'financial advice, investment fund, financial investment, investment advisor, financial advisor services, investments options, mutual fund advisory, investments plan, investment advice, investment services',
    [routeConstants.PLANNING_STATIC]:
        'personal financial planning, personal finance, best financial planners, financial portfolio management, corporate fixed deposit, retirement financial planner, financial mutual funds, corporate fixed deposits rates, personal finance advisors',
    [routeConstants.EXPERTS]: '',
    [routeConstants.HOWITWORKS]:
        'real estate investment trust, mutual funds investment, best investment plan, best mutual funds to invest, sip investment, property investment, investment advisor, investment fund, investment strategies, low investment business, online investment, invest in startups, investing in shares, advisors, investors',
    [routeConstants.WHY_US]: '',
    [routeConstants.PRIVACY]: '',
    [routeConstants.FAQ]: '',
    [routeConstants.DASHBOARD]: '',
    [routeConstants.TERMSANDCONDITIONS]: '',
    [routeConstants.LOGIN]: '',
    [routeConstants.SIGNUP]: '',
    [routeConstants.ADMIN_LOGIN]: '',
    [routeConstants.RESET_PASSWORD]: '',
    [routeConstants.FORGET_PASSWORD]: '',
    [routeConstants.MAIL_VERIFICATION]: '',
    [routeConstants.USER_PROFILE]: '',
    [routeConstants.CORPORTATE_PROFILE]: '',
    [routeConstants.ADVISOR]: '',
    [routeConstants.CORPORATE]: '',
    [routeConstants.PLANNING]:
        'personal financial planning, personal finance, best financial planners, financial portfolio management, corporate fixed deposit, retirement financial planner, financial mutual funds, corporate fixed deposits rates, personal finance advisors',
    [routeConstants.PLANNING_LIST]:
        'personal financial planning, personal finance, best financial planners, financial portfolio management, corporate fixed deposit, retirement financial planner, financial mutual funds, corporate fixed deposits rates, personal finance advisors',
    [routeConstants.BLOG]: '',
    [routeConstants.ACADEMY]: '',
    [routeConstants.INVESTOR]: '',
    [routeConstants.NOT_FOUND]: ''
};

const withTitle = (Component) => {
    class TitleComponent extends React.Component {
        render() {
            const { match } = this.props;
            const { path } = match;
            const isProd = __ENV__ == 'PROD';
            return (
                <CustomFragment>
                    <Title
                        title={TITLES[path]}
                        metaDescription={isProd ? META_DESCRIPTION[path] || META_DESCRIPTION.COMMON : null}
                        metaKeyWords={isProd ? META_KEYWORDS[path] || META_KEYWORDS.COMMON : null}
                    />
                    <Component {...this.props} />
                </CustomFragment>
            );
        }
    }
    return withRouter(TitleComponent);
};

export default withTitle;
