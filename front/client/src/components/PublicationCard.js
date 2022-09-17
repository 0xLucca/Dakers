import React, { useContext, useEffect, useState } from 'react';
import { HiArrowCircleRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../context/firebaseContext';

const PublicationCard = ({ ap }) => {
  const { activePublications,allUsers} = useContext(FirebaseContext);
  console.log('Ap: ',ap);

  const [brand, setbrand] = useState({})

  useEffect(() => {
    allUsers.lenght > 1 &&
    setbrand(allUsers.filter(u=>u.wallet===ap.wallet)[0])
  }, [])

  return (
    <div className="my-2 p-2 rounded border-2 border-slate-200 hover:shadow transition duration-150">
      <div className="flex">
        <div className="">
          <p className="text-lg font-semibold">
           {ap.brandName} / {ap.title}
          </p>
          <div className="flex font-medium">
            En: 
            {ap.socialMedias.map((c) => (
              <p className=" mx-2" key={c}>
                {c}
              </p>
            ))}
          </div>
        </div>
        <div className="ml-auto flex">
          <Link to={`/propusal/${ap.id}`} className='m-auto'>
            <div className="cursor-pointer flex text-lg w-8 h-8 border-2 rounded border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-slate-200  mx-1 my-auto">
              <p className='m-auto text-sm font-semibold'>
              ir
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicationCard;
