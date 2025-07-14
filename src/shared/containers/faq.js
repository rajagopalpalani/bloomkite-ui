import React, { Component } from 'react';

class Faq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 1,
            titleContainer: true
        };
    }

    render() {
        const bloomkiteUsername = window.localStorage.getItem('bloomkiteUsername');
        let roleId;
        if (bloomkiteUsername) {
            roleId = JSON.parse(bloomkiteUsername).roleId;
        }
        return (
            <div>
                <div className="container how-it-deisgns main-container pt-1">
                    <h1 className="faq-heading">FAQ</h1>
                    <div className="overview-size-adv">
                        <div className="col-12 row advisor-leftside bg-white nopadding nomargin">
                            <div className="col-6 ">
                                <h3 className="faq-head1">Advisor</h3>
                                <div className="faq-content1">
                                    <ol>
                                        <li className="faq-question">What is Bloomkite</li>
                                        <p className="faq-answer">Bloomkite is a connecting platform; connects financial experts to financial consumers  </p>
                                        <li className="faq-question">How do I use Bloomkite</li>
                                        <p className="faq-answer">Create profile, buy membership and get listed.  Write financial plans, Interact with financial consumers, once you gain confidence initiate transactions (currently we don’t support transactions) </p>
                                        <li className="faq-question">Do I need to make payments</li>
                                        <p className="faq-answer">Yes you have to pay for membership plan which is valid for one year </p>
                                        <li className="faq-question">Why Membership</li>
                                        <p className="faq-answer">We charge you for the benefits we provide, Having digital presence is utmost important factor today to reach out new clients but core activity of financial experts is to acquire clients and servicing. Bloomkite would like to partner with on the space of managing your digital presence so that you can focus on clients   </p>
                                        <li className="faq-question">Why Bloomkite</li>
                                        <p className="faq-answer">Bloomkite is a place to have your micro website, organize your clients financial plans and interact with prospective clients  </p>
                                        <p className="faq-answer">Bloomkite helps financial experts in reducing cost incurred for building website and financial calculators online </p>
                                        <p className="faq-answer">Bloomkite is a market place helps financial experts to maintain good online reputation by having complete profile and by knowledge sharing   </p>
                                        <li className="faq-question">Who can use Bloomkite</li>
                                        <p className="faq-answer">Mutual Fund Distributors, Life & Non Life Insurance Agents, Certified Financial Planners, Stock Brokers / Sub Brokers and Loan Agents </p>
                                        <p className="faq-answer">The most suitable partners would be; Experts holding valid license from competent authorities like AMFI, IRDA, SEBI, FPSB. Experts looking for new clients to scale up the business and wants to maintain good online reputation</p>
                                        <li className="faq-question">How to make use of planning tools </li>
                                        <p className="faq-answer">Planning calculators are made available for users to calculate to see immediate result and also save the data for future references. Bloomkite users can use their own data any time to review or to share with financial experts. Financial experts can create multiple financial plans for their regular business practices.   </p>
                                        <li className="faq-question">How is my data handled at Bloomkite</li>
                                        <p className="faq-answer">Bloomkite follows “you own your data” policy, hence users has full control of data. Always it is user who can share the data with financial experts or download basis of OTP validation</p>
                                        <li className="faq-question">Where do I start</li>
                                        <p className="faq-answer">Start with creating profile, goal setting tools, Cash flow tools, Risk profiling further try to capture clients Home loans details by using EMI calculators</p>
                                        <li className="faq-question">How users share planning sheet with me  </li>
                                        <p className="faq-answer">Users can share planning sheet to those financial experts they are following to get better understanding </p>
                                        <li className="faq-question">What are you selling </li>
                                        <p className="faq-answer">Bloomkite and Partners associated with Bloomkite do not sell any financial products on Bloomkite web services. Bloomkite makes an attempt to connect right financial expert to right financial consumer </p>
                                        <li className="faq-question">How do I make transactions</li>
                                        <p className="faq-answer">Partners associated with Bloomkite hold valid licenses from regulatory authorities for the products they are dealing with, users interested in executing transactions can take financial experts opinion and act accordingly. </p>
                                        <li className="faq-question">How Bloomkite makes money</li>
                                        <p className="faq-answer">Bloomkite makes money by charging financial experts for having their profile listed and other allied services  </p>
                                        <li className="faq-question">Have more questions </li>
                                        <p className="faq-answer">Please contact us at <a  href="mailto:info@bloomkite.com">info@bloomkite.com</a> </p> 
                                    </ol>
                                </div>
                            </div>
                            <div className="col-6 ">
                                <h3 className="faq-head1">Investor</h3>

                                <div className="faq-content2">
                                    <ol>
                                        <li className="faq-question">What is Bloomkite</li>
                                        <p className="faq-answer">Bloomkite is a connecting platform; connects financial experts to financial consumers </p>
                                        <li className="faq-question">How do I use Bloomkite</li>
                                        <p className="faq-answer">Create profile, Write financial plans, Explore financial experts, Interact with financial expert, once you gain confidence fix meeting and start your financial journey </p>
                                        <li className="faq-question">Do I need to make payments</li>
                                        <p className="faq-answer">No you don’t need to pay for any services at Bloomkite </p>
                                        <li className="faq-question">Why Bloomkite</li>
                                        <p className="faq-answer">Bloomkite is trying to organize your finance matter simple and more relevant with the help of user friendly calculators and financial experts associated with Bloomkite</p>
                                        <li className="faq-question">Who can use Bloomkite</li>
                                        <p className="faq-answer">Bloomkite can be used by any individual to make informed decision in the matter of finance. The most suitable user would be : </p>
                                        <p className="faq-answer">Individuals making regular income today and want regular income in future </p>
                                        <p className="faq-answer">Individuals looking for loans to meet their current financial gaps</p>
                                        <p className="faq-answer">Individuals has surplus money wants manage to get optimum returns</p>
                                        <li className="faq-question">How to make use of planning tools </li>
                                        <p className="faq-answer">Planning calculators are made available for users to calculate to see immediate result and also save the data for future references. Bloomkite users can use their own data any time to review or to share with financial experts.  </p>
                                        <li className="faq-question">How is my data handled at Bloomkite</li>
                                        <p className="faq-answer">Bloomkite follows “you own your data” policy, hence users has full control of data. Always it is user who can share the data with financial experts or download basis of OTP validation </p>
                                        <li className="faq-question">Where do I start</li>
                                        <p className="faq-answer">Start with goal setting tools, Cash flow tools, Risk profiling further if you have Home loans try using EMI calculators </p>
                                        <li className="faq-question">To whom I can share my planning sheet  </li>
                                        <p className="faq-answer">You can share your planning sheet to those financial experts you are following to get better understanding </p>
                                        <li className="faq-question">What are you selling </li>
                                        <p className="faq-answer">Bloomkite and Partners associated with Bloomkite do not sell any financial products on Bloomkite web services. Bloomkite makes an attempt to connect right financial expert to right financial consumer</p>
                                        <li className="faq-question">How do I make transactions</li>
                                        <p className="faq-answer">Partners associated with Bloomkite hold valid licenses from regulatory authorities for the products they are dealing with, users interested in executing transactions can take financial experts opinion and act accordingly. </p>
                                        <li className="faq-question">How Bloomkite makes money</li>
                                        <p className="faq-answer">Bloomkite makes money by charging financial experts for having their profile listed and other allied services </p>
                                        <li className="faq-question">Have more questions </li>
                                        <p className="faq-answer">Please contact us at <a  href="mailto:info@bloomkite.com">info@bloomkite.com</a></p>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Faq;
