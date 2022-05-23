Blog App.

Technologies: 
- Grapql, Prisma, Apollo
- NodeJs
- React
- Typescript

Based on GraphQL course.

Improvements:
- Modification of few API's
- Improve overall flow of the application, state was totally disconnected. 

How to run:

1) In terminal with Docker Desktop install, execute: ```docker compose up```
2) Navigate to your Docker Desktop and locate blog app, open it and locate server-api, then click on CLI
3) Execute: ```npx prisma migrate dev``` this will create the migration for the database which is required for the app and cannot be part of Dockerfile.
4) Access: http://localhost:3000/ for App.
5) Access: http://localhost:4000/ for GraphQL Studio.
6) Click SignUp, create user, then signI


TODO:
- Improve more the state on React app, specially the SignIn piece.
- Post Button on profile is not nice.


This post help a lot on dockerizing the app,

https://www.section.io/engineering-education/dockerized-prisma-postgres-api/