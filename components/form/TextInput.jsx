import { Field, useField, ErrorMessage } from 'formik'

const TextInput = ({ label, inline = false, ...props }) => {
  const [field, meta, helpers] = useField(props)

  return (
    <div className={`my-2 flex 'flex-col'}`}>
      <label
        className="text-xl font-text font-bold text-primary"
        htmlFor={field.name}
      >
        {label}
      </label>
      <Field
        className={`form shadow-lg ${
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
