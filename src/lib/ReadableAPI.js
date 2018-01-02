const api = "http://localhost:3001"

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Authorization': token
}

export const getAllCategories = () => 
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () => 
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)  

export const getSinglePost = (postID) =>
  fetch(`${api}/posts/${postID}`, { headers })
    .then(res => res.json())
    .then(data => data)    

export const getCategoryPosts = (categoryName) => 
  fetch(`${api}/${categoryName}/posts`, { headers })
    .then(res => res.json())
    .then(data => data) 

//need a method to vote on a post
export const voteOnPost = (postID, option) => 
  fetch(`${api}/posts/${postID}`, { 
    method: 'POST', 
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option})
     })
    .then(res => res.json())

//need a method to delete a post
export const deletePost = (postID) => 
  fetch(`${api}/posts/${postID}`, { method: 'DELETE', headers })
    .then(res => res.json())

//need a method to fetch all comments for a post
export const getAllPostComments = (postID) =>
  fetch(`${api}/posts/${postID}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

//need a method to delete a comment
export const deletePostComment = (commentID) => 
  fetch(`${api}/comments/${commentID}`, { method: 'DELETE', headers })
    .then(res => res.json())

//need a method to vote on a comment  
export const voteOnComment = (commentID, option) => 
    fetch(`${api}/comments/${commentID}`, {
     method: 'POST', 
     headers: {
      ...headers, 
      'Content-Type': 'application/json'
     }, 
     body: JSON.stringify({option}) 
   })
      .then(res => res.json())
//need a method to fetch a single comment

export const createPost = (post) => 
  fetch(`${api}/posts`, { 
    method: 'POST', 
    body: JSON.stringify(post),
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())

export const createComment = (comment) => 
  fetch(`${api}/comments`, { 
    method: 'POST', 
    body: JSON.stringify(comment),
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json()) 

export const updateComment = (comment) => 
  fetch()     
