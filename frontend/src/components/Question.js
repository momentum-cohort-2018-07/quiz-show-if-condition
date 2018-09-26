import React, { Component } from 'react'
import { Button } from 'bloomer'
import { NavLink } from 'react-router-dom'

import apiCalls from '../apiCalls'
import Answer from './Answer'

class Question extends Component {
  constructor () {
    super()
    this.state = {
      question: undefined,
      answers: [],
      currentAnswer: null
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
  setNewQuestion (e) {
    e.preventDefault()
    let quizID = this.props.quizId
    apiCalls.getQuiz(quizID).then(response => {
      let newQuestion = response.relationships.questions
      this.setState({ question: newQuestion })
    })
  }
  handleSubmit (e) {
    let quizID = this.props.quizId
    let questionID = this.state.question.data.attributes.number
    console.log(this.state.question, 'questionID in Question')
    let answerID = this.state.currentAnswer
    apiCalls.submitAnswer(answerID, quizID, questionID)
  }
  render () {
    const { quizId } = this.props
    const { data, links } = this.state.question
    const question = data.attributes.text
    const answers = data.relationships.answers
    if (this.state.question && this.state.question.data.attributes.text) {
      return (
        <div>
          <h1> Question {data.attributes.number}. {question}</h1>
          {answers.map(answer => <Answer key={answer.data.id} links={links} answer={answer} setStateInQuestion={this.setStateInQuestion} />)}
          <Button className='is-primary' value={links} onClick={e => this.handleSubmit(e)}>Submit</Button>
          <NavLink to={`/quiz/${quizId}/question/${data.attributes.number}`} onClick={e => this.setNewQuestion(e)}>Next</NavLink>
        </div>
      )
    // } else if (this.state.question.links.score) {
    //   return (
    //     <div>
    //       <h1> Question {data.attributes.number}. {question}</h1>
    //       {answers.map(answer => <Answer key={answer.data.id} links={links} answer={answer} setStateInQuestion={this.setStateInQuestion} />)}
    //       <Button className='is-primary' value={links} onClick={e => this.handleSubmit(e)}>Submit</Button>
    //       <NavLink to={`/quiz/${quizId}/question/${data.attributes.number}`}>Go Back To HomePage</NavLink>
    //       <div>You Scored</div>
    //     </div>
    //   )
    } else {
      return <div>no question bub</div>
    }
  }
}
export default Question
