// import './App.css';
import { RegisterForm } from '../src/pages/register';
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { LoginForm } from './pages/login';
import { HomePage } from './pages/home';

function App() {
  return (
    <Router>
    <Routes>
    <Route path='/' element={<LoginForm/>}/>
    <Route path='/register' element={<RegisterForm/>}/>
    <Route path='/home/:id' element={<HomePage/>}/>
    </Routes>
    </Router>

  );
}

export default App;
