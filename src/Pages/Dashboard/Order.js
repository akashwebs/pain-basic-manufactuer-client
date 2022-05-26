import React from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const Order = ({order,index,refetch}) => {
    const {_id,img, productName, totalPrice,quantity,email,paid}=order

    const handleRemoveOrder=()=>{
        
        swal({
            title: "Are you sure?",
            text: `Do you want delete? ${productName} file`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                fetch(`http://localhost:5000/orders/${email}`,{
                    method:'DELETE',
                    headers:{
                        authorization:`beareer ${localStorage.getItem('accessToken')}`
                    }
                }).then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    refetch()
                })
                
              swal(`${productName} file has been deleted!`, {
                icon: "success",
              });
           
            } else {
                swal("Your imaginary file is safe!");
            
            }
          });
        

    }
    

    
    

    return (
        <tr>
            <th>{index+1}</th>
            <td>
                <img className='w-16 h-16' src={img} alt="" />
            </td>

            <td>{productName}</td>
            <td>{quantity}</td>
            <td>${totalPrice}</td>
            <td>
                {!paid && <button onClick={handleRemoveOrder} className='btn btn-orange-400'>Cancle</button>}

                {!paid? <Link 
                to={`/dashboard/pyment/${_id}`} className='bg-success px-4 py-2 text-white'>Pay</Link> : <Link className='bg-accent px-4 py-2 text-white'>paid</Link>}
            </td>

        </tr>

    );
};

export default Order;