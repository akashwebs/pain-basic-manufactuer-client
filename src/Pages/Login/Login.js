import React from 'react';
import { Link } from 'react-router-dom';
import SocialLogin from './SocialLogin';

const Login = () => {
    return (
        <div class=" min-h-screen flex justify-center items-center bg-base-200">

            <div class=" w-full mt-[-150px] p-12  md:w-1/2 rounded-lg shadow-2xl bg-base-100">
                <div>
                    <h2 className='text-center text-5xl font-extrabold'>Paint Basic</h2>
                    <p className='text-center text-neutral'>Login into your account</p>
                </div>
                <form class="card-body">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input type="text" placeholder="email" class="input input-bordered" />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input type="text" placeholder="password" class="input input-bordered" />
                        <label class="label">
                            <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div class="form-control mt-6">
                        <button class="btn btn-primary">Login</button>
                    </div>
                </form>
            <SocialLogin></SocialLogin>
            <p className='text-neutral text-center mt-5'>Don't have an account? <Link className='text-accent' to={'/registar'}>Register</Link> </p>
            </div>
        </div>

    );
};

export default Login;