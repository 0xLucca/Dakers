import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';

const Filters = ({ handleFilters }) => {
  return (
    <div>
      <p className="font-medium">Filtrar por</p>
      <Formik
        initialValues={{
          type: [],
          categories: [],
        }}
        validate={(values) => {
          const errors = {};

          if (values.type.length === 0) {
            errors.type = 'Por favor seleccione al menos un tipo';
          }
          if (values.categories.length === 0) {
            errors.categories = 'Por favor seleccione al menos una categoria';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleFilters(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="md:w-8/12 flex flex-col">
            <p className="font-medium my-2">Tipo</p>
            <div
              role="group"
              aria-labelledby="checkbox-group"
              className="flex flex-col"
            >
              <label className="">
                <Field
                  type="checkbox"
                  name="type"
                  value="influencer"
                  className="mr-1"
                />
                Influencer
              </label>
              <label className="">
                <Field
                  type="checkbox"
                  name="type"
                  value="brand"
                  className="mr-1"
                />
                Marca
              </label>
            </div>
            <p className="font-medium my-2">Categoria</p>
            <div
              role="group"
              aria-labelledby="checkbox-group"
              className="flex flex-col"
            >
              <label className="">
                <Field
                  type="checkbox"
                  name="categories"
                  value="sports"
                  className="mr-1"
                />
                deportes
              </label>
              <label className="">
                <Field
                  type="checkbox"
                  name="categories"
                  value="recipes"
                  className="mr-1"
                />
                cocina
              </label>
              <label className="">
                <Field
                  type="checkbox"
                  name="categories"
                  value="cars"
                  className="mr-1"
                />
                autos
              </label>
              <label className="">
                <Field
                  type="checkbox"
                  name="categories"
                  value="fashion"
                  className="mr-1"
                />
                moda
              </label>
              <label className="">
                <Field
                  type="checkbox"
                  name="categories"
                  value="travels"
                  className="mr-1"
                />
                viajes
              </label>
              <label className="">
                <Field
                  type="checkbox"
                  name="categories"
                  value="music"
                  className="mr-1"
                />
                musica
              </label>
            </div>
            <ErrorMessage
              name="type"
              component="div"
              className="text-red-400 text-sm my-1"
            />
            <ErrorMessage
              name="categories"
              component="div"
              className="text-red-400 text-sm my-1"
            />
            <button
              type="submit"
              className="mt-5 hover:text-green-500 transition duration-150"
            >
              aplicar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Filters;
