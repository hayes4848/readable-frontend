import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { HANDLE_ALL_POSTS, HANDLE_ALL_CATEGORIES, HANDLE_POST_VOTE, HANDLE_SINGLE_POST, HANDLE_POST_COMMENTS, HANDLE_ADD_COMMENT, HANDLE_COMMENT_VOTE, HANDLE_COMMENT_DELETE } from '../reducers/index.js';
import * as ReadableAPI from '../lib/ReadableAPI';
import serializeForm from 'form-serialize';
import uuidv1 from 'uuid/v1';

class PostDetails extends React.Component {

  state = {
    commentButton: 'show', 
    commentForm: 'hidden'
  }

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

  showCommentDiv(){
    this.setState({
      commentButton: 'hidden', 
      commentForm: 'show'
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    values['timestamp'] = Date.now()
    values['id'] = uuidv1()
    ReadableAPI.createComment(values)
      .then( (response) => {
        this.props.handleAddComment(response)
        this.setState({
          commentButton: 'show', 
          commentForm: 'hidden'
        })
      })
  }
  
  commentVote(option, commentId) {
    ReadableAPI.voteOnComment(commentId, option)
      .then((response) => {
        this.props.handleCommentVote(response)
      })
  }

  commentDelete(commentID) {
    ReadableAPI.deletePostComment(commentID)
      .then((response) => {
        this.props.handleCommentDelete(response)
      })
  }

  
  render(){
    let postComments = this.props.comments.map((comment) => {
      return(
        <tr key={comment.id}>
          <td className="vote-div">
            <a onClick={() => {this.commentVote('upVote', comment.id)}} className="vote-block-children">UP </a>
            <span className="vote-block-children">{comment.voteScore}</span>
            <a onClick={() => { this.commentVote('downVote', comment.id)}} className="vote-block-children"> DOWN</a>
          </td>
          <td>{comment.author}</td>
          <td>{comment.voteScore}</td>
          <td>{comment.body}</td>
          <td>
            <button className="waves-effect waves-light btn">EDIT</button>
          <button onClick={() => {this.commentDelete(comment.id)}} className="waves-effect waves-light btn">Delete</button>
          </td>
        </tr>
      )
    })
    return(
      <div>
        <h3>Posts Details Page</h3>
        <h4>Title: {this.props.post.title}</h4>
        <h4>Author: {this.props.post.author}</h4>
        <h4>Written on: {this.props.post.timestamp}</h4>
        <p>{this.props.post.body}</p>
        <div>comments ({this.props.post.commentCount})</div>
        <div>
          <button className={`waves-effect waves-light btn ${this.state.commentButton}`} onClick={() => {this.showCommentDiv()}}>Add Comment </button>
        <div className={`comment-div ${this.state.commentForm}`}>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input name="parentId" type="hidden" defaultValue={this.props.post.id} />
                <input name="author" className="col s4" placeholder="author"></input>
                <input name="body" className="col s6" placeholder="message"></input>
                <button className=" col s2 waves-effect waves-light btn">Submit</button>
              </div>
            </div>
          </form>
        </div>  
        </div>
        <table className="striped">
        <thead>
          <tr>
            <th>voting</th>
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
  }, 
  handleAddComment: comment => {
    dispatch({
      type: HANDLE_ADD_COMMENT, 
      comment: comment
    })
  },
  handleCommentVote: option => {
    dispatch({
      type: HANDLE_COMMENT_VOTE, 
      option: option
    })
  },
  handleCommentDelete: comment => {
    dispatch({
      type: HANDLE_COMMENT_DELETE, 
      comment: comment
    })
  }
}
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));