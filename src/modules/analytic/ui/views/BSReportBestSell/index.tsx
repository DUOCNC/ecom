import {Colors} from 'assets/colors';
import {Font} from 'components/Base/Text/enums';
import CTTypography from 'components/CTTypography';
import {ReportTopSellItemConfig} from 'modules/analytic/config';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import ReportItem from 'ui/view/ReportComponent/ReportItem';
import {bsStyle} from './style';

type Props = {
  onPress: (screen: string, type: string | undefined) => void;
};

const BSReportBestSell: React.FC<Props> = (props: Props) => {
  const {onPress} = props;
  return (
    <View style={bsStyle.container}>
      <View style={bsStyle.title}>
        <CTTypography.Text
          style={{color: Colors.Gray900}}
          font={Font.Medium}
          text="Chọn báo cáo"
          level="2"
        />
      </View>
      <View style={[bsStyle.content, bsStyle.flex1]}>
        {ReportTopSellItemConfig.map(e => {
          return (
            <TouchableOpacity
              key={e.getId()}
              onPress={() => {
                onPress(e.getScreen(), e.getType());
              }}>
              <ReportItem
                title={e.getTitle()}
                screen={e.getScreen()}
                subTitle={e.getSubTitle()}
                icon={e.getIcon()}
                id={e.getId()}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BSReportBestSell;
