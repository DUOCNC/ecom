import {Font} from 'components/Base/Text';
import CTTypography from 'components/CTTypography';
import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {ReportTabButtonCf} from '../../ReportConfig';
import {ReportTabButtonStyle} from './style';

interface Props {
  idActive: number;
  onPress: (activeTab: number) => void;
}

const ReportTabButton: FC<Props> = (props: Props) => {
  const {onPress, idActive} = props;
  return (
    <>
      {ReportTabButtonCf.map((e, i) => {
        return (
          <TouchableOpacity
            key={e.id}
            style={[
              ReportTabButtonStyle.button,
              idActive === i && ReportTabButtonStyle.active,
            ]}
            onPress={() => onPress(i)}>
            <CTTypography.Text
              level="2"
              text={e.title}
              font={idActive === i ? Font.Medium : Font.Regular}
              style={[
                ReportTabButtonStyle.text,
                idActive === i && ReportTabButtonStyle.textActive,
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </>
  );
};

export default ReportTabButton;
