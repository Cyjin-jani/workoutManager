'use client';

import useUsers from '@/app/hooks/queries/useUsers';

const Users = () => {
  const { data, isLoading } = useUsers();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex gap-4 justify-center flex-col">
      {data &&
        data.map((user) => (
          <div key={user.id} className="flex gap-2 items-center">
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))}
    </div>
  );
};

export default Users;
