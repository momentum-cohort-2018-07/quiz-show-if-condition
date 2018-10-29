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
        console.log(userToken, 'user token')
        apiCalls.checkAdmin(response.body.admin, response.body.token)
        return { username, token }
      })
      .catch(err => {
        if (err.response.statusCode === 401) {
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
        if (err.response.statusCode === 422) {
          let passwordErr = err.response.body.password
          let usernameErr = err.response.body.username
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
  getAnswers: (quizID, questionID) => {
    return (request.get(`${apiDomain}/quizzes/${quizID}/questions/${questionID}/answers`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(response => {
        return response.body
      }))
  },
  getQuestion: (quizID, questionID) => {
    return (request.get(`${apiDomain}/quizzes/${quizID}/questions/${questionID}`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(response => {
        return response.body
      }))
  },
  getNextQuestion: (questionURL) => {
    return (request.get(`https://quizzlybear-api.herokuapp.com/${questionURL}`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(response => {
        return response.body
      }))
  },
  submitAnswer: (answerID, quizID, questionID) => {
    // console.log(answerID, ' answerID')
    // console.log(quizID, ' quizID')
    // console.log(questionID, ' questionID')
    return (request.post(`${apiDomain}/quizzes/${quizID}/questions/${questionID}/responses`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ 'answer_id': `${answerID}`
      })
      .then(response => {
        return response.body
      }))
  },
  checkAdmin: (admin, token) => {
    if (admin === true) {
      apiCalls.getAdminProfile(token)
    } else {
      apiCalls.getUserProfile(token)
    }
  },
  getQuiz: (quizID) => {
    return (request.get(`${apiDomain}/quizzes/${quizID}`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(response => {
        // console.log(response, ' get quiz response in API')
        let quiz = response.body.data
        return (quiz)
      }))
  },
  getScore: (quizID) => {
    return (request.post(`${apiDomain}/quizzes/${quizID}/score`))
      .set('Authorization', `Bearer ${userToken}`)
      .then(response => {
        return (response.body)
      })
  },
  getUserProfile: (token) => {
    return request.get(`${apiDomain}/profile`)
      .then(res => res.body)
  },
  getAdminProfile: (token) => {
    return request.get(`${apiDomain}/quizzes`)
  },
  createQuiz: (title) => {
    return request.post(`${apiDomain}/quizzes`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ 'title': `${title}` })
      .then(res => {
        console.log(res, 'res')
        return (res.body)
      })
  }
}

export default apiCalls
