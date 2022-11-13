import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

export default function SignUp() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [message, setMessage] = useState('');
  const [isSignUpSuccessed, setIsSignUpSuccessed] = useState(false);

  const handleSingupUsername = e => {
    setUserName(e.target.value);
  };
  const handleSingupEmail = e => {
    setEmail(e.target.value);
  };
  const handleSingupPassword = e => {
    setPassword(e.target.value);
  };
  const handleSingupConfirmPw = e => {
    setConfirmPw(e.target.value);
  };

  const handleSignUp = async data => {
    return axios.post('auth/signup', { name: data.name, email: data.email, password: data.password });
  };

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const signUp = async () => {
    let data = {
      name: userName,
      email: email,
      password: password,
    };
    if (data.name === '' || data.email === '' || data.password === '' || confirmPw === '') {
      setMessage('Missing input!!');
      return;
    }
    if (!validateEmail(data.email)) {
      setMessage("Your email input isn't an email!");
      return;
    }
    if (data.password !== confirmPw) {
      setMessage('Your confirmation password is incorrect');
      return;
    }

    try {
      let res = await handleSignUp(data);
      if (res && !res.data.success) {
        setMessage(res.data.message);
      }
      if (res && res.data.success) {
        setIsSignUpSuccessed(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {isSignUpSuccessed && <Navigate to="/" replace={true} />}
      <div className="container-login">
        <div className="login-form">
          <div className="login-label"> Register User</div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" onChange={e => handleSingupUsername(e)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={e => handleSingupEmail(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="" placeholder="Password" onChange={e => handleSingupPassword(e)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="" placeholder="Password" onChange={e => handleSingupConfirmPw(e)} />
            </Form.Group>
            {message && message !== '' ? <div className="message">{message}</div> : <></>}
            <div className="btn-login">
              <Button variant="primary" onClick={signUp}>
                Sign Up
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
