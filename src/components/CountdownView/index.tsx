import React from 'react';
import CountDown from 'react-native-countdown-component';

interface Props {
  m: number;
  onFinish?: () => void;
}
const CountdownView: React.FC<Props> = ({m, onFinish}) => {
  return (
    <CountDown
      size={10}
      until={m * 60}
      onFinish={() => {
        onFinish && onFinish();
      }}
      timeToShow={['H', 'M', 'S']}
      timeLabels={{m: null, s: null}}
    />
  );
};

export default CountdownView;
