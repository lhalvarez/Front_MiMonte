// Dependencies
import React from 'react'
// Images
import puff from 'SharedImages/puff.svg'
import Styles from './Spinner.less'

function Spinner() {
  const { background, loader } = Styles

  return (
    <div className={background}>
      <div className={loader}>
        <h4>
          Cargando información...
          <img alt="loading" src={puff} />
        </h4>
      </div>
    </div>
  )
}

export default Spinner
