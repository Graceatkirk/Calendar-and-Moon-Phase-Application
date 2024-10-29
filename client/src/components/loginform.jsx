import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [action, setAction] = React.useState("Login");
  const [formState, setFormState] = React.useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login or signup logic here
    if (action === "Login") {
      console.log("Logging in with:", formState.email, formState.password);
      // Redirect after successful login
      navigate('/app'); // Change to your desired route
    } else {
      console.log("Signing up with:", formState.username, formState.email, formState.password);
      // Redirect after successful signup
      navigate('/app'); // Change to your desired route
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <form className="inputs" onSubmit={handleSubmit}>
        {action === "Sign Up" && (
          <div className="input">
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              value={formState.username} 
              onChange={handleChange} 
              required 
            />
          </div>
        )}
        <div className="input">
          <input 
            type="email" 
            name="email" 
            placeholder="Email ID" 
            value={formState.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="input">
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formState.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        {action === "Login" ? (
          <div className="forgot-password">Forgot Password? <span>Click Here</span></div>
        ) : null}
        <div className="submit-container">
          <button type="submit" className="submit">{action}</button>
          <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
          <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;