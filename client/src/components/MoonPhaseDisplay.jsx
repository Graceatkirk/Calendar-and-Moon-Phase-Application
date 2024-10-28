import axios from 'axios';

  const options = {
    method: 'GET',
    url: 'https://moon-phase.p.rapidapi.com/calendar',
    params: {format: 'html'},
    headers: {
      'x-rapidapi-key': 'REACT_APP_RAPIDAPI_KEY',
      'x-rapidapi-host': 'moon-phase.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }

  