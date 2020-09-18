FROM openjdk:14
WORKDIR /target
COPY target/docker-movies.jar /home/docker-movies.jar
CMD ["java","-jar","/home/docker-movies.jar"]
EXPOSE 8080

FROM node
WORKDIR /app
COPY app .
RUN yarn install
RUN yarn start
EXPOSE 3000