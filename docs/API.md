# Using the API

Welcome to the API docs.

All API access is over HTTP, and accessed from **TODO**. All data is sent and received as JSON.

## Authentication

Authencation is done through HTTP Token Authentican. Each User will be provided a token on registred. Registration route is an unauthenticated route. To access tokens you will need to login or create a user.

## User Options

### To Create a User

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
  "api_token": "RwjYbasHzZ2hGPzu7P7FCrYZ"
}
```

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
  "id": 1,
  "username": "leonard",
  "api_token": "RwjYbasHzZ2hGPzu7P7FCrYZ"
}
```

### Get a specific user :lock:

`GET /users/:id`

The response will be:

```json
{
  "id": 1,
  "username": "leonard",
}
```

### Delete a specific user :lock: :smiley:

`DELETE /users/:id`\

### Get the current user profile :lock:

`GET /profile`

The response will be:

```json
{

}
```

### Get the current user admin profile :lock: :a:

`GET /admin_profile`

The response will be:

```json
{

}
```

## Quiz Options

### Get the currently published quizzes

`GET /quizzes`

The response will be:

```json
{
  "data": {
    "quizzes": [
      {
        "id": 1,
        "title": "JavaScript arrays"
      },
      {
        "id": 2,
        "title": "Rails models"
      }
    ]
  }
}
```

### Get a specific quizzes :lock: :a:

`GET /quizzes`

The response will be:

```json
{
  "data": {
    "quizzes": [
      {
        "id": 1,
        "title": "JavaScript arrays"
      },
      {
        "id": 2,
        "title": "Rails models"
      }
    ]
  }
}
```