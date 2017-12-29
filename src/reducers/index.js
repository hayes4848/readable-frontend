// import _ from 'lodash/fp'
import { sortBy } from 'lodash'
export const HANDLE_ALL_POSTS = 'HANDLE_ALL_POSTS'
export const HANDLE_ALL_CATEGORIES = 'HANDLE_ALL_CATEGORIES'
export const HANDLE_POST_VOTE = 'HANDLE_POST_VOTE'
export const HANDLE_COMMENT_VOTE = 'HANDLE_COMMENT_VOTE'
export const HANDLE_SINGLE_POST = 'HANDLE_SINGLE_POST'
export const HANDLE_POST_COMMENTS = 'HANDLE_POST_COMMENTS'
export const SORT_ALL_POSTS = 'SORT_ALL_POSTS'
export const HANDLE_ADD_COMMENT = 'HANDLE_ADD_COMMENT'
export const HANDLE_POST_DELETE = 'HANDLE_POST_DELETE'
export const HANDLE_COMMENT_DELETE = 'HANDLE_COMMENT_DELETE'

const initialState = {
  posts: [], 
  comments: [],
  categories: [], 
  singlePost: {}
}

function reducer(state = initialState, action){
  switch(action.type){
    case SORT_ALL_POSTS: 
      return {
        ...state, 
        ['posts']: sortBy(state.posts, 'voteScore')
      }
    case HANDLE_ALL_POSTS: 
      return {
        ...state, 
        ['posts']: action.posts
      }
    case HANDLE_ALL_CATEGORIES:
      return {
        ...state, 
        ['categories']: action.categories
      }
    case HANDLE_POST_VOTE:
      return {
        ...state, 
        ['posts']: state.posts.map( (post) => {
          if(action.option.id == post.id) {
            return action.option
          }else{
            return post
          }
        })
      }
    case HANDLE_COMMENT_VOTE:
      return {
        ...state, 
        ['comments']: state.comments.map( (comment) => {
          if(action.option.id == comment.id) {
            return action.option
          }else{
            return comment
          }
        })
      }  
    case HANDLE_SINGLE_POST:
      return{
        ...state, 
        ['singlePost']: action.post
      }  
    case HANDLE_POST_COMMENTS:
      return {
        ...state, 
        ['comments']: action.comments
      } 
    case HANDLE_ADD_COMMENT:
      state.comments.push(action.comment)
      return state 
    case HANDLE_POST_DELETE: 
        return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.post.id),
      } 
    case HANDLE_COMMENT_DELETE: 
      return {
        ...state, 
        comments: state.comments.filter(c => c.id !== action.comment.id)
      }                        
    default:
      return state
        
  }


}

export default reducer