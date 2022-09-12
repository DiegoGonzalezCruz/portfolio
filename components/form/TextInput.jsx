import { Field, useField, ErrorMessage } from 'formik'

const TextInput = ({ label, inline = false, ...props }) => {
  const [field, meta, helpers] = useField(props)

  return (
    <div className={`my-2 flex flex-col items-center justify-center}`}>
      <label className="" htmlFor={field.name}>
        <h3>{label}</h3>
      </label>
      <Field
        className={`border-primary border-2 rounded-full p-2 w-full form shadow-lg ${
          meta.touched && meta.error && 'invalid:border-red-500'
        }`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage
        component="div"
        className={'text-primary'}
        name={field.name}
      />
    </div>
  )
}

export default TextInput
