import React, { useState } from 'react'
import '../Style/Login.css'
import { makePostRequest } from '../Api/ApiHandler';
import authService from '../Services/AuthService'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

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
      const navigate = useNavigate();
      
    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
    
        try {
            const result = await authService.register(registerFormData);
            if (result.data) {
                navigate('/dashboard');
            } else {
                console.log(result)
            }
        } catch (error: any) {
            console.log(error);
            // toast.error(error.data.message)
        }
        // try {
        //   const response = await makePostRequest('/register', registerFormData);
        //   setRegisterMessage('User registered successfully.');
        // //   setLoginMessage('');
        //   setError('');
        //   console.log('Register response:', response);
        //   // You can handle the successful registration here
        // } catch (error) {
        //   setError('Failed to register. Please try again later.');
        //   console.error('Register error:', error);
        //   // You can handle the registration error here
        // }
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
        <div className='mt-10' style={{display: 'grid', placeItems: 'center'}}>
            <div className='flex'>
                <img style={{width: '10em'}} src="/assets/svg/logo.svg" alt="tunza logo" />
                <h1 className='mt-auto font-bold tunza-font'>
                    <span style={{color: 'var(--orange)'}}>T</span>
                    <span style={{color: 'var(--blue)'}}>unza Administrator Portal</span>
                </h1>
            </div>

            <div className='mt-4 pt-4 mb-5 pb-3 flex flex-col' style={{flexDirection: 'column'}}>
                <h1 className='px-auto font-semibold py-3' style={{color: 'var(--blue)', fontSize: '1.8em'}}>Register</h1>
                <div style={{width: '5.9em', height: '4px', backgroundColor: 'var(--blue)' }}></div>
            </div>

            

            <div className='form-container'>
                <form onSubmit={handleRegister} className=''>
                    <div className="relative rounded-lg my-3 py-2 w-60%" style={{border: (nameExpanded ? 'none': 'var(--light-gray) solid 1px')}}>
                        <div className="flex">
                            <img src="/assets/svg/person.svg" className='px-3' alt="person icon" style={{width: '3em'}} />
                            <input
                                type="text"
                                name="full_name"
                                onFocus={(e) => handleFocus(e)}
                                onBlur={(e) => leaveFocus(e)}
                                className='input-style py-3 pl-2 rounded-lg'
                                placeholder="Full Name"
                                value={registerFormData.full_name}
                                onChange={handleRegisterFormChange}
                                style={{width: '100%'}}
                            />
                        </div>
                        <div className={`my-1 line ${nameExpanded ? 'expanded' : ''}`}></div>
                    </div>

                    <div className="relative my-3 py-2 rounded-lg w-60%" style={{border: (emailExpanded ? 'none': 'var(--light-gray) solid 1px')}}>
                        <div className="flex">
                            <img src="/assets/svg/person.svg" className='px-3' alt="person icon" style={{width: '3em'}} />
                            <input
                                type="email"
                                name="email"
                                onFocus={(e) => handleFocus(e)}
                                onBlur={(e) => leaveFocus(e)}
                                className='input-style py-3 pl-2 rounded-lg'
                                placeholder="Email"
                                value={registerFormData.email}
                                onChange={handleRegisterFormChange}
                                style={{width: '100%'}}
                            />
                        </div>
                        <div className={`my-1 line ${emailExpanded ? 'expanded' : ''}`}></div>
                    </div>
    
                    <div className="relative my-3 py-2 rounded-lg w-60%" style={{border: (passwordExpanded ? 'none': 'var(--light-gray) solid 1px')}}>
                        <div className="flex">
                            <img src="/assets/svg/password.svg" className='px-3' alt="person icon" style={{width: '3em'}} />
                            <input
                                type="password"
                                name="password"
                                onFocus={(e) => handleFocus(e)}
                                onBlur={(e) => leaveFocus(e)}
                                className='input-style py-3 pl-2 rounded-lg'
                                placeholder="Password"
                                value={registerFormData.password}
                                onChange={handleRegisterFormChange}
                                style={{width: '100%'}}
                            />
                        </div>
                        <div className={`my-1 line ${passwordExpanded ? 'expanded' : ''}`}></div>
                    </div>
    
                    <button type="submit" className='border py-2 px-9 rounded-2xl login-btn text-lg'>Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register