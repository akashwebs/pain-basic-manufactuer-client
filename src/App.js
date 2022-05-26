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
import Users from './Pages/Dashboard/Users';
import ManageProducts from './Pages/Dashboard/ManageProducts';
import ManageAllOrders from './Pages/Dashboard/ManageAllOrders';
import RequireAdmin from './Hooks/RequireAdmin';
import Pyment from './Pages/Dashboard/Pyment';
import Footer from './Shared/Footer';
import NotFound from './Shared/NotFound';
import Blog from './Pages/Blog';
import MyPortfolio from './Pages/MyPortfolio';

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
          <Route path='pyment/:idName' element={<Pyment></Pyment>}></Route>
          <Route path='/dashboard/myorder' element={<MyOrder></MyOrder>}></Route>
          <Route path='review' element={<AddReviews></AddReviews>}></Route>
          <Route index  element={<MyProfile></MyProfile>}></Route>
          <Route path='addProduct' element={
             <RequireAdmin>
               <AddProducts></AddProducts>
             </RequireAdmin>
          }></Route>
          <Route path='user' element={
             <RequireAdmin>
               <Users></Users>
             </RequireAdmin>
          
          }></Route>
          <Route path='manageProduct' element={
            <RequireAdmin>
              <ManageProducts></ManageProducts>
            </RequireAdmin>

          }></Route>
          <Route path='manageAllOrder' element={
            <RequireAdmin>
              <ManageAllOrders></ManageAllOrders>
            </RequireAdmin>
          }></Route>
        </Route>
        <Route path='login' element={<Login></Login>}></Route>
        <Route path='registar' element={<SignUp></SignUp>}></Route>
        <Route path='forgotPassword' element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path='blog' element={<Blog></Blog>}></Route>
        <Route path='portfolio' element={<MyPortfolio></MyPortfolio>}></Route>
      
        <Route path='*' element={<NotFound></NotFound>}></Route>

      </Routes>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
