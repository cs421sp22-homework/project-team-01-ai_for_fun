# AI for Fun(iFun)

iFun is an AI application that is supposed to bring a fun AI experience for users on image, video, text implementations.

**Team**

| Name       | JHU Email      | GitHub Username |
| ----       | ---------      | --------------- |
| Yiyi Tao   | ytao23@jhu.edu |  dongji1111     |
| Xinrui Zou | xzou8@jhu.edu  |     xzjiu       |
|Mingxuan Che| mche2@jhu.edu  |  mingxuanche99  |
|Jingyan Li  | jli336@jhu.edu |  SherryLee1998  |
|            |                |                 |
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
1. clone the repo
```shell
git clone https://github.com/cs421sp22-homework/project-team-01-ai_for_fun.git

```
2. start the MongoDB
Different OS has different way to start MongoDB: https://docs.mongodb.com/guides/server/install/.
For MacOS:
```shell
brew services start mongodb-community@5.0
```

3. start the backend
```shell
cd project-team-01-ai_for_fun/code/backend

go run main.go
```

4. start the frontend
```shell
cd project-team-01-ai_for_fun/code/frontend/front/

npm install
amplify init
amplify push
npm start
```

5. start the ai server. You must install Anaconda on your device. We need python 3.6+ environment. Since we use opencv in our ai server, you must install cmake: https://cmake.org/download/ and other dependcy according to your OS: https://docs.opencv.org/4.x/da/df6/tutorial_py_table_of_contents_setup.html
```shell

cd project-team-01-ai_for_fun/code/ai-compute-sever
conda create --name <your-env> python=3.8
conda activate <your-env>
pip install -r requirement.txt
python host.py
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
```
3. Install Golang and Gin
We use Golang to develop our backend and it can be download at: https://go.dev/doc/install. Gin is Web framework for Golang, it can be install using the following commands:

```shell
go get -u github.com/gin-gonic/gin

```
4. Install MongoDB
Mongodb is the database we used for this application. It can be downloaded at: https://docs.mongodb.com/manual/installation/

5. Install Anaconda 
You can find the information for Anaconda installation on https://www.anaconda.com/


You should include what is needed (e.g. all of the configurations) to set up the dev environment. For instance, global dependencies or any other tools (include download links), explaining what database (and version) has been used, etc. If there is any virtual environment, local server, ..., explain here. 

Additionally, describe and show how to run the tests, explain your code style and show how to check it.

If your project needs some additional steps for the developer to build the project after some code changes, state them here. Moreover, give instructions on how to build and release a new version. In case there's some step you have to take that publishes this project to a server, it must be stated here. 
