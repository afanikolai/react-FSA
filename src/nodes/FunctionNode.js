import { useCallback, useState, useContext } from "react";
import { Handle, Position } from "reactflow";
import EditButton from "../components/editButton/EditButton";
import NodeImportance from "../components/nodeImportance/NodeImportance";
import NodeName from "../components/nodeName/NodeName";
import findRelativeImportance from "../utils/findRelativeImportance";
import "./FunctionNode.css";
import { NodesContext } from "../App";
import HideButton from "../components/hideButton/HideButton";
import findNodeChildren from "../utils/findNodeChildren";

// const handleStyle = { top: 10 };

function FunctionNode({ data, id }) {
  const [editMode, setEditMode] = useState(true);
  const [isChildrenHidden, setChildrenHidden] = useState(false);
  const hide = (nodeOrEdge, hidden) => {
    nodeOrEdge.hidden = hidden;
    return nodeOrEdge;
  };

  const onNameChange = (e) => {
    data.nodeName = e.target.value;
    //console.log (nodes);
  };

  const nodesEdges = useContext(NodesContext);

  const onImportanceChange = (e) => {
    data.nodeAbsoluteImportance = e.target.value;

    data.nodeRelativeImportance = findRelativeImportance(nodesEdges, id);
  };

  const changeEditMode = () => {
    setEditMode(!editMode);
  };

  const hideChildren = () => {
    // Тупое говно, потом разобраться.
    setChildrenHidden(!isChildrenHidden);
    let children = findNodeChildren(id, nodesEdges.edges);
    console.log(children);
    children.forEach((element) => {
      let tmpNode = nodesEdges.nodes.find((item) => item.id === element);

      hide(tmpNode, isChildrenHidden);
    });
  };

  return (
    <div className="function-node">
      <Handle type="target" position={Position.Left} className="circle-port" />
      <div className="custom-node-header">
        <NodeName
          editMode={editMode}
          nodeName={data.nodeName}
          onChange={onNameChange}
        />
        <div>
          {/* <HideButton isChildrenHidden={isChildrenHidden} onClick={hideChildren}/> */}
          <EditButton editMode={editMode} onClick={changeEditMode} />
        </div>
      </div>

      <div className="custom-node-content">
        <NodeImportance
          editMode={editMode}
          relative={data.nodeRelativeImportance.toFixed()}
          absolute={data.nodeAbsoluteImportance}
          onChange={onImportanceChange}
        />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="to-func"
        className="circle-port"
      />
      {/* <Handle type="source" position={Position.Right} id="to-module" className='circle-port' style = {handleStyle}/> */}
    </div>
  );
}

export default FunctionNode;
