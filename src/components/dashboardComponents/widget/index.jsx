import './style.scss';

const Widget = ({ heading, value }) => {
  return (
    <div className='Widget-container'>
      <h3>{heading}</h3>
      <p>{value}</p>
    </div>
  );
};

export default Widget;