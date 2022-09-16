import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken,
  signOut,
} from 'firebase/auth';
import { getDatabase, ref, set, onValue, child, get } from 'firebase/database';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { Web3Storage } from 'web3.storage';
import {shortid} from 'shortid'
// Construct with token and endpoint

export const FirebaseContext = createContext({});

export const FirebaseProvider = ({ children }) => {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const auth = getAuth();
  const database = getDatabase();
  //STATES
  const [user, setuser] = useState(null);
  const [wallet, setWallet] = useState('');
  const [existsUser, setexistsUser] = useState(false);
  const [userInfo, setuserInfo] = useState(null);
  const [registerFinished, setregisterFinished] = useState(false);
  const [publicationFinished, setpublicationFinished] = useState(false);
  const [allUsers, setallUsers] = useState([]);

  const handlesignout = async () => {
    signOut(auth);
    console.log("signOut");
  }

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });

    const userData = {
      data: {
        address: account,
        chain: chain.id,
      },
    };
    
    console.log("Requested message from Morallis"); 
    
    const {data} = await axios.post(
      "http://localhost:5001/dakers-c33c7/us-central1/requestMessage",
      userData,
      {
        headers:{
          "content-type": "application/json",
        }
      }
    )
    console.log("Received message from Moralis");

    const message = data.result.message;

    const signature = await signMessageAsync({message});

    const verification = {
      data: {
        message: message,
        signature: signature
      },
    }

    await axios.post(
      "http://localhost:5001/dakers-c33c7/us-central1/issueToken",
      verification,
      {
        headers:{
          "content-type": "application/json",
        }
      }
    ).then(async (res) => {
      try {
        await signInWithCustomToken(auth,res.data.result.token);
        console.log("Signature verified and received firabase token")
      } catch (e) {
        console.log(e);
      }
    })
  };

  const handleFindExistsUser = () => {
    const userInRef = ref(database, 'users/' + user.uid);
    onValue(userInRef, (snapshot) => {
      const data = snapshot.val();
      data !== null && setuserInfo(data);
    });
  };

  const handleExistUser = (type) => {
    const userRef = ref(database, 'users/' + type + '/' + user.uid);
    onValue(userRef, (snapshot) => {
      const data = snapshot.exists();
      setexistsUser(data);
      console.log('el usuario existe: ', data);
      //return data;
    });
  };

  const handleWriteUserData = (data) => {
    set(ref(database, 'users/' + user.uid), data)
      .then(() => {
        setregisterFinished(!registerFinished);
        console.log('New user in db');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleWritePublication = (data) => {
    const shortid = require('shortid');
    set(ref(database, 'publications/' +  user.uid + '/' + shortid.generate()), data)
      .then(() => {
        setpublicationFinished(!publicationFinished);
        console.log('New user in db');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGetAllUsers = () => {
    const dbRef = ref(database);
    get(child(dbRef, `users/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setallUsers(Object.values(snapshot.val()));
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user);
        setWallet(user.displayName);
      } else {
        setuser(null);
        setWallet('');
      }
    });
  }, [auth, wallet]);

  useEffect(() => {
    user === null && setuserInfo(null);
  }, [user]);

  //useEffect(() => {}, [user, wallet, existsUser]);

  const clientWeb3 = new Web3Storage({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk4NEE1NjI2RDM5MURCMzU3M2JBRGNBOWVCMjY0ZjYxZTUxYzk5NkUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjMxMDE3NjcyMTMsIm5hbWUiOiJHb1ZpcmFsIn0.LDNFAC1Lj95LpsGYLod_Oc49ZTSOtYwocpfJMwzUkvA',
  });

  const handleImageStorage = async (file, name) => {
    await clientWeb3.put(file, {
      name: name,
    });
  };

  const context = {
    user,
    wallet,
    existsUser,
    userInfo,
    registerFinished,
    allUsers,
    publicationFinished,
    handlesignout,
    handleAuth,
    handleExistUser,
    handleWriteUserData,
    handleFindExistsUser,
    handleGetAllUsers,
    handleImageStorage,
    handleWritePublication
  };

  return (
    <FirebaseContext.Provider value={context}>
      {children}
    </FirebaseContext.Provider>
  );
};
