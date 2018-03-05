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
    };
    const { data } = await axios.get('/tweets', config);
    this.props.setTweets(data || []);
  };

  onChangeContent = (event) => {
    this.props.setContent(event.target.value);
  };

  newTweet = async () => {
    if (this.props.content) {
      const config = {
        headers: {
          'X-Access-Token': localStorage.accessToken,
          'X-Access-Token-Secret': localStorage.accessTokenSecret,
          'screen_name': localStorage.screenName,
        }
      };
      await axios.post('tweet', { content: this.props.content }, config);

      this.props.setContent('');
      this.refreshList();
    }
  }

  render() {
    let tweetList = <Spinner />;
    let actionsContainer = null;
    const length = !this.props.tweets ? 0 : this.props.tweets.length;

    if (this.props.tweets && this.props.profile) {
      tweetList = this.props.tweets.map(tweet => (
        <Tweet tweetData={tweet} key={tweet.id} />
      ));

      actionsContainer = (
        <Aux>
          <h3 className='headerTitle'>
            Showing {length} tweets from {this.props.profile.screen_name}
          </h3>
          <div className='titleContainer'>
            <button onClick={this.refreshList} className='refreshButton'>
              Refresh Tweets
          </button>
          </div>
          <div className='postContainer'>
            <textarea type='text'
              maxLength="280"
              placeholder="Hey... what's going on?"
              className='contentInput'
              value={this.props.content}
              onChange={this.onChangeContent} />
            <button onClick={this.newTweet} className='newTweetButton'>
              New Tweet
            </button>
          </div>
        </Aux>
      );
    }

    return (
      <Aux>
        <Toolbar logout={this.logout} profile={this.props.profile || {}} />
        {actionsContainer}
        {tweetList}
      </Aux>
    );
  };
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    tweets: state.tweets,
    content: state.content,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTweets: (data) => dispatch({ type: 'SET_TWEETS', data }),
    getProfile: () => dispatch({ type: 'GET_PROFILE' }),
    setContent: (content) => dispatch({ type: 'SET_CONTENT', content }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tweets);
