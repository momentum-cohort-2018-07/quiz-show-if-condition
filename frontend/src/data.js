import request from 'superagent'

let apiDomain = 'https://quizzlybear-api.herokuapp.com/api'

let userToken

const apiCalls = {
  login: (username, password) => {
    return (request.post(`${apiDomain}/login`)
      .send({ 'username': `${username}`,
        'password': `${password}` })
      .then(response => {
        console.log(apiCalls.setUserToken(response.body.token), response.body, 'response')
        console.log(apiCalls.checkAdmin(response.body.admin, response.body.token), response.body.admin, 'checking')
      })
    )
  },
  checkAdmin: (admin, token) => {
    if (admin === true) {
      apiCalls.getAdminProfile(token)
    } else {
      apiCalls.getUserProfile(token)
    }
  },
  getUserProfile: (token) => {
    return request.get(`${apiDomain}/profile`)
  },
  getAdminProfile: (token) => {
    return request.get(`${apiDomain}/quizzes`)
  },
  setUserToken: (token) => {
    userToken = token
  },
  getUserToken: () => {
    return userToken
  }
}

export default apiCalls
