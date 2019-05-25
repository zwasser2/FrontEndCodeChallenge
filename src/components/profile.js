import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './profile.css';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class Profile extends Component {
  constructor() {
    super();
    this.state = {};

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange = (event) => {
    const target = event.target.name;
    this.setState({ [target]: event.target.value });
  }

  addValidationMessage(emptyFields) {
    this.setState({ isValid: false });
    this.setState({ message: this.formatErrorMessage(emptyFields)});
  }

  formatErrorMessage(arr) {
    if (arr.length === 1) {
      return capitalizeFirstLetter(arr[0] + ' can not be blank');
    } else if (arr.length === 2) {
      return capitalizeFirstLetter(arr.join(' and ') + ` can not be blank`);
    } else {
      return capitalizeFirstLetter(arr.slice(0, -1).join(', ') + ', and ' + arr.slice(-1) + ` can not be blank`);
    }
  }

  showFormSuccess() {
    this.setState({ isValid: true, message: 'Form Submitted!'});
  }

  initializeApp() {
    if (typeof this.state.name === 'undefined') {
      this.state = {
        name: this.props.profile.name || '',
        gender: this.props.profile.gender || 'Unspecified',
        email: this.props.profile.email || '',
        phone: this.props.profile.phone || '',
        header: this.props.name,
        isValid: false,
        message: ''
      }
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const requiredFields = ['name', 'gender', 'email', 'phone'];

    const emptyFields = requiredFields.filter((element) => (
      this.state[element] === ''
    ));

    if (emptyFields.length) {
      this.addValidationMessage(emptyFields);
    } else {
      this.showFormSuccess();

      console.log({
        name: this.state.name,
        gender: this.state.gender,
        email: this.state.email,
        phone: this.state.phone
      });
    }

  }

  render() {
    this.initializeApp()
    return (
      <div className="app">
        <h1>{this.state.header}</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label className="profile-form__row">
            Name:
            <input
              value = {this.state.name}
              onChange = {this.handleChange}
              className={(!this.state.isValid && this.state.message && this.state.name === '') ? "profile-form__field profile-form__field--invalid" : "profile-form__field"} name="name" type="text"
            />
          </label>
          <label className="profile-form__row">
            Gender:
            <select
              className="profile-form__field profile-form__select" name="gender"
              onChange={this.handleChange}
            >
              <option value="unspecified">Unspecified</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label className="profile-form__row">
            Email:
            <input
              value={this.state.email}
              onChange={this.handleChange}
              className={(!this.state.isValid && this.state.message && this.state.email === '') ? "profile-form__field profile-form__field--invalid" : "profile-form__field"}
              name="email"
              type="text"
            />
          </label>
          <label className="profile-form__row">
            Phone:
            <input
              value={this.state.phone}
              onChange={this.handleChange}
              className={(!this.state.isValid && this.state.message && this.state.phone === '') ? "profile-form__field profile-form__field--invalid" : "profile-form__field"}
              name="phone"
              type="text"
            />
          </label>
          <div className="profile-form__row">
            <input type="submit" value="Save" />
          </div>
          <div className="profile-form__row">
            <div className={!this.state.isValid ? 'profile-form__message--invalid' : ''}>{this.state.message}</div>
            <span
              className="profile-form__message"
            />
          </div>
        </form>
      </div>
    );
  }
}

Profile.defaultProps = {
  profile: {
    name: '',
    gender: '',
    email: '',
    phone: ''
  }
}

Profile.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired
  }),
  name: PropTypes.string.isRequired
}

export default Profile;
