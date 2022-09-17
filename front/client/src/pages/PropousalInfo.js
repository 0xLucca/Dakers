import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { FirebaseContext } from '../context/firebaseContext';
import {MdOutlineKeyboardArrowLeft} from 'react-icons/md'
import { child, get, getDatabase, ref } from 'firebase/database';

const PropousalInfo = () => {
    let { id } = useParams();
    const {userInfo} = useContext(FirebaseContext);
    const [propousalInfo, setpropousalInfo] = useState(null)
    const database = getDatabase();
    const handlePropusalInfo = (id) => {
        const dbRef = ref(database);
        get(child(dbRef, `publications/`+id))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setpropousalInfo((snapshot.val()));
            } else {
              console.log('No data available');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    useEffect(() => {
        handlePropusalInfo(id)
    }, [id])
    return (
        <div>
            <div className='w-10/12 md:w-8/12 m-auto flex flex-col mb-8'>
                    <Link to='/' className='my-8 font-bold text-3xl'><MdOutlineKeyboardArrowLeft/></Link>
                <div>
                    {propousalInfo!==null && 
                    <>
                        <p className='mb-8 font-bold text-2xl'>{propousalInfo.title} de {propousalInfo.brandName}</p>
                        <p className='my-4 font-bold text-xl'>Descripcion:</p>
                        <p className='my-4 font-semibold'>{propousalInfo.desc}</p>
                        <p className='my-4 font-bold text-xl'>Pago:</p>
                        <p className='my-4 font-semibold'>{propousalInfo.format}</p>
                        <p className='my-4 font-bold text-xl'>Formato:</p>
                        <p className='my-4 font-semibold'>{propousalInfo.format}</p>
                        {
                            propousalInfo.format === 'video' &&
                            <>
                            <p className='my-4 font-bold text-xl'>Duracion:</p>
                            <p className='my-4 font-semibold'>{propousalInfo.duration} s</p>
                            </>
                        }
                        <p className='my-4 font-bold text-xl'>Para publicar en:</p>
                        {propousalInfo.socialMedias.map(sm=>
                            <p className='my-3 font-semibold' key={sm}>{sm}</p>
                            )}
                        {userInfo.type==='influencer' &&
                            <button className="mt-5 bg-green-500 text-slate-50 font-semibold w-full py-3 rounded transition duration-150 hover:bg-green-700">
                            <Link to={ `/acceptPropousal/${id}`}>Aceptar propuesta</Link>
                        </button>
                        }
                    </>
}

                </div>
            </div>
        </div>
    )
}

export default PropousalInfo
