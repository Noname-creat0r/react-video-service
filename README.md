# react-video-service
Hi, this is my final web dev internship project. The requirements are down bellow.
I will update this project during my futher learning process.
## Main requirements:
  - Use ***MongoDB*** for data managment (***mongoose***).
  - ***REST*** services manage the DB :left_right_arrow: frontend communication (***REST*** services should be created with ***Node.js*** + ***Express***)
  - Frontend side realization is based on: ***React JS*** (***react-router***, ***react-redux***), ***Bootstrap***
  - Use ***token-based authentication***.
  
## Service functionality:
  - [x] User authorization/registration module.
  - [x] Listing and watching the videos from DB in the app.
  - [x] Categorizing and sorting videos.
  - [x] Every video should have its own page with user comments and additional information.
  - [x] Every video should have some specific counters like: "Views", "Likes"...
  - [x] Video searching functionality.
  - [x] Unauthorized users can't: view more than 10 videos, comment any video, like any video, create playlists, add videos to playlists.
  
## Functionality for authorized users:
  - [x] Unlimited number of videos to view.
  - [x] Commenting videos.
  - [x] Liking videos (such videos will be saved in "Liked" category)
  - [x] Creating/deleting/editig playlists. 
  
## Administration:
  - [x] Adding/deliting/editing videos.
  - [x] Adding/deliting/editing video categoires.
  - [ ] User managing (adding/deliting/editing users functionality should be emplented with role managing system with 3 roles: **admin**, **user**, **guest**)

## Brief visual review
#### Home
![HomeScreen](/screenshots/Home.png)

#### Video page
![VideoPageScreen](/screenshots/VideoPageError.png)

![VideoInfoScreen](/screenshots/Comment.png)

#### Profile page
![ProfilePageScreen](/screenshots/ProfilePage.png)

![UploadingVideoScreen](/screenshots/UploadingVideo.png)

#### Playlist page
![PlaylistPage](/screenshots/PlaylistPage.png)

#### Admin page

![AdminPage](/screenshots/Admin.png)

#### Auth
![AuthForm](/screenshots/Auth.png)

