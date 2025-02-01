'use client';

import useUsers from '@/app/hooks/queries/useUsers';

const Users = () => {
  const { data, isLoading } = useUsers();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col justify-center gap-4">
      {data &&
        data.map((user) => (
          <div key={user.id} className="flex items-center gap-2">
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))}
    </div>
  );
};

export default Users;
