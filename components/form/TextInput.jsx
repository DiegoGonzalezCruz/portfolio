import { Field } from 'formik'
import React from 'react'

export const TextInput = ({ label, field }) => {
  return (
    <div className="flex flex-col gap-1 my-5">
      <label className="" htmlFor={field}>
        <h3>{label}</h3>
      </label>
      <Field
        id={field}
        name={field}
        placeholder="Jane"
        className="border-primary border-2 rounded-full p-2 w-full"
      />
    </div>
  )
}
