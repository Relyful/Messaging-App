import MainLayout from './components/MainLayout/MainLayout';
import ChatWindow from './components/ChatWindow/ChatWindow';
import Login from './components/Login/Login';
import Chat from './components/Chat/Chat';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import NewChat from './components/NewChat/NewChat';
import Home from './components/Home/Home';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {index: true, element: <Home />},
      {path: '/chat', element: <ChatWindow />},
      {path: '/login', element: <Login />},
      {path: '/chat/new', element: <NewChat mode="solo" />},
      {path: '/chat/new-group', element: <NewChat mode="group"/>},
      {path: '/chat/:chatId', element: <Chat />},
      {path: '/register', element: <Register />},
      {path: '/profile', element: <Profile mode="current" />},
      {path: '/profile/:profileId', element: <Profile mode="other" />},
    ]
  }
]

export default routes;