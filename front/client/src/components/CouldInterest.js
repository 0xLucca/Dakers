import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../context/firebaseContext';
import UserCard from './UserCard';

const CouldInterest = ({ filters }) => {
  const { allUsers, userInfo } = useContext(FirebaseContext);
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk4NEE1NjI2RDM5MURCMzU3M2JBRGNBOWVCMjY0ZjYxZTUxYzk5NkUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjMxMDE3NjcyMTMsIm5hbWUiOiJHb1ZpcmFsIn0.LDNFAC1Lj95LpsGYLod_Oc49ZTSOtYwocpfJMwzUkvA
  const [usersToShow, setusersToShow] = useState([]);
  const [areFilters, setareFilters] = useState(false);

  const handleUsersFilter = (filters) => {
    if (filters.type) {
      if (filters.type.length < 2) {
        const filteredByType = allUsers.filter(
          (t) => t.type === filters.type[0]
        );
        for (let i = 0; i < filters.categories.length; i++) {
          const filteredByCat = filteredByType.filter((c) =>
            c.categories.find((c) => c === filters.categories[i])
          );
          setusersToShow(...filteredByCat, filteredByCat);
        }
      } else if (filters.type.length === 2) {
        for (let i = 0; i < filters.categories.length; i++) {
          const filteredByCat = allUsers.filter((c) =>
            c.categories.find((cc) => cc === filters.categories[i])
          );
          setusersToShow(...filteredByCat, filteredByCat);
        }
      }
    }
  };

  useEffect(() => {
    filters.type && setareFilters(!areFilters);
    handleUsersFilter(filters);
  }, [filters]);

  useEffect(() => {
    console.log('new usersToShow: ', usersToShow);
  }, [usersToShow]);

  const title =
    userInfo.type === 'influencer' ? (
      <p className="mb-5 font-medium text-xl">
        Estas marcas podrian interesarte
      </p>
    ) : (
      <p className="mb-5 font-medium text-xl">
        Estos influencers podrian interesarte
      </p>
    );

  return (
    <div>
      {title}
      {areFilters &&
        usersToShow.length > 0 &&
        usersToShow.map((utw) => <UserCard user={utw} key={utw} />)}
      {areFilters && usersToShow.length === 0 && (
        <p>No se encontro nada :(, intenta de nuevo</p>
      )}
      {!areFilters && allUsers.map((utw) => <UserCard user={utw} key={utw} />)}
    </div>
  );
};

export default CouldInterest;
