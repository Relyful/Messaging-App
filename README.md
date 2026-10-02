<div align="center">

<h2> Rely's Chat : Messaging App </h2>

![](https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square)
![](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)
![](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)
![](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)
![](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)

<img src ="./assets/relychat.png" width="85%">

</div>

## 💡 Overview

Rely's Chat is a simple chatting application that allows user to chat one on one or in group chats and allows user to customize their profiles. Building this chat app helped me understand user authentication, backend data validation, REST API design, 
protected routes and mobile layout creation.

## ✨ Features
 
-  Solo and Group chats.
-  Users profiles and profile customization.
-  Chats and message management.
-  Responsive design for various screen sizes.
-  Frontend and backend data validation.

## 👩‍💻 Tech Stack

- **Vite**: Quick and easy to work with build tool for my react App.
- **React**: Open source frontend library to easily create reactive user interfaces.
- **React Router**: Routing library that help build Single page applications.
- **Express.js**: Easy to use Node.js web framework.
- **Prisma.io**: Amazing ORM for Node.js very natural to work with used with PostgreSQL.
- **Passport.js**: Node Authentication middleware, amazing ready to use solution, later replaced with jsonwebtoken.

## 📖 Sources and external API's

- No external API used.

## 📦 Getting Started

To get a local copy of this project up and running, follow these steps.

### 🚀 Prerequisites

- **Node.js**
- **Npm**
- **PostgreSQL** (or another supported SQL database).

## 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Relyful/Messaging-App.git
   cd Messaging-App
   ```

2. **Install dependencies:**

   Using Npm:

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory of backend and frontend and add the following variables:

**Frontend**
   ```env
   VITE_BACKEND_ADDRESS=http://localhost:3000
   ```
**Backend**
   ```env
   DATABASE_URL="Your database connection URL"
   ALLOWED_ORIGIN="Your frontend address for cors to recognise and allow"
   SECRET="Secret string for jwt authentication"
   ```
4. **Run database migrations:**

   Ensure your database is running and then run:

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```
   You'll also need to create new chat with GLOBAL chat_type before creating users because users are added to this chat automaticaly.
   To make this easier you can use my seed script in backend directory

   ```bash
   cd backend
   node seed.mjs
   ```

  5. **Start the development server:**

   ```bash
   cd frontend
   npm run dev
   cd ../backend
   node --watch app.js
   ```

## 📜 License

Distributed under the MIT License. See [License](/LICENSE) for more information.

Thank you for checking out my project! :)
