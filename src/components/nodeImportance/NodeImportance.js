import {React, useState} from "react";
import './NodeImportance.css';
import {Input} from 'antd';
import {fuctionImportanceValidationSchema} from '../../validation/functionImportanceValidation';



function NodeImportance({ editMode, relative, absolute, onChange, onError }) {
  const [absoluteImportance, setAbsolute] = useState(absolute)

  const doChange = async (e) => {
  let tmpObj = {absolute: e.target.value};
        onChange(e);
        if (await fuctionImportanceValidationSchema.isValid(tmpObj))
        {
          setAbsolute(tmpObj.absolute);
        }
        else
        {
          onError();
        }
      }
  
    return (
      <div className="">

            {editMode ? 
            <div >
                <div className="row"><label>relative: </label> <Input className="nodrag" size = {'small'} disabled value={relative+'%'} onChange={doChange}></Input></div>
                <div className="row"><label>absolute: </label> <Input className="nodrag" size = {'small'} value={absoluteImportance} onChange={doChange}></Input></div>
            </div> : 
            <div>
                <div className="row"><label>relative: </label> <label>{relative+'%'}</label></div>
                <div className="row"><label>absolute: </label> <label> {absoluteImportance}</label></div>
            </div>
        }

      </div>
    );
  }
  
  export default NodeImportance;
  