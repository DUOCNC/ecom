import {TextInput, Typography} from 'common-ui';
import React from 'react';
import {View} from 'react-native';
import style from './style';

interface Props {
  onChangeNote: (note: string) => void;
  note: string;
}

const OrderNoteView: React.FC<Props> = ({onChangeNote, note}) => {
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
          onChangeText={onChangeNote}
          value={note}
          multiline
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
