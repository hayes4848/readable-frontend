import React, { Component } from 'react';
import Navigation from './Navigation';
import { Route } from 'react-router-dom';
import { withRouter } from  'react-router-dom'
import PostsIndex from './PostsIndex';
import * as ReadableAPI from '../lib/ReadableAPI';
import '../assets/App.css';
import { connect } from 'react-redux';
import { HANDLE_ALL_POSTS, HANDLE_ALL_CATEGORIES } from '../reducers/index.js';
import {Helmet} from "react-helmet";
import ReactPosts from './ReactPosts';
import ReduxPosts from './ReduxPosts';
import UdacityPosts from './UdacityPosts';

class App extends Component {
  
  componentDidMount(){
    ReadableAPI.getAllPosts()
      .then((posts) => {
        this.props.handleAllPosts(posts)
      })
    ReadableAPI.getAllCategories()
      .then((categories) => {
        this.props.handleAllCategories(categories)
      })  
  }

  render() {
    return (
      <div className="App">
      <Helmet>
        <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" rel="stylesheet"/>
        <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>
        <script src="../assets/index.css"></script>
      </Helmet>
        <Navigation />
        <Route exact path="/" render={() => (
          <PostsIndex />
        )} />
        <Route path="/react" render={ ({ history }) => (
          <ReactPosts />
        )} />
        <Route path="/redux" render={ ({ history }) => (
          <ReduxPosts />
        )} />
        <Route path="/udacity" render={ ({ history }) => (
          <UdacityPosts />
        )} />
      </div>
    );
  }
}

const mapStateToProps = state =>( 
  {
    state: state
  }
)

const mapDispatchToProps = dispatch => (
{
  handleAllPosts: posts => {
    dispatch({
      type: HANDLE_ALL_POSTS, 
      posts: posts
    })
  }, 
  handleAllCategories: categories => {
    dispatch({
      type: HANDLE_ALL_CATEGORIES, 
      categories: categories
    })
  }
}
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
