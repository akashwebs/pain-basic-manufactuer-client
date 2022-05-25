import React from 'react';
import swal from 'sweetalert';

const Order = ({order,index}) => {
    const {_id,img, productName, totalPrice,quantity,email}=order

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
                .then(data=>console.log(data))
                
              swal(`${productName} file has been deleted!`, {
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
            <td>
                <img className='w-16 h-16' src={img} alt="" />
            </td>

            <td>{productName}</td>
            <td>{quantity}</td>
            <td>${totalPrice}</td>
            <td>
                <button onClick={handleRemoveOrder} className='btn btn-orange-400'>Cancle</button>
                <div className="btn btn-accent ml-3">Pay</div>
            </td>

        </tr>

    );
};

export default Order;