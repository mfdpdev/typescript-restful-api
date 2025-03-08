#User API Spec

## Register User

Endpoint : POST /api/users

Request Body :
```json
{
    "username": "user",
    "password": "user",
    "name": "user"
}
```

Response Body (Success)
```json
{
    "data": {
        "username": "user",
        "name": "user"
    },
}
```

Response Body (Failed)
```json
{
    "errors": "...",
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :
```json
{
    "username": "user",
    "password": "user",
}
```

Response Body (Success)
```json
{
    "data": {
        "username": "user",
        "name": "user",
        "token": "...",
    },
}
```

Response Body (Failed)
```json
{
    "errors": "...",
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :
- X-API-TOKEN : "..."

Response Body (Success)
```json
{
    "data": {
        "username": "user",
        "name": "user",
    },
}
```

Response Body (Failed)
```json
{
    "errors": "...",
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :
- X-API-TOKEN : "..."

Request Body (Success)
```json
{
    "password": "user",
    "name": "user",
}
```

Response Body (Success)
```json
{
    "data": {
        "username": "user",
        "name": "user",
    },
}
```

Response Body (Failed)
```json
{
    "errors": "...",
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :
- X-API-TOKEN : "..."

Response Body (Success)
```json
{
    "data": "OK"
}
```

Response Body (Failed)
```json
{
    "errors": "...",
}
```

