import { Button } from 'antd';
import './NavigationBar.css';




function NavigationBar({onClickSave, onClickLoad, onClickNew}) {

    return (
      <div className="NavigationBar">
        <Button onClick={onClickNew}>New file</Button>
        <Button onClick={onClickLoad}>Open file</Button>
        <Button onClick={onClickSave}>Save file</Button>
        <Button>Help</Button>
        <Button>Contact author</Button>
      </div>
    );
  }

  export default NavigationBar