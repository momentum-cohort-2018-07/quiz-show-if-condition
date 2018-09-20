# Rails Quiz Show API

In this project, you will design and build a quiz application with a Rails API backend and a React front end. With this application, administrators can build multiple-choice quizzes. Users can take these quizzes and be scored against each other.

## Requirements

The application should:

- Have users with registration and login
- Have some users with admin abilities. Only admins can create quizzes.
- Quizzes have two modes: unpublished and published.
- Unpublished quizzes can be edited, have questions added to them, have questions deleted from them and have questions be edited, but will not show up as a quiz to be taken.
- Published quizzes cannot be edited in any way.
- Once published, a quiz cannot be unpublished.
- Questions are multiple-choice, with one right answer.
  - A quiz should show the possible answers in a random order so that the correct answer isn't in the same place every time.
- After a user answers all the questions in a quiz, show them how many they got right and record that as their score.
- A user should have a dashboard where they can see their scores on individual quizzes, and a list of quizzes they can take.
- If a user leaves the site mid-quiz, it is up to you what happens when they come back. Optimally, they should be in exactly the same spot on the quiz and not allowed to go to the dashboard until done.

Bonus features:

- A quiz should have a leaderboard that shows the top 20 scores and players.
- The site should have a leaderboard that shows the top 20 players and their total scores.
- When a user is taking a quiz, show them the questions in a random order.
- When a user completes a quiz, show them which ones they got right and which ones they got wrong.

## Standards

This project will be graded on its level of completion. All requirements under "the application should" are required for this project to pass. In addition, it must be well-styled. You can use a CSS framework like Bulma, but if you do, you must use it effectively, choosing the correct classes to reflect the structure of the application.

This is one of the weekly graded projects, and completion is necessary to graduate. You can consider this your mid-term: it is the most important of your projects so far to demonstrate competency.

## Timeline

You will have a check-in on Monday as a group. Each group will present where they are so far, and present what questions they need answers to. On Monday, you should have *at a minimum*:

- a React front-end that talks to a Rails API, with the API hosted on Heroku and the front-end hosted on Firebase
- documentation of your intended API, database structure, and React components you plan to use
- the ability to register and log in users
- the ability to see a list of quizzes
- a database with seed data

On Wednesday, you will present your completed project to the class.

## HOWTOs

### How to organize this repo

The Rails portion of your team should create a Rails backend in a directory called `backend/`. **Do not** make this a separate Git repo. Run `rails new` with the argument `--skip-git`.

The React portion of your team should create a React app using `create-react-app` in a directory called `frontend/`.

You should create a third directory called `docs/`. Put documentation in here about the structure of the API you will be building, along with any other documentation or artifacts you create along the way.

### How to work with an API that isn't written yet

You can download a tool called [Mockoon](https://mockoon.com/), which will allow you to set up mock responses to use for your front end until the API is ready.

### How to deploy to Heroku when your Rails app is in the sub-directory `backend/`

Run the command:

```
git subtree push --prefix backend heroku master
```

If you get the error "Updates were rejected because the tip of your current branch is behind," run:

```
git push heroku `git subtree split --prefix backend master`:master --force
```

### How to get some sample data

There are three files, [quizzes.csv](samples/quizzes.csv), [questions.csv](samples/questions.csv), and [answers.csv](samples/answers.csv) in the `samples/` directory. You can load these into your database from Rails using the `seeds.rb` file. You will have to write the directions to load this data yourself.

