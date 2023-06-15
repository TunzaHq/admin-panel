import React, { ReactNode } from 'react'
import '../Style/authCanvas.css';

type ChildrenProps = {
    children: ReactNode;
};

function AuthCanvas({ children }: ChildrenProps) {
  return (
    <div>
        <div className='fixed-left m-0 p-0 d-flex'>
            <img className='auth-canvas-picture m-0 p-0' src="/assets/svg/nav.svg" alt="alternative navigator" />
            {/* <img className='navbar m-0 p-0' src="/assets/svg/bg_home.svg" alt="alternative navigator" /> */}
            {/* <img className='navbar m-0 p-0 reflected' src="/assets/svg/bg_home.svg" alt="alternative navigator" /> */}
        </div>
        <div style={{marginLeft: '10%', marginRight: '10%', textAlign: 'center'}}>
            {children}
        </div>
    </div>
  )
}

export default AuthCanvas