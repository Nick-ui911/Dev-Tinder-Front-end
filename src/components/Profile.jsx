import React from 'react'
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';

const Profile = () => {
   const user = useSelector((store) => store.user);
  return (
    <div className='my-16'>
      <EditProfile/>
   
    </div>
  )
}

export default Profile;
