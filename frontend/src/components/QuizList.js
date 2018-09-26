import React, { Component } from 'react'
import apiCalls from '../apiCalls'
import QuizListItem from './QuizListItem'
import Card from './Card'
import { Title } from 'bloomer'

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
      return (
        <Card>
          <div>
            {this.state.quizzes.map((quiz) => <Title><QuizListItem key={quiz.id} quiz={quiz} makeActive={this.makeActive} activeQuestion={this.state.activeQuiz} /></Title>)}
          </div>
        </Card>)
    } else {
      return ('')
    }
  }
}

export default QuizList
