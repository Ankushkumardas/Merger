
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/Layout/AuthLayout';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPAth';
import { UserContext } from '../../context/UserContext';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {updateUser}=useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return setError('Please verify your email.');
    }

    if (!password) {
      return setError('Please enter your password.');
    }

    setError('');

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
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
          <h2 className='text-[16px] mb-6'>Sign In</h2>
          <form onSubmit={handleSubmit} className='flex flex-col space-y-2 w-full px-4'>
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

            {error && <p className='text-red-500 text-xs pb-2'>{error}</p>}

            <button type='submit' className='px-2 py-1 mt-4 rounded-md bg-blue-400 text-white'>
              Sign In
            </button>

            <p className='mt-2 text-center text-sm'>
              Don't have an account?{' '}
              <Link to='/signup' className='text-blue-400'>
                Signup
              </Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
}

export default Login;
