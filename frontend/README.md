# Quizzly Bear
[Click here for the `create-react-app` README.](README.cra.md)


## Getting Started 
After cloning the repo, install dependencies by running: 
`yarn install` 
`npm install bulma`
`npm install bloomer`

To start the app locally, run: 
`yarn start`

## Components
Below is an overview of Quizzly Bear's components,their states and the props they are passed.

### Card
* Props
  * quiz

### Answer
* Props
  * answer
  * setStateInQuestion

### App
* State
  * currentUser

### Card
* Props
  * children
  
### LoginContainer
* Props
  * onLogout

### Login
* State
  * username
  * password
  * errMsg
  * registering
* Props
  * setUserToken
  * setCurrentUser

###Question
* State
  * question
  * answers
  * currentAnswer
  * lastQuestion
  * score
* Props
  * quizID
  * questionID

### Quiz
* State
  * empty object
* Props
  * quizID

### QuizList
* State
  * quizzes
  * published
  * activeQuiz

### QuizListItem 
* Props
  * quiz

### Sidebar
  * Props
    * onLogout
    * currentUser

### Register 
* State 
  * username
  * password
  * passwordConf
  * errMsg
* Props
  * setCurrentUser


