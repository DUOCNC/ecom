import {Colors} from 'assets/colors';
import {colors} from 'assets/v2';
import {DimentionUtils, Typography} from 'common-ui';
import {Font} from 'components/Base/Text';
import CTTypography from 'components/CTTypography';
import {tabs} from 'modules/approval/config';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';

interface Props {
  active: string;
  onPress: (k: string) => void;
}
const ApprovalTabView: React.FC<Props> = ({active, onPress}) => {
  const isActiveTab = (activeTab: string) => {
    return active === activeTab;
  };
  return (
    <React.Fragment>
      <FlatList
        style={style.itemContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={tabs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                onPress(item.key);
              }}
              key={index}>
              <View
                style={[
                  style.statusElement,
                  {
                    borderColor:
                      item.key === active
                        ? colors.primary.o500
                        : colors.secondary.o300,
                  },
                ]}>
                <Typography
                  textType={item.key === active ? 'medium' : 'regular'}
                  text={item.title}
                  color={
                    item.key === active
                      ? colors.primary.o500
                      : colors.secondary.o900
                  }
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {tabs.map(e => {
        return (
          <TouchableOpacity
            key={e.key}
            style={[style.button, isActiveTab(e.key) && style.active]}
            onPress={() => onPress(e.key)}>
            <CTTypography.Text
              text={e.title}
              font={isActiveTab(e.key) ? Font.Medium : Font.Regular}
              style={[style.text, isActiveTab(e.key) && style.textActive]}
            />
          </TouchableOpacity>
        );
      })}
    </React.Fragment>
  );
};
const style = StyleSheet.create({
  container: {},
  row: {flexDirection: 'row', paddingTop: DimentionUtils.scale(8)},
  active: {
    borderBottomWidth: DimentionUtils.scale(2),
    borderBottomColor: Colors.Blue,
  },
  text: {color: Colors.SubText, flex: 1},
  textActive: {
    color: Colors.Blue,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: DimentionUtils.scale(10),
    paddingHorizontal: DimentionUtils.scale(0),
  },
  itemContainer: {
    paddingHorizontal: DimentionUtils.scale(18),
  },
  statusElement: {
    borderWidth: 1,
    borderRadius: DimentionUtils.scale(40),
    paddingHorizontal: DimentionUtils.scale(12),
    paddingVertical: DimentionUtils.scale(8),
    marginRight: DimentionUtils.scale(12),
  },
});
export default ApprovalTabView;
