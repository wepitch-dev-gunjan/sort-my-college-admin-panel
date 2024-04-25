import { Uploader } from 'rsuite'
import './style.scss'

export default function DragAndDropUploader(props) {
    return (
        <Uploader action={props.action} draggable multiple={props.multiple}>
        <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span>{props.placeholder}</span>
        </div>
      </Uploader> 
    )
}