import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WagmiConfig, createClient } from 'wagmi';
import { getDefaultProvider } from 'ethers';
import { FirebaseProvider } from './context/firebaseContext';
import { initializeApp } from 'firebase/app';

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

const firebaseConfig = {
  apiKey: "AIzaSyB7JD7K6oLarph-RGvi-NxuP67RFk3EA5c",
  authDomain: "dakers-c33c7.firebaseapp.com",
  projectId: "dakers-c33c7",
  storageBucket: "dakers-c33c7.appspot.com",
  messagingSenderId: "113448449935",
  appId: "1:113448449935:web:ec5ccb8119ac8c3cfebdfa"
};

// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <WagmiConfig client={client}>
    <React.StrictMode>
      <FirebaseProvider>
        <App/>
      </FirebaseProvider>
    </React.StrictMode>
  </WagmiConfig>
);
