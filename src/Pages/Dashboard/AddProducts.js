import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddProducts = () => {
    const {register, handleSubmit,reset}=useForm()

    const handleAddProducts=(data)=>{
        console.log(data)
        const image=data.image[0];
        const formData=new FormData()
        formData.append('image',image)
   
        const url=`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imageKey}`
        console.log(url)
        fetch(url, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(result => {
                if (result.success) {
                    const imgUrl = result.data.url;
                    const product = {
                        name: data.name,
                        price: parseInt(data.price),
                        stock: parseInt(data.stock),
                        minOrder: parseInt(data.minOrder),
                        discripton: data.discripton,
                        image: imgUrl
                    }
                    console.log(product)
                    fetch('https://fierce-fjord-58610.herokuapp.com/product', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Beaarer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                toast.success('product add successfully added')
                                reset()
                            } else {
                                toast.error('Faild added product')
                                reset()
                            }
                        })
                }
            })
        }
    
    return (
        <div>
            <h2 className='text-4xl font-bold'>Add Products</h2>
            <div className="divider"></div>
            <form onSubmit={handleSubmit(handleAddProducts)} className='grid grid-cols-1 md:w-1/2 ' >
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Product Title</span>
                    </label>
                    <input {...register("name")} type="text"  className="input input-bordered w-full " />
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                <input type="number" {...register('price')} className="input input-bordered mb-3 w-full " />
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Minimum Order</span>
                    </label>
                    <input {...register("minOrder")} type="number" className="input input-bordered mb-3 w-full " />
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Stock</span>
                    </label>
                    <input {...register("stock")} type="number"  className="input input-bordered mb-3 w-full " />
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text"> Image</span>
                    </label>
                    <input {...register("image")} type="file" className="input input-bordered mb-3 w-full " />
                </div>

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Product Details</span>
                    </label>
                    <textarea {...register("discripton")}  className="textarea mb-2 w-full  textarea-bordered" ></textarea>
                </div>

                <button name='submit' className="btn mt-3 btn-accent text-white font-bold text-xl">Add Product </button>
            </form>
        </div>
    );
};

export default AddProducts;