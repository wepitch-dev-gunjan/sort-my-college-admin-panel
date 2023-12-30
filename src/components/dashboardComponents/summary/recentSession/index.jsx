import './style.scss';

const RecentSession = ({ type, time, date }) => {
  return (
    <div className='RecentSession-container'>
      <h4>{type}</h4>
      <p>{time}</p>
      <p>{date}</p>
    </div>
  );
};

export default RecentSession;