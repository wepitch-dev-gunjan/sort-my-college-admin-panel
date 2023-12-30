import "./style.scss";

const RecentUser = ({ profile_pic, name }) => {
  return (
    <div className="RecentUser-container">
      <img src={profile_pic} alt="" />
      <h4>{name}</h4>
    </div>
  );
};
export default RecentUser;
