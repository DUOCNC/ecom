import {Font} from 'components/Base/Text/enums';
import CTTypography from 'components/CTTypography';
import React from 'react';
import {View} from 'react-native';
import InventoryItemDetailViewStyle from './style';

interface InventoryItemDetailProps {
  title: string;
  value: string;
  highlight?: boolean;
}

const InventoryItemView: React.FC<InventoryItemDetailProps> = (
  props: InventoryItemDetailProps,
) => {
  const {title, value, highlight} = props;
  return (
    <View style={InventoryItemDetailViewStyle.item}>
      <CTTypography.Text
        text={title}
        style={[
          InventoryItemDetailViewStyle.text,
          highlight && InventoryItemDetailViewStyle.highlight,
        ]}
      />
      <CTTypography.Text
        text={value}
        font={highlight ? Font.Medium : Font.Regular}
        style={[
          InventoryItemDetailViewStyle.value,
          highlight && InventoryItemDetailViewStyle.highlightValue,
        ]}
      />
    </View>
  );
};

export default InventoryItemView;
