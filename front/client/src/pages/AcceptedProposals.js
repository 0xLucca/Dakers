import React, { useContext, useEffect, useState } from 'react'
import { useConnect } from 'wagmi';
import { FirebaseContext } from '../context/firebaseContext';

const AcceptedProposals = () => {
const [publi, setpubli] = useState(null)
const [hash, sethash] = useState('https://ipfs.io/ipfs/bafkreifpv2clfgjdm6wcxqkujtelq7ik3nbqgazvw53mt4iyrf6y2bbxu4')

    const {activePublications} = useContext(FirebaseContext);
    const {address}=useConnect()

    const propuestasAceptadas = () => {
        //const p = 
        setpubli(activePublications.filter(p=>p.fromWallet===address&&p.accepted===true))
    }

    useEffect(() => {
        propuestasAceptadas()
    }, [])
    useEffect(() => {
        console.log(publi);
    }, [publi])

    return (
        <div>
            <div className='w-10/12 md:w-8/12 m-auto font-poppins'>
                <p className='my-8 font-bold text-3xl'>Propuestas aceptadas</p>
                {publi!==null&&
                <>
                <p className='font-bold'>{publi[0].title} de {publi[0].brandName}, fue aceptada</p> 
                <input type='text' className='w-72 border rounded mr-3' value='https://ipfs.io/ipfs/bafkreifpv2clfgjdm6wcxqkujtelq7ik3nbqgazvw53mt4iyrf6y2bbxu4' placeholder='https://ipfs.io/ipfs/bafkreifpv2clfgjdm6wcxqkujtelq7ik3nbqgazvw53mt4iyrf6y2bbxu4'  ></input>
                <button className='px-3 py-1.5 bg-green-500 font-bold text-slate-50 hover:bg-green-700 rounded'>
                    Subir
                </button>
                </>
                }
            </div>
        </div>
    )
}

export default AcceptedProposals
