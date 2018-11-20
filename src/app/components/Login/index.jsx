// Dependencies
import React, { Fragment } from 'react'
import Logo from 'Components/Login/Logo'
import Form from 'Components/Login/Form'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
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
      <div className="panel-wrapper">
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
