# API Documentation

## Installation

*   Clone the repository
*   Install dependencies
    *   `npm install`
*  Create a .env file in the root directory
    *   Add the following environment variables to the .env file:
        *   `MONGO_LOCAL_URI` - MongoDB connection string
*   Run the server

## Endpoints

*   **POST /api/addbook**  
    Description: Add a new book to the database.  
    Usage: `POST /api/addbook`
* **GET /api/getbooks/:id**  
    Description: Get a book by its ID from the database.  
    Usage: `GET /api/getbooks/:id`
    
*   **PUT /api/updatebook/:id**  
    Description: Update a book by its ID in the database.  
    Usage: `PUT /api/updatebook/:id`
*   **DELETE /api/deletebook/:id**  
    Description: Delete a book by its ID from the database.  
    Usage: `DELETE /api/deletebook/:id`
*   **GET /api/getbooks**  
    Description: Get all books from the database.  
    Usage: `GET /api/getbooks`
    #### Query Parameters The "GET /api/getbooks" endpoint supports the following query parameters:

<table>

<thead>

<tr>

<th>Parameter</th>

<th>Description</th>

<th>Example</th>

</tr>

</thead>

<tbody>

<tr>

<td>page</td>

<td>Page number for pagination (default: 1).</td>

<td>`?page=2`</td>

</tr>

<tr>

<td>limit</td>

<td>Number of items per page (default: 10).</td>

<td>`?limit=20`</td>

</tr>

<tr>

<td>search</td>

<td>Search term to filter books by title</td>

<td>`?search=david`</td>

</tr>

<tr>

<td>sort</td>

<td>Field to sort the results by (default: "title").</td>

<td>`?sort=author`</td>

</tr>

<tr>

<td>order</td>

<td>Sort order, either "asc" (ascending) or "desc" (descending) (default: "asc").</td>

<td>`?order=desc`</td>

</tr>

</tbody>

</table>

## Test Results

`Test Suites: 2 passed, 2 total`<br>
`Tests: 17 passed, 17 total`<br>
`Snapshots: 0 total`<br>
`Time: 0.847 s, estimated 1 s`<br>
`Ran all test suites.`<br>
`Done in 1.28s.`<br>

see `test-report.json` for more details

## Test Analysis
*   `GET /api/getbooks`
    *   ✓ should get all books (26 ms)
    *   ✓ should get all books with pagination (3 ms)
    *   ✓ should catch an error (2 ms)
*   `POST /api/addbook`
    *   ✓ should add a new book (8 ms)
    *   ✓ should return an error if the book already exists (2 ms)
    *   ✓ should return an error for invalid book data (2 ms)
*   `GET /api/getbooks/:id`
    *   ✓ should get a book by ID (2 ms)
    *   ✓ should return an error if the book is not found (2 ms)
    *   ✓ should catch an error (2 ms)
*   `PUT /api/updatebook/:id`
    *   ✓ should update a book by ID (3 ms)
    *   ✓ should return an error if the book is not found (2 ms)
    *   ✓ should catch an error (2 ms)
*  `DELETE /api/deletebook/:id`
    *   ✓ should delete a book by ID (2 ms)
    *   ✓ should return an error if the book is not found (2 ms)
    *   ✓ should catch an error (2 ms)
* `connectMongoDB()`
    *   ✓ should connect to MongoDB (2 ms)
*  `disconnectMongoDB()`
    *   ✓ should disconnect from MongoDB (1 ms)

## Project Review

1. Code Structure and Modularity:
   The project follows a modular structure, with separate directories for controllers, routes, database and configurations. This makes the codebase organized and scalable.

2. Test Coverage: 
   The project achieves a high level of test coverage, with all major functionalities and API endpoints thoroughly tested. This is evident from the test results, where all tests pass successfully.

3. Error Handling:
   The tests cover cases where the API should return errors, ensuring that error responses are correctly handled.

4. Pagination and Query Parameters:
   The API supports pagination and query parameters, allowing users to filter, sort, search, order and paginate through the results.

5. Improvements:
   * The API could have users and authentication, allowing users to create accounts and save books to their accounts. 
   * The authentication could be implemented using JSON Web Tokens (JWTs). 
   * The users could also be allowed to rate and review books, and the API could return the average rating for each book.
