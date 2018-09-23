import React, { Component } from 'react'
import apiCalls from '../data'
import Quiz from './Quiz'

class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      quizzes: [],
      published: true,
      active: false
    }
    this.makeActive = this.makeActive.bind(this)
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
  makeActive (quizID) {
    apiCalls.getQuestions(quizID)
    this.setState({ active: true })
  }
  render () {
    if (this.state.active) {
      <Active />
    } else {
    return (<div>
      {this.state.quizzes.map((quiz) => <Quiz key={quiz.id} quiz={quiz} />)}
    </div>)
  }
}

export default Dashboard
