import React, {Component} from "react";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {term: ""};
    }

    render() {
        return (
                <div className="search-bar">
                    <input
                            value={this.state.term}
                            onChange={evt => this.onTermChange(evt.target.value)}
                    />
                </div>
        );
    }

    onTermChange(term) {
        this.setState({term});
        this.props.onSearchTerm(term);
    }
}

export default SearchBar;