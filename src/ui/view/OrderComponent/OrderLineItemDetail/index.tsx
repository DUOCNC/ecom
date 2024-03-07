import {ic_placeholder_6080} from 'assets/images';
import {ThemeStyle} from 'assets/theme';
import CTImage from 'components/CTImage';
import CTTypography from 'components/CTTypography';
import {LineItemViewer} from 'model/viewer/LineItemViewer';
import React from 'react';
import {View} from 'react-native';
import OrderItemDetailStyle from './style';
import {getMediaUrl} from 'utils/MediaUtils';

interface OrderLineItemDetailProps {
  data: LineItemViewer;
  index: number;
  max: number;
}

const OrderLineItemDetail: React.FC<OrderLineItemDetailProps> = ({
  data,
  index,
  max,
}) => {
  return (
    <View>
      <View style={OrderItemDetailStyle.itemContainer}>
        <CTImage
          style={OrderItemDetailStyle.imgItem}
          source={{uri: getMediaUrl(data.variant_image)}}
          placeholder={ic_placeholder_6080}
        />
        <View style={[OrderItemDetailStyle.itemRight]}>
          <CTTypography.Text
            numberOfLines={2}
            ellipsizeMode="tail"
            level="2"
            text={data.name}
          />
          <View style={OrderItemDetailStyle.rowSku}>
            <CTTypography.Text
              style={OrderItemDetailStyle.txtSubText}
              level="3"
              text={`Mã ${data.sku}`}
            />
            <CTTypography.Text
              level="3"
              style={OrderItemDetailStyle.quantity}
              text={`${data.quantity}`}
            />
          </View>
          <View style={OrderItemDetailStyle.rowPrice}>
            {data.have_promotion && (
              <CTTypography.Text
                level="2"
                style={OrderItemDetailStyle.txtPrice}
                text={data.price}
              />
            )}
            <CTTypography.Text
              level="2"
              style={OrderItemDetailStyle.txtBlue}
              text={data.price_promotion}
            />
          </View>
        </View>
      </View>
      {index !== max - 1 && <View style={ThemeStyle.separator16} />}
    </View>
  );
};

export default OrderLineItemDetail;
