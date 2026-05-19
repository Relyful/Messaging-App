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
    Component: MainLayout,
    children: [
      {index: true, Component: ChatWindow},
      {path: '/login', Component: Login},
      {path: '/chat/:chatId', Component: Chat},
      {path: '/chat/new', Component: NewChat},
      {path: '/register', Component: Register},
      {path: '/profile', Component: Profile},
    ]
  }
]

export default routes;