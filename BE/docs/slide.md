### Create slide:

- Request

```bash
curl --location --request POST 'http://localhost:5000/slide/create' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data-raw '{
    "presentation_id": 5,
    "slide_type_id": 1,
    "content": "json"
}'
```

- Response:
  - Presentation not found:
  ```json
  {
    "ReturnCode": 404,
    "Message": "presentation not found"
  }
  ```
  - Presentation is not owned by user:
  ```json
  {
    "ReturnCode": 401,
    "Message": "invalid permission"
  }
  ```
  - Slide type not existed:
  ````json
  {
      "ReturnCode": 404,
      "Message": "slide type not existed"
  }
   * Create slide successfully:
  ```json
  {
      "ReturnCode": 200,
      "Message": "create slide successfully",
      "Data": {
          "Slide": {
              "id": 7,
              "slide_type_id": 1,
              "presentation_id": 5,
              "content": "json string",
              "is_deleted": false
          }
      }
  }
  ````

### Edit slide:

- Request

```bash
curl --location --request POST 'http://localhost:5000/slide/edit/5' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data-raw '{
    "content": "json edited"
}'
```

- Response:
  - Slide not found:
  ```json
  {
    "ReturnCode": 404,
    "Message": "slide not found"
  }
  ```
  - Edit slide successfully:
  ```json
  {
    "ReturnCode": 200,
    "Message": "edit slide successfully",
    "Data": {
      "Slide": {
        "id": 5,
        "slide_type_id": 1,
        "presentation_id": 5,
        "content": "json edited",
        "is_deleted": false
      }
    }
  }
  ```

### Delete slide:

- Request

```bash
curl --location --request POST 'http://localhost:5000/slide/delete/5' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
```

- Response:
  - Slide not found:
  ```json
  {
    "ReturnCode": 404,
    "Message": "slide not found"
  }
  ```
  - Presentation is not owned by user:
  ```json
  {
    "ReturnCode": 401,
    "Message": "invalid permission"
  }
  ```
  - Delete slide successfully:
  ```json
  {
    "ReturnCode": 200,
    "Message": "delete slide successfully",
    "Data": {
      "Slide": {
        "id": 5,
        "slide_type_id": 1,
        "presentation_id": 5,
        "content": "json edited",
        "is_deleted": true
      }
    }
  }
  ```

### Get slide:

- Request

```bash
curl --location --request GET 'http://localhost:5000/slide/edit/7/slideshow' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
```

- Response:
  - Slide not found:
  ```json
  {
    "ReturnCode": 404,
    "Message": "slide not found"
  }
  ```
  - Get slide successfully:
  ```json
  {
      "ReturnCode": 200,
      "Message": "get presentation successfully",
      "Data": {
          "Slide": {
              "id": 8,
              "slide_type_id": 1,
              "presentation_id": 7,
              "content": "{\"title\":\"Multiple Choice\",\"data\":[{\"name\":\"Option 1\",\"count\":0},{\"name\":\"Option 2\",\"count\":0},{\"name\":\"Option 3\",\"count\":0}]}",
              "is_deleted": false,
              "chats": null,
              "questions": null
          }
      }
  }

  ```

### Edit chats:

- Request

```bash
curl --location --request POST 'http://localhost:5000/slide/9/questions' \
--header 'Authorization: Bearer <token>' \
--data-raw '{
    "questions": "abcdef"
}'
```

- Response:
  - Slide not found:
  ```json
  {
    "ReturnCode": 404,
    "Message": "slide not found"
  }
  ```
  - Edit chats successfully:
  ```json
  {
    "ReturnCode": 200,
    "Message": "edit questions successfully",
    "Data": {
        "Slide": {
            "id": 9,
            "slide_type_id": 1,
            "presentation_id": 8,
            "content": "{\"title\":\"Multiple Choice\",\"data\":[{\"name\":\"Option 1\",\"count\":0},{\"name\":\"Option 2\",\"count\":0},{\"name\":\"Option 3\",\"count\":0}]}",
            "is_deleted": false,
            "chats": "abcde",
            "questions": "abcdef"
        }
    }
  }
  ```

### Edit questions:

- Request

```bash
curl --location --request POST 'http://localhost:5000/slide/9/questions' \
--header 'Authorization: Bearer <token>' \
--data-raw '{
    "questions": "abcdef"
}'
```

- Response:
  - Slide not found:
  ```json
  {
    "ReturnCode": 404,
    "Message": "slide not found"
  }
  ```
  - Edit chats successfully:
  ```json
  {
    "ReturnCode": 200,
    "Message": "edit questions successfully",
    "Data": {
        "Slide": {
            "id": 9,
            "slide_type_id": 1,
            "presentation_id": 8,
            "content": "{\"title\":\"Multiple Choice\",\"data\":[{\"name\":\"Option 1\",\"count\":0},{\"name\":\"Option 2\",\"count\":0},{\"name\":\"Option 3\",\"count\":0}]}",
            "is_deleted": false,
            "chats": "abcde",
            "questions": "abcdef"
        }
    }
  }
  ```