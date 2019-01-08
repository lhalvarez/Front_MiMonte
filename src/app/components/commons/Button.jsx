import React from 'react'
import { Button } from 'react-bootstrap'

// Flow Props
type Props = {
  name: string,
  variant: string,
  disabled: string,
  className: string,
  id: string,
  onClick: string,
  size: string,
  label: string,
  block: boolean,
  icon: Object
}

function ButtonInstance(props: Props) {
  const {
    name,
    variant,
    disabled,
    className,
    id,
    onClick,
    size,
    label,
    block,
    icon
  } = props

  return (
    <Button
      name={name}
      variant={variant}
      disabled={disabled}
      className={className}
      id={id}
      size={size}
      // eslint-disable-next-line prettier/prettier
      onClick={onClick}
      block={block}
    >
      {icon && icon}
      &nbsp;
      {label}
    </Button>
  )
}

export default ButtonInstance
