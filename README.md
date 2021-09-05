# Description

A basic shortener service.
This provides a 6 digit base64 encoded short url for provided url.

## Statistics

- Count of shortening requests for a particular URL.
- Count of short URL accesses.

# Setup

```
docker-compose up
```

This sets up

- Mongo DB
- Rabbit MQ
- Nestjs API

# Endpoints

`[POST] localhost:3000/api/urls`

Payload

```
{"url": "https://www.axelspringer.com/en/"}
```

Response

```
{
    "shortenedCount": 1, // Shortening requests for this URL.
    "short": "ZjgxMm",
    "complete": "https://www.axelspringer.com/en/",
    ...
}
```

`[GET] localhost:3000/{short url}`

Example: `[GET] localhost:3000/ZjgxMm`

Response

**Redirects to unabridged URL**

`[GET] localhost:3000/api/stats`

Response

```
[
    {
        "count": 2,
        "short": "ZjgxMm",
        "complete": "https://www.axelspringer.com/en/"
    },
    {
        "count": 1,
        "short": "MDNkZj",
        "complete": "https://docs.nestjs.com/"
    }
]
```
