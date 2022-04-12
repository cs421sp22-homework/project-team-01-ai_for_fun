# IFun

iFun is an AI application that is supposed to bring a fun AI experience for users on image, vedio, text implementations.

## User Manual

### Use case: Access Home Page
Users accessing the application should first see the welcome page (Figure 1) that contains the basic introduction of the website and login/ sign up Botton. Here, users do not have to register. 

The user clicks on “AI Face”, "AI Voice", "AI Style".

Redirect to the home page and the user see the home page made up by different collection.

### Use case: Access previous work
The user clicks on “My Account” on the toolbar. The user is redirected to the login page if he/she does not login. The user is redirected to the previous work after login. The user clicks on “Profile”, then it will see all previous works.

### Use case: Edit Profile
The user clicks “user” button and select “Account Setting”.

The user accesses the profile page.

The user should have a profile page where they can edit their e-mail address, phone number and password. Also, they could view their previous work in their account.

### Use case: View community work

The user clicks on “community” 

The user is redirected to the homepage of community and sees the posts of all the users’ posts

### Use case: Comment on post

The user accesses to community and click on one post.

The user previews the post and see all the previous comment.

The user then adds comment by the text area and “add comment” button.

### Use case: Reply to the comment

The user clicks the “reply to” button of comment in the post 

The user then sees an input area and could submit their replies.

### User case: Liked and unliked post

The user accesses the community page.

The user clicks the “liked” button to like this post and double click to unlike.

### Use case: Post to community via “AI face/AI style” page
The user clicks “AI face” or “AI style” on the homepage. It will direct to “AI face” or “AI style” page. The user selects two pictures and clicks the “continue” button. After waiting for several seconds, the output pops up, the “post” button is able to use. The user clicks the “post” button, and types any text information they want to share, clicks the “submit” button. Then this picture output is posted in the community.

### Use case: Post to the community via “AI audio” page
The user clicks “AI audio” on the homepage, selects one picture, types any text that needs to transfer to voice and clicks the “continue” button. After waiting for several seconds, the output pops up, the “post” button is able to use. The user clicks the “post” button and types any text information in the text area and clicks the “submit” button. Then this video output is posted in the community

### Use case: Post to the community via the Community page
The user clicks the “Community” and clicks the “create” button. It will direct to a page that contains the user’s previous work. Users can select one work, then type anything they would like to share. And then clicks “submit”. However, if the user decides not to post now, it can click “back”, and it will redirect to the “Community” page.


### User case: Video collections
For each video collections on the home page, when user hover mouse on the collection show-case, the description of this collection should shows up. After clicking these collections, the web page redirects to the edit page. The edit page is mainly divided into 3 parts. The tool bar contains a back-to-home button left and  share and download buttons right. 

### User case: Access face swap model
The user can click on the “AI face” button on the main page to access the Face swap page. In the page, the user can choose a target face from a list of face images at the left part of the page and choose or upload an origin face at the bottom part of the page. The user then can click on the create button to get a new face swap image created by the model using the two images the user selected.

### User case: Access Text-to-speech model
The user can click on the “AI Speech” button on the main page to access the TTS model. In this page,  the user can choose the target sound effect from the given list on the left on the page. And input a sentence in the text box on the page. The user then can click on the create button and the model will return a wav file with selected sound effect speaking the input speech.

### User case: Access Style GAN model

The user can click on the “AI Style” button on the main page to access the Style GAN model. The user can upload or choose an image as the origin image and choose an artwork given in this page as the target style. The user then can click on the create button and the style GAN model will return a new image that the pattern of the art chosen by the user transfers to the origin image chosen by the user.
 

## API Reference

Documentation of our public API is [API](https://github.com/cs421sp22-homework/project-team-01-ai_for_fun/blob/main/docs/API%20reference/API.md)

## About Us!

We are AI-For-Fun team for the course of Object Oriented Software Engineering on Johns Hopkins University. We are developing the iFun to make more people feel the fun of AI model. 
