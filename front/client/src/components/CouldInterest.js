import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../context/firebaseContext';
import BrandCard from './BrandCard';
import PublicationCard from './PublicationCard';
import UserCard from './UserCard';

const CouldInterest = ({ filters }) => {
  const { allUsers, userInfo, activePublications } = useContext(FirebaseContext);

  const [usersToShow, setusersToShow] = useState([]);
  const [areFilters, setareFilters] = useState(false);
  const [brands, setbrands] = useState([]);


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
    setbrands(allUsers.filter(brand=>brand.type === 'brand'));
  }, [allUsers]);





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
        usersToShow.map((utw) => <PublicationCard user={utw} key={utw} />)}
      {areFilters && usersToShow.length === 0 && (
        <p>No se encontro nada, intenta de nuevo</p>
      )}
      {!areFilters && activePublications.map((ap) => <PublicationCard ap={ap} key={ap} />)}
    </div>
  );
};

export default CouldInterest;
