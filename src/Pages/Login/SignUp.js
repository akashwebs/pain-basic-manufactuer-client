import React from 'react';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../Firebase.init';
import useToken from '../../Hooks/useToken';
import Loading from '../../Shared/Loading';
import SocialLogin from './SocialLogin';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
      const [updateProfile, updating] = useUpdateProfile(auth);
      const [sendEmailVerification, sending, Verifyerror] = useSendEmailVerification(
        auth
      );
      const location = useLocation()
      const navigate = useNavigate()
      let from = location.state?.from?.pathname || '/';

      const [token]=useToken(user)
      
      if(token){
          navigate(from, { replace: true });
          toast.success('send email verificaiton in your email')
          console.log(user)

      }
    const handleSignup =async data => {
        await createUserWithEmailAndPassword(data.email, data.password)
        await updateProfile({ displayName:data.name });
        await sendEmailVerification();
        
    }

    let errorMessage;
    if(error){
        errorMessage=<p className='text-red-500'><small>{error?.message}</small></p>
    }
    
    if(loading  || updating){
        return <Loading></Loading>
    }
    
    
    return (
        <div class="  flex justify-center pb-12 items-center bg-base-200">

        <div class=" w-full mt-12 p-12  md:w-1/2 rounded-lg shadow-2xl bg-base-100">
            <div>
                <h2 className='text-center text-5xl font-extrabold'>Paint Basic</h2>
                <p className='text-center text-neutral'>Register for create an account</p>
            </div>
            <form onSubmit={handleSubmit(handleSignup)} class="card-body" >
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Your Name</span>
                    </label>
                    <input 
                     {...register("name", {
                        required:{
                        value: true,
                        message: 'name is required'
                        }
                        
                    })}
                     type="text" placeholder="Name" class="input input-bordered" />
                     <label className="label">
                     {errors.name?.type === 'required' && <span className="text-red-500 label-text-alt">{errors.name.message}</span> }


                        </label>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Email</span>
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
                     type="text" placeholder="email" class="input input-bordered" />
                     <label className="label">
                            {errors.email?.type === 'required' && <span className="text-red-500 label-text-alt">{errors.email.message}</span>}
                            {errors.email?.type === 'pattern' && <span className="text-red-500 label-text-alt">{errors.email.message}</span>}


                        </label>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Password</span>
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
                     type="password" placeholder="password" class="input input-bordered" />
                     <label className="label">
                            {errors.password?.type === 'minLength' && <span className="text-red-500 label-text-alt">{errors.password.message}</span>}
                            {errors.password?.type === 'required' && <span className="text-red-500 label-text-alt">{errors.password.message}</span>}

                        </label>
                     
                
                </div>
                {errorMessage}
                <div class="form-control mt-6">
                    <button class="btn btn-primary text-white font-bold">Login</button>
                </div>
            </form>
        <SocialLogin></SocialLogin>
        <p className='text-neutral text-center mt-5'>Already have an account? <Link className='text-accent' to={'/login'}>Log in</Link> </p>
        </div>
    </div>
    );
};

export default SignUp;