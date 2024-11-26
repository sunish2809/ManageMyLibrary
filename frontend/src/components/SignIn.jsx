import 'bootstrap/dist/css/bootstrap.min.css';
import './SignIn.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const API_URL = "https://managemylibrary.onrender.com"// Ensure this is using HTTPS for production
//const API_URL = "http://localhost:3000"; // Adjust if necessary
const SignIn = () => {
  const [signinData, setSignInData] = useState({
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target; // Use 'name' instead of 'id'
    setSignInData((prevData) => ({ ...prevData, [name]: value })); // Update with 'name'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/signin`, signinData, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      const { token } = response.data;
      localStorage.setItem('token', token);

      // Navigate to inbox after successful sign-in
      navigate('/app');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Check your details';
      setErrorMsg(errorMessage);
    }
  };

  // Redirect if already authenticated
  if (localStorage.getItem('token')) {
    navigate('/app');
  }

  return (
    <div className="signin">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        {errorMsg && <div className="alert alert-danger" role="alert">{errorMsg}</div>}
        <div className="form-floating">
          <input 
            type="email" 
            className="form-control" 
            name="email"  // Use 'name' attribute
            placeholder="name@example.com"
            value={signinData.email}
            onChange={handleChange} 
          />
          <label htmlFor="email">Email address</label>
        </div>

        <div className="form-floating">
          <input 
            type="password" 
            className="form-control" 
            name="password"  // Use 'name' attribute
            placeholder="Password"
            value={signinData.password}
            onChange={handleChange} 
          />
          <label htmlFor="password">Password</label>
        </div>

        <button className="btn w-100 py-2" type="submit">Sign In</button>
         <div className='footer'>
          <div>Don't have an account?</div>
          {/* <a href="/signup">Sign Up</a> */}
          <button className='footer-btn' type="button" onClick={() => navigate('/signup')}>Sign Up</button>
         </div>
      </form>
    </div>
  );
};

export default SignIn;
