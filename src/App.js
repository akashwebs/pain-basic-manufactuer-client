import logo from './logo.svg';
import './App.css';
import Header from './Shared/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Purchase from './Pages/Home/Purchase';
import Login from './Pages/Login/Login';
import SignUp from './Pages/Login/SignUp';
import RequireAuth from './Pages/Login/RequireAuth';
import { ToastContainer } from 'react-toastify';
import ForgotPassword from './Pages/Login/ForgotPassword';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyOrder from './Pages/Dashboard/MyOrder';
import AddReviews from './Pages/Dashboard/AddReviews';
import MyProfile from './Pages/Dashboard/MyProfile';
import AddProducts from './Pages/Dashboard/AddProducts';

function App() {
  return (
    <div className="">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/products/:id' element={
          <RequireAuth>
            <Purchase></Purchase>
          </RequireAuth>
        }></Route>
        <Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
          <Route index  element={<MyOrder></MyOrder>}></Route>
          <Route path='review' element={<AddReviews></AddReviews>}></Route>
          <Route path='profile' element={<MyProfile></MyProfile>}></Route>
          <Route path='addProduct' element={<AddProducts></AddProducts>}></Route>
        </Route>
        <Route  path='login' element={<Login></Login>}></Route>
        <Route path='registar' element={<SignUp></SignUp>}></Route>
        <Route path='forgotPassword' element={<ForgotPassword></ForgotPassword>}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
