import React from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../Firebase.init';

const ForgotPassword = () => {

    const { register, formState: { errors }, handleSubmit,reset } = useForm();
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
        auth
      );
      if (sending) {
        return <p>Sending...</p>;
      }
    const handleResetPassowrd=async(data)=>{
        const email=data.email;
        await sendPasswordResetEmail(email);
          toast('Sent email');
          reset();
    }
    
    return (
        <div class=" min-h-screen flex justify-center items-center bg-base-200">

            <div class=" w-full mt-[-150px] p-12  md:w-1/2 rounded-lg shadow-2xl bg-base-100">
                <div>
                    <h2 className='text-center text-5xl font-extrabold'>Paint Basic</h2>
                    <p className='text-center text-neutral'>Login into your account</p>
                </div>
                <form onSubmit={handleSubmit(handleResetPassowrd)} class="card-body" >
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Your Email</span>
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
                   
                   
                    <div class="form-control mt-6">
                        <button class="btn bg-black text-white font-bold">Send Me Email</button>
                    </div>
                </form>
            
            <p className='text-neutral text-center mt-5'>Don't have an account? <Link className='text-accent' to={'/login'}>Login</Link> </p>
            </div>
        </div>
    );
};

export default ForgotPassword;