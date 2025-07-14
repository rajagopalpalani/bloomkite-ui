import React from 'react';
import cx from 'classnames';
import { faCaretDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import FontIcon from '../common/fontAwesomeIcon';

const ALL_SELECTED = 'All Selected';
const selectAll = {
  label: 'Select All',
  value: 'all',
};

class MultiSelect extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    const values = this.getValues();
    this.state = {
      open: false,
      values,
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.handleOutsideClick, false);
  }

  componentDidUpdate(prevProps) {
    const { values } = this.props;
    const { values: prevValue } = prevProps;
    if (JSON.stringify(values) !== JSON.stringify(prevValue)) {
      const items = this.getValues();
      this.setState({ values: items });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick, false);
  }

  getValues = () => {
    const { values, options } = this.props;
    let items = [...(values || [])];
    if (values.length === options.length) {
      items = [selectAll.value, ...items];
    }
    return items;
  }

  handleChange = (value) => {
    const { options } = this.props;
    const { values } = this.state;
    const isChecked = values.indexOf(value) === -1;
    // condition to check whether the selected items is selectall or not
    if (value === 'all') {
      if (isChecked) {
        const result = options.map((item) => item.value);
        const selected = [selectAll.value, ...result];
        this.setState({ values: selected });
        this.props.onChange(result);
        return;
      }
      const selected = [];
      this.setState({ values: selected });
      this.props.onChange(selected)
      return;
    }

    if (isChecked) {
      let result = [...values, value];
      if (options.length === result.length) {
        const selected = options.map((item) => item.value);
        result = [selectAll.value, ...result];
        this.setState({ values: result });
        this.props.onChange(selected);
        return;
      }
      this.setState({ values: result });
      this.props.onChange(result);
      return;
    }

    const result = values.filter((item) =>
      (item !== selectAll.value && item !== value));
    this.setState({ values: result });
    this.props.onChange(result);
  }

  handleOutsideClick = (e) => {
    const { target } = e;
    if (target &&
      !this.container.contains(target) &&
      !target.classList.contains('multiselect-close')) {
      this.closeDropdown();
    }
  }

  closeDropdown = () => {
    this.setState({
      open: false,
    });
  }

  openDropdown = () => {
    this.setState({
      open: true,
    });
  }

  handleRemove = (e, i) => {
    e.preventDefault();
    const { values } = this.state;
    let arr = [...values];
    if (i > -1) {
      arr.splice(i, 1);
    } else {
      arr = [];
    }
    this.setState({ values: arr });
    this.props.onChange(arr);
  }

  renderChip = (item, i) => {
    const { options } = this.props;
    const { label } = options.find((option) => option.value === item) || {};
    const text = label || ALL_SELECTED;
    return (
      <div key={`chip-${i}`} className="multiselect-chip">
        <div className="multiselect-chip-label">
          {text}
        </div>
        <a className="multiselect-close" href="/" onClick={(e) => this.handleRemove(e, i)}>
        <FontIcon icon={faTimes} /> 
        </a>
      </div>
    );
  }

  renderContent = () => {
    const { placeholder } = this.props;
    const { values } = this.state;
    return (
      <div
        className="multiselect-input-wrapper"
        placeholder={placeholder}
      >
        <div className="multiselect-selected-items">
          {values && values.length > 0 ? values.includes(selectAll.value) ?
            this.renderChip() : values.map((item, i) => this.renderChip(item, i))
            : placeholder}
        </div>
        <FontIcon icon={faCaretDown} className={'multiselect-arrow'}/> 
        {/* <span className="fa fa-caret-down multiselect-arrow" /> */}
      </div>
    );
  }

  renderListItem = (item, i) => {
    const { values } = this.state;
    const { value, label } = item;
    return (
      <li
        key={`mutiselect-list-${i}`}
        className="list-group-item"
        onClick={() => this.handleChange(value)}
      >
        <input
          id={`multiselect-${i}`}
          type="checkbox"
          checked={values.indexOf(value) !== -1}
          value={value}
          onChange={() => this.handleChange(value)}
        />
        <label htmlFor={`multiselect-${i}`}>
          {label}
        </label>
      </li>
    );
  }

  renderList = () => {
    const { options } = this.props;
    const items = [selectAll, ...options];
    return (
      <div className="multiselect-options">
        {options.length > 0 ? (
          <ul className="list-group">
            {items.map((item, i) => this.renderListItem(item, i))}
          </ul>) :
          <ul className="list-group">
            <li className="list-group-item">No Results</li>
          </ul>}
      </div>
    );
  }

  render() {
    const { className } = this.props;
    const { open } = this.state;
    const styles = cx('bloomkite-multiselect-container', className);
    return (
      <div
        ref={(ele) => { this.container = ele; }}
        className={styles}
        onClick={this.openDropdown}
      >
        {this.renderContent()}
        {open && this.renderList()}
      </div>
    );
  }
}

MultiSelect.defaultProps = {
  onChange: () => { },
  placeholder: 'Select',
  options: [],
};

export default MultiSelect;