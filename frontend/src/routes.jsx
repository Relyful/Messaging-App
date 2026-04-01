import MainLayout from './components/MainLayout/MainLayout';
import ChatWindow from './components/ChatWindow/ChatWindow';
import Login from './components/Login/Login';

const routes = [
  {
    path: '/',
    Component: MainLayout,
    children: [
      {index: true, Component: ChatWindow},
      {path: '/login', Component: Login}
    ]
  }
]

export default routes;