
import React, { useContext, UseContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthLayout from '../../components/Layout/AuthLayout';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilephotoSelector from '../../components/Inputs/ProfilephotoSelector';
import { API_PATHS } from '../../utils/apiPAth';
import axiosInstance from '../../utils/axiosInstance';

import uploadImage from '../../utils/uploadImage';
import { UserContext } from '../../context/UserContext';

function Signup() {
  const [email, setEmail] = useState('');
  const [name, setname] = useState('');
  const [profilePic, setprofilePic] = useState(null);
  const [adminInviteToken, setadminInviteToken] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const {updateUser}=useContext(UserContext);

  const handleSubmit =async (e) => {
    e.preventDefault();
    let profileImageUrl='';

    if (!validateEmail(email)) {
      return setError('Please verify your email.');
    }
    if (!name) {
      return setError('Please enter your name.');
    }
    if (!password) {
      return setError('Please enter your password.');
    }

    setError('');
    // Proceed to login logic here...
   
    try {
      if(profilePic){
      const imgUploadRes=await uploadImage(profilePic);
      profileImageUrl=imgUploadRes.imageUrl||"";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name:name,
        email,
        password,
        adminInviteToken,
        profileImageUrl
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(response.data)
        navigate(role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2 className='bg-neutral-200/50 pt-4 px-6 text-[15px]'>Merger.</h2>
      <AuthLayout>
        <div className='bg-white flex justify-center items-center md:w-[400px] w-[350px] rounded-md py-4 flex-col'>
          <h2 className='text-[16px] mb-6'>Sign Up</h2>
          <form onSubmit={handleSubmit} className='flex flex-col space-y-2 w-full px-4'>
            <ProfilephotoSelector image={profilePic} setimage={setprofilePic}/>
            <Input
              label='Name'
              placeholder='Enter your Name'
              onChange={({ target }) => setname(target.value)}
              type='text'
              value={name}
            />
            <Input
              label='Email'
              placeholder='Enter your email'
              onChange={({ target }) => setEmail(target.value)}
              type='email'
              value={email}
            />
            <Input
              label='Password'
              placeholder='Enter your password'
              onChange={({ target }) => setPassword(target.value)}
              type='password'
              value={password}
            />
              <Input
              label='AdminToken'
              placeholder='Enter your Admin Invite Token'
              onChange={({ target }) => setadminInviteToken(target.value)}
              type='text'
              value={adminInviteToken}
            />

            {error && <p className='text-red-500 text-xs pb-2'>{error}</p>}

            <button type='submit' className='px-2 py-1 mt-4 rounded-md bg-blue-500 text-white'>
              Sign In
            </button>

            <p className='mt-2 text-center text-sm'>
              Alreday have an account?{' '}
              <Link to='/login' className='text-blue-400'>
                SignIn
              </Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
}

export default Signup;
