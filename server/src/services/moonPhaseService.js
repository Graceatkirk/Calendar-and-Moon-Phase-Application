export const getMoonPhase = async () => {
    const url = 'https://moon-phase.p.rapidapi.com/calendar?format=html';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'moon-phase.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      return result;
    } catch (error) {
      console.error('Error fetching moon phase:', error);
      throw error;
    }
  };
  