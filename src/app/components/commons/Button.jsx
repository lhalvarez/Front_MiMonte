import React from 'react'
import Button from 'react-bootstrap/lib/Button'

// Flow Props
type Props = {
  variant: string,
  disabled: string,
  className: string,
  onClick: string,
  size: string,
  label: string
}

function ButtonInstance(props: Props) {
  const { variant, disabled, className, onClick, size, label } = props

  return (
    <Button
      variant={variant}
      disabled={disabled}
      className={className}
      size={size}
      // eslint-disable-next-line prettier/prettier
      onClick={onClick}
    >
      {label}
    </Button>
  )
}

export default ButtonInstance
