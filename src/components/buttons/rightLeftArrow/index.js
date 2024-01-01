import { BsArrowBarLeft, BsArrowBarRight } from 'react-icons/bs'
import './style.scss'

const RightLeftArrow = ({ expand }) => {
  return (
    <div className='RightLeftArrow-container'>
      {expand ? <BsArrowBarLeft size='25' />
        : <BsArrowBarRight size='25' />}
    </div>
  );
};

export default RightLeftArrow;