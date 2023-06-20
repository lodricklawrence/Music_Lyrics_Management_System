# Music Lyrics Management System

## Table of Contents
- [Description](#description)
- [Technology Used](#technology-used)
- [Installation Guide](#installation-guide)
- [How to Use the Project](#how-to-use-the-project)
- [Project End-points](#project-end-points)
- [Acknowledgements](#acknowledgements)


# Description

### Project origin
Music Lyrics Management System is a full-stack project which i performed as one of the project given by my senior supervisors 

### What it can do
Music Lyrics Management System is a huge project which a system admin can add music lyrics to MUSIC folder in backend contain different categories of music lyrics, then the users login into the system then they view and read the music lyrics present. Also the more the user reads a certain MUSIC category much of time the read number info is saved so on the coming login, the suggested music lyrics that will be displayed on home page at the top part will be of the category he love reading the most.

### Technology used
React.JS,Node.JS with express, Prisma ORM, PostgreSQL, CSS


# Installation guide
1. Install Node.js v16.14.2 in your local computer [Node Js](https://nodejs.org/en/).
2. Install Git as a version controller.
3. Copy the project repository directory URL from here.
4. Go to the directory in your computer where you want the cloned project to be placed.
5. Open the command line and run git clone [paste the URL] then run.
6. The project folders named frontend and backend are ready set in your local computer at that specific directory.

### Backend setup
1. Open the Command Line Interface(CLI) in your present directory then run the command cd backend. This will direct you to the backend folder.
2. Inside the backend folder rename .env.example file to be .env.
3. After that open the terminal and run the command npm install. This will install all the dependencies present in package.json file into your backend folder.

### Frontend setup
1. Back to your root directory where you can access both frontend and backend cloned folders.
2. Open the Command Line Interface(CLI) in your present directory then run the command cd frontend. This will direct you to the frontend folder.
3. Inside the frontend folder open the terminal and run command npm install. This will install all the dependencies present in package.json file into your frontend folder.

# How to use the project

### Backend use
1. Create a database within your Database Management System either MYSQL, POSTGRESQL or any other relational DBMS.
2. Back to your root directory where you can access both frontend and backend cloned folders.
3. Open the Command Line Interface(CLI) in your present directory then run the command cd backend. This will direct you to the backend folder.
4. Inside the backend folder edit the credentials inside the .env file as instructed inside it. 
5. Within the schema.prisma file is where you I placed my models(database table) named Users and ViewHiMUSIC with relationships between them, for more understanding visit [prisma docs](https://www.prisma.io/).
6. Open the terminal and run npx prisma migrate --dev. This will create migration file.
7. Visit your created database you will see a 2 tables have been created
8. For further database model updates within schema.prisma file run first npx prisma db pull then after updating the models run npx prisma db push within the CLI.
9. After all this setups run npm start to your terminal to initiate the express server.The server will listen on localhost:4000

### Frontend use
1. Back to your root directory where you can access both frontend and backend cloned folders.
2. Open the Command Line Interface(CLI) in your present directory then run the command cd frontend. This will direct you to the frontend folder.
3. Inside the frontend folder open the terminal and run command npm start inorder to initiate React.JS server.
4. Wait for a moment then you will observe the main route opens at localhost:3000 in your browser.
5. If it hasnot opened at the browser but the server is already initiated then open the browser and write localhost:3000 in the search engine and run.
6. Now both servers frontend and backend are running your are ready to test the functionalities well.

# Project End-points

### Backend
Workers Routes

| HTTP Method  | URL |Functionality|
| ------------- | ------------- |-------|
| POST  | /register  |registering users in database|
| POST  | /login   |for users login |
| GET  | /readFile/:category/:name/:id |for reading MUSIC files |
| GET  | /getFile/:id |for getting all music lyrics present in the music lyrics folder|



### Frontend
| URL |Functionality|
| ------------- |-------|
| /  |Displays a system login page |
| /register   |Displays an Users registration Form|
| /home  |Displays  Users home page|



# Acknowlegements
I obtained Node.Js knowldege and Express.js from treehouse tutorials [teamtreehouse](https://teamtreehouse.com/) and React.Js knowledge from [React.Js](https://reactjs.org/).

Also i used [stackoverflow](https://stackoverflow.com/) and [w3schools](https://www.w3schools.com/) to solve many of challenges i faced when performing this project.

Also i obtained prisma ORM knowledge from [prisma docs](https://www.prisma.io/).

