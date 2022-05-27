import React from 'react';
import swal from 'sweetalert';

const ManageProductRow = ({product, index,refetch}) => {

    const {_id,name,image,price,minOrder,stock}=product;
    
   
 const handleRemoveProduct=()=>{
        
        swal({
            title: "Are you sure?",
            text: `Do you want delete? ${name} file`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                fetch(`https://fierce-fjord-58610.herokuapp.com/product/${_id}`,{
                    method:'DELETE',
                    headers:{
                        authorization:`beareer ${localStorage.getItem('accessToken')}`
                    }
                }).then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    refetch()
                })
                
              swal(`${name} file has been deleted!`, {
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
                <img className='w-16 h-16' src={image} alt="" />
            </td>

            <td>{name}</td>
            <td>{minOrder}</td>
            <td>${price}</td>
            <td>{stock}</td>
            <td>
                <button onClick={handleRemoveProduct} className='btn btn-orange-400'>Delete</button>
            </td>

        </tr>
    );
};

export default ManageProductRow;