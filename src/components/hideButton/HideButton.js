import React from "react";
import './HideButton.css'

let mas = ['Hide', 'Show'];


function HideButton({onClick, isChildrenHidden}) {

    return (
        
        <div><button onClick={onClick}>{mas[isChildrenHidden ? 1 : 0]}</button></div>
    )
}

export default HideButton