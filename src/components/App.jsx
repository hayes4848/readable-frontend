import React, { Component } from 'react';
import Navigation from './Navigation';
import { Route } from 'react-router-dom';
import PostsIndex from './PostsIndex';
import * as ReadableAPI from '../lib/ReadableAPI';
import '../assets/App.css';
import { connect } from 'react-redux';
import { HANDLE_ALL_POSTS } from '../reducers/index.js';

class App extends Component {
  
  componentDidMount(){
    ReadableAPI.getAllPosts()
      .then((posts) => {
        this.props.handleAllPosts(posts)
      })
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <Navigation />
        <Route exact path="/" render={() => (
          <PostsIndex />
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
  }
}
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
