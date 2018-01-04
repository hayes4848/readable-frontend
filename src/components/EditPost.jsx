import React from 'react';
import { withRouter } from 'react-router-dom';
import * as ReadableAPI from '../lib/ReadableAPI';
import serializeForm from 'form-serialize';
import uuidv1 from 'uuid/v1';
import { connect } from 'react-redux';

class EditPost extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    // values['id'] = uuidv1()
    console.log(values)
    ReadableAPI.updatePost(values)
      .then( (response) => {
        return this.props.history.push("/");
      })
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
         <select>
          <option value="react">React</option>
          <option value="redux">Redux</option>
          <option value="udacity">Udacity</option>
        </select>
          <div className="row">
            <div className="input-field col s12">
              <input type="hidden" value={this.props.singlePost.id} name="id" />
              <input name="author" readOnly="true" value={this.props.singlePost.author} className="col s6" type="text" placeholder="Author"/>
              <input name="title" defaultValue={this.props.singlePost.title} className="col s6" type="text" placeholder="Title"/>
            </div>
          </div>
          <div className="input-field col s8">
            <textarea name="body" id="textarea1" defaultValue={this.props.singlePost.body} className="materialize-textarea" placeholder="Body"></textarea>
          </div>
          <div className="input-field col s6">
            <select name="category" className="browser-default" placeholder="category" defaultValue={this.props.singlePost.category}>
              <option value="react">React</option>
              <option value="redux">Redux</option>
              <option value="udacity">Udacity</option>
            </select>
          </div>
          <button className="waves-effect waves-light btn">Update</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state =>( 
  {
    singlePost: state.singlePost
  }
)

export default withRouter(connect(mapStateToProps)(EditPost));