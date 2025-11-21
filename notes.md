## Phase 1 (Requirement)
 - Main Idea : We are going to build a platform that provides a space for developers to connect with each other, share ideas, form teams, and collaborate on real projects.
 - Requirement : User Management (signUp,Login),Developer Discovery,Chat option
 - Tech Stack : FrontEnd(React, tailwindcss, Redux) | BackEnd(Node.js, Express.js, WebSocket) | Database (MongoDb, Mongoose ORM)

## Phase 2 Design (Feature,HLD, LLD)
 + Features
    - Create Account
    - Login
    - Update Profile
    - Feed Page
    - Send connection request
    - See matches
    - See sent/received Request
    - Update Profile
    - Chat feature

 + LLD
    - DB Design
        - User Collection (firstName, lastName, emailId, password,profileImageUrl, age, gender,skills)
        - Collection Request (fromUserId, toUserId, status-ignored/panding/accepted/rejected)

 + HLD
    - Tech Stack : FrontEnd(React, tailwindcss, Redux) | BackEnd(Node.js, Express.js, WebSocket) | Database (MongoDb, Mongoose ORM)

 + Component Interaction Flow
    - User SignUp/Login → Backend Auth API → MongoDB
    - User opens feed → Backend fetches developer list
    - User sends connection request → Backend updates DB
    - User accepts request → Connection established
    - Users start chatting → WebSocket opens → Messages flow

 + Backend API Overview
    - POST /auth/signup
    - POST /auth/login
    - GET /user/profile/:id
    - PUT /user/update
    - GET /feed
    - POST /request/send
    - POST /request/accept
    - GET /request/sent
    - GET /request/received
    - GET /matches
    - WebSocket: /chat/:userId

## Phase 3 Development
 

