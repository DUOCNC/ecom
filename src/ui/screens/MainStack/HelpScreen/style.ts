import { Colors } from "assets/colors";
import { Size } from "assets/theme";
import { StyleSheet } from "react-native";
import { normalize } from "utils/DimensionsUtils";

const HelpStyle = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  btn: {
    paddingVertical: normalize(8),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(18),
  },
  itemText: {
    marginHorizontal: normalize(12),
  },
  modal: {
    backgroundColor: Colors.Transparent,
  },
  btnModal: {
    flexDirection: 'row',
    backgroundColor: Colors.White,
    height: Size.DefaultButtonHeight,
    alignItems: 'center',
    paddingHorizontal: normalize(16),
    marginHorizontal: normalize(8),
    borderRadius: normalize(8),
  },
  btnCancel: {
    marginTop: normalize(8),
    justifyContent: 'center',
  },
  txtBtn: {
    color: Colors.Blue,
  },
  txtCall: {
    marginLeft: normalize(18),
  }
});

export {HelpStyle};