import React from 'react';

const Search = props => ( 
  <div className="pos-f-t">      
    <div className="navbar navbar-fixed-top navbar-dark bg-inverse">
      <span className="navbar-brand">Amido</span>
      <form 
        onSubmit={ev => {ev.preventDefault();props.onSubmit();}} 
        className="form-inline pull-xs-left"
      >
          <input 
            ref={props.saveRef}
            defaultValue={props.query} 
            className="form-control" 
            type="text" 
            placeholder="Search Terms" 
          />
          &nbsp;
          <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
);

Search.propTypes = { 
  onSubmit: React.PropTypes.func.isRequired,
  saveRef: React.PropTypes.func.isRequired,
  query: React.PropTypes.string.isRequired,
};

export default Search;