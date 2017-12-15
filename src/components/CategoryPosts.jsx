import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as ReadableAPI from '../lib/ReadableAPI';
import { HANDLE_ALL_POSTS } from '../reducers/index.js';

class CategoryPosts extends React.Component {

  componentDidMount(){
    ReadableAPI.getCategoryPosts(this.props.match.params.category_name)
      .then( (posts) => {
        this.props.handleAllPosts(posts)
      })
  }

  render(){
    let posts = this.props.posts.map((post) => {
     return( 
      <div key={post.title}>
        <h4>{post.title} by {post.author}</h4>
        <p>{post.body}</p>
      </div>
      )
    })

    return(
      <div>
        <h3>{this.props.match.params.category_name} posts</h3>
        {posts}
      </div>
    )
  }

}

const mapStateToProps = state =>( 
  {
    posts: state.posts
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryPosts));