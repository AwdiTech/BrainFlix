# BrainFlix

![BrainFlix Interface](https://i.imgur.com/8EoV4DH.png)

## Overview
BrainFlix is a dynamic video streaming platform designed to deliver a seamless viewing experience. It features a user-friendly interface, personalized content discovery, and a suite of interactive functionalities that cater to both content creators and viewers.

## Features
- **Content Management**: Upload and manage your video content with ease.
- **User Interactions**: Like, comment, and share your favorite videos.
- **Responsive Design**: Enjoy a consistent experience across all your devices.
- **Video Playback**: Stream videos smoothly with adaptive quality settings.

## Technologies Used
- React.js
- Node.js
- SCSS
- `react-lines-ellipsis` for multiline text truncation

## API Server (New in Sprint 3)
The BrainFlix API manages the video data, allowing for features such as:
- Video list retrieval.
- Individual video details.
- Video uploads and comment management.
- Static asset serving for thumbnails and video content.



## Getting Started

### Prerequisites
- Node.js
- npm or yarn

### Installation
1. Clone the repository:
```
https://github.com/AwdiTech/BrainFlix
```

2. Navigate to the project directory:
```
cd BrainFlix
```

3. Install the dependencies:
```
npm install
```

4. Start the application:
```
npm start
```


## Usage

BrainFlix offers a straightforward and intuitive user interface that makes it easy for users to navigate and enjoy video content.

- **Watching Videos**: Simply click on any video thumbnail on the homepage to start watching. Use the player controls to play, pause, adjust volume, or enter full-screen mode.
- **Uploading Content**: To upload your own video, navigate to the 'Upload' section via the link at the top right corner and fill in the details about your video.
- **Interacting with Content**: Engage with videos by liking them, adding comments, and sharing your favorite content on social media.



## Sprint 3 Enhancements
Developed a robust backend API to replace the mock API previously in use.
Implemented full CRUD operations for video and comment management.
Introduced a custom video player with a suite of controls for an improved user experience.
Established persistent data storage to maintain state between server restarts.
