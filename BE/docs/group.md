### Remove member:

- Request

```bash
curl --location --request POST 'http://localhost:5000/groups/removeMember' \
--header 'Authorization:' \
--header 'Content-Type: application/json' \
--data-raw '{
    "group_id": 8,
    "account_id": 7
}'
```

- Response:
  - Invalid permission (include user is not owner's group, role to remove is not member):
  ```json
  {
    "ReturnCode": 401,
    "Message": "invalid permission"
  }
  ```
  - Not found user with input group:
  ```json
  {
    "ReturnCode": 404,
    "Message": "user not in this group"
  }
  ```
  - Remove member successfully:
  ```json
  {
    "ReturnCode": 200,
    "Message": "remove member successfully"
  }
  ```

### Remove group:

- Request

```bash
curl --location --request POST 'http://localhost:5000/groups/removeGroup' \
--header 'Authorization:' \
--header 'Content-Type: application/json' \
--data-raw '{
    "group_id": 8
}'
```

- Response:
  - Invalid permission (include user is not owner's group, user not in this group):
  ```json
  {
    "ReturnCode": 401,
    "Message": "invalid permission"
  }
  ```
  - Remove group successfully:
  ```json
  {
    "ReturnCode": 200,
    "Message": "remove group successfully"
  }
  ```