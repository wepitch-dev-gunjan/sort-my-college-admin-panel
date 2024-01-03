import React from 'react';
import './style.scss'
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { IoIosCheckmarkCircle } from "react-icons/io";


const Breadcrumb = () => {
  const location = useLocation();
  // const match = useRouteMatch();

  const pathnames = location.pathname.split('/').filter((x) => x);
  const routes = pathnames.map((_, index) => ({
    path: `/${pathnames.slice(0, index + 1).join('/')}`,
    breadcrumbName: pathnames[index],
  }));

  return (
    <div className='Breadcrumb-container'>
      {routes.map((route, index) => (
        <span key={route.path}>
          <Link to={route.path}>
            <div className="breadcrumb">
              <IoIosCheckmarkCircle />
              <span>
                {route.breadcrumbName}
              </span>
            </div>
          </Link>
          {/* {index < routes.length - 1 && <i> / </i>} */}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
