# Contact API Spec

## Create Contact

Endpoint : POST /contacts

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
    "first_name" : "user",
    "last_name" : "user",
    "email" : "user@example.com",
    "phone" : "666"
}
```

Response Body (Success) :

```json
{
    "data" : {
        "id" : 1,
        "first_name" : "user",
        "last_name" : "user",
        "email" : "user@example.com",
        "phone" : "666"
    }
}
```

Response Body (Failed) :

```json
{
    "errors" : "..."
}
```

## Get Contact

Endpoint : GET /contacts/:id

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data" : {
        "id" : 1,
        "first_name" : "user",
        "last_name" : "user",
        "email" : "user@example.com",
        "phone" : "666"
    }
}
```

Response Body (Failed) :

```json
{
    "errors" : "..."
}
```

## Update Contact

Endpoint : PUT /contacts/:id

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
    "first_name" : "user",
    "last_name" : "user",
    "email" : "user@example.com",
    "phone" : "666"
}
```

Response Body (Success) :

```json
{
    "data" : {
        "id" : 1,
        "first_name" : "user",
        "last_name" : "user",
        "email" : "user@example.com",
        "phone" : "666"
    }
}
```

Response Body (Failed) :

```json
{
    "errors" : "..."
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:id

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data" : "OK"
}
```

Response Body (Failed) :

```json
{
    "errors" : "..."
}
```

## Search Contact

Endpoint : GET /api/contacts

Query Parameter :
- name : string, contact first name or contact last name, optional
- phone : string, contact phone, optional
- email : string, contact email, optional
- page : number, default 1
- size : number, default 10

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data" : [
        {
            "id" : 1,
            "first_name" : "user",
            "last_name" : "user",
            "email" : "user@example.com",
            "phone" : "666"
        },
        {
            "id" : 2,
            "first_name" : "user",
            "last_name" : "user",
            "email" : "user@example.com",
            "phone" : "666"
        }
    ],
    "paging" : {
        "current_page" : 1,
        "total_page" : 10,
        "size" : 10
    }
}
```

Response Body (Failed) :

```json
{
    "errors" : "..."
}
```
