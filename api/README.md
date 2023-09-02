# Working with posts

## Create POST

### Request

```
curl --location 'localhost:3000/posts' \
--header 'Content-Type: application/json' \
--data '{
    "id": "AA",
    "author": "andriy",
    "heading": "a1",
    "subHeading": "2",
    "section1": "1",
    "section2": "2",
    "section3": "3",
    "sectionHeading": "sh",
    "createdAt": "2023-09-02T07:55:00"
}'
```

### Response

```
{
    "message": "Blog post created successfully"
}
```

## Read POSTS

### Request

```
curl --location 'localhost:3000/posts'
```

### Response

```
[
    {
        "id": "AA",
        "author": "andriy",
        "heading": "a1",
        "subHeading": "2",
        "section1": "1",
        "section2": "2",
        "section3": "3",
        "sectionHeading": "sh",
        "createdAt": "2023-09-02T04:55:00.000Z"
    },
    {
        "id": "d21c6cba-a4c2-4a17-97a3-49dc4e699e7f",
        "author": "andriy",
        "heading": "a",
        "subHeading": "a",
        "section1": "",
        "section2": "",
        "section3": "",
        "sectionHeading": "",
        "createdAt": "2023-09-02T07:55:00.000Z"
    }
]
```

## Read POST by id

### Request

```
curl --location 'localhost:3000/posts/AA''
```

### Response

```
{
    "id": "AA",
    "author": "andriy",
    "heading": "a1",
    "subHeading": "2",
    "section1": "1",
    "section2": "2",
    "section3": "3",
    "sectionHeading": "sh",
    "createdAt": "2023-09-02T04:55:00.000Z"
}
```

## Update POST

// TODO

### Request

### Response

## Delete POST

### Request

```
curl --location --request DELETE 'localhost:3000/posts/AA'
```

###

Response

```
{
    "message": "Blog post deleted successfully"
}
```

# Working with comments

## Create

### Request

```

```

### Response

```

```

## Read

### Request

```

```

### Response

```

```

## Update

### Request

```

```

### Response

```

```

## Delete

### Request

```

```

### Response

```

```
