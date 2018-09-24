import React, { Component } from 'react'
import apiCalls from '../apiCalls'
import QuizBtn from './QuizList'
// import Active from './Active'

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
    })
  }
  makeActive () {
    this.setState({ active: true })
  }
  render () {
    return (<div>
      {this.state.quizzes.map((quiz) => <QuizBtn key={quiz.id} quiz={quiz} makeActive={this.makeActive} />)}
    </div>)
  }
}

export default Dashboard
