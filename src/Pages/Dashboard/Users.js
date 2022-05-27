import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import UserRow from './UserRowUserRow';



const Users = () => {

    const { data: users, isLoading,refetch } = useQuery('users', () => fetch('https://fierce-fjord-58610.herokuapp.com/users',{
        method:'GET',
        headers:{
            authorization:`Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))


    if (isLoading) {
        return <Loading></Loading>
    }
   
    return (
        <div>
            <h2>this is user:{users?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
             
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           users.map((user,index)=><UserRow
                           key={user._id}
                           user={user}
                           refetch={refetch}
                           index={index}
                           ></UserRow>)
                       }
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;