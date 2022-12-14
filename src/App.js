import  React, {useState, useCallback, useEffect, useRef, createContext, useContext } from 'react';
import ReactFlow, { Background, Controls, MiniMap, applyEdgeChanges, applyNodeChanges, addEdge, useNodesState,
  useEdgesState, useReactFlow, ReactFlowProvider,} from 'reactflow';
import './App.css';
import 'reactflow/dist/style.css';
import FunctionNode from './nodes/FunctionNode';
import ModuleNode from './nodes/ModuleNode';
import NavigationBar from './components/navigationBar/NavigationBar';


let id = 1;
const getId = () => `${id++}`;

const fitViewOptions = {
  padding: 3,

};

const nodeTypes = { functionNode: FunctionNode, moduleNode: ModuleNode };

const edgeOptions = {
  
};


const initialNodes = [
  {
    id: 'func0',
    data: {label: 'Functions', nodeAbsoluteImportance: 10, nodeRelativeImportance: 100, nodetype: 'function'},
    sourcePosition: 'right',
    type: 'input',
    position: { x: 200, y: 200 },
  },
  // {
  //   id: 'module0',
  //   data: {label: 'Modules', nodeAbsoluteCost: 10, nodeRelativeCost: 100, nodetype: 'module'},
  //   sourcePosition: 'left',
  //   type: 'input',
  //   position: { x: 1800, y: 200 },
  // },

];

const initialEdges = [];


export const NodesContext = React.createContext(
{
  nodes: [],
  edges: []
});
//------------------------------------------------------------------------------------------------------------------------------


function App() {
  
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { project } = useReactFlow();
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  // console.log(nodes, edges);
  
  const onFNodeChange = () => {
    // console.log()
  }


  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      const targetIsPane = event.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
        // need to remove the wrapper bounds, in order to get the correct position
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        const id = getId();
        // let newNode = {};
        const newNode = {
          id,
          // removing the half of the node height (50) to center the new node
          position: project({ x: event.clientX - left , y: event.clientY - top - 50 }),
          data: {nodeName: '', onChange: onFNodeChange, nodeAbsoluteImportance: 0, nodeRelativeImportance: 0, nodes:nodes, id: id},
          type: 'functionNode',
        };
        // if (nodes.find(item => item.id === connectingNodeId.current).data.nodetype === 'function'){
        //   newNode = {
        //     id,
        //     // removing the half of the node height (50) to center the new node
        //     position: project({ x: event.clientX - left , y: event.clientY - top - 50 }),
        //     data: {nodeName: '', onChange: onFNodeChange, nodeAbsoluteImportance: 0, nodeRelativeImportance: 0, nodes:nodes, id: id, nodetype: 'function'},
        //     type: 'functionNode',
        //   };
        // }
        // else {
        //   newNode = {
        //     id,
        //     // removing the half of the node height (50) to center the new node
        //     position: project({ x: event.clientX - left , y: event.clientY - top - 50 }),
        //     data: {nodeName: '', onChange: onFNodeChange, nodeAbsoluteCost: 0, nodeRelativeCost: 0, nodes:nodes, id: id, nodetype: 'module'},
        //     type: 'moduleNode',
        //   };
        // }
        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => eds.concat({ id, source: connectingNodeId.current, target: id }));
      }
    },
    [project]
  );



  const onClickSave = ()=>{
    console.log('saved');
  };

  const onClickLoad = ()=>{
    console.log('loaded');
  };

  const onClickNew = ()=>{
    if (window.confirm('Are you sure you want to recreate your diagram? Changes won\'t be saved.')){

      setNodes((nds) => nds = initialNodes);
      setEdges((eds) => eds = initialEdges);
    }
  }

  const onClickHelp = ()=>{
    console.log('helped');
  };



  return (
    <NodesContext.Provider value={{nodes, edges}}>
 
    <div >
      <NavigationBar onClickSave={onClickSave} onClickLoad={onClickLoad} onClickNew={onClickNew} onClickHelp={onClickHelp}/>
      <div className="App" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={edgeOptions}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          fitView
          fitViewOptions={fitViewOptions}
        />
        <Background />
        <Controls />
        <MiniMap />
      </div>
    </div>
    </NodesContext.Provider>
  );
};



export default () => (
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
  
);


//------------------------------------------------------------------------------------------------------------------------------