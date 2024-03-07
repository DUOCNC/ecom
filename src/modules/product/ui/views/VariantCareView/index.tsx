import {ic_information, ic_tick_double} from 'assets/images';
import {Typography} from 'common-ui';
import {CareLabelEntity} from 'modules/product/models';
import React, {createRef, useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import style from './style';
import {productService} from 'modules/product/services';
import ModalCareView, {ModalCareRef} from '../ModalCareView';

interface Props {
  value: Array<string>;
}

const VariantCareView: React.FC<Props> = ({value}) => {
  const [data, setData] = useState<Array<CareLabelEntity>>([]);
  const careRef = createRef<ModalCareRef>();
  const onShowInfo = () => {
    careRef.current?.open();
  };
  useEffect(() => {
    setData(productService.getCareLabels(value));
  }, [value]);
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Image source={ic_tick_double} />
        <Typography
          type="h4"
          style={style.txtTitle}
          textType="medium"
          text="Bảo quản"
        />
        <TouchableOpacity onPress={onShowInfo}>
          <Image source={ic_information} />
        </TouchableOpacity>
      </View>
      <View style={style.content}>
        {data.map(item => (
          <TouchableOpacity
            onPress={onShowInfo}
            style={style.btnImage}
            key={item.getId()}>
            <Image style={style.image} source={item.getImage()} />
          </TouchableOpacity>
        ))}
      </View>
      <ModalCareView cares={data} ref={careRef} />
    </View>
  );
};

export default VariantCareView;
