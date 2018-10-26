import React, { Component } from 'react'
import { Title } from 'bloomer'

import apiCalls from '../apiCalls'
import QuizListItem from './QuizListItem'
import Card from './Card'

class QuizList extends Component {
  constructor () {
    super()
    this.state = {
      quizzes: [],
      loaded: false,
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
      this.setState({ quizzes: quizzes,
        loaded: true })
    })
  }
  makeActive () {
    this.setState({ active: true })
  }
  render () {
    let { loaded, quizzes } = this.state
    if (loaded) {
      return (
        <div>
          <h1>Published Quizzes</h1>
          {quizzes.map((quiz) => <Card><Title><QuizListItem key={quiz.id} quiz={quiz} makeActive={this.makeActive} activeQuestion={this.state.activeQuiz} /></Title></Card>)}
        </div>
      )
    } else {
      return (<div>loading</div>)
    }
  }
}

export default QuizList
