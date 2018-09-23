import request from 'superagent'

let apiDomain = 'https://quizzlybear-api.herokuapp.com/api'

let userToken

const apiCalls = {
  login: (username, password) => {
    return (request.post(`${apiDomain}/login`)
      .send({ 'username': `${username}`,
        'password': `${password}` })
      .then(response => {
        let token = response.body.token
        apiCalls.setUserToken(token)
        apiCalls.checkAdmin(response.body.admin, response.body.token)
        return { username, token }
      })
    )
  },
  setUserToken: (token) => {
    userToken = token
  },
  getUserToken: () => {
    return userToken
  },
  getQuizzes: () => {
    return (request.get(`${apiDomain}/quizzes`)
      .then(response => {
        let quizzes = response.body
        return (quizzes)
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
  }
}

export default apiCalls
