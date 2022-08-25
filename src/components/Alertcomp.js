import React from 'react'
import Alert from 'react-bootstrap/Alert';

const Alertcomp = (props) => {
  return (
    <>
    <Alert variant={props.alert.type} style={{marginTop: 60, position:"absolute", top: 0}}>{props.alert.msg}</Alert>
    </>
  )
}

export default Alertcomp
