import React from 'react'
import { Link } from 'react-router-dom';

const PRecivedCard = ({p}) => {
    return (
        <div className="my-2 p-2 rounded border-2 border-slate-200 hover:shadow transition duration-150">
        <div className="flex">
          <div className="">
            <p className="text-lg font-semibold">
                {p.title}
            </p>
          </div>
          <div className="ml-auto flex">
            <Link to={`/recivedP/${p.id}`} className='m-auto'>
              <div className="cursor-pointer flex text-lg w-8 h-8 border-2 rounded border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-slate-200  mx-1 my-auto">
                <p className='m-auto text-sm font-semibold'>
                ir
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
}

export default PRecivedCard
