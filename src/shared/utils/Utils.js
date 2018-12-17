//! Reparar errores de eslint
/* eslint-disable */
import {
  each,
  filter,
  findWhere,
  indexOf,
  isArray,
  isEqual,
  map,
  omit,
  sortBy,
  groupBy,
  union,
  where,
  without,
  uniq,
  isMatch
} from 'underscore'

import React from 'react'

import { Row, Col } from 'react-bootstrap'

import succesImage from 'SharedImages/ico-exito.svg'
import errorImage from 'SharedImages/ico-error.svg'
import questionImage from 'SharedImages/ico-pregunta.svg'
import warningImage from 'SharedImages/ico-warning.svg'

import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')

const styles = {
  msg: {
    icon: { margin: '0 0 4vh 0' }
  }
}

const uuidv4 = require('uuid/v4')

export const infoMessage = message => {
  const modalObj = {
    body: (
      <div>
        <i style={styles.msg.icon} className="fa fa-envelope fa-3x" />
        <p>{message}</p>
      </div>
    )
  }
  return modalObj
}

export const uniqArray = (list, item) => uniq(list, item)

export const groupedBy = (list, item) =>
  map(groupBy(list, item), clist => clist.map(i => omit(i, item)))

export const isValidEmail = mail =>
  /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(mail)

export const isValidRFC = rfc =>
  /^([A-ZÑ]{3}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z\d][A-Z\d][A-Z\d]))$/.test(
    rfc
  )

export const getItems = (list, item) => where(list, item)

export const removeItem = (list, item) => {
  const elements = where(list, item)

  if (elements && elements.length > 0) {
    let listElements = list

    elements.map(item => {
      listElements = without(listElements, item)
    })

    return listElements
  }
  return list
}

export const removeItemByPositions = (list, ini, end) =>
  list.filter((item, index) => {
    if (index < ini || index > end) return item
  })

export const cleanPositionInArray = (list, ini, end, key, value) => {
  const newList = list.map(a => Object.assign({}, a))

  return newList.map((item, index) => {
    if (index >= ini && index <= end) {
      item[key] = value
      return item
    }
    return item
  })
}

export const filterItem = (list, item) =>
  filter(list, value => value.cp.includes(item.cp))

export const unionArray = (list1, list2) => union(list1, list2)

export const getUUID = () => uuidv4()

export const isChange = (object, other) => isEqual(object, other)

export const sortByAttr = (list, attr) => sortBy(list, attr)

export const containsItem = (list, item) => !!findWhere(list, item)

export const getItem = (list, item) => findWhere(list, item)

export const indexOfItem = (list, item) => indexOf(list, item)

export const getListPropsOmit = (list, props) =>
  map(list, o => {
    if (o.tmp || o.custom || o.id) {
      return omit(o, props)
    }
    return o
  })

export const getObjPropsRemove = (obj, props) => omit(obj, props)

export const replaceObject = (list, item, newItem) =>
  map(list, o => {
    if (isMatch(o, item)) {
      return newItem
    }
    return o
  })

export const getMessageResponse = response => {
  let message = 'Error'

  if (response.message) {
    message = response.message
  } else if (response.descripcionError) {
    message = response.descripcionError
  } else if (response.errorMessage) {
    message = response.errorMessage
  }

  return message
}

export const questionMessage = (message, okClick, cancelClick) => {
  const modalObj = {
    body: (
      <Row>
        <Col xs={4} className="text-center">
          <img src={questionImage} alt="" className="img-fluid" />
        </Col>
        <Col xs={8} className="mediaBody text-left align-self-center">
          <p>{message}</p>
        </Col>
      </Row>
    ),
    footer: [
      { label: 'SALIR', variant: 'info', onClick: okClick },
      { label: 'CANCELAR', variant: 'primary', onClick: cancelClick }
    ]
  }

  return modalObj
}

export const warningMessage = message => {
  const modalObj = {
    title: 'Atención',
    body: (
      <Row>
        <Col xs={4} className="text-center">
          <img src={warningImage} alt="" className="img-fluid" />
        </Col>
        <Col xs={8} className="mediaBody text-left align-self-center">
          <p>{message}</p>
        </Col>
      </Row>
    )
  }
  return modalObj
}

export const showMessage = message => {
  const modalObj = {
    closeButton: true,
    body: (
      <Row>
        <Col xs={4} className="text-center">
          <img src={succesImage} alt="" className="img-fluid" />
        </Col>
        <Col xs={8} className="mediaBody text-left align-self-center">
          <p>{message}</p>
        </Col>
      </Row>
    )
  }

  return modalObj
}

export const customMessage = (title, body, message, closeButton, footer) => {
  const modalObj = {
    closeButton,
    title,
    body: body ? body : <p>{message}</p>,
    footer
  }

  return modalObj
}

export const errorMessage = (title, message) => {
  const modalObj = {
    title: title !== '' || title == undefined ? title : 'Error en el Proceso',
    body: (
      <Row>
        <Col xs={4} className="text-center align-content-end">
          <img src={errorImage} alt="" className="img-fluid" />
        </Col>
        <Col xs={8} className="mediaBody text-left align-self-center">
          <p>{message}</p>
        </Col>
      </Row>
    )
  }

  return modalObj
}

export const successMessage = () => {
  const modalObj = {
    title: 'Proceso Exitoso',
    body: (
      <Row>
        <Col xs={4} className="text-center">
          <img src={succesImage} alt="" className="img-fluid" />
        </Col>
        <Col xs={8} className="mediaBody text-left align-self-center">
          <p>Accion realizada con éxito</p>
        </Col>
      </Row>
    )
  }

  return modalObj
}

export const clearNullAndEmpty = jsonObj => {
  each(jsonObj, (value, key) => {
    if (value === '' || value === null) {
      delete jsonObj[key]
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      clearNullAndEmpty(value)
    } else if (isArray(value)) {
      each(value, (k, v) => {
        clearNullAndEmpty(v)
      })
    }
  })
}

export const isNullOrEmpty = jsonObj => {
  let result = false

  each(jsonObj, value => {
    if (value === '' || value === null) {
      result = true
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      isNullOrEmpty(value)
    } else if (isArray(value)) {
      each(value, (k, v) => {
        isNullOrEmpty(v)
      })
    }
  })

  return result
}

export const setDefaultValues = object => {
  const jsonObj = Object.assign({}, object)

  each(jsonObj, (value, key) => {
    if (typeof value === 'string') {
      jsonObj[key] = ''
    } else if (typeof value === 'number') {
      jsonObj[key] = ''
    } else if (typeof value === 'boolean') {
      jsonObj[key] = false
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      clearNullAndEmpty(value)
    } else if (isArray(value)) {
      jsonObj[key] = []
    }
  })

  return jsonObj
}

export const capitalize = cadena => {
  return cadena.charAt(0).toUpperCase() + cadena.slice(1)
}

export const isBefore = (date1, date2) => moment(date1).isBefore(date2)

export const isAfter = (date1, date2) => moment(date1).isAfter(date2)

export const formatDate = (date, format = 'YYYY-MM-DD') =>
  moment(new Date(date).toISOString()).format(format)

export const isEmpty = prop =>
  prop === null ||
  prop === undefined ||
  (prop.hasOwnProperty('length') && prop.length === 0) ||
  (prop.constructor === Object && Object.keys(prop).length === 0)

export const getSum = (arr = [], attr) =>
  arr.reduce((a, b) => +a + +parseFloat(b[attr]), 0)

export const getToday = () => {
  let today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1
  const yyyy = today.getFullYear()

  if (dd < 10) dd = `0${dd}`
  if (mm < 10) mm = `0${mm}`

  today = `${mm}/${dd}/${yyyy}`
  return today
}

export const disabledConfig = (etapa, subEtapa, perfil, esActualizacion) => {
  if (!perfil) perfil = -1

  const ETAPA = {
    REGISTRO: 1,
    INFORMACION: 2,
    SOLICITUD: 3
  }

  const SUBETAPA = {
    R_DONATARIA: 1,
    R_EJ_RECURSOS: 2,
    R_COMENTARIOS: 3,
    R_ABOGADO: 4,
    R_APROBADO: 5,
    R_RECHAZADO: 6,
    I_EJ_RECURSOS: 7,
    I_INICIO: 1,
    I_DONATARIA: 8,
    I_EJ_INVERSION: 9,
    I_ABOGADO: 10,
    I_APROBADO: 11,
    S_DONATARIA: 1,
    S_EJ_INVERSION: 12,
    S_APROBADO: 13,
    S_RECHAZADO: 14,
    S_SOLICITUD: 37,
    S_COMENTARIOS_REGISTRO: 40,
    S_COMENTARIOS_INFORMACION: 41
  }

  const PERFIL = {
    DONATARIA: -1,
    RECURSOS: 1,
    INVERSION: 2,
    JURIDICO: 3
  }

  switch (etapa) {
    case ETAPA.REGISTRO:
      switch (subEtapa) {
        case SUBETAPA.R_DONATARIA:
        case SUBETAPA.R_COMENTARIOS:
          switch (perfil) {
            case PERFIL.DONATARIA:
              return { all: false }
            default:
              return { all: true }
          }
        case SUBETAPA.R_EJ_RECURSOS:
          switch (perfil) {
            case PERFIL.RECURSOS:
              return { GeneralInfo: { granteeName: true } }
            default:
              return { all: true }
          }
        case SUBETAPA.R_ABOGADO:
          switch (perfil) {
            case PERFIL.JURIDICO:
              return {
                all: true,
                GeneralInfo: {
                  all: true,
                  constitutionDate: true,
                  operationsDate: true,
                  jap: true,
                  iap: true,
                  socialIntervention: true,
                  submitButton: true
                },
                PatronsCouncelors: {
                  all: true,
                  email: true
                },
                Documents: {
                  all: true
                },
                CompanyCharter: {
                  all: true
                },
                LegalRepresentation: {
                  all: true
                }
              }
            default:
              return { all: true }
          }
        case SUBETAPA.R_APROBADO:
        case SUBETAPA.R_RECHAZADO:
        default:
          return { all: true }
      }
    case ETAPA.INFORMACION:
      switch (subEtapa) {
        case SUBETAPA.I_EJ_INVERSION:
          switch (perfil) {
            case PERFIL.INVERSION:
              return {
                ActivePassiveTable: { all: true },
                AdditionalInfo: { all: false },
                Contacts: { all: false },
                DocumentsInfo: { all: false },
                Fiscal: { all: true },
                Financial: { all: true },
                IncomeExpensesTable: { all: true },
                Locations: { all: false },
                Objectives: { all: false },
                Population: { all: false }
              }
            default:
              return { all: true }
          }
        case SUBETAPA.I_INICIO:
        case SUBETAPA.I_DONATARIA:
          switch (perfil) {
            case PERFIL.DONATARIA:
              return {
                all: false,
                GeneralInfo: { all: true },
                ContactData: { all: true },
                PatronsCouncelors: { all: true },
                Documents: { all: true },
                CompanyCharter: { all: true },
                LegalRepresentation: { all: true }
              }
            default:
              return { all: true }
          }
        case SUBETAPA.I_EJ_RECURSOS:
        case SUBETAPA.I_ABOGADO:
        case SUBETAPA.I_APROBADO:
        default:
          return { all: true }
      }
    case ETAPA.SOLICITUD:
      switch (subEtapa) {
        case SUBETAPA.S_SOLICITUD:
          if (esActualizacion) {
            return { all: true }
          }
          return { all: false }

        case SUBETAPA.S_COMENTARIOS_REGISTRO:
          return {
            GeneralInfo: { all: false },
            ContactData: { all: false },
            PatronsCouncelors: { all: false },
            Documents: { all: false },
            CompanyCharter: { all: false },
            LegalRepresentation: { all: false },
            ActivePassiveTable: { all: true },
            AdditionalInfo: { all: true },
            Contacts: { all: true },
            DocumentsInfo: { all: true },
            Fiscal: { all: true },
            Financial: { all: true },
            IncomeExpensesTable: { all: true },
            Locations: { all: true },
            Objectives: { all: true },
            Population: { all: true }
          }
        case SUBETAPA.S_COMENTARIOS_INFORMACION:
          if (perfil == 'Ejecutivo Inversion') {
            return {
              all: true,
              ActivePassiveTable: { all: true },
              AdditionalInfo: { all: true },
              Contacts: { all: true },
              DocumentsInfo: { all: true },
              Fiscal: { all: true },
              Financial: { all: true },
              IncomeExpensesTable: { all: true },
              Locations: { all: true },
              Objectives: { all: true },
              Population: { all: true }
            }
          }
          return {
            all: true,
            ActivePassiveTable: { all: false },
            AdditionalInfo: { all: false },
            Contacts: { all: false },
            DocumentsInfo: { all: false },
            Fiscal: { all: false },
            Financial: { all: false },
            IncomeExpensesTable: { all: false },
            Locations: { all: false },
            Objectives: { all: false },
            Population: { all: false }
          }

        default:
          return { all: true }
      }
    default:
      return { all: true }
  }
}
/* eslint-enable */
