import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostsIndex extends React.Component {

  render(){
    return(
      <h1>Posts Index Page</h1>
    )
  }



}
const mapStateToProps = () =>( 
  {

  }
)

const mapDispatchToProps = () => (
{

}
)
export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex)