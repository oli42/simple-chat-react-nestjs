import Home from "./pages/Home";
import "./Style.scss";
import { BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes} from 'react-router';
import Login from './pages/Login';
import Register from "./pages/Register";


function App() {
 

  return (
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
      </Routes>
  );
}

export default App;
