import MainLayout from './components/MainLayout/MainLayout';
import ChatWindow from './components/ChatWindow/ChatWindow';
import Login from './components/Login/Login';
import Chat from './components/Chat/Chat';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import NewChat from './components/NewChat/NewChat';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {index: true, element: <ChatWindow />},
      {path: '/login', element: <Login />},
      {path: '/chat/:chatId', element: <Chat />},
      {path: '/chat/new', element: <NewChat />},
      {path: '/chat/new-group', element: <NewChat />},
      {path: '/register', element: <Register />},
      {path: '/profile', element: <Profile />},
    ]
  }
]

export default routes;