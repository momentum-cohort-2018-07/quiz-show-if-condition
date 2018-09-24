import React, { Component } from 'react'
import apiCalls from '../apiCalls'
import QuizBtn from './QuizBtn'
import Active from './Active'

class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      quizzes: [],
      published: true,
      active: false,
      questions: []
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
  makeActive (quizID) {
    this.setState({ active: true })
    apiCalls.getQuestions(quizID).then(questions => {
      this.setState({ questions })
      console.log(this.state.questions, 'question data')
    })
  }
  render () {
    if (this.state.active) {
      return (<div>
        {this.state.questions.map((question) => <Active key={question.data.id} question={question.data} />)}
      </div>)
    } else {
      return (<div>
        {this.state.quizzes.map((quiz) => <QuizBtn key={quiz.id} quiz={quiz} makeActive={this.makeActive} />)}
      </div>)
    }
  }
}

export default Dashboard
