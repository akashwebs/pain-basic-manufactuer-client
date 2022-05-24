import logo from './logo.svg';
import './App.css';
import Header from './Shared/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Purchase from './Pages/Home/Purchase';
import Login from './Pages/Login/Login';

function App() {
  return (
    <div className="">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/products/:id' element={<Purchase></Purchase>}></Route>
        <Route path='login' element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
}

export default App;
