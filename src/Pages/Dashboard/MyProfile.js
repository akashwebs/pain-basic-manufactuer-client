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
    
    const { data: userDb } = useQuery(['userData', edit], () => fetch(`https://fierce-fjord-58610.herokuapp.com/user?email=${user.email}`, {
        headers: {
            authorization: `Beereer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))


    const handlePasswordUpdate = async data => {

        const password = data.password;
        const confirmPassword = data.confirmPassword;

        reset()
        if (password === confirmPassword) {

            await updatePassword(password);
            swal("password change Succssfully!", "!", "success", {
                button: "close!",
            });
        } else {
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
            address: data.address,
            education:data.education,
            linkedinUrl:data.linkedinUrl
        }
        if (email && updateUser) {
            fetch(`https://fierce-fjord-58610.herokuapp.com/updateuser/${email}`, {
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
            <h2 className='text-4xl my-3 '> My Profile</h2>
            <button onClick={() => setEdit(!edit)} className={`btn gap-2 ${edit ? 'btn-accent ' : 'btn-success text-white'}`}>
                <img className='w-8 h-8 ' src={editimg} alt="" />
                Edit profile
            </button>
            <div className="divider"></div>

            <form onSubmit={handleSubmit(handleUpdateProfile)} className='grid grid-cols-1 md:w-1/2 ' >
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input {...register("userName")} type="text" defaultValue={user?.displayName} disabled={!edit} className="input input-bordered w-full " />
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                <input type="text" value={user?.email} disabled className="input input-bordered mb-3 w-full " />
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Phone</span>
                    </label>
                    <input {...register("phone")} type="text" defaultValue={userDb?.phone} disabled={!edit} placeholder='Enter your phone' className="input input-bordered mb-3 w-full " />
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Linkdin profile</span>
                    </label>
                    <input {...register("linkedinUrl")} type="text" defaultValue={userDb?.linkedinUrl} disabled={!edit} placeholder='http://linkedin.com' className="input input-bordered mb-3 w-full " />
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text"> Education: ex: CSE/HSC/SSC</span>
                    </label>
                    <input {...register("education")} type="text" defaultValue={userDb?.education} disabled={!edit} placeholder='Education' className="input input-bordered mb-3 w-full " />
                </div>

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Your Adress</span>
                    </label>
                    <textarea {...register("address")} defaultValue={userDb?.address} disabled={!edit} className="textarea mb-2 w-full  textarea-bordered" placeholder="Address"></textarea>
                </div>

                <button disabled={!edit} name='submit' className="btn mt-3 btn-accent text-white font-bold text-xl">Update Profile </button>
            </form>

            {/* here reset password  */}
            <div className="card w-96 bg-base-100 shadow-xl">
                <form onSubmit={handleSubmit(handlePasswordUpdate)} className="card-body">
                    <h2 className="card-title">Change Password</h2>
                    <input {...register('password')} type="password" placeholder=" password" className="input input-bordered w-full max-w-xs" />
                    <input {...register('confirmPassword')} type="password" placeholder="Confirm Password" className="input input-bordered w-full max-w-xs" />
                    <div className="card-actions justify-start">
                        <button className="btn btn-primary text-white">update Password</button>
                    </div>
                </form>
                {Perror?.message}
            </div>
        </div>
    );
};

export default MyProfile;