import React, { Component } from 'react'
import apiCalls from '../apiCalls'
import QuizListItem from './QuizListItem'
import Card from './Card'
import { Title } from 'bloomer'
// import Active from './Active'

class QuizList extends Component {
  constructor () {
    super()
    this.state = {
      quizzes: [],
      published: true,
      activeQuiz: false
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
    if (this.state.quizzes.length > 0) {
      return (<div>
        {/* {console.log(this.state.quizzes, 'state quizzes')} */}
        {this.state.quizzes.map((quiz) => <Card><Title><QuizListItem key={quiz.id} quiz={quiz} makeActive={this.makeActive} activeQuestion={this.state.activeQuiz} /></Title></Card>)}
      </div>)
    } else {
      return ('')
    }
  }
}

export default QuizList
