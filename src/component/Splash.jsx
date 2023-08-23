

import { useEffect, useState } from 'react';
import Onboarding from '../pages/Onboarding';
import Welcome from '../pages/Welcome';

const Splash = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    setTimeout(() => {
      setLoading(true);
    }, 3000); 

    
    return () => {
      setLoading(false);
    };
  }, []);

  if (!loading) {
   
    return (
        <Welcome />
        );
    }
    
    // Once the loading is finished, render the actual content of your app
    return (
      <Onboarding />
  );
};

export default Splash;