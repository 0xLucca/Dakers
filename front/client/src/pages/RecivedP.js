import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAccount } from 'wagmi';
import PRecivedCard from '../components/PRecivedCard'
import PropouseCard from '../components/PropouseCard';
import { FirebaseContext } from '../context/firebaseContext';

const RecivedP = () => {
    let { id } = useParams();

    const {activePublications} = useContext(FirebaseContext);

    const [thisP, setthisP] = useState(null);
    const [receivedPropousals, setreceivedPropousals] = useState([]);

    const handleThisPublication = (id) => {
        setthisP(activePublications.filter(p=>p.id===id))
    }

    const handlePReceived = () => {
        setreceivedPropousals(thisP.propousals);
      }

      useEffect(() => {
        handleThisPublication(id)
      }, [id])

      useEffect(() => {
        console.log(thisP);
      }, [thisP])

    return (
        <div className="bg-red-500 min-h-screen font-poppins">
           {thisP !== null && <p> las propuestas de {thisP[0].title} </p>}

           {thisP !== null && thisP[0].propousals.map(p=><PropouseCard p={p}/>)}


      </div>
    )
}

export default RecivedP
