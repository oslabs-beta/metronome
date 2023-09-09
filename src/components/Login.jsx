import { useState, useEffect } from 'react';
import { loginUser, checkSession } from '../fetchers/userFetcher';
import { useNavigate, Link } from "react-router-dom";
import Signup from './Signup';

export default function Login() {

	// States for registration
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const navigate = useNavigate();

	// States for checking the errors
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);

    useEffect(()=>{
		// const checkUserSession = async () => {
		// try {
		// 	const res = await checkSession();
		// 	if (res) {
		// 	setIsLoggedIn(true);
		// 	}
		// 	} catch (err) {
		// 	console.log(err);
		// 	}
		// };
		// checkUserSession();
        if(submitted || isLoggedIn){
            navigate("/fileupload")
        }
    }, [submitted, navigate, isLoggedIn])

	// Handling the email change
	const handleEmail = (e) => {
		setEmail(e.target.value);
		setSubmitted(false);
	};

	// Handling the password change
	const handlePassword = (e) => {
		setPassword(e.target.value);
		setSubmitted(false);
	};

	// Handling the form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (email === '' || password === '') {
			setError(true);
		} else {
           await loginUser({email, password})
			setSubmitted(true);
			setError(false);
		}
	};

	// Showing success message
	const successMessage = () => {
		return (
			<div
				className="success"
				style={{
					display: submitted ? '' : 'none',
				}}>
				<h1>User {name} successfully registered!!</h1>
			</div>
		);
	};

	// Showing error message if error is true
	const errorMessage = () => {
		return (
			<div
				className="error"
				style={{
					display: error ? '' : 'none',
				}}>
				<h1>Please enter all the fields</h1>
			</div>
		);
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-sky-400">Login</h1>
			</div>

			{/* Calling to the methods */}
			<div className="messages">
				{errorMessage()}
				{successMessage()}
			</div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" >
			<form className="space-y-6" action="#" method="POST">
				{/* Labels and inputs for form data */}
                <div>
				<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                <div className="mt-2">
				<input onChange={handleEmail} id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                </div>
                <div>
                <div className="flex items-center justify-between">
				<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              </div>
              <div className="mt-2">
				<input onChange={handlePassword} id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
            </div>
				<button onClick={handleSubmit} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
					Submit
				</button>
			</form> 
            <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?
				<Link to={'/signup'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register here!</Link>
            </p>
        </div>
	</div>


	);
}