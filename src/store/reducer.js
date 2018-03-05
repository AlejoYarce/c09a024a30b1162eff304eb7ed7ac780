const initialState = {
  profile: null,
  accessToken: null,
  tweets: null,
  content: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_PROFILE':
      const { profile, accessToken, accessTokenSecret } = action.data;
      localStorage.profile = JSON.stringify(profile);
      localStorage.accessToken = accessToken;
      localStorage.accessTokenSecret = accessTokenSecret;
      localStorage.screenName = profile.screen_name;

      return {
        ...state,
        profile,
        accessToken: accessToken,
      };
    case 'SET_TWEETS':
      return {
        ...state,
        tweets: action.data,
      };
    case 'GET_PROFILE':
      const storedProfile = localStorage.getItem('profile');
      const profileParsed = JSON.parse(storedProfile);

      return {
        ...state,
        profile: profileParsed,
      };
    case 'SET_CONTENT':
      return {
        ...state,
        content: action.content,
      }
  }
  return state;
};

export default reducer;
