var React = require("react");
var {connect} = require("react-redux");
var actions = require("actions");

export var TodoSearch = React.createClass({
    // handleSearch: function () {
    //     var showCompleted = this.refs.showCompleted.checked;
    //     var searchText = this.refs.searchText.value;

    //     this.props.onSearch(showCompleted, searchText);
    // },
    render: function () {
        var {dispatch, showCompleted, searchText} = this.props;
        return (
            <div className="container__header">
                <div>
                    {/*<input type="search" ref="searchText" placeholder="Search todos" onChange={this.handleSearch}/>*/}
                    <input type="search" ref="searchText" placeholder="Search todos" value={searchText} onChange={() => {
                        var searchText = this.refs.searchText.value;
                        dispatch(actions.setSearchText(searchText));
                    }}/>
                </div>
                <div>
                    <label>
                        {/*<input type="checkbox" ref="showCompleted" onChange={this.handleSearch}/>*/}
                        <input type="checkbox" ref="showCompleted" checked={showCompleted} onChange={() => {
                            dispatch(actions.toggleShowCompleted());
                        }}/>
                        Show completed todos
                    </label>
                </div>
            </div>
        );
    }
});

// module.exports = TodoSearch;
/*
the data will pass into the component because of connect
*/
export default connect(
    (state) => {
        return {
            showCompleted: state.showCompleted,
            searchText: state.searchText
        };
    }
)(TodoSearch);