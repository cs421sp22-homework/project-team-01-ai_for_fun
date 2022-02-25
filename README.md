# Name of the project 

A brief description of your project (elevator pitch goes here).

**Team**

| Name       | JHU Email      | GitHub Username |
| ----       | ---------      | --------------- |
| Yiyi Tao   | ytao23@jhu.edu |  dongji1111     |
| Xinrui Zou | xzou8@jhu.edu  |     xzjiu       |
|Mingxuan Che| mche2@jhu.edu  |  mingxuanche99  |
|Jingyan Li  | jli336@jhu.edu |  SherryLee1998  |
|Song Li     | sli218@jh.edu  |     Gnosil      |
|            |                |                 |

**Advisors** 

| Name | JHU Email | GitHub Username |
| ---- | --------- | --------------- |
| Qifan Yu     |    qyu24@jhmi.edu       |       qifanyyy          |

## Documentation

* [Project Document](https://docs.google.com/document/d/1ETNIUtfBC506FS00uXnfnk-7b1eCrsGPecZe2KY8Onk/edit#heading=h.k4ooyeg0z5a9)
* [User Manual](https://cs421sp22-homework.github.io/project-team-01-ai_for_fun/)
* [API Documentation](https://github.com/cs421sp22-homework/project-team-01-ai_for_fun/blob/main/docs/API%20reference/API.md)

## Installing / Getting started

Prerequisite: React(17.0.2), Node.js(16.14.0), Golang(1.17.7), MongoDB(5.0)

```shell
git clone https://github.com/cs421sp22-homework/project-team-01-ai_for_fun.git

```

## Developing
Detailed and step-by-step documentation for setting up local development. For example, a new team member will use these instructions to start developing the project further. 
1. Install IDE
  We are using Intellij IDEA as our developing stage. It can be download at: https://www.jetbrains.com/idea/download/#section=windows
2. Install React 
  We are using React as our frontend framwork. Before installing React, you should install Node.js and npm first if you haven't. Node.js and npm can be downloaded here: https://nodejs.org/en/download/
  
  Then you can install React using the following commands:
```shell
npm install -g create-react-app 
cd project-team-01-ai_for_fun
npm start

```
3. Install Golang and Gin
We use Golang to develop our backend and it can be download at: https://go.dev/doc/install. Gin is Web framework for Golang, it can be install using the following commands:

```shell
go get -u github.com/gin-gonic/gin

```
4. Install MongoDB
Mongodb is the database we used for this application. It can be downloaded at: https://docs.mongodb.com/manual/installation/


5. Install Heroku
  We will develop our app on heroku. It can be installed using the following command:
```shell
npm install -g heroku
```
  More documentation about how to use heroku can be found here: https://devcenter.heroku.com/articles

You should include what is needed (e.g. all of the configurations) to set up the dev environment. For instance, global dependencies or any other tools (include download links), explaining what database (and version) has been used, etc. If there is any virtual environment, local server, ..., explain here. 

Additionally, describe and show how to run the tests, explain your code style and show how to check it.

If your project needs some additional steps for the developer to build the project after some code changes, state them here. Moreover, give instructions on how to build and release a new version. In case there's some step you have to take that publishes this project to a server, it must be stated here. 
