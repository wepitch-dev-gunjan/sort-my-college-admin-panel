import './style.scss'
import {Link} from "react-router-dom";

const EntrancePreparation = () => {
    return (
        <div className='admin-ep-main'>
            <div className="admin-ep-child">
                <div className="aepc-left">
                    <Link className="aepc-links" to="/entrance-preparation/feature-and-preference">
                        <h1> Feature & Preference Editor</h1>
                    </Link>
                    
                </div>
                <div className="aepc-right">
                    <Link className="aepc-links" to="/entrance-preparation/institute-directory">
                        <h1>Institute Directory</h1>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EntrancePreparation