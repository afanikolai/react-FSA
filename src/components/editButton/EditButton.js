import React from "react";
import './EditButton.css';
import {Button} from 'antd';

let mas = ['Edit', 'Save'];


function EditButton({onClick, editMode}) {

    return (
        
        <div><Button className="nodrag" size="small" onClick={onClick}>{mas[editMode ? 1 : 0]}</Button></div>
    )
}

export default EditButton