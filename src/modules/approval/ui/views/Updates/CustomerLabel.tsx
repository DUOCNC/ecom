import {colors} from 'assets/v2';
import {Typography} from 'common-ui';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  require?: boolean;
  text: string;
}
const CustomerLabel: React.FC<Props> = ({text, require}) => {
  return (
    <View style={style.row}>
      <Typography text={text} color={colors.secondary.o500} />
      {require && <Typography text=" *" color={colors.error.o500} />}
    </View>
  );
};

const style = StyleSheet.create({
  container: {},
  row: {flexDirection: 'row'},
  text: {},
});
export default CustomerLabel;
