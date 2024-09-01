import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RequireAuth from './pages/RequireAuth';
import NewItem from './pages/NewItem';
import EditItem from './pages/EditItem';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />

        <Route element={<RequireAuth />} >
          <Route path="/" exact element={<Home />} />
          <Route path="/createitem" exact element={<NewItem />} />
          <Route path="/edit/:id" exact element={<EditItem />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
