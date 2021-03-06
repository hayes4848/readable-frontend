import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { HANDLE_ALL_POSTS, HANDLE_ALL_CATEGORIES, HANDLE_POST_VOTE, HANDLE_POST_DELETE, HANDLE_SORT_POST, HANDLE_EDIT_POST } from '../reducers/index.js';
import * as ReadableAPI from '../lib/ReadableAPI';
import Time from 'react-time';

class PostsIndex extends React.Component {

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

  postVote(option, postID) {
    ReadableAPI.voteOnPost(postID, option)
      .then((response) => {
        this.props.handlePostVote(response)
      })
  }

  deletePost(postID) {
    ReadableAPI.deletePost(postID)
    .then((response) => {
      this.props.handlePostDelete(response)
    })
  }

  editPost(post) {
    this.props.handleEditPost(post)
    this.props.history.push('/edit')
  }

sortPosts(event) {
    this.props.handlePostSort(event.target.value)
  }
  
  render(){
    let postsList = this.props.posts.map((post) => {
      return( 
              <tr key={post.id + 2}>
                
                  <td className="vote-div">
                    <a onClick={() => {this.postVote('upVote', post.id)}} className="vote-block-children">UP </a>
                    <span className="vote-block-children">{post.voteScore}</span>
                    <a onClick={() => { this.postVote('downVote', post.id)}} className="vote-block-children"> DOWN</a>
                  </td>
                  <td><Time value={post.timestamp} format="YYYY/MM/DD" /></td>
                  <td>{post.category}</td>
                  <td>{post.author}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td>{post.commentCount}</td>
                  <td>
                    <button onClick={() => {this.editPost(post)}} className="waves-effect waves-light btn">EDIT</button>
                    <button onClick={() => {this.deletePost(post.id)}} className="waves-effect waves-light btn">Delete</button>
                  </td>
                  <td><Link to={`/${post.category}/${post.id}`} className=''>Read More</Link></td>
              </tr>)
    })

    let categoriesList = this.props.categories.map((cat) => {
      return (
        <span key={cat.name}><Link to={`/${cat.name}`}> {cat.name} </Link>|</span>
      )
    })
    return(
      <div className="">
        <Link to='/new' className="waves-effect waves-light btn" >ADD A NEW POST</Link>
        <h3>Posts Index Page</h3>
        <div className="">View Articles by Category: |{categoriesList}</div>
        <div>
          <select onChange={(event) => {this.sortPosts(event)}} className="browser-default">
            <option value='newest'>newest first</option>
            <option value='oldest'>oldest first</option>
            <option value='highest'>highest rated first</option>
            <option value='lowest'>lowest rated first</option>
          </select>
        </div>

        <table className="striped">
        <thead>
          <tr>
            <th>Vote Here</th>
            <th>Date</th>
            <th>Category</th>
            <th>Author</th>
            <th>Title</th>
            <th>Body</th>
            <th>Comment Count</th>
            <th>Actions</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>  
          {postsList}
        </tbody>  
        </table>
      </div>
    )
  }



}
const mapStateToProps = state =>( 
  {
    posts: state.posts, 
    categories: state.categories
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
  }, 
  handlePostVote: option => {
    dispatch({
      type: HANDLE_POST_VOTE, 
      option: option
    })
  }, 
  handlePostDelete: post => {
    dispatch({
      type: HANDLE_POST_DELETE, 
      post: post
    })
  }, 
  handlePostSort: sort => {
    dispatch({
      type: HANDLE_SORT_POST, 
      sort: sort
    })
  }, 
  handleEditPost: post => {
    dispatch({
      type: HANDLE_EDIT_POST, 
      post: post
    })
  }
}
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsIndex))