import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div class="drawer drawer-mobile">
        <input id="dashboard-sidebar" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
           
            <Outlet></Outlet>
          {/* <!-- Page content here --> */}
        
        
        </div> 
        <div class="drawer-side">
          <label for="dashboard-sidebar" class="drawer-overlay"></label> 
          <ul class="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li><Link to={'/dashboard'}>My Orders</Link></li>
            <li><Link to={'/dashboard/review'}>Add A Review</Link></li>
            <li><Link to={'/dashboard/profile'}>My Profile</Link></li>
            <li><Link to={'/dashboard/addProduct'}>Add Products</Link></li>
            <li><Link to={'/dashboard/user'}>Users</Link></li>
            <li><Link to={'/dashboard/manageProduct'}>Manage Product</Link></li>
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