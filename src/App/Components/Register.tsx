import React, { useState } from 'react'
import '../Style/Login.css'
import { makePostRequest } from '../Api/ApiHandler';

interface RegisterFormData {
    full_name: string;
    email: string;
    password: string;
}
  
function Register() {
    const [registerMessage, setRegisterMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
        full_name: '',
        email: '',
        password: ''
      });
      const [emailExpanded, setEmailExpanded] = useState<boolean>(false);
      const [passwordExpanded, setPasswordExpanded] = useState<boolean>(false);
      const [nameExpanded, setNameExpanded] = useState<boolean>(false);
      
    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
    
        try {
          const response = await makePostRequest('/register', registerFormData);
          setRegisterMessage('User registered successfully.');
        //   setLoginMessage('');
          setError('');
          console.log('Register response:', response);
          // You can handle the successful registration here
        } catch (error) {
          setError('Failed to register. Please try again later.');
          console.error('Register error:', error);
          // You can handle the registration error here
        }
      };

      const handleRegisterFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRegisterFormData(prevFormData => ({
          ...prevFormData,
          [name]: value
        }));
      };

      function handleFocus(e: React.FocusEvent): void{
        if ((e.target as HTMLInputElement).name === 'email') {
            setEmailExpanded(true)
        } else if ((e.target as HTMLInputElement).name === 'password') {
            setPasswordExpanded(true)
        } else if ((e.target as HTMLInputElement).name === 'full_name') {
            setNameExpanded(true)
        }
      }
      function leaveFocus(e: React.FocusEvent): void{
        if ((e.target as HTMLInputElement).name === 'email') {
            setEmailExpanded(false)
        } else if ((e.target as HTMLInputElement).name === 'password') {
            setPasswordExpanded(false)
        } else if ((e.target as HTMLInputElement).name === 'full_name') {
            setNameExpanded(false)
        }
      }
    
    
    return (
        <div className='mt-5' style={{display: 'grid', placeItems: 'center'}}>
            <div className='d-flex'>
                <img style={{width: '10em'}} src="/assets/svg/logo.svg" alt="tunza logo" />
                <h1 className='mt-auto' style={{fontWeight: '900', fontSize: '2em'}}>
                    <span style={{color: 'var(--orange)'}}>T</span>
                    <span style={{color: 'var(--blue)'}}>unza Administrator Portal</span>
                </h1>
            </div>

            <div className='mt-4 pt-4 mb-5 pb-3 d-flex' style={{flexDirection: 'column'}}>
                <h1 className='px-auto' style={{color: 'var(--blue)', fontWeight: '700', fontSize: '1.8em'}}>Register</h1>
                <div style={{width: '5.9em', height: '4px', backgroundColor: 'var(--blue)' }}></div>
            </div>

            

            <div className=''>
                <form onSubmit={handleRegister} className=''>
                    <div className="input-container my-3 py-2" style={{border: (nameExpanded ? 'none': 'var(--light-gray) solid 1px')}}>
                        <img src="/assets/svg/person.svg" className='px-3' alt="person icon" />
                        <input
                            type="text"
                            name="full_name"
                            onFocus={(e) => handleFocus(e)}
                            onBlur={(e) => leaveFocus(e)}
                            className='input-style'
                            placeholder="Full Name"
                            value={registerFormData.full_name}
                            onChange={handleRegisterFormChange}
                        />
                        <div className={`my-1 line ${nameExpanded ? 'expanded' : ''}`}></div>
                    </div>

                    <div className="input-container my-3 py-2" style={{border: (emailExpanded ? 'none': 'var(--light-gray) solid 1px')}}>
                        <img src="/assets/svg/person.svg" className='px-3' alt="person icon" />
                        <input
                            type="email"
                            name="email"
                            onFocus={(e) => handleFocus(e)}
                            onBlur={(e) => leaveFocus(e)}
                            className='input-style'
                            placeholder="Email"
                            value={registerFormData.email}
                            onChange={handleRegisterFormChange}
                        />
                        <div className={`my-1 line ${emailExpanded ? 'expanded' : ''}`}></div>
                    </div>
    
                    <div className="input-container my-3 py-2" style={{border: (passwordExpanded ? 'none': 'var(--light-gray) solid 1px')}}>
                        <img src="/assets/svg/password.svg" className='px-3' alt="person icon" />
                        <input
                            type="password"
                            name="password"
                            onFocus={(e) => handleFocus(e)}
                            onBlur={(e) => leaveFocus(e)}
                            className='input-style'
                            placeholder="Password"
                            value={registerFormData.password}
                            onChange={handleRegisterFormChange}
                        />
                        <div className={`my-1 line ${passwordExpanded ? 'expanded' : ''}`}></div>
                    </div>
    
                    <button type="submit" className='border py-2 px-4 login-btn'>Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register