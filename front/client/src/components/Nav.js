import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../context/firebaseContext";
import logo from '../assests/logo.png'

const Nav = () => {
  const { handlesignout, handleAuth, wallet,userInfo } = useContext(FirebaseContext);
  return (
    <div className="bg-slate-50 border border-b h-16 flex font-poppins font-medium">
      <div className="w-11/12 flex m-auto justify-between">
        <Link to={'/'} className='w-16 h-16'>
          <img src={logo} className='w-16 h-16'></img>
        </Link>
        {" "}
        {!wallet ? (
          <button
            onClick={() => handleAuth()}
            className="
          bg-green-500
          p-1.5
          px-3
          rounded
          text-slate-50
          hover:bg-green-700
          transition duration-150
          my-auto
          "
          >
            Ingresar con Metamask
          </button>
        ) : (
          <>
            <div className='my-auto'>
              {userInfo &&
              userInfo.type === 'brand'? (
                <>
              <Link to='/careateP'>
                <button
                  className="
                  py-1
                  px-3
                  mx-2
                  transition duration-150
                  hover:text-green-500
                  "
                  >
                  Crear propuesta
                </button>
              </Link>
              <Link to='/recivedPs'>
                <button
                  className="
                  py-1
                  px-3
                  mx-2
                  transition duration-150
                  hover:text-green-500
                  "
                  >
                  Propuestas recibidas
                </button>
              </Link>
              </>
              )
              :
              (
              <Link to='/acceptedP'>
                <button
                  className="
                  py-1
                  px-3
              mx-2
              transition duration-150
              hover:text-green-500
              "
              >
                  Propuestas aceptadas
                </button>
              </Link>)
                }
                <Link to='/'>
              <button
                onClick={handlesignout}
                className="
                bg-slate-300
                py-1
                px-3
                mx-2
                rounded
                transition duration-150
                hover:bg-slate-700
                hover:text-slate-50
                "
                >
                Salir
              </button>
                </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
