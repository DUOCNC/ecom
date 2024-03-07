import React, {FC, useMemo} from 'react';
import {useAppSelector} from 'hook/CustomReduxHook';
import MainStack from './screens/MainStack';

const AppStack: FC = () => {
  const infoReducer = useAppSelector(state => state.info);
  console.log('infoReducer', infoReducer);
  
  const app = useMemo(() => {
    return <MainStack />;
  }, []);

  return app;
};

export default AppStack;
