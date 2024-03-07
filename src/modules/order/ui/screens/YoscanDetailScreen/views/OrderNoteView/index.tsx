import {TextInput, Typography} from 'common-ui';
import React from 'react';
import {View} from 'react-native';
import style from './style';

interface Props {
  note: string;
}

const OrderNoteView: React.FC<Props> = ({note}) => {
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Typography
          style={style.txtTitle}
          type="h3"
          textType="medium"
          text="Ghi chú"
        />
      </View>
      <View style={style.row}>
        <TextInput
          value={note}
          multiline
          editable={false}
          lineHeight={18}
          style={style.noteInput}
          size={14}
          fontWeight="400"
          textAlignVertical="top"
          placeholder="VD: Giao hàng gấp trước 31/08/2022"
        />
      </View>
    </View>
  );
};

export default OrderNoteView;
