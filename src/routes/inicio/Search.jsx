import React from 'react';
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }
  handleSearch = () => {
    this.props.onHandleSearch(this.state.query)
  }
  handleKeyDown = (evt) => {
    if (evt.keyCode === 13) {
      this.handleSearch(this.state.query)
    }
  }
  render() {
    return (
      <>
        <div className="col-10">
          <input
            onKeyDown={this.handleKeyDown}
            onChange={(e) => this.setState({ query: e.target.value })}
            className="form-control"
            type="text"
            placeholder="Search Bands"
          />
        </div>
        <div className="col-2">
          <button className="btn btn-outline-success" onClick={this.handleSearch}>Search</button>
        </div>
      </>
    );
  }

};
