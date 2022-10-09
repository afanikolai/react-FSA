import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "./App.css";
import "reactflow/dist/style.css";
import FunctionNode from "./nodes/FunctionNode";
import NavigationBar from "./components/navigationBar/NavigationBar";

let id = 1;
const getId = () => `${id++}`;

const fitViewOptions = {
  padding: 3,
};

const nodeTypes = { functionNode: FunctionNode };

const edgeOptions = {};

const initialNodes = [
  {
    id: "func0",
    data: {
      label: "Functions",
      nodeAbsoluteImportance: 10,
      nodeRelativeImportance: 100,
    },
    sourcePosition: "right",
    type: "input",
    position: { x: 200, y: 200 },
  },
  // {
  //   id: 'module0',
  //   data: {label: 'Modules'},
  //   sourcePosition: 'left',
  //   type: 'input',
  //   position: { x: 1200, y: 200 },
  // },
];

const initialEdges = [];

export const NodesContext = React.createContext({
  nodes: [],
  edges: [],
});
//------------------------------------------------------------------------------------------------------------------------------

function App() {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { project } = useReactFlow();
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  // console.log(nodes, edges);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        // need to remove the wrapper bounds, in order to get the correct position
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        const id = getId();

        const newNode = {
          id,
          // removing the half of the node height (50) to center the new node
          position: project({
            x: event.clientX - left,
            y: event.clientY - top - 50,
          }),
          data: {
            nodeName: "",
            nodeAbsoluteImportance: 0,
            nodeRelativeImportance: 0,
            nodes: nodes,
            id: id,
          },
          type: "functionNode",
          hidden: false,
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectingNodeId.current, target: id })
        );
      }
    },
    [project]
  );

  function selectFile(contentType) {
    return new Promise((resolve) => {
      let input = document.createElement("input");
      input.type = "file";
      input.multiple = false;
      input.accept = contentType;

      input.onchange = (_) => {
        let files = Array.from(input.files);
        resolve(files[0]);
      };

      input.click();
    });
  }

  async function onClickSave() {
    const opts = {
      types: [
        {
          description: "Text file",
          accept: { "text/plain": [".txt"] },
        },
      ],
    };

    let file = await window.showSaveFilePicker(opts);
    const fileStream = await file.createWritable();
    await fileStream.write(
      new Blob(
        [
          JSON.stringify({
            nodes: nodes,
            edges: edges,
          }),
        ],
        { type: "text/plain" }
      )
    );
    await fileStream.close();
    alert("All data saved");
  }

  async function onClickLoad() {
    if (
      window.confirm(
        "Are you sure you want to open diagram from file? Current diagram won't be saved."
      )
    ) {
      let file = await selectFile("text/*");
      let reader = new FileReader();

      reader.readAsText(file);

      reader.onload = function () {
        try {
          let json = JSON.parse(reader.result);
          setNodes(json.nodes);
          setEdges(json.edges);
          id = json.nodes[json.nodes.length - 1].id;
          id++;
        } catch (e) {
          console.log(e);
          alert("File content is not acceptable");
        }
      };

      reader.onerror = function () {
        console.log(reader.error);
      };
    }
  }

  const onClickNew = () => {
    if (
      window.confirm(
        "Are you sure you want to recreate your diagram? Changes won't be saved."
      )
    ) {
      setNodes((nds) => (nds = initialNodes));
      setEdges((eds) => (eds = initialEdges));
    }
  };

  const onClickHelp = () => {
    console.log("helped");
  };

  return (
    <NodesContext.Provider value={{ nodes, edges }}>
      <div>
        <NavigationBar
          onClickSave={onClickSave}
          onClickLoad={onClickLoad}
          onClickNew={onClickNew}
          onClickHelp={onClickHelp}
        />
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
}

export default () => (
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
);

//------------------------------------------------------------------------------------------------------------------------------
