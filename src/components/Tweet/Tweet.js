import React from 'react';

import './Tweet.css';

const tweet = props => (
  <div className='tweetContainer'>
    <div className="tweetUser">
      <img className="tweetUserAvatar"
        src={props.tweetData.user.profile_image_url_https} alt="" />
      <div className="tweetUserName">
        {props.tweetData.user.name}
        <span>@{props.tweetData.user.screen_name}</span>
      </div>
    </div>
    <p className="tweetBody">{props.tweetData.text}</p>
    <div className="tweetActions">
      <span>{props.tweetData.retweet_count} retweets</span>
    </div>
  </div>
);

export default tweet;
