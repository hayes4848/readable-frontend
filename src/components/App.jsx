import React, { Component } from 'react';
import Navigation from './Navigation';
import { Route } from 'react-router-dom';
import PostsIndex from './PostsIndex';
import * as ReadableAPI from '../lib/ReadableAPI';
import '../assets/App.css';

class App extends Component {
  
  componentDidMount(){
    ReadableAPI.getAllPosts()
      .then((posts) => {
        //this is where redux is needed to add these to state
        console.log(posts)
      })
  }

  render() {
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

export default App;
