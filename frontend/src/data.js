
import request from 'superagent'

let apiDomain = 'https://quizzlybear-api.herokuapp.com/api'

let userToken

const apiCalls = {
  login: (username, password) => {
    return (request.post(`${apiDomain}/login`)
      .send(console.log({ 'username': `${username}`,
        'password': `${password}` }))
      .then(response => response.body.token)
      .then(token => {
        apiCalls.setUserToken(token)
      })
      .then((response, token) => {
        apiCalls.checkAdmin(response, token)
      }
      )
    )
  },
  checkAdmin: (response, token) => {
    console.log('here')
    if (response.body.admin === true) {
      apiCalls.getAdminProfile(token)
    } else {
      apiCalls.getUser(token)
    }
  },
  getAdminProfile: (token) => {
    return request.get(`${apiDomain}/quizzes`)
  },
  setUserToken: (token) => {
    console.log(token, 'token')
    userToken = token
  },
  getUserToken: () => {
    return userToken
  }
}

export default apiCalls
