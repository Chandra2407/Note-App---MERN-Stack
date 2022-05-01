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

function App() {
  return (
    <>
    <NoteState>
    <Router>
      <Navbar />
      <Alert message="deleted"/>
      <div className="main">
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/users" element={<Users />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      </Routes> 
      </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
