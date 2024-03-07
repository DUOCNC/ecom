import React from 'react';
import {colors} from 'assets/v2';
import {Layout, Typography} from 'common-ui';
import {useVersion} from 'hook';
import {ScrollView, useWindowDimensions, View} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {normalize} from 'utils/DimensionsUtils';
import {VersionInformationStyle} from './style';

const VersionInformationScreen: React.FC = () => {
  const version = useVersion();
  const {current} = version;
  const width = useWindowDimensions().width;

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Thông tin phiên bản" />
      <Layout.Container>
        <ScrollView style={VersionInformationStyle.container}>
          {current && (
            <React.Fragment>
              <View style={VersionInformationStyle.headerVersion}>
                <Typography
                  textType="medium"
                  type="h3"
                  color={colors.primary.o500}
                  text={`Phiên bản: ${current.name}`}
                />
                <View
                  style={[
                    VersionInformationStyle.viewStatus,
                    VersionInformationStyle.viewCurrent,
                  ]}>
                  <Typography
                    type="h4"
                    color={colors.success.o500}
                    text="Phiên bản hiện tại"
                  />
                </View>
              </View>
              {
                <RenderHTML
                  contentWidth={width - normalize(32)}
                  source={{html: current.description}}
                  tagsStyles={{
                    li: VersionInformationStyle.li,
                  }}
                />
              }
            </React.Fragment>
          )}
        </ScrollView>
      </Layout.Container>
    </Layout.Screen>
  );
};

export default VersionInformationScreen;
