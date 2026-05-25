import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import '../Login/Login.css';

const Signup = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, signUp, googleLogin } = UserAuth();
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password, displayName);
    } catch (error) {
      console.log(error);
      setError(error.message)
    }
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  return (
    <>
      <div className='form_container'>
        <form
          onSubmit={handleSubmit}
          className='form'
        >
          <h1 className='auth_title'>Signup</h1>
          <input
            onChange={(e) => setDisplayName(e.target.value)}
            className='input'
            type='text'
            placeholder='Username'
            autoComplete='username'
            required
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className='input'
            type='email'
            placeholder='Email'
            autoComplete='email'
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className='input'
            type='password'
            placeholder='Password'
            autoComplete='current-password'
            required
          />
          <button className='button'>
            Sign up
          </button>
          <button type="button" className='button' onClick={googleLogin}>
            Sign in with Google
          </button>
          <p>
            <span style={{ color: '#718096' }}>
              Already have an account?
            </span>{' '}
            <Link to='/login'>Log in</Link>
          </p>
          {error ? <p className='error'>{error}</p> : null}
        </form>
      </div>
    </>
  );
};

export default Signup;