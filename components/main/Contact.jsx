import { Form, Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { sendEmail } from '../../lib/sendEmail'
import emailSent from '../../public/animations/email-sent.json'
import Lottie from 'lottie-react'
import * as Yup from 'yup'
import TextInput from '../form/TextInput'

export const Contact = () => {
  const validate = Yup.object({
    firstName: Yup.string()
      .max(150, 'Must be max 150 chars')
      .required('Required'),
    lastName: Yup.string()
      .max(150, 'Must be max 150 chars')
      .required('Required'),
    customerEmail: Yup.string()
      .email('Please review your email format')
      .required('Required')
  })

  const handleSubmit = (v) => {
    // console.log(v, 'v')
    toast.custom((v) => (
      <div className="den w-[50vh] h-[30vh] rounded-xl border border-primary bg-white my-auto flex flex-col items-center justify-center">
        <div className="w-3/4 h-full flex flex-col items-center justify-center">
          <p>Email Sent!</p>
          <Lottie animationData={emailSent} loop={true} />
        </div>
      </div>
    ))
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
          validationSchema={validate}
        >
          <Form className="flex flex-col card bg-secondary items-center my-10 p-10">
            <div className="w-2/3 flex flex-col items-center">
              <TextInput label="First Name" name="firstName" type="text" />
              <TextInput label="Last Name" name="lastName" type="text" />
              <TextInput label="Email:" name="customerEmail" type="email" />

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
