import React, {
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  ModalPropsIOS,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#00000077',
  },
  mask: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    backgroundColor: '#fff',
    width: '100%',
    overflow: 'hidden',
  },
  draggableContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  draggableIcon: {
    width: 35,
    height: 5,
    borderRadius: 5,
    margin: 10,
    backgroundColor: '#ccc',
  },
});

const SUPPORTED_ORIENTATIONS: ModalPropsIOS['supportedOrientations'] = [
  'portrait',
  'portrait-upside-down',
  'landscape',
  'landscape-left',
  'landscape-right',
];

interface IAutoHeightRBSheetProps {
  animationType?: 'none' | 'fade' | 'slide';
  height?: number;
  minClosingHeight?: number;
  duration?: number;
  closeOnDragDown?: boolean;
  dragFromTopOnly?: boolean;
  closeOnPressMask?: boolean;
  closeOnPressBack?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  customStyles?: {
    wrapper?: ViewStyle;
    container?: ViewStyle;
    draggableIcon?: ViewStyle;
  };
  keyboardAvoidingViewEnabled?: boolean;
}

export type AutoHeightRBSheetRef = {
  close: () => void;
  open: () => void;
};

export type AutoHeightRBSheet = ForwardRefRenderFunction<
  AutoHeightRBSheetRef,
  IAutoHeightRBSheetProps
>;

const AutoHeightRBSheet: AutoHeightRBSheet = (props, ref) => {
  const closeOnPressMask =
    'closeOnPressMask' in props ? props.closeOnPressMask : true;
  const duration = props.duration || 200;
  const [modalVisible, setModalVisibility] = useState(false);
  const [currentHeight, setCurrentHeight] = useState(props.height || 260);
  const [pan] = useState(
    new Animated.ValueXY({
      x: 0,
      y: currentHeight,
    }),
  );

  const setModalVisible = (visible: boolean) => {
    if (visible) {
      setModalVisibility(true);
      Animated.timing(pan, {
        useNativeDriver: false,
        toValue: {x: 0, y: 0},
        duration,
      }).start();
    } else {
      Animated.timing(pan, {
        useNativeDriver: false,
        toValue: {x: 0, y: currentHeight},
        duration,
      }).start(() => {
        setModalVisibility(false);
        if (typeof props.onClose === 'function') {
          props.onClose();
        }
      });
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !!props.closeOnDragDown,
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dy > 0) {
        Animated.event([null, {dy: pan.y}], {useNativeDriver: false})(
          e,
          gestureState,
        );
      }
    },
    onPanResponderRelease: (_e, gestureState) => {
      const distanceToClose = currentHeight * 0.4;

      if (gestureState.dy > distanceToClose || gestureState.vy > 0.5) {
        setModalVisible(false);
      } else {
        Animated.spring(pan, {
          useNativeDriver: false,
          toValue: {x: 0, y: 0},
        }).start();
      }
    },
  });

  const handleChildrenLayout: ViewProps['onLayout'] = event => {
    setCurrentHeight(event.nativeEvent.layout.height);
  };

  const open = () => {
    setModalVisible(true);
  };

  const close = () => {
    setModalVisible(false);
  };

  useImperativeHandle(ref, () => ({
    close,
    open,
  }));

  const animatedViewStyles = {
    transform: pan.getTranslateTransform(),
  };

  return (
    <Modal
      style={{
        height: props.height,
      }}
      transparent
      animationType={props.animationType || 'none'}
      visible={modalVisible}
      supportedOrientations={SUPPORTED_ORIENTATIONS}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <KeyboardAvoidingView
        style={[styles.wrapper, (props.customStyles || {}).wrapper]}>
        <TouchableOpacity
          style={styles.mask}
          activeOpacity={1}
          onPress={() => (closeOnPressMask ? close() : {})}
        />
        <View onLayout={handleChildrenLayout}>
          <Animated.View
            {...(!props.dragFromTopOnly && panResponder.panHandlers)}
            style={[
              styles.container,
              animatedViewStyles,
              (props.customStyles || {}).container,
            ]}>
            {props.closeOnDragDown && (
              <View
                {...(props.dragFromTopOnly && panResponder.panHandlers)}
                style={styles.draggableContainer}>
                <View
                  style={[
                    styles.draggableIcon,
                    (props.customStyles || {}).draggableIcon,
                  ]}
                />
              </View>
            )}
            {props.children || <View />}
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default forwardRef(AutoHeightRBSheet);
