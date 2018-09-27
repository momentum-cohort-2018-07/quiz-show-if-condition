import React, { Component } from 'react'
import { Button, Title } from 'bloomer'
import Card from './Card'

import apiCalls from '../apiCalls'
import Answer from './Answer'

class Question extends Component {
  constructor () {
    super()
    this.state = {
      question: undefined,
      answers: [],
      currentAnswer: null,
      lastQuestion: false,
      score: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setNewQuestion = this.setNewQuestion.bind(this)
    this.setStateInQuestion = this.setStateInQuestion.bind(this)
  }
  setStateInQuestion (value) {
    this.setState({ currentAnswer: value })
  }
  componentDidMount () {
    let quizID = this.props.quizId
    let questionID = this.props.id
    this.getQuestion(quizID, questionID)
    this.getAnswers(quizID, questionID)
  }
  getQuestion (quizID, questionID) {
    apiCalls.getQuestion(quizID, questionID).then(question => {
      this.setState({ question })
    })
  }
  getAnswers (quizID, questionID) {
    apiCalls.getAnswers(quizID, questionID).then(answers => {
      this.setState({ answers })
    })
  }
  setNewQuestion () {
    let quizID = this.props.quizId
    apiCalls.getQuiz(quizID).then(response => {
      let newQuestion = response.relationships.questions
      if (!newQuestion.links.score) {
        this.setState({ question: newQuestion })
      } else {
        this.setState({ question: newQuestion })
        this.setState({ lastQuestion: true })
      }
    })
  }
  handleSubmit () {
    let quizID = this.props.quizId
    let questionID = this.state.question.data.attributes.number
    let answerID = this.state.currentAnswer
    if (!this.state.lastQuestion) {
      apiCalls.submitAnswer(answerID, quizID, questionID)
        .then(res => {
          this.setNewQuestion()
        })
    } else if (this.state.lastQuestion) {
      apiCalls.submitAnswer(answerID, quizID, questionID)
        .then(res => {
          this.showScore()
        })
    }
  }
  showScore () {
    let quizID = this.props.quizId
    apiCalls.getScore(quizID).then(response => {
      this.setState({ score: response })
      this.setState({ question: undefined })
      this.setState({ lastQuestion: undefined })
    })
  }
  render () {
    if (this.state.question && this.state.question.data.attributes.text && !this.state.lastQuestion) {
      const { data, links } = this.state.question
      const question = data.attributes.text
      const answers = data.relationships.answers
      return (
        <Card>
          <div>
            <Title className='is-size-5'><span className='question-number'>Question{data.attributes.number}.</span> {question}</Title>
            {answers.map(answer => <Answer key={answer.data.id} links={links} answer={answer} setStateInQuestion={this.setStateInQuestion} />)}
            <Button className='is-primary' value={links} onClick={e => this.handleSubmit(e)}>Submit</Button>
          </div>
        </Card>
      )
    } else if (this.state.lastQuestion && this.state.question) {
      const { data, links } = this.state.question
      const question = data.attributes.text
      const answers = data.relationships.answers
      return (
        <Card>
          <div>
            <Title className='is-size-5'><span className='question-number'>Question{data.attributes.number}.</span> {question}</Title>
            {answers.map(answer => <Answer key={answer.data.id} links={links} answer={answer} setStateInQuestion={this.setStateInQuestion} />)}
            <Button className='is-primary' value={links} onClick={e => this.handleSubmit(e)}>Submit</Button>
          </div>
        </Card>
      )
    } else if (this.state.score) {
      return (<Card><div><Title>You Scored</Title> {this.state.score.number_correct}/{this.state.score.number_asked}</div></Card>)
    } else {
      return ('')
    }
  }
}
export default Question
