import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAccount } from 'wagmi';
import PRecivedCard from '../components/PRecivedCard'
import PropouseCard from '../components/PropouseCard';
import { FirebaseContext } from '../context/firebaseContext';

const RecivedP = () => {
    let { id } = useParams();

    const {activePublications,allUsers} = useContext(FirebaseContext);

    const [thisP, setthisP] = useState(null);
    const [from, setfrom] = useState(null);
    const [sendAprove, setsendAprove] = useState(null);

    const handleThisPublication = (id) => {
        setthisP(activePublications.filter(p=>p.id===id)[0])
    }

    useEffect(() => {
        handleThisPublication(id)
    }, [id])

    useEffect(() => {
        console.log(thisP);
    }, [thisP])


    return (
 
        <div className="min-h-screen font-poppins">
            <div>
                <div className='w-10/12 md:w-8/12 m-auto'>
                     {thisP !== null && 
                     <>
                     <p className='my-8 font-bold text-3xl'>Las propuestas de {thisP.title} </p>
                     <p className='font-bold text-xl'>{thisP.propousals.desc}</p>
                     <p className='font-bold text-xl'>Para publicar en:</p>
                      {thisP.socialMedias.map(sm=> <p className='font-bold text-xl'>{sm}</p>)}
                      </>
                     }
                    <div className='flex mt-5'>

                    <button className='px-4 py-1.5 bg-green-500 hover:bg-green-700 transition duration-150 font-semibold rounded text-slate-50' onClick={()=>{}}>aceptar</button>
                    <button className='mx-2 px-4 py-1.5 bg-red-500 hover:bg-red-700 transition duration-150 font-semibold rounded text-slate-50' onClick={()=>{}}>rechazar</button>
                    </div>
                </div>
            </div>
           {/*thisP !== null && thisP.propousals.map(p=><PropouseCard p={p}/>)*/}
      </div>
    )
}

export default RecivedP
