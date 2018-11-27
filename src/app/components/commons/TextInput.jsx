// Dependencies
import React from 'react'
import { Form } from 'react-bootstrap'
// Flow Props and State
type Props = {
  error: boolean,
  required: boolean,
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
  textInvalid: string,
  pattern: string,
  validity: boolean,
  uppercase: boolean,
  lowercase: boolean,
  disabled: boolean,
  number: boolean,
  handleBlur: any
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
    textInvalid,
    pattern,
    validity,
    uppercase,
    lowercase,
    disabled,
    number,
    handleBlur
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
    const evento = event
    const ival = evento.target.value
    if (number) {
      evento.target.value = ival.replace(
        /[A-Za-záéíóúÁÉÍÓÚÜüñÑ'_=/%&+ ¨ $@.\-¿?,:;&#()"¡!°|¬*~]/g,
        ''
      )
    }
    onChange(evento)
  }

  const bsPrefix = () => {
    if (uppercase) {
      return 'form-control text-uppercase'
    }
    if (lowercase) {
      return 'form-control text-lowercase'
    }
    return 'form-control'
  }

  return (
    <Form.Group>
      <Form.Label>
        {label}
        &nbsp;
      </Form.Label>
      <Form.Control
        name={name}
        value={value}
        placeholder={placeholder}
        pattern={pattern}
        type={type}
        required={required}
        maxLength={maxLength}
        minLength={minLength}
        min={min}
        max={max}
        isInvalid={validity || checkValidity()}
        onChange={handleChange}
        disabled={disabled}
        bsPrefix={bsPrefix()}
        onBlur={handleBlur}
      />
      <Form.Text className="text-muted">{text}</Form.Text>
      <Form.Control.Feedback type="invalid">
        {textInvalid || 'Este campo es requerido'}
      </Form.Control.Feedback>
    </Form.Group>
  )
}

export default TextInput
