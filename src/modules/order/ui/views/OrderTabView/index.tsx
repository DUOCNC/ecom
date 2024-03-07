import React from 'react';
import {TouchableOpacity, View, Image, Animated} from 'react-native';
import style from './style';
import {Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {ic_close, ic_right} from 'assets/images';
import {TabProps} from 'modules/order/models/request';

interface Props {
  tabs: Array<TabProps>;
  activeTab: number;
  goToPage: (index: number) => void;
  removeTab: (key: string, index: number) => void;
  addTab: () => void;
}
const OrderTabView: React.FC<Props> = ({
  tabs,
  activeTab,
  goToPage,
  removeTab,
  addTab,
}) => {
  const firstTab = activeTab === 0;
  const lastTab = tabs.length === activeTab + 1;
  const {FlatList} = Animated;
  const action = {
    goBack: () => {
      if (firstTab) {
        return;
      }
      goToPage(activeTab - 1);
    },
    nextTab: () => {
      if (lastTab) {
        return;
      }
      goToPage(activeTab + 1);
    },
  };

  return (
    <View style={style.tabBar}>
      <TouchableOpacity
        style={style.tab}
        onPress={action.goBack}
        disabled={firstTab}>
        <Image
          source={ic_right}
          style={[
            style.actionLeft,
            {
              tintColor: firstTab
                ? colors.secondary.o300
                : colors.secondary.o500,
            },
          ]}
        />
      </TouchableOpacity>
      <FlatList
        style={style.tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={tabs}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={index}
            style={[style.tab, index === activeTab ? style.activeTab : null]}
            onPress={() => goToPage(index)}>
            <TouchableOpacity
              style={style.close}
              onPress={() => removeTab(item.key, index)}>
              <Image source={ic_close} style={style.close} width={8} />
            </TouchableOpacity>
            <Typography style={style.tabText} text={item.title} />
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={style.tab}
        onPress={action.nextTab}
        disabled={lastTab}>
        <Image
          source={ic_right}
          style={{
            tintColor: lastTab ? colors.secondary.o300 : colors.secondary.o500,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          style.addTabButton,
          tabs.length === 3 && style.backgroundDisable,
        ]}
        onPress={addTab}
        disabled={tabs.length === 3}>
        <Typography
          style={style.addTabButtonText}
          text="+"
          type="h2"
          color={colors.base.white}
        />
      </TouchableOpacity>
    </View>
  );
};

export default OrderTabView;
