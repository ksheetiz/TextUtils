import React from 'react';

function Alert(props) {

    const setTextToUpper = ()=>{
        let newText = props.alert.type.toLowerCase();
        newText = newText.charAt(0).toUpperCase() + newText.slice(1);
        return newText;
    }

  return (
    props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show my-4`} role="alert">
        <strong>{setTextToUpper()}</strong> : {props.alert.msg}
    </div>
  )
}

export default Alert