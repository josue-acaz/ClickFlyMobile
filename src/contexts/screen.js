import React, {useState, useContext, createContext} from 'react';

export const initialState = {
  store: {},
  dispatch: () => {},
};

const ScreenContext = createContext(initialState);

const ScreenProvider = ({children}) => {
  const [refresh, setRefresh] = useState({
    screen: '',
    value: false,
  });

  function handleRefresh(screen) {
    setRefresh((refr) => ({...refr, ['screen']: screen}));
    setRefresh((refr) => ({...refr, ['value']: !refresh.value}));
  }

  return (
    <ScreenContext.Provider value={{refresh, handleRefresh}}>
      {children}
    </ScreenContext.Provider>
  );
};

function useScreen() {
  const context = useContext(ScreenContext);

  if (!context) {
    throw new Error('useScreen must be used within an ScreenProvider.');
  }

  return context;
}

export {ScreenProvider, useScreen};
