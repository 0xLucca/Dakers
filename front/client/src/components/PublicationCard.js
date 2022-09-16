import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import { FirebaseContext } from '../context/firebaseContext';

const PublicationCard = ({ ap }) => {
  const { activePublications,allUsers} = useContext(FirebaseContext);
  console.log(ap);

  const [brand, setbrand] = useState({})

  useEffect(() => {
    console.log(allUsers.filter(u=>u.wallet===ap.wallet))
  }, [ap])

  return (
    <div className="my-2 p-2 rounded border-2 border-slate-200 hover:shadow transition duration-150">
      <div className="flex">
        <div className="">
          <p className="text-lg font-semibold">
           {brand.name} / {ap.title}
          </p>
          <div className="flex">
            {ap.socialMedias.map((c) => (
              <p className="font-medium mr-5" key={c}>
                {c}
              </p>
            ))}
          </div>
        </div>
        <div className="ml-auto flex">
          <div className="cursor-pointer flex text-lg w-8 h-8 border-2 rounded border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-slate-200  mx-1 my-auto">
            
          </div>
        </div>
            </div>
    </div>
  );
};

export default PublicationCard;
