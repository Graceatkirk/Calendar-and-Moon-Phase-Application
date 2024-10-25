const getMoonPhase = async () => {
    const response = await fetch('http://localhost:3000/api/moon-phase');
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return data;
  };
  