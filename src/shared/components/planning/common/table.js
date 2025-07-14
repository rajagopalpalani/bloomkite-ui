import React, { Component } from 'react';
import classnames from 'classnames';
import { planningMessage } from '../../../constants/planningConstant';

class Table extends Component {

    constructor(props){
        super(props);
        this.state = {
            rowIndex: -1
        };
    }

    onClick = (rowIndex) => {
        if (this.state.rowIndex === rowIndex) {
            rowIndex = -1;
        }
        this.setState({
            rowIndex
        });
    }

    onExpand = (e) => {
        e.preventDefault();
    }

    render() {
        let { items } = this.props;
        if (items.length === 0) {
            return null;
        }
        return (
            <div className="slidecontainer emiTableContainer">
                <div className="cf-table-design">
                    <table className="cf-table">
                        <tbody>
                            <tr>
                                <td>{planningMessage.tableYear}</td>
                                <td>{planningMessage.tablePrincipal}</td>
                                <td>{planningMessage.tableInterest}</td>
                                <td>{planningMessage.tableClosing}</td>
                                <td>{planningMessage.tableOpening}</td>
                                <td>{planningMessage.tableOutStanding}</td>
                            </tr>
                            {items.map((p, index) => (
                                <React.Fragment key={p.key}>
                                    <tr>
                                        <td onClick={()=>this.onClick(index)}>
                                            <a href="#" onClick={this.onExpand} className="expand-collapse">
                                                <i className={classnames('fa', {
                                                    'fa-plus-square': index !== this.state.rowIndex,
                                                    'fa-minus-square': index === this.state.rowIndex,
                                                })}></i>
                                                {p.year}
                                            </a>
                                        </td>
                                        <td className="text-right">{p.totalPrincipal}</td>
                                        <td className="text-right">{p.interest}</td>
                                        <td className="text-right">{p.closing}</td>
                                        <td className="text-right">{p.opening}</td>
                                        <td className="text-right">{p.loanPaid + ' %'}</td>
                                    </tr>
                                    {(index === this.state.rowIndex) && p.items.map(r => (
                                        <tr className="inner">
                                            <td>{r.month}</td>
                                            <td className="text-right">{r.totalPrincipal}</td>
                                            <td className="text-right">{r.interest}</td>
                                            <td className="text-right">{r.closing}</td>
                                            <td className="text-right">{r.opening}</td>
                                            <td className="text-right">{r.loanPaid + ' %'}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Table;