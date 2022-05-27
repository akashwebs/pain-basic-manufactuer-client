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
            <h2 className='text-4xl'>Add Review </h2>
            <div className="divider"></div>
            <div className="card w-1/2 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Add Review</h2>

                    <div className="form-control w-full ">

                        <textarea onChange={(e) => setReview(e.target.value)} defaultValue={review} name='review' type="text" placeholder='Type here Your Review' className="textarea textarea-bordered " />
                    </div>

                    <div onChange={(e) => setRating(e.target.value)} className="rating">
                        <input type="radio" checked name="rating-2" value={'1'} className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" value={'2'} className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" value={'3'} className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" value={'4'} className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" value={'5'} className="mask mask-star-2 bg-orange-400" />
                    </div>

                    <div className="card-actions ">
                        <button onClick={handleAddReview} className="btn btn-primary text-white">Add</button>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default AddReviews;