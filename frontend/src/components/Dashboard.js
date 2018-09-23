import React, { Component } from 'react'
import apiCalls from '../data'
import Quiz from './Quiz'

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
    apiCalls.getQuizzes().then(quizzes => {
      this.setState({ quizzes })
      console.log(this.state.quizzes, 'quizzes in state')
    })
  }
  render () {
    return (<div>
      {this.state.quizzes.map((quiz) => <Quiz key={quiz.id} quiz={quiz} />)}
    </div>)
  }
}

export default Dashboard
