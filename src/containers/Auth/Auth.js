import React, { Component } from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import is from 'is_js';
import axios from 'axios';

class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: '',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    }
  }

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };

    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9pA69DiLls03KgYWa53LiKaB0qQD7dZg', authData);
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };

    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9pA69DiLls03KgYWa53LiKaB0qQD7dZg', authData);
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  submitHandler = event => {
    event.preventDefault();
  }

  validateControl(value, validation) {
    if (!validation) return true;
    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    const isFormValid = Object.keys(formControls).every(name => formControls[name].valid);

    this.setState({ formControls, isFormValid });

  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render() {

    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form
            className={classes.AuthForm}
            onSubmit={this.submitHandler}>

            {this.renderInputs()}

            <Button
              type='succsess'
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}>
              Войти
            </Button>

            <Button type='primary' onClick={this.registerHandler} disabled={!this.state.isFormValid}>Зарегистрироваться</Button>

          </form>
        </div>
      </div>
    );
  }
}

export default Auth;

