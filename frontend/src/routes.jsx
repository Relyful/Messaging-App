import MainLayout from './components/MainLayout/MainLayout';
import ChatWindow from './components/ChatWindow/ChatWindow';
import Login from './components/Login/Login';
import Chat from './components/Chat/Chat';
import Register from './components/Register/Register';

const routes = [
  {
    path: '/',
    Component: MainLayout,
    children: [
      {index: true, Component: ChatWindow},
      {path: '/login', Component: Login},
      {path: '/chat/:chatId', Component: Chat},
      {path: '/register', Component: Register},
    ]
  }
]

export default routes;