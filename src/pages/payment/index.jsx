import { Link } from "react-router-dom";
import "./style.scss"
import { useContext, useEffect, useState } from 'react';
import axios from "axios";
import config from "../../config";
import { AdminContext } from "../../context/AdminContext";
const { backend_url } = config;



const Payment = () => {
  const {admin}=useContext(AdminContext)
  const [payments,setPayments]=useState([])
  // const [payments, setPayments] = useState([
  //   {
  //     id: '12354',
  //     service: 'Group session',
  //     date: '24 May 2024',
  //     payment: '$1,000',
  //     status: 'Delivered' // Corrected the typo here
  //   },
  //   {
  //     id: '12354',
  //     service: 'Group session',
  //     date: '24 May 2024',
  //     payment: '$1,000',
  //     status: 'Pending'
  //   },
  //   {
  //     id: '12354',
  //     service: 'Group session',
  //     date: '24 May 2024',
  //     payment: '$1,000',
  //     status: 'Pending'
  //   },
  //   {
  //     id: '12354',
  //     service: 'Group session',
  //     date: '24 May 2024',
  //     payment: '$1,000',
  //     status: 'Cancelled'
  //   },
  //   {
  //     id: '12354',
  //     service: 'Group session',
  //     date: '24 May 2024',
  //     payment: '$1,000',
  //     status: 'Delivered'
  //   },
  //   {
  //     id: '12354',
  //     service: 'Group session',
  //     date: '24 May 2024',
  //     payment: '$1,000',
  //     status: 'Delivered'
  //   },
  //   {
  //     id: '12354',
  //     service: 'Group session',
  //     date: '24 May 2024',
  //     payment: '$1,000',
  //     status: 'Delivered'
  //   },
  //   {
  //     id: '12354',
  //     service: 'Group session',
  //     date: '24 May 2024',
  //     payment: '$1,000',
  //     status: 'Delivered'
  //   },
  //   {
  //     id: '12354',
  //     service: 'Group session',
  //     date: '24 May 2024',
  //     payment: '$1,000',
  //     status: 'Delivered'
  //   },
  //   {
  //     id: '12354',
  //     service: 'Group session',
  //     date: '24 May 2024',
  //     payment: '$1,000',
  //     status: 'Delivered'
  //   },
  //   {
  //     id: '12354',
  //     service: 'Group session',
  //     date: '24 May 2024',
  //     payment: '$1,000',
  //     status: 'Delivered'
  //   },
  //   {
  //     id: '12354',
  //     service: 'Group session',
  //     date: '24 May 2024',
  //     payment: '$1,000',
  //     status: 'Delivered'
  //   },
  //   {
  //     id: '12354',
  //     service: 'Group session',
  //     date: '24 May 2024',
  //     payment: '$1,000',
  //     status: 'Delivered'
  //   }
  // ]);
  const FetchData = async ()=>{
    try {
      let {data} = await axios.get(`${backend_url}/admin/payments/create-payment`,{
        headers: {
          Authorization: admin.token
        }
      }
      )
      console.log(data);
      setPayments(data)
      
    } catch (error) {
      console.log(error ,"sdsdfdfsdfsd");
      
    }
  }
  useEffect(() => {
    if (admin.token)
    FetchData()
  }, [admin])


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
              <div className='col'>{i+1}</div>
              <div className='col'>{payment.description}</div>
              <div className='col'>{payment.created_at}</div>
              <div className='col'>{payment.amount}</div>
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