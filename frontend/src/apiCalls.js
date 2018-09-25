import request from 'superagent/superagent.js'

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
      .catch(err => {
        if (err.response.statusCode === 401) {
          console.log(err.response, 'response')
          throw new Error(err.response.body.error)
        }
      })
    )
  },
  register: (username, password) => {
    return (request.post(`${apiDomain}/users`)
      .send({ 'username': `${username}`,
        'password': `${password}` })
      .then(response => {
        let token = response.body.token
        apiCalls.setUserToken(token)
        apiCalls.checkAdmin(response.body.admin, response.body.token)
        return { username, token }
      }))
      .catch((err) => {
        console.log(err)
        if (err.response.statusCode === 422) {
          let passwordErr = err.response.body.password
          console.log(passwordErr)
          let usernameErr = err.response.body.username
          console.log(usernameErr)
          let newArray = passwordErr.concat(usernameErr)
          throw new Error(newArray)
        }
      })
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
  getQuiz: (quizID) => {
    return (request.get(`${apiDomain}/quizzes/${quizID}.json`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(response => {
        let quiz = response.body.data
        console.log(response.body.data, 'response.body.data')
        return (quiz)
      }))
  },
  getUserProfile: (token) => {
    return request.get(`${apiDomain}/profile`)
  },
  getAdminProfile: (token) => {
    return request.get(`${apiDomain}/quizzes`)
  }
}

export default apiCalls
