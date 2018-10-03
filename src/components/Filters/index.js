import React from 'react'
import Select from 'react-select'
import {connect} from 'react-redux'
import {changeSelect} from '../../AC'
import 'react-select/dist/react-select.css';
import {mapToArr} from "../../Utils";

class Selector extends React.Component {
    render() {
        const {articles, selected} = this.props;

        const options = articles.map(article => ({label: article.title, value: article.id}));

        return (
            <Select
                options={options}
                value={selected}
                multi={true}
                onChange={this.handleChange}
            />
        );
    }

    handleChange = (selected) => {
        const {filterArticle} = this.props;
        filterArticle(selected.map(select => select.value));
    }

}

export default connect(({filters, articles}) => ({
    selected: filters.selected,
    articles: mapToArr(articles.items)
}), {filterArticle: changeSelect})(Selector);
