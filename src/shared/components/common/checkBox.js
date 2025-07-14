import React from 'react'

export const CheckBox = props => {
  return (
    <li>
      <input key={props.serviceId} onChange={(e)=>props.handleCheckChieldElement(e, services)} type="checkbox" checked={props.isChecked} value={props.serviceId} /> {props.service}
    </li>
  )
}

export default CheckBox