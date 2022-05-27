import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../Firebase.init';
import useAdmin from '../../Hooks/useAdmin';

const Dashboard = () => {
  const [user]=useAuthState(auth)
  const [admin]=useAdmin(user)
    return (
        <div className="drawer drawer-mobile">
        <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
           
            <Outlet></Outlet>
          {/* <!-- Page content here --> */}
        
        
        </div> 
        <div className="drawer-side">
          <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label> 
          <ul className="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li><Link to={'/dashboard'}>My Profile</Link></li>
            { !admin && <>
            <li><Link to={'/dashboard/myorder'}>My Orders</Link></li>
            <li><Link to={'/dashboard/review'}>Add A Review</Link></li>
            </>}
            { admin && <>
            <li><Link to={'/dashboard/addProduct'}>Add Products</Link></li>
            <li><Link to={'/dashboard/user'}>Users</Link></li>
            <li><Link to={'/dashboard/manageProduct'}>Manage Product</Link></li>
            <li><Link to={'/dashboard/manageAllOrder'}>Manage Orders</Link></li>
            </>}
            {/* { admin && <>
              <li><Link to={'/dashboard/users'}>My Users</Link></li>
              <li><Link to={'/dashboard/addDoctor'}>Add a Doctor</Link></li>
              <li><Link to={'/dashboard/managedoctor'}>Manage Doctor</Link></li>
            </>} */}
          </ul>
        
        </div>
      </div>
    );
};

export default Dashboard;