import React, { useEffect, useState } from 'react';
import { useAuthState, useUpdatePassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../Firebase.init';
import editimg from '../../Assetes/icon/edit_icon.svg'
import swal from 'sweetalert';
import { useQuery } from 'react-query';
import { async } from '@firebase/util';


const MyProfile = () => {
    const { register, handleSubmit, reset } = useForm();
    const [user] = useAuthState(auth)
    const [edit, setEdit] = useState(false)
    const [updateProfile, updating, error] = useUpdateProfile(auth);
    const [updatePassword, Pupdating, Perror] = useUpdatePassword(auth);
    const { data: userDb } = useQuery(['userData', edit], () => fetch(`http://localhost:5000/user?email=${user.email}`, {
        headers: {
            authorization: `Beereer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))
  

    const handlePasswordUpdate=async data=>{
       
        const password=data.password;
        const confirmPassword=data.confirmPassword;
      
        reset()
        if(password===confirmPassword){

            await updatePassword(password);
            swal("password change Succssfully!", "!", "success", {
                button: "close!",
              });
        }else{
            swal("password dont match!", "!", "warning", {
                button: "close!",
              });
        }
    }

    const handleUpdateProfile = async (data) => {
        const userName = data.userName;
        const email = user?.email;
        const updateUser = {
            userName: userName,
            phone: data.phone,
            address: data.address
        }
        if (email && updateUser) {
            fetch(`http://localhost:5000/updateuser/${email}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    'authorization': `Beerer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(updateUser)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.result.modifiedCount > 0) {
                        reset()
                        swal("updated profile successfully done", "", "success", {
                            button: "close",
                        });
                        setEdit(false)
                    }
                    if (data.result.modifiedCount === 0) {
                        reset()
                        swal("Did not change inforamation ", "", "warning", {
                            button: "close",
                        });
                        setEdit(false)
                    }

                })
        }
        if (email && updateUser) {
            await updateProfile({ displayName: userName });

        }

       

    }

    return (
        <div className='lg:pr-5 lg:pl-2'>
            <h2 className='text-3xl my-3 text-orange-500'> My Profile</h2>
            <button onClick={() => setEdit(!edit)} class={`btn gap-2 ${edit ? 'btn-accent ' : 'btn-success text-white'}`}>
                <img className='w-8 h-8 ' src={editimg} alt="" />
                Edit profile
            </button>
            <div class="divider"></div>

            <form onSubmit={handleSubmit(handleUpdateProfile)} className='grid grid-cols-1 md:w-1/2 ' >
                <input {...register("userName")} type="text" defaultValue={user?.displayName} disabled={!edit} class="input input-bordered w-full " />
                <input type="text" value={user?.email} disabled class="input input-bordered mt-3 w-full " />

                <input {...register("phone")} type="text" defaultValue={userDb?.phone} disabled={!edit} placeholder='Enter your phone' class="input input-bordered mt-3 w-full " />
                <textarea {...register("address")} defaultValue={userDb?.address} disabled={!edit} class="textarea mt-3 w-full  textarea-bordered" placeholder="Address"></textarea>

                <button disabled={!edit} name='submit' class="btn mt-3 btn-accent text-white font-bold text-xl">Update Profile </button>
            </form>

            {/* here reset password  */}
            <div class="card w-96 bg-base-100 shadow-xl">
                <form onSubmit={handleSubmit(handlePasswordUpdate)} class="card-body">
                    <h2 class="card-title">Change Password</h2>
                    <input {...register('password')} type="password" placeholder=" password" class="input input-bordered w-full max-w-xs" />
                    <input {...register('confirmPassword')} type="password" placeholder="Confirm Password" class="input input-bordered w-full max-w-xs" />
                    <div class="card-actions justify-start">
                        <button class="btn btn-primary text-white">update Password</button>
                    </div>
                </form>
                {Perror?.message}
            </div>
        </div>
    );
};

export default MyProfile;