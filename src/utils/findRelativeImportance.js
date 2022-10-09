import findNodeChildren from "./findNodeChildren";

export default function findRelativeImportance(data, nodeID){

let nodes = data.nodes;
let edges = data.edges;

let currentNodeID=nodeID;
let currentNodeAbsoluteImportance = nodes[nodeID].data.nodeAbsoluteImportance;


//найти родителя текущего узла
let currentNodeParent = findNodeParent(currentNodeID, edges)

//найти уровень текущего узла 
// let currentNodeLevel = findNodeLevel(currentNodeID, edges)

//найти все узлы этого уровня
// let currentLevelNodes = [];
// for (let i = 0; i<nodes.length; i++){
//     let currentObj = nodes[i];
//     if (findNodeLevel(currentObj.id, edges) === currentNodeLevel)
//     {
//         currentLevelNodes.push(nodes[i]);
//     }
// };

//найти всех потомков этого родителя
let currentLevelNodes = [];
for (let i = 0; i<nodes.length; i++){
    let currentObj = nodes[i];
    if (findNodeParent(currentObj.id, edges) === currentNodeParent)
    {
        currentLevelNodes.push(nodes[i]);
    }
};

//посчитать суммарную значимость 
let importanceSum = 0;
currentLevelNodes.forEach(element => {
    importanceSum += Number(element.data.nodeAbsoluteImportance);
});

//найти отношение текущей к суммарной 
let currentLevelImportance = currentNodeAbsoluteImportance / importanceSum;

//присвоить значение важности функции
nodes[nodeID].data.currentNodeRelativeImportance = nodes.find(item => item.id === findNodeParent(currentNodeID, edges)).data.nodeRelativeImportance*currentLevelImportance;

//обновить также зависимые узлы
currentLevelNodes.forEach(element => {
    let tmpImportance = element.data.nodeAbsoluteImportance / importanceSum; 
    element.data.nodeRelativeImportance = nodes.find(item => item.id === findNodeParent(currentNodeID, edges)).data.nodeRelativeImportance*tmpImportance;
    //обновить детей зависимых узлов
    let children = findNodeChildren(element.id, edges);
    //console.log(children, element.id, currentLevelNodes);
    if (children !== undefined)
        {
        children.forEach(elem =>{
            findRelativeImportance(data, nodes.find(item => item.id === elem).id);
        })
    }
    
});
return nodes[nodeID].data.currentNodeRelativeImportance;
}




// функция, которая возвращает родителя данного узла
function findNodeParent(currentNodeID, edges){
    if (currentNodeID === 'func0') return null;
    // найти в edjes связь, где currentNode является target
    for (let i = 0; i<edges.length; i++){
        if (edges[i].target === currentNodeID){
            return edges[i].source; 
        }
    };
}

// функция, которая возвращает уровень текущего узла
function findNodeLevel(currentNodeID, edges){

    let nodeLevel = 1;
    let rootNodeID = 'func0';
    
    while (currentNodeID !== rootNodeID)
    {
        currentNodeID = findNodeParent(currentNodeID, edges);
        nodeLevel++;

        if (nodeLevel>999) return null;
    }

    return nodeLevel;
}


