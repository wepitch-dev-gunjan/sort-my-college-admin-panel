import "./style.scss";
import { Link } from "react-router-dom";
import card1 from "../../assets/card1.jpg";
import card2 from "../../assets/card2.jpg";
const EntrancePreparation = () => {
  return (
    <div className="admin-ep-main">
      <div className="admin-ep-child">
        {/* card 1 */}
        <div className="card1">
          <div className="aepc-left">
            <img
              src={card1}
              alt="Card 1"
            />
          </div>
          <Link
            className="aepc-links"
            to="/entrance-preparation/feature-and-preference"
          >
            <h1> Feature & Preference Editor</h1>
          </Link>
        </div>
        {/* card 2  */}
        <div className="card2">
          <div className="aepc-right">
            <img
              src={card2}
              alt="Card 2"
            />
          </div>
          <Link
            className="aepc-links"
            to="/entrance-preparation/institute-directory"
          >
            <h1>Institute Directory</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EntrancePreparation;
