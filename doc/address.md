# Address API Spec

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

## List Address

Endpoint : GET /api/v1/contacts/:contactId/addresses

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
    ]
}
```

Response Body (Failed) :

```json
{
    "errors" : "..."
}
```
