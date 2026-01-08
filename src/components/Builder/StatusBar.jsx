import React from 'react'


const StatusBar = ({status}) => {
  return (
    <div style={{marginBottom:"10px"}}>
      <div className="status-bar">
        <div className="line" style={{width: `${status}%`}}>
        </div>
      </div>
    </div>
  )
}

export default StatusBar
