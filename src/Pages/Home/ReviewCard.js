import React from 'react';

const ReviewCard = ({ rivew }) => {


    const { userName, review, rating } = rivew;
    console.log('rating ', rating)
    return (
        <div className="card  bg-base-100 shadow-xl">
            <div className="avatar pt-5 pl-5">
                <div style={{'display':'flex'}} class="bg-neutral-focus flex justify-center items-center text-neutral-content rounded-full w-24">
                    <span class="text-3xl  ">
                        <p className='text-5xl text-white mt-[-10px]'>{userName.slice(0,1)}</p>
                    </span>
                </div>
            </div>

            <div className="card-body">

                <div className="rating">
                    <input type="radio" name="rating-2" checked={rating == 1 ? 'checked' : ''} className="mask mask-star-2 bg-orange-400" />
                    <input checked={rating == 2 ? 'checked' : ''} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    <input checked={rating == 3 ? 'checked' : ''} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    <input checked={rating == 4 ? 'checked' : ''} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    <input checked={rating == 5 ? 'checked' : ''} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                </div>
                <h2 className=" text-3xl font-bold ">{userName}</h2>
                <p>{review.slice(0, 150)}</p>

            </div>
        </div>
    );
};

export default ReviewCard;