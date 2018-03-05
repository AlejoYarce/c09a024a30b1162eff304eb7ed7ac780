import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';

import Aux from '../../hoc/Aux';
import Toolbar from '../../components/Toolbar/Toolbar';
import Tweet from '../../components/Tweet/Tweet';
import Spinner from '../../components/Spinner/Spinner';
import './Tweets.css';

class Tweets extends Component {
  async componentWillMount() {
    this.props.getProfile();

    const config = {
      headers: {
        'X-Access-Token': localStorage.accessToken,
        'X-Access-Token-Secret': localStorage.accessTokenSecret,
        'screen_name': localStorage.screenName,
      }
    }
    const { data } = await axios.get('/tweets', config);
    this.props.setTweets(data || []);
  };

  logout = () => {
    this.props.history.push('/');
    localStorage.clear();
  };

  refreshList = async () => {
    this.props.setTweets(null);

    const config = {
      headers: {
        'X-Access-Token': localStorage.accessToken,
        'X-Access-Token-Secret': localStorage.accessTokenSecret,
        'screen_name': localStorage.screenName,
      }
    }
    const { data } = await axios.get('/tweets', config);
    this.props.setTweets(data || []);
  };

  render() {
    let tweetList = <Spinner />;
    let title = null;
    const length = !this.props.tweets ? 0 : this.props.tweets.length;

    if (this.props.tweets && this.props.profile) {
      tweetList = this.props.tweets.map(tweet => (
        <Tweet tweetData={tweet} key={tweet.id} />
      ));

      title = (
        <h3 className='headerTitle'>
          Showing {length} tweets from {this.props.profile.screen_name}
        </h3>
      );
    }

    return (
      <Aux>
        <Toolbar logout={this.logout} profile={this.props.profile || {}} />
        {title}
        <div className='buttonContainer'>
          <button onClick={this.refreshList} className='refreshButton'>
            Refresh Tweets
        </button>
        </div>
        {tweetList}
      </Aux>
    );
  };
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    tweets: state.tweets,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTweets: (data) => dispatch({ type: 'SET_TWEETS', data }),
    getProfile: () => dispatch({ type: 'GET_PROFILE' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tweets);
