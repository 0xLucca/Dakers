import { ErrorMessage, Field, Formik, Form } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { FirebaseContext } from '../context/firebaseContext';

const AcceptPropousal = () => {
    const {userInfo, handlePropoulsals} = useContext(FirebaseContext);
    let { id } = useParams();
    const { address } = useAccount();
    const [propousal, setpropousal] = useState(null)

    const generatePropousal = (values) => {
        setpropousal({
            id:id,
            fromWallet: address,
            fromName:userInfo.name,
            desc:values.desc
        })
    }

    useEffect(() => {
 propousal !== null && handlePropoulsals(propousal)
    }, [propousal])

    return (
        <div>
        <div className='w-10/12 md:w-8/12 m-auto'>
            <p className='my-8 font-bold text-3xl'>Crear publicacion de propuesta</p>
            <Formik
                initialValues={{
                desc: '',
                }}
                validate={(values) => {
                const errors = {};
                if (!values.desc) {
                    errors.desc = 'Por favor ingrese una descripcion';
                }
                return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    //console.log(values);
                    generatePropousal(values)
                }}
                >
                {({ isSubmitting }) => (
                <Form className="md:w-8/12 flex flex-col">
                    <p className='my-2 font-semibold text-xl'>Descripcion de la propuesta</p>
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
                    focus:border-green-500
                    focus:ring-0
                    "
                />
                    <ErrorMessage
                    name="desc"
                    component="div"
                    className="p-2 text-red-400"
                    />
                
                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className={
                        isSubmitting
                        ? 'mt-5 bg-slate-300 text-slate-500 font-semibold w-full py-3 rounded '
                        : 'mt-5 bg-green-500 text-slate-50 font-semibold w-full py-3 rounded transition duration-150 hover:bg-green-700'
                    }
                    >
                    Enviar propuesta
                    </button>
                </Form>
                )}
            </Formik>

        </div>
    </div>
    )
}

export default AcceptPropousal
