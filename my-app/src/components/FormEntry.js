import React from 'react';

const textStyle = {
    fontSize: '24px',
}

const boxStyle = {
    fontSize: '20px',
    borderRadius: '10px',
    padding: '10px',
    borderStyle: 'solid'
}

const FormEntry = (props) => {
    return (
        <div style={textStyle}>
            {props.description} <br/>
            <input style={boxStyle} type="text" name={props.name}  placeholder={props.placeholder}/>
            <br/><br/>
        </div>
    )
};

export default FormEntry;