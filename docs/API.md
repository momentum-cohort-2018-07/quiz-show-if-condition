# Using the API

Welcome to the API docs.

All API access is over HTTP, and accessed from **TODO**. All data is sent and received as JSON.

## Authentication

Authencation is done through HTTP Token Authentican. Each User will be provided a token on registred. Registration route is an unauthenticated route. To access tokens you will need to login or create a user.

### To Create a User

`POST /users` -  to create a user as a POST request  

The request body should be:

```json
{ "user":
      {
        "username": "leonard",
        "password": "password"
      }
}
```

The response will be:

```json
{
    "id": 1,
    "username": "username",
    "api_token": "RwjYbasHzZ2hGPzu7P7FCrYZ",
}
```