import MainLayout from './components/MainLayout/MainLayout';
import ChatWindow from './components/ChatWindow/ChatWindow';
import Login from './components/Login/Login';
import Chat from './components/Chat/Chat';

const routes = [
  {
    path: '/',
    Component: MainLayout,
    children: [
      {index: true, Component: ChatWindow},
      {path: '/login', Component: Login},
      {path: '/chat/:chatId', Component: Chat},
    ]
  }
]

export default routes;