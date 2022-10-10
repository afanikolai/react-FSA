import { Button } from 'antd';
import './NavigationBar.css';




function NavigationBar({onClickSave, onClickLoad, onClickNew, onClickHelp}) {

    return (
      <div className="NavigationBar">
        <Button onClick={onClickNew}>New file</Button>
        <Button onClick={onClickLoad}>Open file</Button>
        <Button onClick={onClickSave}>Save file</Button>
        <Button onClick={onClickHelp} >Help</Button>
      </div>
    );
  }

  export default NavigationBar