import React from 'react';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../Firebase.init';
import useToken from '../../Hooks/useToken';
import Loading from '../../Shared/Loading';

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const [signInWithGithub, gitUser, gitLoading, gitError] = useSignInWithGithub(auth);
    
    
    const handleGoogleLogin=()=>{
        signInWithGoogle()
    }
    const handleGitLogin=()=>{
        signInWithGithub()
    }
    const location = useLocation()
      const navigate = useNavigate()
      let from = location.state?.from?.pathname || '/';
      const [token]=useToken(user || gitUser)
      if(token){
          navigate(from, { replace: true });
      }


      if(loading || gitLoading)
      {
          return <Loading></Loading>
      }
    return (
        <div>
            <div class="divider mt-0 text-xl text-neutral">Or Login With</div>
            <div className='text-center mt-5'>
            <button onClick={handleGoogleLogin} class="btn bg-[#DB4437] text-white mr-2">Google</button>
            <button  onClick={handleGitLogin} class="btn bg-[#333333] text-white mr-2">Git Hub</button>
            </div>
        </div>
    );
};

export default SocialLogin;