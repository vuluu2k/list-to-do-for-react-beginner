import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { routes } from 'config';
import { setToken } from 'utils/token';

export default function Login() {
  const navigation = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const handleLogIn = data => {
    return axios.post('auth/signin', { email: data.email, password: data.password });
  };

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const login = async () => {
    let data = {
      email: email,
      password: password,
    };
    if (data.email === '' || data.password === '') {
      setMessage('Missing input!!');
      return;
    }
    if (!validateEmail(data.email)) {
      setMessage('Your username must be an email!');
      return;
    }

    try {
      let res = await handleLogIn(data);
      console.log(res);
      if (res && res.status === 200 && res.data.error) {
        setMessage('Wrong email or password');
      }
      if (res && res.status === 200 && !res.data.error) {
        setToken(res.data);
        navigation(routes.todo);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="container-login">
        <div className="login-form">
          <div className="login-label"> Login</div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={e => handleEmail(e)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={e => handlePassword(e)} />
            </Form.Group>

            {message && message !== '' ? <div className="message">{message}</div> : <></>}
            <div className="text-muted fg-pw">Forget password ?</div>
            <div className="btn-login">
              <Button variant="primary" onClick={() => login()}>
                Login
              </Button>
            </div>
            <div className="sign-up-lable">Or Sign Up Using</div>
            <div className="sign-up">
              <Link to={routes.register} className="sign-up-link">
                Sign Up
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
