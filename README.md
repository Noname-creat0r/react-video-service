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
  - [ ] Categorizing and sorting videos.
  - [x] Every video should have its own page with user comments and additional information.
  - [ ] Every video should have some specific counters like: "Views", "Likes"...
  - [x] Video searching functionality.
  - [ ] Unauthorized users can't: view more than 10 videos, comment any video, like any video, create playlists, add videos to playlists.
  
## Functionality for authorized users:
  - [x] Unlimited number of videos to view.
  - [x] Commenting videos.
  - [x] Liking videos (such videos will be saved in "Liked" category)
  - [ ] Creating/deleting/editig playlists. 
  
## Administration:
  - [ ] Adding/deliting/editing videos.
  - [ ] Adding/deliting/editing video categoires.
  - [ ] User managing (adding/deliting/editing users functionality should be emplented with role managing system with 3 roles: **admin**, **user**, **guest**)

## Current project state in screenshots
![Home](/screenshots/HomeV1.png)
