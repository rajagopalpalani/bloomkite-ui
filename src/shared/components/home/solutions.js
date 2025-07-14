import React from 'react';
import { homeStaticMessage } from '../../constants/homeStatic';

const Solutions = (props) => {
    return (
        <section className="bk-home-solutions border-top">
            <div className="container">
                <div className="row hidden-lg-down">
                    <div className="col-lg-12 text-center">
                        <h3>{homeStaticMessage.ourSolutions}</h3>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 pt-2">
                        <div className="text-justify p-3">
                            <h5 className="text-center title-font title-margin-align"> {homeStaticMessage.advisorTitle}</h5>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 pt-2">
                        <div className="text-justify p-3">
                            <h5 className="text-center title-font"> {homeStaticMessage.investorTitle}</h5>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12 pt-2">
                        <div className="solutions text-justify p-3">
                            <h5>{homeStaticMessage.microWebsites}</h5>
                            <p>{homeStaticMessage.websiteInfo}</p>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6 col-sm-12 pt-2 text-center settings-container">
                        <h5><img src="/images/1_solutions.png" alt="solutions" height="50px" /></h5>
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12 pt-2">
                        <div className="solutions text-justify p-3">
                            <h5>{homeStaticMessage.findingExpert}</h5>
                            <p>{homeStaticMessage.findingInfo}</p>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12 pt-2">
                        <div className="solutions text-justify p-3">
                            <h5> {homeStaticMessage.digitalTransformations}</h5>
                            <p>{homeStaticMessage.digitalInfo}</p>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6 col-sm-12 pt-2 text-center settings-container">
                        <img src="/images/2_solutions.png" alt="solutions" height= "50px" />
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12 pt-2">
                        <div className="solutions text-justify p-3">
                            <h5> {homeStaticMessage.financialAdvice}</h5>
                            <p> {homeStaticMessage.financialInfo}</p>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12 pt-2">
                        <div className="solutions text-justify p-3">
                            <h5> {homeStaticMessage.sharingKnowledge}</h5>
                            <p>{homeStaticMessage.knowledgeInfo}</p>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6 col-sm-12 pt-2 text-center settings-container">
                        <img src="/images/3_solutions.png" alt="solutions" height= "50px" />
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12 pt-2">
                        <div className="solutions text-justify p-3">
                            <h5> {homeStaticMessage.empoweringKnowledge}</h5>
                            <p> {homeStaticMessage.empoweringInfo}</p>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12 pt-2">
                        <div className="solutions text-justify p-3">
                            <h5> {homeStaticMessage.digitalTools}</h5>
                            <p>{homeStaticMessage.digitalToolsInfo}</p>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6 col-sm-12 pt-2 text-center settings-container">
                        <img src="/images/4_solutions.png" alt="solutions" height= "50px" />
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12 pt-2">
                        <div className="solutions text-justify p-3">
                            <h5> {homeStaticMessage.digitalTransformations}</h5>
                            <p> {homeStaticMessage.digitalTransInfo}</p>
                        </div>
                    </div>
                </div>
                <div className="row hidden-lg-up">
                    <div className="col-lg-12 text-center">
                        <h3>{homeStaticMessage.ourSolutions}</h3>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 pt-2">
                        <div className="text-justify p-3">
                            <h5 className="text-center title-font"> {homeStaticMessage.advisorTitle}</h5>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 pt-2">
                        <div className="solutions text-justify p-3">
                            <h5><img src="/images/1_solutions.png" alt="solutions" /> {homeStaticMessage.microWebsites}</h5>
                            <p>{homeStaticMessage.websiteInfo}</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 pt-2">
                        <div className="solutions text-justify p-3">
                            <h5><img src="/images/2_solutions.png" alt="solutions" /> {homeStaticMessage.digitalTransformations}</h5>
                            <p>{homeStaticMessage.digitalInfo}</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 pt-2">
                        <div className="solutions text-justify p-3">
                            <h5><img src="/images/3_solutions.png" alt="solutions" /> {homeStaticMessage.sharingKnowledge}</h5>
                            <p>{homeStaticMessage.knowledgeInfo}</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 pt-2">
                        <div className="solutions text-justify p-3">
                            <h5><img src="/images/4_solutions.png" alt="solutions" /> {homeStaticMessage.digitalTools}</h5>
                            <p>{homeStaticMessage.digitalToolsInfo}</p>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 pt-2">
                        <div className="text-justify p-3">
                            <h5 className="text-center title-font"> {homeStaticMessage.investorTitle}</h5>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 pt-2">
                        <div className="solutions text-justify p-3">
                            <h5><img className="icon-align" src="/images/1_solutions.png" alt="solutions" />{homeStaticMessage.findingExpert}</h5>
                            <p>{homeStaticMessage.findingInfo}</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 pt-2">
                        <div className="solutions text-justify p-3">
                            <h5><img className="icon-align" src="/images/2_solutions.png" alt="solutions" /> {homeStaticMessage.financialAdvice}</h5>
                            <p> {homeStaticMessage.financialInfo}</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 pt-2">
                        <div className="solutions text-justify p-3">
                            <h5><img className="icon-align" src="/images/3_solutions.png" alt="solutions" /> {homeStaticMessage.empoweringKnowledge}</h5>
                            <p> {homeStaticMessage.empoweringInfo}</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 pt-2">
                        <div className="solutions text-justify p-3">
                            <h5><img className="icon-align" src="/images/4_solutions.png" alt="solutions" /> {homeStaticMessage.digitalTransformations}</h5>
                            <p> {homeStaticMessage.digitalTransInfo}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Solutions;
