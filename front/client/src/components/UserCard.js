import React from 'react';
import { AiOutlineComment } from 'react-icons/ai';

const UserCard = ({ user }) => {
  return (
    <div className="my-2 p-2 rounded border-2 border-slate-200 hover:shadow transition duration-150">
      <div className="flex">
        <div className="w-16 h-16 rounded-full bg-slate-200"></div>
        <div className="ml-5">
          <p className="text-lg font-semibold">
            {user.name} {user.lastName}
          </p>
          <div className="flex">
            {user.categories.map((c) => (
              <p className="font-medium mr-5" key={c}>
                {c}
              </p>
            ))}
          </div>
        </div>
        <div className="ml-auto flex">
          <div className="cursor-pointer flex text-lg w-8 h-8 border-2 rounded border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-slate-200  mx-1 my-auto">
            <AiOutlineComment className="m-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
