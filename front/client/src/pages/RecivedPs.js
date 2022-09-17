import React, { useContext, useEffect, useState } from 'react'
import { useAccount } from 'wagmi';
import PRecivedCard from '../components/PRecivedCard'
import { FirebaseContext } from '../context/firebaseContext';

const RecivedP = () => {
    const { address } = useAccount();
    const {activePublications} = useContext(FirebaseContext);
    const [receivedPropousals, setreceivedPropousals] = useState([]);

    const handlePReceived = (wallet) => {
        setreceivedPropousals(activePublications.filter(p=>p.wallet===wallet));
      }

    useEffect(() => {
        handlePReceived(address)
    }, [])

    return (
        <div className="bg-slate-50 min-h-screen font-poppins">
            <div className="w-10/12 md:w-8/12 m-auto">
                {receivedPropousals.length >= 1 &&
                receivedPropousals.map(p=>
                    <PRecivedCard p={p} />
                    )
                }
            </div>
      </div>
    )
}

export default RecivedP
