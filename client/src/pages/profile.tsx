
import { useUserContext } from '@/contexts/User.Context';
import React from 'react';



const ProfilePage: React.FC = () => {

  const { user, loading } = useUserContext();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <div>Please log in to access this page.</div>;
  }

  return (
    <div>
      <h1>Your Profile</h1>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <img src={user.picture} alt={user.name} />
    </div>
  );
};

export default ProfilePage;
