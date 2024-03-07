import {ErrorView, Typography} from 'common-ui';
import {ProductEntity} from 'modules/product/models';
import React from 'react';
import {View} from 'react-native';
import VariantCareView from '../VariantCareView';
import VariantRowInfoView from '../VariantRowInfoView';
import style from './style';
import {MaterialEntity} from 'modules/product/models/entities';

interface Props {
  product: ProductEntity;
  materials: MaterialEntity[];
  onContentChange: (y: number, offsetY: number) => void;
}

const VariantApplicationView: React.FC<Props> = ({
  product,
  materials,
  onContentChange,
}) => {
  const attributes = product.getAttributes();
  const material = product.getMaterialMain(materials);
  return (
    <View
      onLayout={e => {
        onContentChange(e.nativeEvent.layout.y, e.nativeEvent.layout.height);
      }}
      style={style.container}>
      <View style={style.header}>
        <Typography
          textType="medium"
          type="h3"
          style={style.title}
          text="Thông tin sản phẩm"
        />
      </View>
      <View style={style.content}>
        {product.isEmptyAttribute() ? (
          <View style={style.errorView}>
            <ErrorView subTitle="Thông tin chi tiết của sản phẩm đang được phòng WIN cập nhật sau!" />
          </View>
        ) : (
          <View>
            <VariantRowInfoView
              title="Ưu điểm nổi trội"
              value={material.getAdvantages()}
            />
            <VariantRowInfoView
              title="Chất liệu"
              value={
                attributes === null
                  ? ''
                  : attributes
                      .map(x => {
                        const tags = x.getTags();
                        if (!tags) {
                          return x.getAttribute();
                        }
                        return `${
                          tags.tags ? `${tags.tags} : ` : ''
                        }${x.getAttribute()}`;
                      })
                      .join('\n')
                      .replace(/\n/g, '<br />')
              }
            />
            <VariantRowInfoView
              title="Thành phần"
              value={
                attributes === null
                  ? ''
                  : attributes
                      .map(x => {
                        const tags = x.getTags();
                        const material = materials.find(
                          e => e.getId() === x.getAttributeId(),
                        );
                        if (!material) {
                          return '';
                        }
                        const attComponent = material.getComponent();
                        if (!tags) {
                          return attComponent;
                        }
                        return `${
                          tags?.tags ? `${tags?.tags} : ` : ''
                        }${attComponent}`;
                      })
                      .join('\n')
                      .replace(/\n/g, '<br />')
              }
            />
            <VariantRowInfoView title="Ứng dụng" value={material.getUseTo()} />
            <VariantCareView value={product.getCareLabels()} />
          </View>
        )}
      </View>
    </View>
  );
};

export default VariantApplicationView;
