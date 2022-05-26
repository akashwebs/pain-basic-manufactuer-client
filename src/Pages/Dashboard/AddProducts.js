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
                    fetch('http://localhost:5000/product', {
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
                <div class="form-control w-full ">
                    <label class="label">
                        <span class="label-text">Product Title</span>
                    </label>
                    <input {...register("name")} type="text"  class="input input-bordered w-full " />
                </div>
                <div class="form-control w-full ">
                    <label class="label">
                        <span class="label-text">Price</span>
                    </label>
                <input type="number" {...register('price')} class="input input-bordered mb-3 w-full " />
                </div>
                <div class="form-control w-full ">
                    <label class="label">
                        <span class="label-text">Minimum Order</span>
                    </label>
                    <input {...register("minOrder")} type="number" class="input input-bordered mb-3 w-full " />
                </div>
                <div class="form-control w-full ">
                    <label class="label">
                        <span class="label-text">Stock</span>
                    </label>
                    <input {...register("stock")} type="number"  class="input input-bordered mb-3 w-full " />
                </div>
                <div class="form-control w-full ">
                    <label class="label">
                        <span class="label-text"> Image</span>
                    </label>
                    <input {...register("image")} type="file" class="input input-bordered mb-3 w-full " />
                </div>

                <div class="form-control w-full ">
                    <label class="label">
                        <span class="label-text">Product Details</span>
                    </label>
                    <textarea {...register("discripton")}  class="textarea mb-2 w-full  textarea-bordered" ></textarea>
                </div>

                <button name='submit' class="btn mt-3 btn-accent text-white font-bold text-xl">Add Product </button>
            </form>
        </div>
    );
};

export default AddProducts;