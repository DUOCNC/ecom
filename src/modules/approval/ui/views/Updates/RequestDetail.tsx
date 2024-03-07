import {ic_plus_circle, ic_x_close_circle} from 'assets/images';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {style} from './style';
import {DimentionUtils, Typography} from 'common-ui';
import {colors} from 'assets/v2';

type RequestDetailProps<T> = {
  detail: T[];
  onAddDetailItem?: () => void;
  onRemoveDetailItem?: (itemIndex: number) => void;
};

export function RequestDetail<T>({
  children,
  detail,
  onAddDetailItem,
  onRemoveDetailItem,
}: React.PropsWithChildren<RequestDetailProps<T>>) {
  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      // @ts-ignore
      return React.cloneElement<RequestDetailItemProps>(child, {
        key: index,
        closable: detail.length > 1,
        onClose: () => onRemoveDetailItem?.(index),
      });
    }
  });
  return (
    <View>
      {childrenWithProps}
      {onAddDetailItem && (
        <TouchableOpacity style={style.row} onPress={onAddDetailItem}>
          <Image source={ic_plus_circle} style={style.imageCircle} />
          <Typography
            style={style.labelIcon}
            text="Thêm thời gian"
            color={colors.secondary.o500}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

type RequestDetailItemProps = {
  closable?: boolean;
  onClose?: () => void;
};

export function RequestDetailItem({
  children,
  closable,
  onClose,
}: React.PropsWithChildren<RequestDetailItemProps>) {
  return (
    <View style={style.detailItem}>
      {closable && (
        <TouchableOpacity onPress={onClose} style={style.iconClose}>
          <Image
            source={ic_x_close_circle}
            style={{
              width: DimentionUtils.scale(20),
              height: DimentionUtils.scale(20),
            }}
          />
        </TouchableOpacity>
      )}
      {children}
    </View>
  );
}
