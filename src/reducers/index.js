import _ from 'lodash/fp'
export const HANDLE_ALL_POSTS = 'HANDLE_ALL_POSTS'
export const HANDLE_ALL_CATEGORIES = 'HANDLE_ALL_CATEGORIES'
export const HANDLE_POST_VOTE = 'HANDLE_POST_VOTE'
export const HANDLE_SINGLE_POST = 'HANDLE_SINGLE_POST'
export const HANDLE_POST_COMMENTS = 'HANDLE_POST_COMMENTS'

const initialState = {
  posts: [], 
  comments: [],
  categories: [], 
  singlePost: {}
}

function reducer(state = initialState, action){
  switch(action.type){
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
    default:
      return state
        
  }


}

export default reducer