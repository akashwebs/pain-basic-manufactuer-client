import React from 'react';
import { toast } from 'react-toastify';
import swal from 'sweetalert';

const UserRow = ({user,refetch,index}) => {
    const {email,role}=user;

    const handleMakeAdmin=()=>{
        fetch(`http://localhost:5000/user/admin/${email}`,{
            method:'PUT',
            headers:{
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=>{
            if(res.status===403){
                toast.error('Faild to make and admin')
            }
            return res.json()
        })
        .then(data=>{
          
            refetch()
           if(data.modifiedCount>0){
            toast.success('sucessfully made an admin')
           }
        })
        
    }




    const removeUser=()=>{
        
        swal({
            title: "Are you sure?",
            text: `Do you want delete?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                fetch(`http://localhost:5000/user/${email}`,{
                    method:'DELETE',
                    headers:{
                        authorization:`beareer ${localStorage.getItem('accessToken')}`
                    }
                }).then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    refetch()
                })
                
              swal(`file has been deleted!`, {
                icon: "success",
              });
              console.log('deleted')
            } else {
                swal("Your imaginary file is safe!");
                console.log('not ')
            }
          });
        

    }
    
    return (
            <tr>
                <th>{index+1}</th>
                <td>{email}</td>
                <td>{role !=='admin' && <button onClick={handleMakeAdmin} class="btn btn-xs">Make Admin</button>}</td>
                <td><button onClick={removeUser} class="btn btn-xs">Remove User</button></td>
            </tr>
        
    );
};

export default UserRow;