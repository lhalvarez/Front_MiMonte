import React, { Fragment } from 'react'
import CodeInput from 'react-code-input'

type Props = {
  handleChangeCodeVerify: void
}

const propsCodeInput = {
  className: 'reactCodeInput',
  name: 'codeVerify',
  inputStyle: {
    fontFamily: 'Roboto Condensed',
    margin: '2%',
    width: '16%',
    borderRadius: '0.25rem',
    fontSize: '28px',
    height: 'calc(2.25rem + 2px)',
    padding: '0.375rem 0.75rem',
    backgroundColor: 'white',
    color: '#8E2334',
    border: '1px solid #ced4da',
    textAlign: 'center',
    lineHeight: '1.5'
  }
}
function CodeVerify(props: Props) {
  const { handleChangeCodeVerify } = props
  return (
    <Fragment>
      <CodeInput
        type="number"
        fields={5}
        name="codeVerify"
        {...propsCodeInput}
        onChange={handleChangeCodeVerify}
      />
    </Fragment>
  )
}

export default CodeVerify
