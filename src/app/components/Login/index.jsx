/* eslint-disable no-nested-ternary */
// Dependencies
import React, { Fragment } from 'react'
import { Col, Row } from 'react-bootstrap'
// Components
import Logo from 'Components/Login/Logo'
import Form from 'Components/Login/Form'
import ForgotPwd from 'Components/Login/ForgotPwd'
import RecoveryPwd from 'Components/Login/RecoveryPwd'
// Styles
import styles from './Login.less'
// Flow Props and State
type Props = {
  form: Object,
  validate: string,
  handleChange: any,
  handleClick: any,
  handleModalLogin: any,
  handleChangeCodeVerify: any,
  validationObj: Object,
  modalLogin: boolean
}

function LoginForm(props: Props) {
  const {
    form,
    validate,
    handleChange,
    handleClick,
    handleModalLogin,
    handleChangeCodeVerify,
    validationObj,
    modalLogin
  } = props

  const login = (
    <Form
      form={form}
      validate={validate}
      handleChange={handleChange}
      handleClick={handleClick}
      styles={styles}
      handleModalLogin={handleModalLogin}
    />
  )

  const forgotPwd = (
    <ForgotPwd
      form={form}
      validate={validate}
      handleChange={handleChange}
      handleClick={handleClick}
      styles={styles}
      handleModalLogin={handleModalLogin}
    />
  )

  const recoveryPwd = (
    <RecoveryPwd
      form={form}
      validate={validate}
      handleChange={handleChange}
      handleClick={handleClick}
      styles={styles}
      handleModalLogin={handleModalLogin}
      handleChangeCodeVerify={handleChangeCodeVerify}
      validationObj={validationObj}
    />
  )

  return (
    <Fragment>
      <div className={styles.panel_Wrapper}>
        <Row>
          <Col>
            <Logo styles={styles} handleClick={handleClick} />
          </Col>
          <Col>
            {modalLogin === 1
              ? login
              : modalLogin === 2
              ? forgotPwd
              : recoveryPwd}
          </Col>
        </Row>
      </div>
    </Fragment>
  )
}

export default LoginForm
