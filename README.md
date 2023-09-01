# SQL Practice Server - Anime Database 🗄️

Welcome to the SQL Practice Server repository! This repository provides you with a hands-on environment to practice your SQL skills using an anime database. You will be able to run SQL queries, receive instant feedback, and improve your querying techniques.

You can test/preview the practice server at https://anime-sql-practice-server.vercel.app/

## Open Tasks

- [ ] Clean up code
- [ ] Provide an easier way to set up exercises
- [ ] make better use of ssr (currently having build issues using fetch-api + server components)

## Table of Contents

- [SQL Practice Server - Anime Database](#sql-practice-server---anime-database)
  - [Open Tasks](#open-tasks)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [1. Install Docker](#1-install-docker)
    - [2. Clone the Repository](#2-clone-the-repository)
    - [3. Prepare the Database Schema](#3-prepare-the-database-schema)
    - [4. Start the Docker Container](#4-start-the-docker-container)
    - [5. Access the Application](#5-access-the-application)
    - [6. Run SQL Queries](#6-run-sql-queries)
  - [Practice Questions](#practice-questions)
    - [1. Set Up Exercises](#1-set-up-exercises)
    - [2. Editing Exercises](#2-editing-exercises)
    - [3. Automatically populate results](#3-automatically-populate-results)
  - [Contact](#contact)

## Getting Started

Follow these steps to set up and use the SQL Practice Server on your local machine.

### 1. Install Docker

Ensure that you have Docker installed on your machine. If you don't have it yet, you can download and install Docker Desktop from [here](https://www.docker.com/products/docker-desktop).

### 2. Clone the Repository

You can either download this repository as a .zip file or clone it using Git:

```bash
git clone https://github.com/rxnma/practice-server.git
```

### 3. Prepare the Database Schema

In the downloaded repository, locate the `database` folder. It contains an existing example `schema.txt` file with an anime database schema which you can replace with your own.

### 4. Start the Docker Container

Open a terminal and navigate to the root folder of the project. Run the following command to start the Docker container:

```bash
docker-compose up
```

### 5. Access the Application

After the Docker container setup is complete, you can access the running application by opening your web browser and navigating to [http://localhost:3000](http://localhost:3000).

### 6. Run SQL Queries

Under the "testarea" section of the application, you can write and run your SQL queries against the anime database.

## Practice Questions

Unfortunately I haven't come up with a simpler solution yet. I am open to suggestions on how to solve this more elegantly. But for now it goes on like this:

In the `src/app/api/data` folder, you'll find a file named `exercises.ts`. This file contains practice questions and solutions that provide feedback on your SQL queries.

Follow these steps to create your own set of execises:

### 1. Set Up Exercises

To get started with the exercises, follow these steps:

- Navigate to the `src/app/api/data` folder.
- Create a file named `exercises.ts`.

### 2. Editing Exercises

Edit the `exercises.ts` file using any text editor. For each exercise, provide the necessary information:

- `id`: QuestionID.
- `category`: SQL query type (aggregation, select, union etc
- `level`: Difficulty of the question.
- `question`: Exercise question.
- `solution`: Your sample solution if your query is successful.
- `result`: Expected result set based on your solution query.

You can leave the `results` field an empty array if you want the exercise endpoint to generate results for you automatically. Alternatively you can also add them by yourself.

### 3. Automatically populate results

There is an endpoint available for automatically populate results:

- Make a `POST` request to `http://localhost:3000/api/exercises` to receive a list of exercises along with completed result sets.

## PRO TIP

You can use ChatGPT to generate a database schema and matching exercises. Just give it the structure of your exercise list and the corresponding database schema. The rest is ChatGPT magic. 🪄

## Contact

If you have any questions or need assistance, don't hesitate to reach out. Feel free to contact me.

Happy practicing!

---

Created with ❤️ by rxnma
