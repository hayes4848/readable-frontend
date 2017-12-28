import React, { Component } from 'react';
import Navigation from './Navigation';
import { Route } from 'react-router-dom';
import { withRouter } from  'react-router-dom'
import PostsIndex from './PostsIndex';
// import * as ReadableAPI from '../lib/ReadableAPI';
import '../assets/App.css';
import { connect } from 'react-redux';
import {Helmet} from "react-helmet";
import CategoryPosts from './CategoryPosts';
import PostDetails from './PostDetails';
import NewPost from './NewPost';

class App extends Component {

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
        <Route exact path="/new" render={ ({history}) => (
          <NewPost />
        )} />
        <Route exact path="/:category_name" render={ ({history}) => (
          <CategoryPosts />
        )} />
        <Route exact path="/:category/:post_id" render={ ({history}) => (
          <PostDetails />
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
 
}
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
