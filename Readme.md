Blog App.

Technologies: 
- Grapql, Prisma, Apollo
- NodeJs
- React
- Typescript


docker run -it -p 4000:4000 blog-app_prisma-postgres-api


prisma migrate dev

https://github.com/Faithdroid/create-and-run-a-prisma-server-with-docker-containers/blob/main/Dockerfile

docker rmi -f $(docker images -aq)

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MjU3OTA2NiwiZXhwIjoxNjU2MTc5MDY2fQ.LCPCugpBO2bg5O620P3Ar9gZ_xIriNSdWKBqblv_-iA