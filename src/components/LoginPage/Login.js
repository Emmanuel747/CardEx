import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { userRegister, userLogin } from '../../api/index';

import "./Login.css";

const LoginPage  = () => {
  // const modalSwitcher = () => {
  //   const { path }  = useLocation();
  // }
  //   path.includes("register") ?

  // }

  const userForms = document.getElementById('user_options-forms');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [email, setEmail] = useState("");
  const [errMsgText, setErrMsgText] = useState("");
  const [msgColor, setMsgColor] = useState("");

  // let msgColor;

  // const onFormSubmit = async (e) => {
  //   e.preventDefault();

  // }
  
  const SignupUser = async (e, name, pass, mail) => {
    console.log(repassword, password)
    e.preventDefault();
    if (repassword === password) {    
      try {
        const res = await userRegister(name, pass, mail);
        console.log(res);
        setMsgColor('green')
        setErrMsgText("Thank you for signing up.");
        e.preventDefault();
        
      } catch (err) {
        setErrMsgText(err);
        console.log(err);
        e.preventDefault();

      }
    } else {   
      setMsgColor('red')
      setErrMsgText("Passwords Do not Match");
      e.preventDefault();
    }
  }

  const LoginUser = async (e, name, pass) => {
    console.log(name, pass)
    e.preventDefault();
    try {
      const res = await userLogin(name, pass);
      console.log(res);
      setMsgColor('green')
      setErrMsgText("Welcome back " + name);
      e.preventDefault();

    } catch (err) {
      console.log(err);
      e.preventDefault();
    }
  }

  const rmBounceR = () => {
    userForms.classList.remove('bounceRight');
    userForms.classList.add('bounceLeft');
  }
  const rmBounceL = () => {
    userForms.classList.remove('bounceLeft');
    userForms.classList.add('bounceRight');
  }

  return (
    <section class="user">
      <div class="user_options-container">
        <div class="user_options-text">
          <div class="user_options-unregistered">
            <h2 class="user_unregistered-title">Don't have a CardEX account?</h2>
            <p class="user_unregistered-text">
              Join CardEx now and start trading today!
            </p>
            <button class="user_unregistered-signup" id="signup-button"
              onClick={rmBounceR}
            >
              Sign up
            </button>
          </div>

          <div class="user_options-registered">
            <h2 class="user_registered-title">Have a CardEX account?</h2>
            <p class="user_registered-text">
              Already have an Account? Login Here.
            </p>
            <button 
              class="user_registered-login" 
              id="login-button"
              onClick={rmBounceL}
            >
              Login
            </button>
          </div>
        </div>

        <div class="user_options-forms" id="user_options-forms">
          <div class="user_forms-login">
            <h2 class="forms_title">Login</h2>
            <div id="errMsg" > {errMsgText} </div> 

            {/* The Login Form */}
            <form class="forms_form" onSubmit={(e) => {LoginUser( e, username, password)}}>
              <fieldset class="forms_fieldset">
                <div class="forms_field">
                  <input type="text" class="forms_field-input" required 
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  />
                  <label class="forms_field-label">Username</label>
                </div>
                <div class="forms_field">
                  <input type="password" class="forms_field-input" required 
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                  <label class="forms_field-label">Password</label>
                </div>
              </fieldset>
              <div class="forms_buttons">
                <button type="button" class="forms_buttons-forgot">
                  Forgot password?
                </button>
                <input
                  type="submit"
                  value="Login"
                  class="forms_buttons-action"                 
                />
              </div>
            </form>
          </div>
          <div class="user_forms-signup">
            <h2 class="forms_title">Sign Up</h2>
            <div id="errMsg" style={{ color: msgColor }}> {errMsgText} </div>

            {/* The Sign Up Form */}
            <form class="forms_form" onSubmit={(event) => {SignupUser( event, username, password, email)}}>
              <fieldset class="forms_fieldset">
                <div class="forms_field">
                  <input type="text" class="forms_field-input" required 
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }} 
                  />
                  <label class="forms_field-label"> Username </label>
                </div>
                <div class="forms_field">
                  <input type="text" class="forms_field-input" required 
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }} 
                  />
                  <label class="forms_field-label">Email</label>
                </div>
                <div class="forms_field">
                  <input type="password" class="forms_field-input" required 
                    onChange={(event) => {
                      setPassword(event.target.value);                     
                    }} 
                  />
                  <label class="forms_field-label">Password</label>
                </div>
                <div class="forms_field">
                  <input type="password" class="forms_field-input" required
                    onChange={(e) => {
                      setRepassword(e.target.value);
                    }}
                  />
                  <label class="forms_field-label">Confirm Password</label>
                </div>
              </fieldset>
              <div class="forms_buttons">
                <input
                  type="submit"
                  value="Sign up"
                  class="forms_buttons-action"                 
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>


  );
};

export default LoginPage;