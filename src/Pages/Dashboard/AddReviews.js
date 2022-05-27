import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../Firebase.init';


const AddReviews = () => {
    const [user] = useAuthState(auth)
    const [rating, setRating] = useState(1)
    const [review, setReview] = useState('')

    const handleAddReview = () => {
        const userReview = {
            rating,
            review,
            userName: user.displayName
        }

        if (rating > 0 && review.length > 0) {
            fetch('https://fierce-fjord-58610.herokuapp.com/reivew', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Beeraar ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(userReview)

            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        toast.success('review added')
                        setReview(' ')
                    }
                })
        }
        else{
            toast.error('please check the all filed')
        }
    }



    return (
        <div>
            <h2 className='text-4xl px-3'>Add Review </h2>
            <div class="divider"></div>
            <div class="card w-full  md:w-1/2 bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Add Review</h2>

                    <div class="form-control w-full ">

                        <textarea onChange={(e) => setReview(e.target.value)} defaultValue={review} name='review' type="text" placeholder='Type here Your Review' class="textarea textarea-bordered " />
                    </div>

                    <div onChange={(e) => setRating(e.target.value)} class="rating">
                        <input type="radio" checked name="rating-2" value={'1'} class="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" value={'2'} class="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" value={'3'} class="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" value={'4'} class="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" value={'5'} class="mask mask-star-2 bg-orange-400" />
                    </div>

                    <div class="card-actions ">
                        <button onClick={handleAddReview} class="btn btn-primary text-white">Add</button>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default AddReviews;