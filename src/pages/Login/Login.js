import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';
import queryString from 'query-string';

import './Login.css';
import Spinner from '../../components/Spinner/Spinner';

class Login extends Component {
  async componentWillMount() {
    const { oauth_token, oauth_verifier } = queryString.parse(this.props.location.search);
    if (oauth_token) {
      const { data } = await axios.post('/connect', { oauth_token, oauth_verifier });
      this.props.setUserProfile(data);
      this.props.history.push('/tweets');
    }
  };

  loginWithTwitter = async () => {
    let { data } = await axios.get('/oauth_request');
    const { authUrl } = data;
    window.location.replace(authUrl);
  };

  render() {
    let content = (
      <button
        onClick={this.loginWithTwitter}
        className='loginButton'>
        Login
      </button>
    );

    const { oauth_token } = queryString.parse(this.props.location.search);
    if (oauth_token) {
      content = <Spinner />;
    }

    return (
      <div className='loginContainer'>
        {content}
      </div>
    );
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserProfile: (data) => dispatch({ type: 'SET_USER_PROFILE', data }),
  };
};

export default connect(null, mapDispatchToProps)(Login);
