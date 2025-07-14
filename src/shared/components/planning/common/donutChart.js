import React, { Component } from 'react';
import Chart from 'react-google-charts';
import classnames from 'classnames';
import { planningMessage } from '../../../constants/planningConstant';
import FontIcon from '../../common/fontAwesomeIcon';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';

class DonutChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInitialized: false
        };
    }

    onReady = () => {
        if (!this.state.isInitialized) {
            this.setState({
                ...this.state,
                isInitialized: true
            });
        }
    };

    viewAllLoans = () => {
        this.props.handleTabChange(5);
    };

    render() {
        let { isLoading, title, data, legends, sections, amortisation = [] } = this.props;
        let { isInitialized } = this.state;
        return (
            <div className="bg-white home-rightside">
                {/* {this.props.plan && <button onClick={() => this.viewAllLoans()} className="view-all-btn">{planningMessage.viewLoan}</button>} */}
                {data && (
                    <React.Fragment>
                        <h5 className="saveGoal">{title}</h5>
                        <div className="donut-chart">
                            <div style={{ minHeight: '250px' }}>
                                <Chart
                                    chartEvents={[
                                        {
                                            eventName: 'ready',
                                            callback: this.onReady
                                        }
                                    ]}
                                    chartType="PieChart"
                                    width="100%"
                                    height="250px"
                                    data={data}
                                    options={{
                                        pieHole: 0.7,
                                        showLables: 'false',
                                        pieSliceText: 'percentage',
                                        pieSliceTextStyle: {
                                            fontSize: 9
                                        },
                                        legend: {
                                            position: 'none'
                                        },
                                        colors: ['#f7c137', '#00c1d4'],
                                        chartArea: {
                                            width: '100%',
                                            height: '92%'
                                        },
                                        tooltip: {
                                            trigger: 'none'
                                        }
                                    }}
                                />
                                {(!isInitialized || isLoading) && (
                                    <div className="progress">
                                        <span>Loading ...</span>
                                    </div>
                                )}
                            </div>
                            <ul className="legend">
                                {legends.map((p, index) => (
                                    <li key={p}>
                                        <span className={classnames('dot', `dot-${index + 1}`)}></span>
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </React.Fragment>
                )}
                {sections.length > 0 &&
                    sections.map((section) => (
                        <div key={section.id} className={classnames(`cf-table-${section.cssClass}`)}>
                            <table className="cf-table cf-right-design">
                                <tbody>
                                    {section.items.length > 0 &&
                                        section.items.map(
                                            (item) =>
                                                item.value && (
                                                    <tr key={item.name}>
                                                        <td>{item.name}</td>
                                                        <td className="box-size">
                                                            {!['Loan Term', 'Revised Term'].includes(item.name) ? (
                                                                <span>
                                                                    <FontIcon icon={faRupeeSign} className={'mr-2'} />
                                                                    {item.value}
                                                                </span>
                                                            ) : (
                                                                <span>{item.value}</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                        )}
                                </tbody>
                            </table>
                        </div>
                    ))}
                <div className="combo-chart">
                    {amortisation.length > 0 && (
                        <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="ComboChart"
                            loader={<div>Loading Chart</div>}
                            data={amortisation}
                            options={{
                                legend: {
                                    position: 'top',
                                    alignment: 'end'
                                },
                                hAxis: {
                                    textStyle: {
                                        fontSize: 7
                                    },
                                    format: '0000'
                                },
                                bar: { groupWidth: 15 },
                                colors: ['#f7c137', '#00c1d4'],
                                seriesType: 'bars',
                                series: {
                                    2: {
                                        type: 'line'
                                    }
                                }
                            }}
                            rootProps={{ 'data-testid': '1' }}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default DonutChart;
