import {ThemeStyle} from 'assets/theme';
import {Font} from 'components/Base/Text/enums';
import {CTButton} from 'components/Button';
import CTFLastList from 'components/CTFlatList';
import CTTypography from 'components/CTTypography';
import {StoreFullDto} from 'model/dto/ReportService/ReportDto';
import React from 'react';
import {ListRenderItem, View} from 'react-native';
import {bsStyle} from '../../styles';
import {Styles} from './style';
import {useAuth} from 'providers/contexts/AuthContext';

type Props = {
  onPress: () => void;
};

const BSReportTopInfo: React.FC<Props> = (props: Props) => {
  const {onPress} = props;
  const {locations} = useAuth();

  const renderStoreItem: ListRenderItem<StoreFullDto> = ({item}) => {
    return (
      <View style={Styles.item}>
        <CTTypography.Text
          text={`${item}`}
          numberOfLines={2}
          ellipsizeMode="tail"
        />
      </View>
    );
  };

  return (
    <View style={bsStyle.container}>
      <View style={bsStyle.title}>
        <CTTypography.Text
          text="Giải thích dữ liệu"
          level="2"
          style={bsStyle.titleText}
          font={Font.Medium}
        />
      </View>
      <View style={bsStyle.flex1}>
        <View style={Styles.titleContent}>
          <CTTypography.Text
            level="2"
            font={Font.Medium}
            text="Dữ liệu bạn đang xem là tổng hợp dữ liệu các cửa hàng mà bạn trực thuộc bao gồm:"
          />
        </View>
        {locations && locations.length > 0 && (
          <CTFLastList
            data={locations.map(e => e.name)}
            disableRefresh={true}
            renderItem={renderStoreItem}
            ItemSeparatorComponent={() => (
              <View style={ThemeStyle.separator16} />
            )}
          />
        )}
      </View>
      <View style={bsStyle.rowBottom}>
        <CTButton
          type="primary"
          font={Font.Medium}
          text="Đã hiểu"
          level="2"
          onPress={onPress}
          style={{flex: 1}}
        />
      </View>
    </View>
  );
};

export default BSReportTopInfo;
