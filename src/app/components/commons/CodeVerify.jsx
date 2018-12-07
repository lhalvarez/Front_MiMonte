import React from 'react'
import VerificationInput from 'react-verification-input'

type Props = {
  handleChangeCodeVerify: void
}

function CodeVerify(props: Props) {
  const { handleChangeCodeVerify } = props
  return (
    <VerificationInput
      removeDefaultStyles
      length={5}
      getInputRef={handleChangeCodeVerify}
      placeholder=" "
      validChars="0-9"
      container={{
        className: 'containerCodeVerify'
      }}
      characters={{
        className: 'charactersCodeVerify'
      }}
      character={{
        className: 'characterCodeVerify',
        classNameInactive: 'characterInactiveCodeVerify',
        classNameSelected: 'characterSelectedCodeVerify'
      }}
    />
  )
}

export default CodeVerify
