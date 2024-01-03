import { Link } from "react-router-dom";
import "./style.scss"
import { useState } from 'react';


const Payment = () => {
  const [payments, setPayments] = useState([
    {
      id: '12354',
      service: 'Group session',
      date: '24 May 2024',
      payment: '$1,000',
      status: 'Delivered' // Corrected the typo here
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
      status: 'Delivered'
    },
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
      status: 'Delivered'
    },
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
      status: 'Delivered'
    },
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
      status: 'Delivered'
    },
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
      status: 'Delivered'
    }
  ]);

  return (
    <div className="Payments-container">
      <div className="heading sticky">
        {/* <h1>All Payments</h1> */}
        <div className="row">
          <div className="col"><h4>ID</h4></div>
          <div className="col"><h4>SERVICE</h4></div>
          <div className="col"><h4>DATE</h4></div>
          <div className="col"><h4>PAYMENT</h4></div>
          <div className="col"><h4>STATUS</h4></div>
          <div className="col"><h4>DETAILS</h4></div>
        </div>
      </div>
      <div className='RecentPayments-container'>
        <div className="table">
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
              <div className='col'>
                <Link to='/payment/payment-details'>
                  <p>View Details</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Payment