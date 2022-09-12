import { Field, Form, Formik } from 'formik'
import React from 'react'
import { sendEmail } from '../../lib/sendEmail'
import { TextInput } from '../form/TextInput'

export const Contact = () => {
  const handleSubmit = (v) => {
    console.log(v, 'v')
    if (v.email === undefined) {
      sendEmail({
        name: v.firstName + ' ' + v.lastName,
        email: v.customerEmail,
        date: new Date()
      })
    }
  }

  return (
    <div className="w-screen h-full">
      <div className="w-3/4 mx-auto">
        <h2>Send me a message:</h2>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            customerEmail: '',
            email: undefined
          }}
          onSubmit={(values) => handleSubmit(values)}
        >
          <Form className="flex flex-col card bg-secondary items-center my-10 p-10">
            <div className="w-2/3 flex flex-col items-center">
              <TextInput label={'First Name:'} field="firstName" />
              <TextInput label={'Last Name:'} field="lastName" />
              <TextInput label={'Email:'} field="customerEmail" />
              <input name="email" style={{ display: 'none' }} />
            </div>

            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
