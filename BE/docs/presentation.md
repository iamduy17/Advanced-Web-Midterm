### List presentations:

- Request:

```bash
curl --location --request GET 'http://localhost:5000/presentation' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data-raw '{
    "presentation_id": 4
}'
```

- Response:

```json
{
    "ReturnCode": 200,
    "Message": "list presentations successfully",
    "Presentations": [
        {
            "id": 8,
            "name": "test",
            "is_deleted": false,
            "slide_count": 1,
            "created_at": "01/01/11 10:01:00",
            "updated_at": "01/01/11 10:01:00",
            "group_id": null
        }
    ]
}
```

### Create presentation:

- Request:

```bash
curl --location --request POST 'http://localhost:5000/presentation/create' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data-raw '{
    "name": "test",
    "created_at": "2011-01-01 10:01:00",
    "group_id": 3
}'
```

- Response:

```json
{
  "ReturnCode": 200,
  "Message": "create presentation successfully",
  "Data": {
    "Presentation": {
      "id": 5,
      "name": "test",
      "is_deleted": false,
      "slide_count": 1,
      "created_at": "2011-01-01T03:01:00.000Z",
      "updated_at": "2011-01-01T03:01:00.000Z",
      "group_id": 3
    }
  }
}
```

### Delete presentation:

- Request

```bash
curl --location --request POST 'http://localhost:5000/presentation/delete/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
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
  - Delete successfully:
  ```json
  {
    "ReturnCode": 200,
    "Message": "delete presentation successfully",
    "Data": {
      "Presentation": {
        "id": 5,
        "name": "test",
        "is_deleted": true,
        "slide_count": 1,
        "created_at": "2011-01-01T03:01:00.000Z",
        "updated_at": "2011-01-01T03:01:00.000Z",
        "group_id": 3
      }
    }
  }
  ```

### Edit presentation:

- Request

```bash
curl --location --request POST 'http://localhost:5000/presentation/edit/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data-raw '{
    "name": "test_edit"
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
  - Delete successfully:
  ```json
  {
    "ReturnCode": 200,
    "Message": "edit presentation successfully",
    "Data": {
      "Presentation": {
        "id": 6,
        "name": "test_edit",
        "is_deleted": false,
        "slide_count": 1,
        "owner_id": 6,
        "created_at": "2011-01-01T03:01:00.000Z",
        "updated_at": "2011-01-01T03:01:00.000Z"
      }
    }
  }
  ```

### Get presentation:

- Request

```bash
curl --location --request GET 'http://localhost:5000/presentation/edit/6' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
```

- Response:
  - Presentation not found:
  ```json
  {
    "ReturnCode": 404,
    "Message": "presentation not found"
  }
  ```
  - Get presentation successfully:
  ```json
  {
    "ReturnCode": 200,
    "Message": "get presentation successfully",
      "Data": {
        "Presentation": {
          "id": 8,
          "name": "test",
          "is_deleted": false,
          "slide_count": 1,
          "owner_id": 6,
          "created_at": "2011-01-01T03:01:00.000Z",
          "updated_at": "2011-01-01T03:01:00.000Z",
          "group_id": null
        },
        "Slides": [
          {
            "id": 9,
            "slide_type_id": 1,
            "presentation_id": 8,
            "content": "{\"title\":\"Multiple Choice\",\"data\":[{\"name\":\"Option 1\",\"count\":0{\"name\":\"Option 2\",\"count\":0},{\"name\":\"Option 3\",\"count\":0}]}",
            "is_deleted": false
          }
        ],
        "Owners": [
            {
              "id": 6,
              "username": "Thới Hải Đức"
            }
        ],
        "Collaborators": []
      }
  }
  ```
  ### Add Collaborator:

- Request

```bash
curl --location --request POST 'http://localhost:5000/presentation/addCollaborator/7' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data-raw '{
    "account_id": 7
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
  - Invalid permission (user is not owner's presentation):
  ```json
  {
    "ReturnCode": 401,
    "Message": "invalid permission"
  }
  ```
  - Add successfully:
  ```json
  {
    "ReturnCode": 200,
    "Message": "add collaborator successfully"
  }
  ```

### Remove Collaborator:

- Request

```bash
curl --location --request POST 'http://localhost:5000/presentation/removeCollaborator/7' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data-raw '{
    "account_id": 7
}'
```

- Response:
  - Not found user with input presentation:
  ```json
  {
    "ReturnCode": 404,
    "Message": "user not collaborate this presentation"
  }
  ```
  - Invalid permission (user is not owner's presentation):
  ```json
  {
    "ReturnCode": 401,
    "Message": "invalid permission"
  }
  ```
  - Remove successfully:
  ```json
  {
    "ReturnCode": 200,
    "Message": "remove collaborator successfully"
  }
  ```