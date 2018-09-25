# Using the API

Welcome to the API docs.

All API access is over HTTP, and accessed from `https://quizzlybear-api.herokuapp.com/api/`. All data is sent and received as JSON.

## :lock: Symbol = Requires Token

## :a: Symbol = Must be Admin

## :smiley: Symbol = Must be Owner

## Authentication

Authencation is done through HTTP Token Authentican. Each User will be provided a token at registration. Registration route is an unauthenticated route. To access tokens you will need to login or create a user.

## User Options

### To Register/Create a User

`POST /users`

The request body should be:

```json
{
  "username": "leonard",
  "password": "password"
}
```

The response will be:

```json
{
  "id": 1,
  "username": "leonard",
  "password_digest": "$2a$10$BEPit8C9jY1ARw7XVhfrnuvgFkHSssKUdB8Y0.6lZYgee/p8JVvwC",
  "token": "h7kU757fJ2rGJDrgubbG3zEu",
  "admin": false,
  "created_at": "2018-09-22T13:45:09.108Z",
  "updated_at": "2018-09-22T13:45:09.108Z"
}
```

### To delete a specific user :lock: :smiley:

`DELETE /users/:id`

### To Login

`POST /login`

The request body should be:

```json
{
  "username": "leonard",
  "password": "password"
}
```

The response will be:

```json
{
  "token": "h7kU757fJ2rGJDrgubbG3zEu",
  "admin": false
}
```

### To modify a User :lock: :smiley:

`PATCH/PUT /user/:id`

The request body should be:

```json
{
  "username": "Changed Name",
  "password": "Changed Password"
}
```

The response will be:

```json
{
  "links": {
    "self": "https://quizzlybear-api.herokuapp.com/api/users/4"
  },
  "data": {
    "id": 4,
    "attributes": {
      "username": "Changed Name",
      "quizzes": 0
    },
    "relationships": {
      "quizzes": [],
      "scores": []
    }
  }
}
```

### To get a specific user with quizzes owned and scores for quizzes taken :lock:

`GET /users/:id`

The response will be:

```json
{
  "links": {
    "self": "https://quizzlybear-api.herokuapp.com/api/users/4"
  },
  "data": {
    "id": 4,
    "attributes": {
      "username": "Steve Test 2",
      "quizzes": 2,
      "scores": 2
    }
  },
  "relationships": {
    "quizzes": [
      {
        "data": {
          "id": 1,
          "title": "JavaScript arrays"
        },
        "links": {
          "self": "/api/quizzes/1"
        }
      },
      {
        "data": {
          "id": 2,
          "title": "Rails models"
        },
        "links": {
          "self": "/api/quizzes/2"
        }
      }
    ],
    "scores": [
      {
        "data": {
          "id": 1,
          "quiz_id": 1,
          "number_correct": 7,
          "number_asked": 10
        }
      },
      {
        "data": {
          "id": 2,
          "quiz_id": 2,
          "number_correct": 4,
          "number_asked": 5
        }
      }
    ]
  }
}
```

### To get all user records :lock:

`GET /users`

The response will be:

```json
[
  {
    "id": 1,
    "username": "leonard"
  },
  {
    "id": 2,
    "username": "admin"
  }
]
```

### To get the current user profile :lock:

`GET /profile`

The response will be:

```json
{
  "links": {
    "self": "https://quizzlybear-api.herokuapp.com/api/users/1",
    "list": "https://quizzlybear-api.herokuapp.com/api/users",
    "update": {
      "method": "PUT",
      "href": "https://quizzlybear-api.herokuapp.com/api/users/1"
    },
    "delete": {
      "method": "DELETE",
      "href": "https://quizzlybear-api.herokuapp.com/api/users/1"
    }
  },
  "data": {
    "id": 1,
    "attributes": {
      "username": "leonard",
      "token": "6nF2X9W4mBxznsSh7qPFaRNg"
    }
  }
}
```

### To get the current user admin profile :lock: :a:

`GET /admin_profile`

The response will be:

```json
{
  "links": {
    "self": "https://quizzlybear-api.herokuapp.com/api/users/2",
    "list": "https://quizzlybear-api.herokuapp.com/api/users",
    "update": {
      "method": "PUT",
      "href": "https://quizzlybear-api.herokuapp.com/api/users/2"
    },
    "delete": {
      "method": "DELETE",
      "href": "https://quizzlybear-api.herokuapp.com/api/users/2"
    }
  },
  "data": {
    "id": 2,
    "attributes": {
      "username": "admin",
      "token": "j7UYR4HjnoLTQG85hBUp3tPM",
      "admin": true
    }
  }
}
```

### To get the current users Published Quizzes :lock: :a:

`GET /users/:user_id/published_quizzes`

The response will be:

```json
[
  {
    "id": 1,
    "title": "JavaScript arrays"
  },
  {
    "id": 2,
    "title": "Rails models"
  }
]
```

### To get the current users Unpublished Quizzes :lock: :a:

`GET /users/:user_id/unpublished_quizzes`

The response will be:

```json
[
  {
    "id": 3,
    "title": "Unpublished Quiz"
  },
  {
    "id": 4,
    "title": "Unpublished Quiz 1"
  }
]
```

## Quiz Options

### Create a new quiz :lock: :a:

`POST /quizzes`

The request body should be:

```json
{
  "title": "Quiz Name"
}
```

The response will be:

```json
{
  "links": {
    "self": "https://quizzlybear-api.herokuapp.com/api/quizzes/5"
  },
  "data": {
    "id": 5,
    "attributes": {
      "title": "Quiz Name",
      "published": false
    },
    "relationships": {
      "questions": []
    }
  }
}
```

### Create aquestion for a quiz :lock: :smiley: :a:

`POST /quizzes/:quiz_id/questions`

The request body should be:

```json
{
  "text": "Test question"
}
```

The response will be:

```json
{
  "links": {
    "self": "https://quizzlybear-api.herokuapp.com/api/quizzes/4/questions/10"
  },
  "data": {
    "id": 10,
    "attributes": {
      "text": "Test question"
    },
    "relationships": {
      "answers": []
    }
  }
}
```

### Create an answer for a question :lock: :smiley: :a:

`POST /quizzes/:quiz_id/questions/question_id/answers`

### Mark a quiz as Published

`POST /quizzes/:quiz_id/publish`

The reponse will be:

```json
{
  "links": {
    "self": "https://quizzlybear-api.herokuapp.com/api/quizzes/2"
  },
  "data": {
    "id": 2,
    "attributes": {
      "title": "Rails models",
      "published": true
    },
    "relationships": {
      "questions": [
        {
          "data": {
            "id": 4,
            "text": "Given a table `posts` and another table `comments` with the field `post_id`, which of the following associations would you use to connect the tables?",
            "number": 1
          },
          "links": {
            "self": "https://quizzlybear-api.herokuapp.com/api/quizzes/2/questions/4"
          }
        },
        {
          "data": {
            "id": 5,
            "text": "Which of the following is a built-in Rails validation?",
            "number": 2
          },
          "links": {
            "self": "https://quizzlybear-api.herokuapp.com/api/quizzes/2/questions/5"
          }
        },
        {
          "data": {
            "id": 6,
            "text": "Which of the following is **not** a database you can use with ActiveRecord?",
            "number": 3
          },
          "links": {
            "self": "https://quizzlybear-api.herokuapp.com/api/quizzes/2/questions/6"
          }
        }
      ]
    }
  }
}
```

### Get the currently published quizzes

`GET /quizzes`

The response will be:

```json
[
  {
    "id": 2,
    "title": "Rails models",
    "questions": 3
  },
  {
    "id": 1,
    "title": "JavaScript arrays",
    "questions": 3
  }
]
```

### Get a specific quiz with questions :lock: :a:

`GET /quizzes/:id`

The response will be:

```json
{
  "links": {
    "self": "https://quizzlybear-api.herokuapp.com/api/quizzes/1"
  },
  "data": {
    "id": 1,
    "attributes": {
      "title": "JavaScript arrays",
      "published": true
    },
    "relationships": {
      "questions": [
        {
          "data": {
            "id": 1,
            "text": "What method do you use to get all records that match a condition?",
            "number": null
          },
          "links": {
            "self": "http://quizzlybear-api.com/api/quizzes/1/questions/1"
          }
        },
        {
          "data": {
            "id": 2,
            "text": "What does `findIndex` return if no records match its condition?",
            "number": null
          },
          "links": {
            "self": "http://quizzlybear-api.com/api/quizzes/1/questions/2"
          }
        },
        {
          "data": {
            "id": 3,
            "text": "Which of the following does the method `map` do?",
            "number": null
          },
          "links": {
            "self": "http://quizzlybear-api.com/api/quizzes/1/questions/3"
          }
        }
      ]
    }
  }
}
```

### Get all answers for a question :lock:

`GET /quizzes/:quiz_id/questions/:question_id/answers`

The response will be:

```json
[
  {
    "id": 1,
    "text": "find",
    "correct": false
  },
  {
    "id": 2,
    "text": "findAll",
    "correct": false
  },
  {
    "id": 3,
    "text": "filter",
    "correct": true
  },
  {
    "id": 4,
    "text": "reduce",
    "correct": false
  }
]
```

### Get a specific answer for a question :lock:

`GET /quizzes/:quiz_id/questions/:question_id/answers/:answer_id`

The response will be:

```json
{
  "data": {
    "id": 2,
    "attributes": {
      "text": "findAll",
      "correct": false
    }
  }
}
```

### Select an answer for a question :lock:

`POST /quizzes/:quiz_id/questions/:question_id/responses`

The response will be:

```json
{
    "id": 1,
    "user_id": 1,
    "quiz_id": 1,
    "question_id": 1,
    "answer_id": 3,
    "correct": true,
    "created_at": "2018-09-25T11:59:50.218Z",
    "updated_at": "2018-09-25T11:59:50.218Z"
}
```

### Score a quiz quiz :lock:

`POST /api/quizzes/quiz_id/score`

The response will be:

```json
{
    "id": 1,
    "user_id": 1,
    "quiz_id": 1,
    "number_correct": 1,
    "number_asked": 3,
    "created_at": "2018-09-25T12:10:46.297Z",
    "updated_at": "2018-09-25T12:10:46.297Z"
}
```

