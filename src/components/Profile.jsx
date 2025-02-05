import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addUser } from '../utils/UserSlice';
import { BASE_URL } from '../utils/constants';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const ProfileView = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        console.error("Error fetching profile", error);
      }
    }
  };

  useEffect(() => {
    if (!user) {
      ProfileView();
    }
  }, [user, dispatch]);

  return (
    <div className='flex justify-center items-center my-16'>
      <div className='w-96 p-6 shadow-lg rounded-2xl bg-white border border-gray-900'>
        <div className='text-center'>
          <img 
            className='mx-auto mb-4 w-24 h-24 rounded-full' 
            src={user?.PhotoUrl || 'https://via.placeholder.com/150'} 
            alt='Profile Picture' 
          />
          <h2 className='text-xl font-semibold text-gray-900 '>{user?.name || 'User Name'}</h2>
          <p className='text-gray-900 ' >{user?.email || 'user@example.com'}</p>
          <button 
            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600' 
            onClick={() => navigate('/profileEdit')}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
