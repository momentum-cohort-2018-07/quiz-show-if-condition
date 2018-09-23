import React, { Component } from 'react'
import apiCalls from './data'
// import Quiz from './quiz'

class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      quizzes: []
    }
  }
  componentDidMount () {
    this.getQuizzes()
  }
  getQuizzes () {
    apiCalls.getQuizzes().then(quizzes => this.setState({ quizzes }))
  }
  render () {
    return (<div>Hi
      {/* {this.state.quizzes.map((quiz) => <Quiz key={quiz.id} quiz={quiz} />)} */}
    </div>)
  }
}

export default Dashboard
