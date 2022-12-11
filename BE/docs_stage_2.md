### List presentations:
* Request:

```bash
curl --location --request GET 'http://localhost:5000/presentation' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo2LCJlbWFpbCI6ImhhaWR1YzAxNDdAZ21haWwuY29tIiwicHJvdmlkZXIiOiJnb29nbGUifSwiaWF0IjoxNjcwNzgxMDU3LCJleHAiOjE2NzA3ODQ2NTcsImF1ZCI6InRoYWlkdXlkbzE3QGdtYWlsLmNvbSIsImlzcyI6InRoYWlkdXlkbzE3QGdtYWlsLmNvbSJ9.0mkQnynEEiQsgK0vC8HHxvVruIsgZJfn1g7rb2QHvRM' \
--data-raw '{
    "presentation_id": 4
}'
```
* Response:

```json
{
    "ReturnCode": 200,
    "Message": "list presentations successfully",
    "Presentations": [
        {
            "id": 5,
            "name": "test",
            "is_deleted": false,
            "slide_count": 1,
            "owner_id": 6,
            "created_at": "2011-01-01T03:01:00.000Z",
            "updated_at": "2011-01-01T03:01:00.000Z"
        },
        {
            "id": 6,
            "name": "test1",
            "is_deleted": false,
            "slide_count": 1,
            "owner_id": 6,
            "created_at": "2011-01-01T03:01:00.000Z",
            "updated_at": "2011-01-01T03:01:00.000Z"
        }
    ]
}
```

### Create presentation:
* Request:

```bash
curl --location --request POST 'http://localhost:5000/presentation/create' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo2LCJlbWFpbCI6ImhhaWR1YzAxNDdAZ21haWwuY29tIiwicHJvdmlkZXIiOiJnb29nbGUifSwiaWF0IjoxNjcwNzgxMDU3LCJleHAiOjE2NzA3ODQ2NTcsImF1ZCI6InRoYWlkdXlkbzE3QGdtYWlsLmNvbSIsImlzcyI6InRoYWlkdXlkbzE3QGdtYWlsLmNvbSJ9.0mkQnynEEiQsgK0vC8HHxvVruIsgZJfn1g7rb2QHvRM' \
--data-raw '{
    "name": "test",
    "created_at": "2011-01-01 10:01:00"
}'
```

* Response:
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
            "owner_id": 6,
            "created_at": "2011-01-01T03:01:00.000Z",
            "updated_at": "2011-01-01T03:01:00.000Z"
        }
    }
}
```

### Delete presentation:
* Request
```bash
curl --location --request POST 'http://localhost:5000/presentation/delete/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo2LCJlbWFpbCI6ImhhaWR1YzAxNDdAZ21haWwuY29tIiwicHJvdmlkZXIiOiJnb29nbGUifSwiaWF0IjoxNjcwNzgxMDU3LCJleHAiOjE2NzA3ODQ2NTcsImF1ZCI6InRoYWlkdXlkbzE3QGdtYWlsLmNvbSIsImlzcyI6InRoYWlkdXlkbzE3QGdtYWlsLmNvbSJ9.0mkQnynEEiQsgK0vC8HHxvVruIsgZJfn1g7rb2QHvRM' \
--data-raw ''
```
* Response:
    * Presentation not found:
    ```json
    {
        "ReturnCode": 404,
        "Message": "presentation not found"
    }
    ```
    * Presentation is not owned by user:
    ```json
    {
        "ReturnCode": 401,
        "Message": "invalid permission"
    }
    ```
     * Delete successfully:
    ```json
    {
        "ReturnCode": 200,
        "Message": "delete presentation successfully",
        "Data": {
        "Presentation": 
            {
                "id": 5,
                "name": "test",
                "is_deleted": true,
                "slide_count": 1,
                "owner_id": 6,
                "created_at": "2011-01-01T03:01:00.000Z",
                "updated_at": "2011-01-01T03:01:00.000Z"
            }
        }
    }
    ```

### Edit presentation:
* Request
```bash
curl --location --request POST 'http://localhost:5000/presentation/edit/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo2LCJlbWFpbCI6ImhhaWR1YzAxNDdAZ21haWwuY29tIiwicHJvdmlkZXIiOiJnb29nbGUifSwiaWF0IjoxNjcwNzgxMDU3LCJleHAiOjE2NzA3ODQ2NTcsImF1ZCI6InRoYWlkdXlkbzE3QGdtYWlsLmNvbSIsImlzcyI6InRoYWlkdXlkbzE3QGdtYWlsLmNvbSJ9.0mkQnynEEiQsgK0vC8HHxvVruIsgZJfn1g7rb2QHvRM' \
--data-raw '{
    "name": "test_edit"
}'
```
* Response:
    * Presentation not found:
    ```json
    {
        "ReturnCode": 404,
        "Message": "presentation not found"
    }
    ```
    * Presentation is not owned by user:
    ```json
    {
        "ReturnCode": 401,
        "Message": "invalid permission"
    }
    ```
     * Delete successfully:
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
* Request wrong
```bash
curl --location --request POST 'http://localhost:5000/presentation/edit/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo2LCJlbWFpbCI6ImhhaWR1YzAxNDdAZ21haWwuY29tIiwicHJvdmlkZXIiOiJnb29nbGUifSwiaWF0IjoxNjcwNzgxMDU3LCJleHAiOjE2NzA3ODQ2NTcsImF1ZCI6InRoYWlkdXlkbzE3QGdtYWlsLmNvbSIsImlzcyI6InRoYWlkdXlkbzE3QGdtYWlsLmNvbSJ9.0mkQnynEEiQsgK0vC8HHxvVruIsgZJfn1g7rb2QHvRM' \
--data-raw '{
    "name": "test_edit"
}'
```
* Response:
    * Presentation not found:
    ```json
    {
        "ReturnCode": 404,
        "Message": "presentation not found"
    }
    ```
     * Get presentation successfully:
    ```json
    {
        "ReturnCode": 200,
        "Message": "get presentation successfully",
        "Data": {
            "Presentation": {
                "id": 6,
                "name": "test_edit",
                "is_deleted": false,
                "slide_count": 1,
                "owner_id": 6,
                "created_at": "2011-01-01T03:01:00.000Z",
                "updated_at": "2011-01-01T03:01:00.000Z"
            },
            "Slides": [
                {
                    "id": 6,
                    "slide_type_id": 1,
                    "presentation_id": 6,
                    "content": "",
                    "is_deleted": false
                }
            ]
        }
    }
    ```

### Create slide:
* Request wrong
```bash
curl --location --request POST 'http://localhost:5000/presentation/edit/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo2LCJlbWFpbCI6ImhhaWR1YzAxNDdAZ21haWwuY29tIiwicHJvdmlkZXIiOiJnb29nbGUifSwiaWF0IjoxNjcwNzgxMDU3LCJleHAiOjE2NzA3ODQ2NTcsImF1ZCI6InRoYWlkdXlkbzE3QGdtYWlsLmNvbSIsImlzcyI6InRoYWlkdXlkbzE3QGdtYWlsLmNvbSJ9.0mkQnynEEiQsgK0vC8HHxvVruIsgZJfn1g7rb2QHvRM' \
--data-raw '{
    "name": "test_edit"
}'
```
* Response:
    * Presentation not found:
    ```json
    {
        "ReturnCode": 404,
        "Message": "presentation not found"
    }
    ```
    * Presentation is not owned by user:
    ```json
    {
        "ReturnCode": 401,
        "Message": "invalid permission"
    }
    ```
    * Slide type not existed:
    ```json
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
    ```

### Edit slide:
* Request
```bash
curl --location --request POST 'http://localhost:5000/slide/edit/5' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo2LCJlbWFpbCI6ImhhaWR1YzAxNDdAZ21haWwuY29tIiwicHJvdmlkZXIiOiJnb29nbGUifSwiaWF0IjoxNjcwNzg0ODg5LCJleHAiOjE2NzA3ODg0ODksImF1ZCI6InRoYWlkdXlkbzE3QGdtYWlsLmNvbSIsImlzcyI6InRoYWlkdXlkbzE3QGdtYWlsLmNvbSJ9.jhKOuwvPYlnl5yvTpMUmQa1yi_C0OjQIREgkDqhUB2g' \
--data-raw '{
    "content": "json edited"
}'
```
* Response:
    * Slide not found:
    ```json
    {
        "ReturnCode": 404,
        "Message": "presentation not found"
    }
    ```
     * Edit slide successfully:
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
* Request
```bash
curl --location --request POST 'http://localhost:5000/slide/delete/5' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo2LCJlbWFpbCI6ImhhaWR1YzAxNDdAZ21haWwuY29tIiwicHJvdmlkZXIiOiJnb29nbGUifSwiaWF0IjoxNjcwNzg0ODg5LCJleHAiOjE2NzA3ODg0ODksImF1ZCI6InRoYWlkdXlkbzE3QGdtYWlsLmNvbSIsImlzcyI6InRoYWlkdXlkbzE3QGdtYWlsLmNvbSJ9.jhKOuwvPYlnl5yvTpMUmQa1yi_C0OjQIREgkDqhUB2g' \
--data-raw ''
```
* Response:
    * Slide not found:
    ```json
    {
        "ReturnCode": 404,
        "Message": "slide not found"
    }
    ```
    * Presentation is not owned by user:
    ```json
    {
        "ReturnCode": 401,
        "Message": "invalid permission"
    }
    ```
     * Delete slide successfully:
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