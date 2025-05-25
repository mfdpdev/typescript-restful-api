# About this application

## Technologies that i use
* [Typescript](https://www.typescriptlang.org/) - Types and other cool stuff
* [Express](https://expressjs.com/) - as the web framework
* [Prisma](https://www.prisma.io/) - as the ORM (likely with a relational DB like PostgreSQL or MySQL)
* [Zod](https://zod.dev/) - for schema validation
* [UUID](https://github.com/uuidjs/uuid#readme) - for unique IDs
* [Winston](https://github.com/winstonjs/winston) - for logging
* [Jest + Supertest](https://jestjs.io/) - for testing
* [Babel](https://babeljs.io/) - for transpiling tests
* [Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) - for hashing (optional, but maybe for authentication)

## Features
* CRUD Operations
* Validation with Zod
* Authentication support
* Environtment-based configuration
* Error handling

## API Spec
## == User API Spec ==

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

## == Address API Spec ==

## Create Address

Endpoint : POST /api/v1/contacts/:contactId/addresses

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
    "street" : "street",
    "city" : "city",
    "province" : "province",
    "country" : "country",
    "postal_code" : "1234"
}
```

Response Body (Success) : 

```json
{
    "data" : {
        "id" : 1,
        "street" : "street",
        "city" : "city",
        "province" : "province",
        "country" : "country",
        "postal_code" : "1234"
    }
}
```

Response Body (Failed) : 

```json
{
    "errors" : "..."
}
```

## Get Address

Endpoint : GET /api/v1/contacts/:contactId/addresses/:addressId

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data" : {
        "id" : 1,
        "street" : "street",
        "city" : "city",
        "province" : "province",
        "country" : "country",
        "postal_code" : "1234"
    }
}
```

Response Body (Failed) : 

```json
{
    "errors" : "..."
}
```

## Update Address

Endpoint : PUT /api/v1/contacts/:contactId/addresses/:addressId

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
        "street" : "street",
        "city" : "city",
        "province" : "province",
        "country" : "country",
        "postal_code" : "1234"
}
```

Response Body (Success) :

```json
{
    "data" : {
        "id" : 1,
        "street" : "street",
        "city" : "city",
        "province" : "province",
        "country" : "country",
        "postal_code" : "1234"
    }
}
```

Response Body (Failed) :

```json
{
    "errors" : "..."
}
```

## Remove Address

Endpoint : DELETE /api/v1/contacts/:contactId/addresses/:addressId

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

## Search Address

Endpoint : GET /api/v1/contacts/:contactId/addresses

Query Parameter :
- keyword : string
- page : number
- size : number

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data" : [
        {
            "id" : 1,
            "street" : "street",
            "city" : "city",
            "province" : "province",
            "country" : "country",
            "postal_code" : "1234"
        },
        {
            "id" : 2,
            "street" : "street",
            "city" : "city",
            "province" : "province",
            "country" : "country",
            "postal_code" : "1234"
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

## == Contact API Spec ==

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

## Setup Project

Create .env file

```
DATABASE_URL="postgresql://postgres:@localhost:5432/typescript_restful_api?schema=public"
```

```bash
pnpm install
```

```bash
pnpm prisma migrate dev
```

```bash
pnpm prisma generate
```

```bash
pnpm build
```

```bash
pnpm start
```
