import React, { FC, useEffect } from 'react';

import { userStore } from './stores';
import RouterTree from 'routes/RouterTree';

export const App: FC = () => {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      userStore.checkAuth();
    }
  }, []);

  return <RouterTree />;
};

export default App;
