# Technical Challenge: Full-stack

## Problem Statement
Build a simple web application for managing books. The application should allow users to:
1. Add a new book
2. Update an existing book
3. Delete a book
4. View a list of all books
5. Sign up for a user account

## Requirements
- Use TypeScript
- Use a Node.js framework for the backend
- Use React for the frontend
- Add a simple sign-up option - Add a user’s JSON file where you will store the username
and password of the users who will use this application
- Store the books in memory (no need to use a database in this exercise)
- Validate user input to prevent duplicates from being added
- Load a logo for your book brand using an environment variable
- Write at least a few unit tests for the backend and frontend
- Use a tool such as Prettier to format the code
- Package the application as a Docker container
- Deploy the application on AWS preferably (or GCP, Azure) and provide a link

## Evaluation Criteria
- Code quality
- Proper use of Git (commits, branching, etc.)
- Proper use of React for the frontend
- Proper use of the backend API
- Proper handling of error cases
- Proper implementation of the sign-up feature
- Proper use of environment variables
- Proper testing of the backend and frontend
- Proper use of Docker to package the application
- Proper deployment on AWS (or GCP, Azure)

## Submitting the Solution
Please provide a link to a Git repository (e.g., GitHub, GitLab) containing the source code for the
solution, and a link to the deployed application.


## Running the project

Once the repository is cloned locally and Docker client is properly installed

### 0. Create .env file at root level

With the following values

PORT=4200
JWT_SECRET=[anything you want]

### 1. Create the docker container

    docker build -t books-app .

### 2. Run it locally

    docker run -p 4200:4200 books-app

#### Use the app

Go to http://localhost:4200/

### 3. Running test:
    npm run test

### 4. Running locally without Docker

    npm run install
    npm run start

### Stack:

- ReactJs
- NodeJs
- Typescript
- Jest
