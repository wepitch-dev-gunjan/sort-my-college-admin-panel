import React from 'react';
import './style.scss';
import { Link, useLocation } from 'react-router-dom';
import { IoIosCheckmarkCircle, IoIosCheckmarkCircleOutline } from 'react-icons/io';

const Breadcrumb = () => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);
  const routes = pathnames.map((_, index) => ({
    path: `/${pathnames.slice(0, index + 1).join('/')}`,
    breadcrumbName: pathnames[index],
  }));

  return (
    <div className="Breadcrumb-container">
      <span>
        <Link to="/">
          <div className="breadcrumb">
            {routes.length === 0 ? (
              <IoIosCheckmarkCircle style={{ color: '#6ae6be' }} size={20} />
            ) : (
              <IoIosCheckmarkCircleOutline style={{ color: '#6ae6be' }} size={20} />
            )}
            <span style={{ fontWeight: routes.length === 0 ? '700' : '400' }}>home</span>
          </div>
        </Link>
      </span>
      {routes.map((route, index) => {
        const isCurrentRoute = index === routes.length - 1; // Check if it's the current route

        return (
          <span key={route.path}>
            <Link to={route.path}>
              <div className="breadcrumb">
                {isCurrentRoute ? (
                  <IoIosCheckmarkCircle style={{ color: '#6ae6be' }} size={20} />
                ) : (
                  <IoIosCheckmarkCircleOutline style={{ color: '#6ae6be' }} size={20} />
                )}
                <span style={{ fontWeight: isCurrentRoute ? '700' : '400' }}>{route.breadcrumbName}</span>
              </div>
            </Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
