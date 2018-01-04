import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as ReadableAPI from '../lib/ReadableAPI';
import { HANDLE_ALL_POSTS, HANDLE_POST_VOTE, HANDLE_CATEGORY_CHANGE } from '../reducers/index.js';

class CategoryPosts extends React.Component {

  componentDidMount(){
    console.log(`link param: ${this.props.match.params.category_name}`)
    if(this.props.match.params.category_name !== this.props.selectedCategory){
      this.props.handleCategoryChange(this.props.match.params.category_name)
    }
    ReadableAPI.getCategoryPosts(this.props.match.params.category_name)
      .then( (posts) => {
        this.props.handleAllPosts(posts)
    })
  }

  postVote(option, postID) {
    ReadableAPI.voteOnPost(postID, option)
      .then((response) => {
        this.props.handlePostVote(response)
      })
  }

  changeRandom(){
    this.forceUpdate()
  }

  render(){
    let categoriesList = this.props.categories.map((cat) => {
      return (
        <span key={cat.name}><Link onClick={this.changeRandom} to={`/${cat.name}`}> {cat.name} </Link>|</span>
      )
    })

    let posts = this.props.posts.map((post) => {
     return( 
      <tr key={post.title}>
        <td className="vote-div">
          <a onClick={() => {this.postVote('upVote', post.id)}} className="vote-block-children">UP </a>
          <span className="vote-block-children">{post.voteScore}</span>
          <a onClick={() => { this.postVote('downVote', post.id)}} className="vote-block-children"> DOWN</a>
        </td>
        <td>{post.category}</td>
        <td>{post.author}</td>
        <td>{post.title}</td>
        <td>{post.body}</td>
        <td>{post.commentCount}</td>
        <td>
          <Link to={`/posts/${post.id}`} className="waves-effect waves-light btn">EDIT</Link>
          <button onClick={() => {console.log('delete me')}} className="waves-effect waves-light btn">Delete</button>
        </td>
        <td><Link to={`/${post.category}/${post.id}`} className=''>Read More</Link></td>
      </tr>)
    })
    return(
      this.props.match.url !== '/new' || this.props.match.url !== '/edit'  &&
      <div>
        <h3>{this.props.match.params.category_name} posts</h3>
        <Link to='/new' className="waves-effect waves-light btn" >ADD A NEW POST</Link>
        <div className="">View Articles by Category: |{categoriesList}</div>
        <div>
          <select className="browser-default">
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
          {posts}
        </tbody>  
        </table>
      </div>
    )
  }

}

const mapStateToProps = state =>( 
  {
    posts: state.posts, 
    categories: state.categories, 
    selectedCategory: state.selectedCategory
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
    handlePostVote: option => {
      dispatch({
        type: HANDLE_POST_VOTE, 
        option: option
      })
    }, 
    handleCategoryChange: category => {
      dispatch({
        type: HANDLE_CATEGORY_CHANGE, 
        category: category
      })
    } 
  }
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryPosts));