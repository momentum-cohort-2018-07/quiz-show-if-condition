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
      .catch(err => {
        if (err.response.statusCode === 422) {
          throw new Error('You must provide a username and password')
        } else if (err.response.statusCode === 401) {
          throw new Error('There is no user with that username and password')
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
        if (err.response.statusCode === 422) {
          throw new Error('test')
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
  getQuestions: (quizID) => {
    return (request.get(`${apiDomain}/quizzes/${quizID}.json`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(response => {
        let questions = response.body.data.relationships.questions
        console.log(questions, 'questions')
        return (questions)
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
