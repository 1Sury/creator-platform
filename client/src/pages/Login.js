import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleLogin = async () => {
        try {
          console.log('Login payload:', { username, password });
          const response = await axios.post('http://localhost:5000/api/login', {
            username: username.trim(),
            password: password.trim()
          });
          localStorage.setItem('token', response.data.token);
          setIsAuthenticated(true);
          navigate('/chat');
        } catch (err) {
          console.error('Login error:', err.response?.data || err.message);
          setError('Invalid credentials');
        }
      };

    return ( 
        <div className = "min-h-screen flex items-center justify-center bg-background dark:bg-darkBackground" >
        <div className = "chatgpt-card w-full max-w-md animate-slide-up" >
        <h2 className = "text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white" > Login to Creator Platform </h2> {
            error && <p className = "text-red-500 mb-4 text-center animate-fade-in" > { error } </p>}
             <div className = "mb-4" >
                <
                input
            type = "text"
            placeholder = "Username"
            value = { username }
            onChange = {
                (e) => setUsername(e.target.value) }
            className = "chatgpt-input" />
                </div> 
                <div className = "mb-6" >
                <
                input
            type = "password"
            placeholder = "Password"
            value = { password }
            onChange = {
                (e) => setPassword(e.target.value) }
            className = "chatgpt-input" />
                </div> 
                <button
            onClick = { handleLogin }
            className = "chatgpt-button w-full bg-gradient-to-r from-secondary to-primary" >
                Login 
                </button> 
                </div> 
                </div>
        );
    }

    export default Login;