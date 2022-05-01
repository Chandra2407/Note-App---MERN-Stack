import React from 'react'

const Alert = (props) => {
    return (
        <div className='alertContainer' style={{height:'5rem'}}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`}
            role="alert">
            <strong>{props.alert.type}</strong>: {props.alert.message}
            </div>}
        </div>
    )
}

export default Alert