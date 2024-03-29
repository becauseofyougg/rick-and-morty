import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { userStore } from '../stores';
import Button from '../shared/ui/button';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [text, setText] = useState('');
  const [emailDirty, setEmailDirty] = useState<boolean>(false);
  const [passwordDirty, setPasswordDirty] = useState<boolean>(false);
  const [textDirty, setTextDirty] = useState<boolean>(false);
  const [emailError, setEmailError] = useState('invalid field');
  const [passwordError, setPasswordError] = useState('invalid field');
  const [textError, setTextError] = useState('invalid field');
  const [checked, setChecked] = useState<boolean>(false);

  const query = useLocation();
  const isSignup = query.search.includes('signup');

  const handleCheck = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(String(email).toLowerCase())) {
      setEmailError('Email error');
    } else {
      setEmailError('');
    }
  }, [email]);

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 13) {
      setPasswordError('password error');
      if (!e.target.value) {
        setPasswordError('password error');
      }
    } else {
      setPasswordError('');
    }
  };

  const textHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (e.target.value.length < 5 || e.target.value.length > 1000) {
      setTextError('valid.erText');
      if (!e.target.value) {
        setTextError('valid.field');
      }
    } else {
      setTextError('');
    }
  };

  const blurHandler = (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    switch (e.target.name) {
      case 'password':
        setPasswordDirty(true);
        break;
      case 'text':
        setTextDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
    }
  };

  const resetForm = () => {
    setText('');
    setEmail('');
    setPassword('');
  };

  const checkSubmit = () => {
    setEmailDirty(true);
    setTextDirty(true);
  };

  const registration = async () => {
    try {
      const res = await userStore.handleRegister(email, password, text);
      if (checked) {
        localStorage.setItem('email', res?.data.user.email);
        localStorage.setItem('bio', res?.data.user.bio);
      }
      if (res?.status) {
        let path = `/`;
        await navigate(path);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const login = async () => {
    try {
      const res = await userStore.handleLogin(email, password);
      if (checked) {
        localStorage.setItem('email', res?.data.user.email);
        localStorage.setItem('bio', res?.data.user.bio);
      }
      if (res?.status) {
        let path = `/`;
        await navigate(path);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    checkSubmit();
    try {
      isSignup ? await registration() : await login();
    } catch (error) {
      console.error(error);
    } finally {
      resetForm();
    }
  };

  return (
    <div className="w-full h-screen flex items-center bg-slate-300">
      <div className="w-full sm:w-full flex justify-center">
        <div className="shadow-lg rounded-[30px] p-10 sm:p-4  max-w-2xl w-full bg-white flex flex-col gap-5">
          <form action="" onSubmit={handleSubmit}>
            <div className="text-left sm:mt-[10px] text-[30px] sm:text-[24px] font-medium mb-5 text-gray-900 mt-[2px]">
              {isSignup ? 'Sign up' : 'Log in'}
            </div>

            <div className={`mt-3 w-full flex flex-col`}>
              <label className="mb-2 text-gray-700">{'email'}</label>
              <input
                value={email}
                onChange={changeEmail}
                onBlur={blurHandler}
                name="email"
                className={`w-full pl-4 rounded md:pl-[22px] py-[12px] border border-gray-400 placeholder-gray-400 resize-none bg-white ${
                  emailError !== '' && emailDirty ? 'text-red-500' : ''
                }`}
                type="email"
                placeholder={'Enter email'}
              />
              <div className="text-xs font-normal text-red-600 h-8 mt-1">
                {emailDirty && emailError && emailError}
              </div>
            </div>

            <div className="w-full flex flex-col justify-between">
              <div className="w-full flex flex-col">
                <label className="mb-2 text-gray-700">{'password'}</label>
                <input
                  value={password}
                  onChange={passHandler}
                  onBlur={blurHandler}
                  name="password"
                  type="password"
                  className={`w-full pl-4 md:pl-[22px] py-[12px] border border-gray-400 rounded placeholder-gray-400 bg-white ${'rounded'}  ${
                    passwordError !== '' && passwordDirty ? 'text-red-500' : ''
                  }`}
                  placeholder={'Enter password'}
                />
                <div className="text-lg text-red-600 h-8 mt-1">
                  {passwordDirty && passwordError && passwordError}
                </div>
              </div>

              {isSignup && (
                <div className={`rounded md:mb-[24px] sm:mb-[30px] mt-5 w-full flex-col `}>
                  <label className="text-gray-700">{'Biography'}</label>
                  <textarea
                    onChange={textHandler}
                    value={text}
                    onBlur={blurHandler}
                    name="text"
                    className={`mt-2 rounded resize-none pl-4 md:pl-[22px] placeholder-gray-400  border border-gray-400 w-full ${
                      textError !== '' && textDirty ? 'text-red-500' : ''
                    }`}
                    rows={6}
                    placeholder={'Tell us about yourself'}
                  />
                  <div className="text-lg text-red-600 h-8">
                    {emailDirty && textError && textError}
                  </div>
                </div>
              )}
            </div>
            <div className="text-lg text-red-600 h-8">{userStore.authError}</div>
          </form>
          <label>
            <input type="checkbox" checked={checked} onChange={handleCheck} />
            <span className="ml-4">Remember me</span>
          </label>
          <Button onClick={handleSubmit} text={isSignup ? 'Sign up' : 'Log in'} />
        </div>
      </div>
    </div>
  );
};

export default observer(AuthPage);
