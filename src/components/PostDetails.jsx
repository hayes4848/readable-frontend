import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { HANDLE_ALL_POSTS, HANDLE_ALL_CATEGORIES, HANDLE_POST_VOTE, HANDLE_SINGLE_POST, HANDLE_POST_COMMENTS } from '../reducers/index.js';
import * as ReadableAPI from '../lib/ReadableAPI';

class PostDetails extends React.Component {

  componentDidMount(){
    ReadableAPI.getSinglePost(this.props.match.params.post_id)
      .then((post) => {
        this.props.handleSinglePost(post)
      })
    ReadableAPI.getAllPostComments(this.props.match.params.post_id)
      .then((comments) => {
        this.props.handlePostComments(comments)
      })  
  }

  
  render(){
    let postComments = this.props.comments.map((comment) => {
      return(
        <tr key={comment.id}>
          <td>{comment.author}</td>
          <td>{comment.voteScore}</td>
          <td>{comment.body}</td>
          <td>{}</td>
        </tr>
      )
    })
    console.log(this.props.post)
    return(
      <div>
        <h3>Posts Details Page</h3>
        <h4>Title: {this.props.post.title}</h4>
        <h4>Author: {this.props.post.author}</h4>
        <h4>Written on: {this.props.post.timestamp}</h4>
        <p>{this.props.post.body}</p>
        <div>comments ({this.props.post.commentCount})</div>
        <table className="striped">
        <thead>
          <tr>
            <th>author</th>
            <th>points</th>
            <th>message</th>
            <th>other things</th>
          </tr>
        </thead>
        <tbody>
          {postComments}
        </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state =>( 
  {
    post: state.singlePost, 
    comments: state.comments
  }
)

const mapDispatchToProps = dispatch => (
{
  handleSinglePost: post => {
    dispatch({
      type: HANDLE_SINGLE_POST, 
      post: post
    })
  }, 
  handlePostComments: comments => {
    dispatch({
      type: HANDLE_POST_COMMENTS, 
      comments: comments
    })
  }
}
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));