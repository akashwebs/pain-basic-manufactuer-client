import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../Firebase.init';
import Loading from '../../Shared/Loading';
import useToken from '../../Hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const location = useLocation()
    const navigate = useNavigate()
    let from = location.state?.from?.pathname || '/';
    
    const [token]=useToken(user)
    useEffect(() => {
        if(token){
            navigate(from, { replace: true });
          }
    }, [token])

    let errorMessage;
    if (error) {
        errorMessage = <p className='text-red-500'><small>{error?.message}</small></p>
    }
    
    if (loading) {
        return <Loading></Loading>
    }

    const handleLogin = data => {

        signInWithEmailAndPassword(data.email, data.password)

    }
    return (
        <div className=" flex justify-center pb-28 items-center bg-base-200">

            <div className=" w-full mt-20 p-12  md:w-1/2 rounded-lg shadow-2xl bg-base-100">
                <div>
                    <h2 className='text-center text-5xl font-extrabold'>Paint Basic</h2>
                    <p className='text-center text-neutral'>Login into your account</p>
                </div>
                <form onSubmit={handleSubmit(handleLogin)} className="card-body" >
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input 
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'email is required'
                            },
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message: 'invalid email'
                            }
                        })}
                         type="text" placeholder="email" className="input input-bordered" />
                         <label className="label">
                                {errors.email?.type === 'required' && <span className="text-red-500 label-text-alt">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="text-red-500 label-text-alt">{errors.email.message}</span>}


                            </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                         {...register("password", {
                            required: {
                                value: true,
                                message: 'password is required'
                            },
                            minLength: {
                                value: 6,
                                message: 'password should be 6 charecter or longer'
                            }
                        })}
                         type="password" placeholder="password" className="input input-bordered" />
                         <label className="label">
                                {errors.password?.type === 'minLength' && <span className="text-red-500 label-text-alt">{errors.password.message}</span>}
                                {errors.password?.type === 'required' && <span className="text-red-500 label-text-alt">{errors.password.message}</span>}

                            </label>
                         
                        <label className="label">
                            <Link to={'/forgotPassword'}  className="label-text-alt link link-hover">Forgot password?</Link>
                        </label>
                    </div>
                    {errorMessage}
                    <div className="form-control mt-6">
                        <button className="btn btn-primary text-white font-bold">Login</button>
                    </div>
                </form>
            <SocialLogin></SocialLogin>
            <p className='text-neutral text-center mt-5'>Don't have an account? <Link className='text-accent' to={'/registar'}>Register</Link> </p>
            </div>
        </div>

    );
};

export default Login;