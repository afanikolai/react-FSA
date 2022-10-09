import {React, useCallback, useState} from "react";
import './NodeName.css';
import {Input} from 'antd';


function NodeName({ editMode, nodeName, onChange}) {

    const [name, setName] = useState(nodeName)
    const doChange = (e) => {
        setName(e.target.value);
        onChange(e);
    }

    return (
      <div className="">
        {editMode ? 
        <div>
            <Input maxLength={32} placeholder = 'name of the function' size = 'small' value={name} className="nodrag" onChange={doChange}></Input>
        </div> : 
        <div>
            <label>{name === '' ? 'no name' : name}</label> 
        </div>
        }
      </div>
    );
  }
  
  export default NodeName;
  