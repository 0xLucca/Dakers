import React from 'react';
import { Link } from 'react-router-dom';

const StartLike = () => {
  return (
    <div className="m-auto w-8/12 font-poppins">
      <p className="font-bold text-6xl lg:text-8xl">Comenzar como:</p>
      <br />
      <div className="w-8/12 md:w-5/12 flex justify-between font-semibold text-xl md:text-2xl mt-10">
        <Link
          className="hover:text-blue-500 transition duration-150"
          to={'/register/brand'}
        >
          MARCA
        </Link>
        <Link
          className="hover:text-blue-500 transition duration-150"
          to={'/register/influencer'}
        >
          INFLUENCER
        </Link>
      </div>
    </div>
  );
};

export default StartLike;
