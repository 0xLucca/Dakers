import React, { useContext } from 'react';
import { useAccount } from 'wagmi';
import ConnectWallet from '../components/ConnectWallet';
import StartLike from '../components/StartLike';
import { FirebaseContext } from '../context/firebaseContext';

const Home = () => {
  const { isConnected } = useAccount();
  const { user } = useContext(FirebaseContext);
  return isConnected && user !== null ? <StartLike /> : <ConnectWallet />;
};

export default Home;
