import { useState } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

const RecentPayments = () => {
  const [payments, setPayments] = useState([
    {
      id: '12354',
      service: 'Group session',
      date: '24 May 2024',
      payment: '$1,000',
      status: 'Delivered' 
    },
    {
      id: '12354',
      service: 'Group session',
      date: '24 May 2024',
      payment: '$1,000',
      status: 'Pending'
    },
    {
      id: '12354',
      service: 'Group session',
      date: '24 May 2024',
      payment: '$1,000',
      status: 'Pending'
    },
    {
      id: '12354',
      service: 'Group session',
      date: '24 May 2024',
      payment: '$1,000',
      status: 'Cancelled'
    },
    {
      id: '12354',
      service: 'Group session',
      date: '24 May 2024',
      payment: '$1,000',
      status: 'Cancelled'
    }
  ]);

  return (
    <div className='RecentPayments-container'>
      <div className="payments-top">
        <h1>Recent Payments</h1>
        <Link to='/payment'>
          <div className="see-all-button">SEE ALL</div>
        </Link>
      </div>
      <div className="table">
        <div className="row">
          <div className="col"><h4>ID</h4></div>
          <div className="col"><h4>SERVICE</h4></div>
          <div className="col"><h4>DATE</h4></div>
          <div className="col"><h4>PAYMENT</h4></div>
          <div className="col"><h4>STATUS</h4></div>
        </div>
        {payments.map((payment, i) => (
          <div className='row' key={i}>
            <div className='col'>{payment.id}</div>
            <div className='col'>{payment.service}</div>
            <div className='col'>{payment.date}</div>
            <div className='col'>{payment.payment}</div>
            <div className={`col ${payment.status === 'Cancelled' ? 'red' :
              payment.status === 'Delivered' ? 'green' :
                payment.status === 'Pending' ? 'blue' : ''
              }`}>{payment.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPayments;
