<!-- @format -->

<h1 align ="center">

KANBAN

</h1>

## Server router of KANBAN :

### 1. POST /tasks

- Request Header :
  token : token

        Content-Type :  application/x-www-form-urlencoded
        token : token

---

- Request Body :

        title : "README"

        description : "it is really important to do whwn coding"

---

- Success response with status (201) :

        {
            "id": 5,
            "title": "README",
            "description": "it is really important to do whwn coding"
             "category": "todo",
            "updatedAt": "2020-03-02T09:28:57.493Z",
            "createdAt": "2020-03-02T09:28:57.493Z"
        }

---

- Validation Error response with status (400) :

  if one of Request Body form is empty (title for sample) :

        {
            "message": [
                "title can not be empty!"
            ]
        }

  ***

- Internal Server Error response with status (500) :

  Typo in server sample :

        {
             "message": "Internal server error!"
        }

---

<br></br>

### 2. GET /tasks

- Request Header :
  token : token

- Success response with status (200) :

        [
            {
                "id": 3,
                "title": "handling internal server",
                "description": "hendling error with middleware",
                "category": "todo",
                "createdAt": "2020-03-02T08:56:28.809Z",
                "updatedAt": "2020-03-02T08:56:28.809Z"
            },
            {
                "id": 4,
                "title": "handling internal server",
                "description": "hendling error with middleware",
                "category": "todo",
                "createdAt": "2020-03-02T09:00:31.025Z",
                "updatedAt": "2020-03-02T09:00:31.025Z"
            },
            {
                "id": 5,
                "title": "README",
                "description": "it is really important to do whwn coding",
                "category": "todo",
                "createdAt": "2020-03-02T09:28:57.493Z",
                "updatedAt": "2020-03-02T09:28:57.493Z"
            }
        ]

---

- Internal Server Error response with status (500) :

  Typo in server sample :

        {
             "message": "Internal server error!"
        }

---

<br></br>

### 3. PUT /todos/:id

- Request Header :
  token : token

Content-Type : application/x-www-form-urlencoded

---

- Request Body :

        title : "Put for edit data"

        description : "the most difficult"

         category: "doing",

---

- Success response with status (200) :
    
   Request req.params.id = 5

        {
            "id": 5,
            "title": "Put for edit data",
            "description": "the most difficult",
            "category": "doing",
            "createdAt": "2020-03-02T08:46:55.905Z",
            "updatedAt": "2020-03-02T11:07:42.631Z"
        }

---

- Validation Error response with status (400) :

  if one of Request Body form is empty (description for sample) :

        {
            "message": [
               "description can not be empty!"
            ]
        }

---

- Data Not Found Resposnse (404) :

  Request req.params.id = 6

        {
            "message": "Data not found!"
        }

---

- Internal Server Error response with status (500) :

  Typo in server sample :

        {
             "message": "Internal server error!"
        }

---



<br></br>

### 6. DELETE /tasks/:id

- Request Header :
  token : token

- Success response with status (200) :
- Request req.params.id = 5

        {
            "id": 5,
            "title": "Put for edit data",
            "description": "the most difficult",
            "category": "doing",
            "createdAt": "2020-03-02T08:46:55.905Z",
            "updatedAt": "2020-03-02T11:07:42.631Z"
        }

---

- Data Not Found Resposnse (404) :

  Request req.params.id = 6

        {
            "message": "Data not found!"
        }

---

- Internal Server Error response with status (500) :

  Typo in server sample :

        {
             "message": "Internal server error!"
        }

---

===========================USER SIDE==================================

### 1. POST /user/register

- Request Header :

Content-Type : application/x-www-form-urlencoded

---

- Request Body :

        username : "gusti"

        email : "gusti@gusti1.com"

        password : "gusti"

---

- Success response with status (200) :

            {
            "id": 5,
            "username": "gusti",
            "email": "gusti@gusti1.com",
            "password": "$2b$10$b9iID.KHMulwhhF44YRy2uQS5y/R2Nvz2Ibm.ykJL6DD4JjuYNFqe",
            "updatedAt": "2020-03-16T09:38:13.006Z",
            "createdAt": "2020-03-16T09:38:13.006Z"

         }

---

- Data Not Found Resposnse (404) :

        {
            "message": "password can not be empty!"
        }

---

- Internal Server Error response with status (500) :

  Typo in server sample :

        {
             "message": "Internal server error!"
        }

---

### 2. POST /user/login

- Request Header :

Content-Type : application/x-www-form-urlencoded

---

- Request Body :

        email : "gusti@gusti.com"

        password : "123"

---

- Success response with status (200) :

       {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJndXN0aUBndXN0aS5jb20iLCJpYXQiOjE1ODQzNTE3MjB9.jW9kUpIL0vLd1Eo7Re0ncxhzidmK8kqIKctKqRkO800"}

---

- Data Not Found Resposnse (404) :

        {
            "message": "use name can not be empty!"
        }

---

- Internal Server Error response with status (500) :

  Typo in server sample :

        {
             "message": "Internal server error!"
        }

---
