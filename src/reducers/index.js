import _ from 'lodash/fp'
export const HANDLE_ALL_POSTS = 'HANDLE_ALL_POSTS'

const initialState = {
  posts: '', 
  comments: '',
}

function reducer(state = initialState, action){
  switch(action.type){
    case HANDLE_ALL_POSTS: 
      return {
                ...state, 
                ['posts']: action.posts
              }
    default:
      return state
        
  }


}

export default reducer