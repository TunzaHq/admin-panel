import React, { ReactNode, useState } from 'react';
import '../Style/Navbar.css';
import AuthCanvas from './AuthCanvas';

type ChildrenProps = {
    children: ReactNode;
};

function Navbar({ children }: ChildrenProps){
    const [full, setFull] = useState(false);
  return (
    <>
    { window.location.pathname === '/login' || window.location.pathname === '/' ?
        <AuthCanvas>{children}</AuthCanvas>
    :
    full && window.location.pathname !== '/login' && window.location.pathname !== '/' ? 
    <div>
        <div className="navbar fixed-left" onMouseLeave={() => setFull(false)}>
          <div className="navbar-logo flex" style={{gap: '10px'}}>
            <img src="/assets/svg/logo.svg" alt="Logo" />
            <h1 className='my-auto  big-font'>
                <span style={{color: 'var(--orange)'}}>T</span>
                <span style={{color: 'var(--blue)'}}>unza</span>
            </h1>
          </div>
          <div className="navbar-links">
            <div className="navbar-section px-3">
                <img src="/assets/svg/dashboard.svg" alt="dashboard icon"/>
                <h1 className='my-0'>Dashboard</h1>
            </div>
            <div className="navbar-section px-3">
                <img src="/assets/svg/users.svg" alt="users icon" />
                <h1 className='my-0'>Users</h1>
            </div>
            <div className="navbar-section px-3">
                <img src="/assets/svg/policies.svg" alt="policies icon" />
                <h1 className='my-0'>Policies</h1>
            </div>
            <div className="navbar-section px-3">
                <img src="/assets/svg/claims.svg" alt="claims icon" />
                <h1 className='my-0'>Claims</h1>
            </div>
            <div className="navbar-section px-3">
                <img src="/assets/svg/payments.svg" alt="payments icon" />
                <h1 className='my-0'>Payments</h1>
            </div>
          </div>
          <div className="navbar-bottom">
          <div className="navbar-section px-3">
                <img src="/assets/svg/notifications.svg" alt="notifications icon" />
                <h1 className='my-0'>Notifications</h1>
            </div>
            <div className="navbar-section px-3">
                <img src="/assets/svg/logout2.svg" alt="logout icon" />
                <h1 className='my-0'>Logout</h1>
            </div>
          </div>
        </div>
        <div style={{marginTop: '3.5%', marginLeft: '10%'}}>
            {children}
        </div>
    </div>
    :
    <div>
        <div className="navbar fixed-left" onMouseOver={() => setFull(true)}>
            <div className="navbar-logo flex">
              <img src="/assets/svg/logo.svg" alt="Logo" className='mx-auto'/>
              {/* <p className='pt-2 mb-0'>
                  <span style={{color: 'var(--orange)'}}>T</span>
                  <span>unza</span>
              </p> */}
            </div>
            <div className="navbar-links">
                <div className="navbar-section">
                    <img src="/assets/svg/dashboard.svg" alt="dashboard icon" className='mx-auto' />
                    {/* <h1 className='my-0'>Dashboard</h1> */}
                </div>
                <div className="navbar-section px-2">
                    <img src="/assets/svg/users.svg" alt="users icon" className='mx-auto' />
                    {/* <h1 className='my-0'>Users</h1> */}
                </div>
                <div className="navbar-section px-2">
                    <img src="/assets/svg/policies.svg" alt="policies icon" className='mx-auto' />
                    {/* <h1 className='my-0'>Policies</h1> */}
                </div>
                <div className="navbar-section px-2">
                    <img src="/assets/svg/claims.svg" alt="claims icon" className='mx-auto' />
                    {/* <h1 className='my-0'>Claims</h1> */}
                </div>
                <div className="navbar-section px-2">
                    <img src="/assets/svg/payments.svg" alt="payments icon" className='mx-auto' />
                    {/* <h1 className='my-0'>Payments</h1> */}
                </div>
            </div>
            <div className="navbar-bottom">
                <div className="navbar-section px-2">
                    <img src="/assets/svg/notifications.svg" alt="notifications icon" className='mx-auto' />
                    {/* <h1 className='my-0'>Notifications</h1> */}
                </div>
                <div className="navbar-section px-2">
                    <img src="/assets/svg/logout2.svg" alt="logout icon" className='mx-auto' />
                    {/* <h1 className='my-0'>Logout</h1> */}
                </div>
            </div>
        </div>
        {/* <div className="ms-5 ps-5"> */}
            <div style={{marginTop: '3.5%', marginLeft: '10%'}}>
                {children}
            </div>
        {/* </div> */}
    </div>
    }
    </>
  );
};

export default Navbar;
