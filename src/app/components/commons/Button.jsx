import React from 'react'
import { Button } from 'react-bootstrap'

// Flow Props
type Props = {
  variant: string,
  disabled: string,
  className: string,
  id: string,
  onClick: string,
  size: string,
  label: string,
  block: boolean
}

function ButtonInstance(props: Props) {
  const {
    variant,
    disabled,
    className,
    id,
    onClick,
    size,
    label,
    block
  } = props

  return (
    <Button
      variant={variant}
      disabled={disabled}
      className={className}
      id={id}
      size={size}
      // eslint-disable-next-line prettier/prettier
      onClick={onClick}
      block={block}
    >
      {label}
    </Button>
  )
}

export default ButtonInstance
