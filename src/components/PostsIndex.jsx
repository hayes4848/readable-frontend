import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostsIndex extends React.Component {

  
  render(){
    let postsList = this.props.posts.map((post) => {
      return( <tr key={post.id}>
                <td>Vote Block</td>
                <td>{post.category}</td>
                <td>{post.author}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td><button className="waves-effect waves-light btn">Edit</button><button className="waves-effect waves-light btn">Delete</button></td>
              </tr>)
    })
    console.log(this.props)
    return(
      <div className="container">
        <h1>Posts Index Page</h1>
        <table className="striped">
        <thead>
          <tr>
            <th>Vote Here</th>
            <th>Category</th>
            <th>Author</th>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
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
    posts: state.posts
  }
)

const mapDispatchToProps = () => (
{

}
)
export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex)