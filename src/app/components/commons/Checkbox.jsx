// Dependencies
import React from 'react'
import Form from 'react-bootstrap/lib/Form'
// Flow Props and State
type Props = {
  error: boolean,
  required: string,
  onChange: any,
  label: string,
  id: string,
  name: string,
  value: string,
  type: string,
  textInvalid: string,
  validity: boolean,
  classLabel: string
}

function Checkbox(props: Props) {
  const {
    error,
    required,
    onChange,
    label,
    id,
    name,
    value,
    type,
    textInvalid,
    validity,
    classLabel
  } = props

  const checkValidity = () => {
    if (
      error &&
      required &&
      (!value || (typeof value === 'string' && !value.trim()))
    ) {
      return true
    }
    return false
  }

  const handleChange = (event: any) => {
    // TODO: Revisar que funcione ya que es props.onChange(event)
    onChange(event)
  }

  return (
    <Form.Check id={id} type={type} custom>
      <Form.Check.Input
        inline
        value={value}
        name={name}
        required={required}
        error={error}
        isInvalid={validity || checkValidity()}
        onChange={handleChange}
      />
      <Form.Check.Label className={classLabel}>{label}</Form.Check.Label>
      <Form.Control.Feedback type="invalid">
        {textInvalid || 'Este campo es requerido'}
      </Form.Control.Feedback>
    </Form.Check>
  )
}

export default Checkbox
