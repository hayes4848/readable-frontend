import React from 'react';
import { Link } from 'react-router-dom';
import * as ReadableAPI from '../lib/ReadableAPI';
import { HANDLE_ALL_CATEGORIES, HANDLE_POST_VOTE } from '../reducers/index.js';
import { connect } from 'react-redux';

class Navigation extends React.Component {

  componentDidMount(){
    ReadableAPI.getAllCategories()
      .then((categories) => {
        this.props.handleAllCategories(categories)
      }) 
  }

  render(){
    return(
      <div>
        <Link to='/' className="home-link">Go Home</Link>
      </div>
    )
  }
}

const mapStateToProps = state =>( 
  {
    categories: state.categories
  }
)

const mapDispatchToProps = dispatch => (
{
  handleAllCategories: categories => {
    dispatch({
      type: HANDLE_ALL_CATEGORIES, 
      categories: categories
    })
  }
}
)

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);