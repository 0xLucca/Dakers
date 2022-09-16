import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAccount } from 'wagmi';
import Nav from './components/Nav';
import { FirebaseContext } from './context/firebaseContext';
import AcceptedProposals from './pages/AcceptedProposals';
import CreateProposals from './pages/CreateProposals';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
  const { address, isConnected } = useAccount();
  const { user, userInfo, handleFindExistsUser } = useContext(FirebaseContext);

  useEffect(() => {
    isConnected && user && handleFindExistsUser();
    console.log('userInfo: ',userInfo);
  }, [isConnected, user]);

  return (
    <BrowserRouter>
      <div className="font-poppins min-h-screen flex flex-col">
        <Nav />
        <Routes>
          {userInfo === null ? (
            <Route path="/" element={<Home />} />
          ) : (
            userInfo.type==='influencer'?
            <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/acceptedP" element={<AcceptedProposals />} />
            </>:
            <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/careateP" element={<CreateProposals />} />
            </>
          )}
          <Route path="/register/:type" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;