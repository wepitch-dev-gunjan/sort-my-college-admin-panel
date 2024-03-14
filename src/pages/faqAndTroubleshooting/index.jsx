import './style.scss'
import 'rsuite/dist/rsuite.min.css';
import QnaList from '../../components/qnaList';


const FaqAndTroubleshooting = () => {

    return(
        <div className="fat-main">
            {/* Qna List Component */}
            <QnaList />
        </div>
    )
}

export default FaqAndTroubleshooting