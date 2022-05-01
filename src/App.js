import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Users from './components/Users';
import NoteState from './contexts/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {useState} from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message,type)=>{
    setAlert({
      message:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <>
    <NoteState>
    <Router>
      <Navbar />
      <Alert alert={alert}/>
      <div className="main">
      <Routes>
      <Route exact path="/" element={<Home showAlert = {showAlert}/>} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/users" element={<Users />} />
      <Route exact path="/login" element={<Login showAlert = {showAlert}/>} />
      <Route exact path="/signup" element={<SignUp showAlert = {showAlert}/>} />
      </Routes> 
      </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
