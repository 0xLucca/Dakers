import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FirebaseContext } from '../context/firebaseContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAccount } from 'wagmi';

const Register = () => {
  const [newUser, setNewUser] = useState(null);
  const [runRegister, setrunRegister] = useState(false);
  const [disabledForm, setdisabledForm] = useState(false);
  const [FieldValue, setFieldValue] = useState(null);

  const { type } = useParams();
  const {
    user,
    existsUser,
    registerFinished,
    handleWriteUserData,
    handleExistUser,
    handleImageStorage,
  } = useContext(FirebaseContext);

  const { address } = useAccount();

  const handleUser = (values) => {
    setNewUser({
      wallet: address,
      name: values.name,
      lastName: values.lastname,
      email: values.email,
      categories: values.categories,
      type: type,
    });
  };

  useEffect(() => {
    if (user !== null) {
      handleExistUser(type);
    }
  }, [user]);

  useEffect(() => {}, [existsUser]);

  useEffect(() => {
    if (user !== null && existsUser === true) {
      setdisabledForm(!disabledForm);
    }
  }, [user, existsUser]);

  useEffect(() => {
    if (
      user !== null &&
      existsUser !== true &&
      newUser !== null &&
      runRegister !== false
    ) {
      handleWriteUserData(newUser);
    }
  }, [runRegister]);

  useEffect(() => {
    console.log(FieldValue);
  }, [FieldValue]);

  return (
    <div className="w-8/12 m-auto font-poppins">
      <p className="font-semibold text-2xl md:text-4xl my-5">
        Registrarse como {type}
      </p>
      {user === null && (
        <p className="p-2 text-red-400">Por favor conecte su wallet</p>
      )}
      <Formik
        initialValues={{
          name: '',
          lastname: '',
          instagram: '',
          email: '',
          categories: [],
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Por favor ingrese su email';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Direccion de email invalida';
          }
          if (!values.name) {
            errors.name = 'Por favor ingrese su nombre';
          }
          if (!values.lastname) {
            errors.lastname = 'Por favor ingrese su apellido';
          }
          if (!values.instagram) {
            errors.instagram = 'Por favor ingrese su cuenta de Instagram';
          }
          if (values.categories.length === 0) {
            errors.categories = 'Por favor seleccione al menos una categoria';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleUser(values);
          setrunRegister(!runRegister);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="md:w-8/12 flex flex-col">
            <Field
              type="text"
              name="name"
              placeholder="Nombre"
              className="
              border-2 rounded 
              border-slate-300
              px-3 py-2 
              my-2
              focus:border-green-500
              focus:ring-0
              "
            />
            <ErrorMessage
              name="name"
              component="div"
              className="p-2 text-red-400"
            />
            {type==='brand' ? <></> : 
            <div className='flex flex-col'>
            <Field
              type="text"
              name="lastname"
              placeholder="Apellido"
              className="
              border-2 rounded 
              border-slate-300
              px-3 py-2 
              my-2
              focus:border-green-500
              focus:ring-0
              "
            />
            <ErrorMessage
              name="lastname"
              component="div"
              className="p-2 text-red-400"
            />
            </div>
          }
            <Field
              type="text"
              name="instagram"
              placeholder="Instagram"
              className="
              border-2 rounded 
              border-slate-300
              px-3 py-2 
              my-2
              focus:border-green-500
              focus:ring-0
              "
            />
            <ErrorMessage
              name="instagram"
              component="div"
              className="p-2 text-red-400"
            />
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="
              border-2 rounded 
              border-slate-300
              px-3 py-2 
              my-2
              focus:border-green-500
              focus:ring-0
              "
            />
            <ErrorMessage
              name="email"
              component="div"
              className="p-2 text-red-400"
            />
            <p className="font-semibold my-3">
              Selecciones la/las categorias de su contenido
            </p>
            <div role="group" aria-labelledby="checkbox-group" className="">
              <label className="float-left mr-5">
                deportes
                <Field
                  type="checkbox"
                  name="categories"
                  value="sports"
                  className="ml-2"
                />
              </label>
              <label className="float-left mr-5">
                cocina
                <Field
                  type="checkbox"
                  name="categories"
                  value="recipes"
                  className="ml-2"
                />
              </label>
              <label className="float-left mr-5">
                autos
                <Field
                  type="checkbox"
                  name="categories"
                  value="cars"
                  className="ml-2"
                />
              </label>
              <label className="float-left mr-5">
                moda
                <Field
                  type="checkbox"
                  name="categories"
                  value="fashion"
                  className="ml-2"
                />
              </label>
              <label className="float-left mr-5">
                viajes
                <Field
                  type="checkbox"
                  name="categories"
                  value="travels"
                  className="ml-2"
                />
              </label>
              <label className="float-left mr-5">
                musica
                <Field
                  type="checkbox"
                  name="categories"
                  value="music"
                  className="ml-2"
                />
              </label>
            </div>
            <ErrorMessage
              name="categories"
              component="div"
              className="p-2 text-red-400"
            />
            <button
              type="submit"
              disabled={disabledForm || isSubmitting || user === null}
              className={
                disabledForm || isSubmitting || user === null
                  ? 'mt-5 bg-slate-300 text-slate-500 font-semibold w-full py-3 rounded '
                  : 'mt-5 bg-green-500 text-slate-50 font-semibold w-full py-3 rounded transition duration-150 hover:bg-green-700'
              }
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
      {registerFinished && (
        <button className="mt-5 bg-green-500 text-slate-50 font-semibold w-full py-3 rounded transition duration-150 hover:bg-green-700">
          <Link to={'/'}>Continuar</Link>
        </button>
      )}
    </div>
  );
};

export default Register;
