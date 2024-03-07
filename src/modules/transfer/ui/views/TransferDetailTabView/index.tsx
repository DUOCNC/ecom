import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {style} from './style';
import {Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {TransferTabConfigs} from 'modules/transfer/config';
import {TransferEntity} from 'modules/transfer/models/entities';
import {StringUtils} from 'common';
import {TransferTabConfig} from 'modules/transfer/config/TransferTabConfig';

interface Props {
  tab: string;
  onPress: (activeTab: string) => void;
  transfer: TransferEntity;
}

const TransferDetailTabView: FC<Props> = (props: Props) => {
  const {onPress, tab, transfer} = props;

  return (
    <React.Fragment>
      {TransferTabConfigs.map(e => {
        let tabName = e.value;
        if (e.key === TransferTabConfig.PRODUCT) {
          tabName = StringUtils.format(
            'Sản phẩm ({0})',
            transfer.getProductNumbers(),
          );
        }

        return (
          <TouchableOpacity
            key={e.key}
            style={[style.button, tab === e.key && style.active]}
            onPress={() => onPress(e.key)}>
            <Typography
              type="h3"
              text={tabName}
              textType={tab === e.key ? 'medium' : 'regular'}
              color={
                tab === e.key ? colors.primary.o500 : colors.secondary.o500
              }
            />
          </TouchableOpacity>
        );
      })}
    </React.Fragment>
  );
};

export default TransferDetailTabView;
