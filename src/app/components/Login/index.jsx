// Dependencies
import React, { Fragment } from 'react'
import { Col, Row } from 'react-bootstrap'
// Components
import Logo from 'Components/Login/Logo'
import Form from 'Components/Login/Form'
// Styles
import styles from './Login.less'
// Flow Props and State
type Props = {
  form: Object,
  validate: string,
  handleChange: any,
  handleClick: any
}

function LoginForm(props: Props) {
  const { form, validate, handleChange, handleClick } = props

  return (
    <Fragment>
      <div className={styles.panel_Wrapper}>
        <Row>
          <Col>
            <Logo styles={styles} handleClick={handleClick} />
          </Col>
          <Col>
            <Form
              form={form}
              validate={validate}
              handleChange={handleChange}
              handleClick={handleClick}
              styles={styles}
            />
          </Col>
        </Row>
      </div>
    </Fragment>
  )
}

export default LoginForm
