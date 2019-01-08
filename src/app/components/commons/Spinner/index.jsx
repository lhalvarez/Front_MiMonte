// Dependencies
import React from 'react'
// Images
import puff from 'SharedImages/mimonte-animado.gif'
import Styles from './Spinner.less'

type Props = {
  loading: boolean
}

function Spinner(props: Props) {
  const { loading } = props
  const { divLoader, divLoaderHidden, loader } = Styles

  return (
    <div
      id="divLoader"
      className={`${divLoader} ${!loading ? divLoaderHidden : ''}`}
    >
      <div className={loader}>
        <img alt="loading" src={puff} />
        <h4>Cargando información...</h4>
      </div>
    </div>
  )
}

export default Spinner
