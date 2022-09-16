import React, { useContext, useEffect, useState } from 'react';
import CouldInterest from '../components/CouldInterest';
import Filters from '../components/Filters';
import { FirebaseContext } from '../context/firebaseContext';

const Dashboard = () => {
  const { user, userInfo, handleGetAllUsers } = useContext(FirebaseContext);

  const [filters, setfilters] = useState({});

  const handleFilters = (filters) => {
    console.log('filtros desde el Dashboard: ', filters);
    setfilters(filters);
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  return (
    <div className="bg-slate-50 h-screen font-poppins">
      <div className="w-10/12 md:w-8/12 m-auto">
        <p className="my-8 font-bold text-3xl">
          Hola de nuevo {userInfo.name}!
        </p>
        <div className="w-12/12 flex">
          <div className="w-3/12 pr-2 border-r-2 border-slate-300">
            <Filters handleFilters={handleFilters} />
          </div>
          <div className="w-9/12 pl-5">
            <CouldInterest filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
