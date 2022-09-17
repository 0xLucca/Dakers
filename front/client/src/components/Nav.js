import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../context/firebaseContext";

const Nav = () => {
  const { handlesignout, handleAuth, wallet,userInfo } = useContext(FirebaseContext);
  return (
    <div className="bg-slate-50 border border-b  h-14 flex font-poppins font-medium">
      <div className="w-11/12 flex m-auto justify-between">
        {" "}
        {!wallet ? (
          <button
            onClick={() => handleAuth()}
            className="
          bg-green-500
          py-1.5
          px-3
          rounded
          text-slate-50
          hover:bg-green-700
          transition duration-150
          "
          >
            Ingresar con Metamask
          </button>
        ) : (
          <>
            <div
              className="
              
              py-1
              "
              >
              {wallet.substring(0, 4) + "..." + wallet.substring(38, 42)}
            </div>
            <div>
              
              {userInfo&&
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
