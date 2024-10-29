import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [action, setAction] = React.useState("Login");
  const [formState, setFormState] = React.useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (action === "Login") {
      try {
        const response = await fetch('http://your-api-endpoint/login', { // Replace with your actual login endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formState.email,
            password: formState.password,
          }),
        });

        if (!response.ok) {
          throw new Error('Login failed!'); // Handle login failure
        }

        const data = await response.json();
        console.log("Logged in successfully:", data);
        
        // Call the onLogin prop function to update App state
        onLogin(data.token); // Assuming the JWT is in data.token
        navigate('/app'); // Redirect to the app page after login
      } catch (error) {
        console.error(error);
        alert('Login failed! Please check your credentials.'); // Show error message to user
      }
    } else {
      console.log("Signing up with:", formState.username, formState.email, formState.password);
      
      // Implement signup logic here (similar to login) if required
      
      alert("Signup successful! You can now log in."); // Optional: show a success message
      setAction("Login"); // Switch to Login action
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
