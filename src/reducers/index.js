import _ from 'lodash/fp'
export const HANDLE_ALL_POSTS = 'HANDLE_ALL_POSTS'
export const HANDLE_ALL_CATEGORIES = 'HANDLE_ALL_CATEGORIES'

const initialState = {
  posts: [], 
  comments: [],
  categories: []
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
    default:
      return state
        
  }


}

export default reducer