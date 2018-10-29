import React, { Component } from 'react'
import { Title, Input, Button } from 'bloomer'

class AddQuiz extends Component {
  constructor () {
    super()
    this.state = {
      title: ''
    }
  }
  handleSubmit (e) {
    e.preventDefault()
    let { title } = this.state
    this.props.createQuiz(title)
  }
  render () {
    let { title } = this.state
    return (
      <div>
        <Title>Add Quiz</Title>
        <Title>Title</Title>
        <Input placeholder='Title of Quiz' value={title} onChange={e => { this.setState({ title: e.target.value }) }} />
        <Button type='submit' onClick={(e) => { this.handleSubmit(e) }}>Submit</Button>
      </div>
    )
  }
}
export default AddQuiz
