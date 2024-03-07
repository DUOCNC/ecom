import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import {Typography} from 'common-ui';
import style from './style';
import TagFeedbackEntity from 'modules/feedback/ui/views/StatusTagView/TagFeedbackEntity';

interface Props {
  status: string;
}

const StatusTagView: React.FC<Props> = ({status}) => {
  const tag = useMemo(() => {
    return new TagFeedbackEntity(status);
  }, [status]);
  const dynamicContainerStyle = useMemo(() => {
    return {
      backgroundColor: tag.getColorTag().backGroundColor,
      borderColor: tag.getColorTag().borderColor,
    };
  }, [tag]);

  return (
    <Text>
      <View style={[style.container, dynamicContainerStyle]}>
        <Typography
          type="h5"
          color={tag.getColorTag().textColor}
          text={tag.getTextTag()}
        />
      </View>
    </Text>
  );
};
export default StatusTagView;
