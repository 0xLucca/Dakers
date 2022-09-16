import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../context/firebaseContext';

const CreateProposals = () => {
    const [disabledForm, setdisabledForm] = useState(false);
    const [publication, setpublication] = useState({});

    const { handleWritePublication, publicationFinished,setpublicationFinished } = useContext(FirebaseContext);
    
    useEffect(() => {
        publication.title && handleWritePublication(publication)
    }, [publication])

    const handlePublication=(values)=>{
        setpublication({
            title:values.title,
            desc:values.desc,
            minims:[values.req1,values.req2,values.req3],
            format:values.format,
            duration:values.duration,
            socialMedias:values.socialMedias

        })
    }

    return (
        <div>
            <div className='w-10/12 md:w-8/12 m-auto'>{
                publicationFinished ?
                <>
                <p className='my-8 font-bold text-3xl'>Se ha publicado tu pedido</p>
                <Link to={'/'}>
                    <button onClick={()=>{setpublicationFinished(!publicationFinished)}} className='mt-5 bg-blue-500 text-slate-50 font-semibold w-full py-3 rounded transition duration-150 hover:bg-blue-700'>Volver al inicio</button>
                </Link>
                </>
                :
                <>
                <p className='my-8 font-bold text-3xl'>Crear publicacion de propuesta</p>
                <Formik
        initialValues={{
          title: '',
          desc:'',
          format:'',
          duration:'',
          socialMedias: [],
          req1:'',
          req2:'',
          req3:'',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = 'Por favor ingrese el titulo de su publicacion';
          }
          if (!values.desc) {
            errors.desc = 'Por favor ingrese una descripcion';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
handlePublication(values)
console.log(values);
        }}
      >
        {({ isSubmitting,values }) => (
          <Form className="md:w-8/12 flex flex-col">
              <p className='my-2 font-semibold text-xl'>Titulo</p>
            <Field
              type="text"
              name="title"
              placeholder="Titulo de la publicacion"
              className="
              border-2 rounded 
              border-slate-300
              px-3 py-2 
              my-2
              focus:border-blue-500
              focus:ring-0
              "
            />
            <ErrorMessage
              name="title"
              component="div"
              className="p-2 text-red-400"
            />
            <p className='my-2 font-semibold text-xl'>Formato</p>
          <div role="group" aria-labelledby="my-radio-group">
            <label>
              <Field type="radio" name="format" value="video" />
              Video
            </label>
            <br/>
            <label>
              <Field type="radio" name="format" value="photo" />
              Foto
            </label>
          </div>
          {values.format==='video'&&
          <>
          <p className='my-2 font-semibold text-xl'>Tiempo en segundos</p>
            <Field
            type="number"
            name="duration"
            placeholder="Segundos"
            className="
            border-2 rounded 
            border-slate-300
            px-3 py-2 
            my-2
            focus:border-blue-500
            focus:ring-0
            "
            />
            <ErrorMessage
            name="duration"
            component="div"
            className="p-2 text-red-400"
            />
            </>
        }
        <p className='my-2 font-semibold text-xl'>Redes sociales destinadas</p>
        <div role="group" aria-labelledby="checkbox-group" className="flex flex-col">
              <label className="">
                <Field
                  type="checkbox"
                  name="socialMedias"
                  value="Instagram"
                  className="mr-2"
                  />
                  Instagram
              </label>
              <label className="">
                <Field
                  type="checkbox"
                  name="socialMedias"
                  value="Lens"
                  className="mr-2"
                  />
                  Lens
              </label>
              <label className="">
                <Field
                  type="checkbox"
                  name="socialMedias"
                  value="Twitter"
                  className="mr-2"
                  />
                  Twitter
              </label>
              <label className="">
                <Field
                  type="checkbox"
                  name="socialMedias"
                  value="Pinterest"
                  className="mr-2"
                  />
                  Pinterest
              </label>
              <label className="">
                <Field
                  type="checkbox"
                  name="socialMedias"
                  value="TikTok"
                  className="mr-2"
                  />
                  TikTok
              </label>
              </div>
            <p className='my-2 font-semibold text-xl'>Descripcion</p>
            <Field
            as="textarea"
            name='desc'
            placeholder="Descripcion"
            className="
            h-72
            border-2 rounded 
            border-slate-300
            px-3 py-2 
            my-2
            focus:border-blue-500
            focus:ring-0
            "
          />
            <ErrorMessage
              name="desc"
              component="div"
              className="p-2 text-red-400"
            />
            <p className='my-2 font-semibold text-xl'>Requisitos minimos</p>
            <Field
            type="text"
            name='req1'
            placeholder="Requisito"
            className="
            border-2 rounded 
            border-slate-300
            px-3 py-2 
            my-2
            focus:border-blue-500
            focus:ring-0
            "
          />
            <Field
            type="text"
            name='req2'
            placeholder="Requisito"
            className="
            border-2 rounded 
            border-slate-300
            px-3 py-2 
            my-2
            focus:border-blue-500
            focus:ring-0
            "
          />
            <Field
            type="text"
            name='req3'
            placeholder="Requisito"
            className="
            border-2 rounded 
            border-slate-300
            px-3 py-2 
            my-2
            focus:border-blue-500
            focus:ring-0
            "
          />
            <button
              type="submit"
              disabled={disabledForm || isSubmitting}
              className={
                disabledForm || isSubmitting
                  ? 'mt-5 bg-slate-300 text-slate-500 font-semibold w-full py-3 rounded '
                  : 'mt-5 bg-blue-500 text-slate-50 font-semibold w-full py-3 rounded transition duration-150 hover:bg-blue-700'
              }
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
      </>
      }
            </div>
        </div>
    )
}

export default CreateProposals
