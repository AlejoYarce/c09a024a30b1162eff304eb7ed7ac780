import React from 'react';

import './Toolbar.css';

const toolbar = props => (
  <header className='toolbar'>
    <img
      className="toolbarProfileImg"
      alt="profile"
      src={props.profile.profile_image_url_https} />
    <span className="toolbarProfileName">{props.profile.name}</span>
    <button onClick={props.logout} className='logoutButton'>
      Logout
    </button>
  </header>
);

export default toolbar;
