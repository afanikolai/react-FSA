import { useState, useContext} from 'react';
import { Handle, Position } from 'reactflow';
import EditButton from '../components/editButton/EditButton';
import NodeImportance from '../components/nodeImportance/NodeImportance';
import NodeName from '../components/nodeName/NodeName';
import findRelativeImportance from '../utils/findRelativeImportance';
import { NodesContext } from '../App';
import findNodeChildren from '../utils/findNodeChildren';
import { message } from 'antd';

import './FunctionNode.css' 



function ModuleNode({ data, id, }) {
  const [editMode, setEditMode] = useState(true);

  const onNameChange = (e) => {
    data.nodeName = e.target.value;
  }

  const nodesEdges = useContext(NodesContext);
  

  const onImportanceChange = (e) => {
    data.nodeAbsoluteImportance = e.target.value;
    
    data.nodeRelativeImportance = findRelativeImportance(nodesEdges, id);
  }

  const changeEditMode = () => {
    if(editMode) data.onChange();
    setEditMode(!editMode);
  }


  const onNameError = ()=> {
    message.error('Error! Your field is incorrect');
  }

  return (
    <div className="function-node">
      <Handle type="target" position={Position.Right} className='circle-port' />
      <div className='custom-node-header'> 
        <NodeName editMode={editMode} nodeName={data.nodeName} onChange={onNameChange} onError={onNameError}/>
        <div >
          <EditButton editMode={editMode} onClick={changeEditMode} />
        </div>
      </div>

      <div className='custom-node-content'>
        <NodeImportance editMode={editMode} relative={data.nodeRelativeCost.toFixed()} onError={onNameError} 
        absolute={data.nodeAbsoluteCost} onChange={onImportanceChange}/>
      </div>
      <Handle type="source" position={Position.Left} id="to-module" className='circle-port' />
      {/* <Handle type="source" position={Position.Right} id="to-func" className='circle-port' style = {handleStyle}/> */}
    </div>
  );
}

export default ModuleNode;
