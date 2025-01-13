import '../css/App.css'
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Button = (props) => {
    return (
        <button className='button' onClick={props.onClick}>
            {props.text}
        </button>
    );
}

export default Button;