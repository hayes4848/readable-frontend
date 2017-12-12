import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Navigation extends React.Component {


  render(){
    return(
      <div>
        <Link to='/' className="home-link">Go Home</Link>
      </div>
    )
  }
}

export default Navigation;