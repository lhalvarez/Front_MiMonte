// Dependencies
import React from 'react'
import Form from 'react-bootstrap/lib/Form'
// Flow Props and State
type Props = {
  error: boolean,
  required: string,
  onChange: any,
  label: string,
  name: string,
  value: string,
  placeholder: string,
  type: string,
  maxLength: number,
  minLength: number,
  text: string,
  min: string,
  max: string,
  textInvalid: string
}

function TextInput(props: Props) {
  const {
    error,
    required,
    onChange,
    label,
    name,
    value,
    placeholder,
    type,
    maxLength,
    minLength,
    text,
    min,
    max,
    textInvalid
  } = props

  const checkValidity = () => {
    if (
      error &&
      required &&
      (!value || (typeof value === 'string' && !value.trim()))
    ) {
      return true
    }
    if (error) {
      return true
    }
    return false
  }

  const checkTextInvalid = () => {
    if (textInvalid && textInvalid !== '') {
      return textInvalid
    }
    return 'Este campo es requerido'
  }

  const handleChange = (event: any) => {
    // TODO: Revisar que funcione ya que es props.onChange(event)
    onChange(event)
  }

  return (
    <Form validated={checkValidity()}>
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          name={name}
          value={value}
          placeholder={placeholder}
          type={type}
          required={required}
          maxLength={maxLength}
          minLength={minLength}
          onChange={handleChange}
          min={min}
          max={max}
        />
        <Form.Text className="text-muted">{text}</Form.Text>
        <Form.Control.Feedback type="invalid">
          {checkTextInvalid()}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  )
}

export default TextInput
