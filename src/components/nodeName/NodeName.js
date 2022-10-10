import {React, useState} from "react";
import './NodeName.css';
import {Input} from 'antd';
import {functionNameValidationSchema} from '../../validation/functionNameValidation';

function NodeName({ editMode, nodeName, onChange, onError}) {

    const [name, setName] = useState(nodeName)
    const doChange = async (e) => {
        let tmpname = {name: e.target.value};
        onChange(e);
        if (await functionNameValidationSchema.isValid(tmpname))
        {
          setName(tmpname.name);
        }
        else
        {
          onError();
        }
    }

    return (
      <div className="">
        {editMode ? 
        <div>
            <Input maxLength={32} placeholder = 'name of the node' size = 'small' value={name} className="nodrag" onChange={doChange}></Input>
        </div> : 
        <div>
            <label>{name === '' ? 'no name' : name}</label> 
        </div>
        }
      </div>
    );
  }
  
  export default NodeName;
  