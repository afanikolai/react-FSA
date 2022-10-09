import { React, useCallback, useState} from "react";
import './NodeImportance.css';
import { Input } from 'antd';



function NodeImportance({ editMode, relative, absolute, onChange }) {
  const [absoluteImportance, setAbsolute] = useState(absolute)
  const doChange = (e) => {
      setAbsolute(e.target.value);
      onChange(e);
  }

  
    return (
      <div className="">

            {editMode ? 
            <div >
                <div className="row"><label>relative: </label> <Input className="nodrag" size = {'small'} disabled value={relative+'%'}  maxLength={3} onChange={doChange}></Input></div>
                <div className="row"><label>absolute: </label> <Input className="nodrag" size = {'small'}value={absoluteImportance} maxLength={3} onChange={doChange}></Input></div>
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
  