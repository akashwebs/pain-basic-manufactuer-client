import React from 'react';
import swal from 'sweetalert';

const ManageOrder = ({ order, index, refetch }) => {

    const { _id, pandingStatus, img, productName, totalPrice, quantity, email, paid, name, address, phone, totalprice } = order

    const handleRemoveOrder = () => {

        swal({
            title: "Are you sure?",
            text: `Do you want delete? ${productName} file`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    fetch(`http://localhost:5000/orders/${email}`, {
                        method: 'DELETE',
                        headers: {
                            authorization: `beareer ${localStorage.getItem('accessToken')}`
                        }
                    }).then(res => res.json())
                        .then(data => {
                            console.log(data)
                            refetch()
                        })

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


    const handlePaid = () => {
        const pay = {
            pandingStatus: true,
            paid: true
        }
        console.log(pay)

        swal({
            title: "Are you sure?",
            text: `Do you want paid this? ${productName} file`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    console.log(pay)

                    fetch(`http://localhost:5000/orders/${_id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `beareer ${localStorage.getItem('accessToken')}`
                        }, body: JSON.stringify(pay)
                    }).then(res => res.json())
                        .then(data => {
                            console.log(data)
                            refetch()
                        })

                    swal(`${productName} file has been paid!`, {
                        icon: "success",
                    });
                    console.log('deleted')
                } else {
                    swal(" not pay yet");
                }
            });


    }

    const handlePanding = () => {

        const panding={
            pandingStatus:false
        }
        fetch(`http://localhost:5000/orders/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `beareer ${localStorage.getItem('accessToken')}`
            }, body: JSON.stringify(panding)
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                refetch()
            })

    }


    return (
        <tr>
            <th>{index + 1}</th>
            <td>{name}</td>
            <td>
                <img className='w-16 h-16' src={img} alt="" />
            </td>

            <td>{productName}</td>
            <td>{quantity}</td>
            <td>${totalPrice}</td>
            <td>{address}</td>
            <td>{phone}</td>
            <td>
                {paid ?
                    <button disabled className='btn bg-orange-400'>paid</button>
                    :
                    <button onClick={handlePaid} className='btn bg-orange-400'>Unpaid</button>

                }
                {pandingStatus && <div onClick={handlePanding} className="btn btn-accent ml-3">Panding</div>}
                {(paid && !pandingStatus) && <div disabled className="btn btn-accent ml-3">shipped</div>}

               {(!paid && !pandingStatus) && <button onClick={handleRemoveOrder} className='ml-2 btn bg-red-400'>delete</button>}
            </td>

        </tr>
    );
};

export default ManageOrder;