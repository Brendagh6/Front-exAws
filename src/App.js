// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import Credential from './components/Credential';
import UserEdit from './components/UserEdit'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/credencial" element={<Credential />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/form" element={<UserForm />} />
        <Route path="/useredit/:id" element={<UserEdit />} />
        
      </Routes>
    </Router>
  );
}export default App;