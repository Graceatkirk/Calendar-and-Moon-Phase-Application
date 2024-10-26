const getMoonPhase = async () => {
    const response = await fetch('http://localhost:3000/api/moon-phase');
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return data;
  };
  
  const MoonPhaseDisplay = () => {
    const [moonPhase, setMoonPhase] = React.useState(null);
  
    React.useEffect(() => {
      const fetchMoonPhase = async () => {
        try {
          const data = await getMoonPhase();
          setMoonPhase(data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchMoonPhase();
    }, []);
  
    if (!moonPhase) return <div>Loading...</div>;
  
    return (
      <div>
        <h2>Moon Phase</h2>
        <p>{moonPhase.phase_name}</p>
        <p>{moonPhase.phase_date}</p>
      </div>
    );
  };