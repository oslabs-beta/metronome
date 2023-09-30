import React from 'react';
import { useNavigate } from 'react-router';

const Logout = () => {

    const navigate = useNavigate();
    function logout() {
        document.cookie = "id=; expires=thu, 01 jan 1970 00:00:00 gmt";
        document.cookie = "user=; expires=thu, 01 jan 1970 00:00:00 gmt";
        navigate("/")
    }
    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={logout}>Log out</button>
        </div>
    )
}

export default Logout;