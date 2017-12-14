import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from  'react-router-dom'

class PostsIndex extends React.Component {

  
  render(){
    let postsList = this.props.posts.map((post) => {
      return( 
              <tr key={post.id}>
                
                  <td>{post.voteScore}</td>
                  <td>{post.category}</td>
                  <td>{post.author}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td>{post.commentCount}</td>
                  <td><button className="waves-effect waves-light btn">Edit</button>
                      <button className="waves-effect waves-light btn">Delete</button>
                  </td>
                  <td><Link to='' className=''>Read More</Link></td>
              </tr>)
    })

    let categoriesList = this.props.categories.map((cat) => {
      return (
        <span key={cat.name}><Link to={cat.path}> {cat.name} </Link>|</span>
      )
    })
    console.log(this.props)
    return(
      <div className="container">
        <h3>Posts Index Page</h3>
        <div className="">View Articles by Category: |{categoriesList}</div>

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

const mapDispatchToProps = () => (
{

}
)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsIndex))