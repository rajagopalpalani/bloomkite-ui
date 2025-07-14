import React, { Component } from 'react';
import * as advisorService from '../../services/advisor';

class TypeAhead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            hideDropDown: false,
            tagsList: [],
            selectedTags: this.props.selectedTags,
            loading: false
        }
    }

    componentDidUpdate(oldProps) {
        const { selectedTags, inputValue } = this.props;
        const { selectedTags: oldSelectedTags, inputValue: oldValue } = oldProps;
        if (inputValue != oldValue) {
            this.fetchingTagsList(inputValue, true);
            this.setState({ selectedTags: selectedTags, inputValue, hideDropDown: true });
        }
    }

    fetchingTagsList = (value, initial) => {
        this.setState({ loading: true });
        advisorService.searchCity(value)
            .then(response => {
                let selectedTag = response.responseData.data[0];
                if (initial) this.props.updatedTag({ selectedTags: [selectedTag.city], selectedTag });
                this.setState({ tagsList: response.responseData.data, loading: false });
            }).catch(error => {
                this.setState({ loading: false });
            });
    }

    removeTagList = selectedTag => {
        let selectedTags = this.state.selectedTags;
        selectedTags.splice(selectedTags.indexOf(selectedTag), 1);
        this.props.updatedTag(selectedTags);
        this.setState({ selectedTags: selectedTags, hideDropDown: true });
    }

    onHandleInputChange = e => {
        const { value } = e.target;
        const { updatedTag } = this.props;
        this.setState({ inputValue: value, hideDropDown: false });

        if (value.length > 2) {
            this.fetchingTagsList(value);
        }
    }

    onTagItemClick = selectedTag => {
        let selectedTags = this.state.selectedTags || [];
        selectedTags.push(selectedTag.city);
        this.props.updatedTag({ selectedTags, selectedTag });
        this.setState({ inputValue: selectedTag.city, selectedTags: selectedTags, hideDropDown: true });
    }

    renderTagsList = () => {
        const { tagsList, isTagLoading, inputValue } = this.state;
        const self = this;
        const selectedTags = this.state.selectedTags;
        let showList = tagsList;
        let listContent = [];
        if (showList.length > 0) {
            listContent = showList.map((tag, index) => {
                return (
                    <React.Fragment key={index}>
                        <li className="select-search__row"><a className="select-search__option" onClick={() => this.onTagItemClick(tag)}>{tag.city}</a></li>
                    </React.Fragment>
                );
            });
        }
        return (
            <React.Fragment>
                {!this.state.hideDropDown && <div className="select-search__select">
                    {isTagLoading && <div className='loading loadingSmall'></div>}
                    {listContent.length > 0 &&
                        <ul className="dropdown select-search__options">
                            {listContent}
                        </ul>
                    }
                </div>
                }
            </React.Fragment>
        )
    }
    render() {
        const { inputValue, selectedTags } = this.state;
        return (
            <React.Fragment>
                <div className="TypeAhead select-search">
                    <input type="text"
                        id="tagToAttachInput"
                        value={inputValue}
                        autoComplete="off"
                        onChange={this.onHandleInputChange}
                        placeholder={'Search City'}
                        className="text-border-pi"
                    />
                    {
                        inputValue.length > 2 && this.renderTagsList()
                    }
                </div>
                {/* {
                    selectedTags && selectedTags.length > 0 &&
                    selectedTags.map(selectedTag => {
                        return (<span key={selectedTag} className="selectedItem">{selectedTag}<a onClick={() => this.removeTagList(selectedTag)}>x</a></span>);
                    })
                } */}
            </React.Fragment>
        )
    }
}


export default TypeAhead;