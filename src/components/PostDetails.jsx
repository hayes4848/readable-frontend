import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { HANDLE_POST_VOTE, HANDLE_SINGLE_POST, HANDLE_POST_COMMENTS, HANDLE_ADD_COMMENT, HANDLE_COMMENT_VOTE, HANDLE_COMMENT_DELETE, HANDLE_UPDATE_COMMENT, HANDLE_EDIT_POST, HANDLE_POST_DELETE } from '../reducers/index.js';
import * as ReadableAPI from '../lib/ReadableAPI';
import serializeForm from 'form-serialize';
import uuidv1 from 'uuid/v1';
import Timestamp from 'react-timestamp';

class PostDetails extends React.Component {

  state = {
    commentButton: 'show', 
    commentForm: 'hidden', 
    updateable: ''
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
        console.log(response)
        this.props.handleAddComment(response)
        this.setState({
          commentButton: 'show', 
          commentForm: 'hidden'
        })
      })
  }

  handleUpdateSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    values['timestamp'] = Date.now()
    ReadableAPI.updateComment(values)
      .then( (response) => {
        // console.log(response.body)
        this.props.handleUpdateComment(values)
        this.setState({
          updateable: ''
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

  showUpdateForm(commentID) {
    this.setState({
      updateable: commentID
    })
  }

  deletePost(postID) {
    ReadableAPI.deletePost(postID)
    .then((response) => {
      this.props.handlePostDelete(response)
      this.props.history.push('/')
    })
  }

  editPost(post) {
    this.props.handleEditPost(post)
    this.props.history.push('/edit')
  }

  
  render(){
    let postComments = this.props.comments.map((comment) => {
      if(comment.id === this.state.updateable){
        return (
          <form onSubmit={this.handleUpdateSubmit} key={comment.id} className="row">
            <input type="hidden" defaultValue={comment.id} name="commentID" />
            <div className="col s3">{comment.author}</div>
            <div><input className="col s5" defaultValue={comment.body} name='body' /></div>
            <div><button className="col s3 waves-effect waves-light btn">Update</button></div>
          </form>
        )
      }else{
      return(
        <div className="row" key={comment.id + 2}>
          <div className="col s3">
            <a onClick={() => {this.commentVote('upVote', comment.id)}} className="vote-block-children">UP </a>
            <span className="vote-block-children">{comment.voteScore}</span>
            <a onClick={() => { this.commentVote('downVote', comment.id)}} className="vote-block-children"> DOWN</a>
          </div>
          <div className="col s3">{comment.author}</div>
          <div className="col s3">{comment.body}</div>
          <div className="col s3">
            <button onClick={() => {this.showUpdateForm(comment.id)}} className="waves-effect waves-light btn">EDIT</button>
          <button onClick={() => {this.commentDelete(comment.id)}} className="waves-effect waves-light btn">Delete</button>
          </div>
        </div>
      )}
    })
    if(this.props.post.timestamp === undefined){
      return (
        <h3>POST NOT FOUND</h3>
      )
    }else {
      return(
        <div>
          <h3>Posts Details Page</h3>
          <button onClick={() => {this.editPost(this.props.post)}} className="waves-effect waves-light btn">EDIT</button>
          <button onClick={() => {this.deletePost(this.props.post.id)}} className="waves-effect waves-light btn">DELETE</button>
          <p>Title: {this.props.post.title}</p>
          <p>Author: {this.props.post.author}</p>
          <p>Written on: <Timestamp time={this.props.post.timestamp} /></p>
          <h5>{this.props.post.body}</h5>
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
            <div className="pretend-table-head row">
              <div className="col s3">voting</div>
              <div className="col s3">author</div>
              <div className="col s3">message</div>
              <div className="col s3">other things</div>
            </div>
          <div className="row">
            {postComments}
          </div>
        </div>
      )
    }
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
  }, 
  handleUpdateComment: comment => {
    dispatch({
      type: HANDLE_UPDATE_COMMENT, 
      comment: comment
    })
  }, 
  handleEditPost: post => {
    dispatch({
      type: HANDLE_EDIT_POST, 
      post: post
    })
  }, 
  handlePostDelete: post => {
    dispatch({
      type: HANDLE_POST_DELETE, 
      post: post
    })
  },
}
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));