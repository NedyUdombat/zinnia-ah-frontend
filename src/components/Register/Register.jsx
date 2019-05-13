/* eslint-disable no-console */
import React, { Component } from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// reducers
import { signupUser } from '../../store/modules/auth';

// helper functions
import { validate } from '../../utils/formValidator';

// components
import Button from '../presentationals/Button/Button';
import Image from '../presentationals/Image/Image';
import Loader from '../presentationals/Loader/Loader';

// styles
import '../../components/presentationals/AuthenticationCard/AuthenticationCard.scss';
import '../../components/presentationals/Form.scss';

// images
import GoogleIcon from '../../assets/images/google-icon.svg';
import FacebookIcon from '../../assets/images/facebook-icon.svg';
import TwitterIcon from '../../assets/images/twitter-icon.svg';

export class Register extends Component {
  state = {
    userCredentials: {
      email: '',
      password: '',
      username: '',
    },
    validationErrors: [],
    invalidFields: [],
  };

  userInputHandler = event => {
    const { validationErrors } = this.state;
    const errors = validate(
      { [event.target.name]: event.target.value },
      validationErrors,
    );

    this.setState(
      {
        userCredentials: {
          ...this.state.userCredentials,
          [event.target.name]: event.target.value,
        },
        validationErrors: errors,
      },
      () => {
        this.handleInvalidFields();
      },
    );
  };

  handleInvalidFields = () => {
    const { validationErrors, userCredentials } = this.state;
    const errors = [...validationErrors];
    const fields = Object.keys(userCredentials);
    const invalidFields = [];

    errors.forEach(error => {
      fields.forEach(field => {
        if (error.includes(field) && !invalidFields.includes(field)) {
          invalidFields.push(field);
        }
      });
    });

    this.setState({
      invalidFields,
    });
  };

  submitHandler = async event => {
    event.preventDefault();

    await this.validateForm();

    const { validationErrors } = this.state;

    if (validationErrors.length === 0) {
      this.submitForm();
    }
  };

  validateForm = () => {
    const { validationErrors, userCredentials } = this.state;

    const newValidationErrors = validate(
      {
        username: userCredentials.username,
        email: userCredentials.email,
        password: userCredentials.password,
      },
      validationErrors,
    );

    this.setState(
      {
        validationErrors: newValidationErrors,
      },
      () => this.handleInvalidFields(),
    );
  };

  submitForm = () => {
    const { userCredentials } = this.state;
    this.props.signupUser({
      ...userCredentials,
    });

    this.setState({
      userCredentials: {
        ...userCredentials,
        password: '',
      },
    });
  };

  render() {
    const { isLoading, errorResponse, successResponse } = this.props.auth;
    const { invalidFields } = this.state;
    successResponse.status === 'success' &&
      swal('congratulations', successResponse.message, 'success');
    return (
      <div>
        {isLoading && <Loader text="please wait" size="large" />}

        <form id="form" className="form" onSubmit={this.submitHandler}>
          <div className="form-group">
            <input
              data-test="username"
              className={`form-control ${
                invalidFields.includes('username') ? 'error' : ''
              }`}
              placeholder="Username"
              onChange={this.userInputHandler}
              value={this.state.userCredentials.username}
              name="username"
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Email"
              className={`form-control ${
                invalidFields.includes('email') ? 'error' : ''
              }`}
              type="email"
              onChange={this.userInputHandler}
              value={this.state.userCredentials.email}
              name="email"
            />
          </div>
          <div className="form-group">
            <input
              className={`form-control ${
                invalidFields.includes('password') ? 'error' : ''
              }`}
              placeholder="Password"
              type="password"
              onChange={this.userInputHandler}
              value={this.state.userCredentials.password}
              name="password"
            />
          </div>
          {this.state.validationErrors.length > 0 && (
            <div className="ui negative message">
              {this.state.validationErrors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          {errorResponse.length > 0 && (
            <div className="ui negative message">
              {errorResponse.map(error => (
                <p key={error.errors || error.message}>
                  {error.errors || error.message}
                </p>
              ))}
            </div>
          )}

          <Button type="submit" value="GET STARTED" className="btn-dark" />
        </form>
        <div className="d-flex or-div">
          <hr className="hr" />
          <p className="or">OR</p>
          <hr className="hr" />
        </div>
        <div className="icon-container">
          <div className="icon-card">
            <Image src={GoogleIcon} />
          </div>
          <div className="icon-card">
            <Image src={FacebookIcon} />
          </div>
          <div className="icon-card">
            <Image src={TwitterIcon} />
          </div>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  signupUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  { signupUser },
)(Register);
