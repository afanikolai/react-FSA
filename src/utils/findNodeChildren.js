// функция, которая возвращает потомков данного узла
export default function findNodeChildren(currentNodeID, edges){
    
    let children = [];
    for (let i = 0; i<edges.length; i++){
        if (edges[i].source === currentNodeID){
            children.push(edges[i].target); 
            let tmp = findNodeChildren(edges[i].target,edges);
            if (tmp.length>0)
                tmp.forEach(element => {
                    children.push(element)
                });
        }
    };
    return children;
}