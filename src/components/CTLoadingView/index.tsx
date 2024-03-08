import {sunhouse_logo_black} from 'assets/images';
import React from 'react';
import {Image, View} from 'react-native';
import {CircleSnail} from 'react-native-progress';
import styles from './styles';
import {Colors} from 'assets/colors';
import {normalize} from 'utils/DimensionsUtils';

const LoadingView: React.FC = () => {
  return (
    <View style={styles.viewLoading}>
      <Image style={styles.img} source={sunhouse_logo_black} />
      <CircleSnail
        color={Colors.Secondary}
        style={styles.loading}
        size={normalize(70)}
        thickness={normalize(5)}
      />
    </View>
  );
};

export default LoadingView;
