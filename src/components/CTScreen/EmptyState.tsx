import {Font} from 'components/Base/Text';
import CTTypography from 'components/CTTypography';
import React, {ReactNode} from 'react';
import {Image, Text, View} from 'react-native';
import {EmptyStateStyle} from './styles';
import HyberLink from 'react-native-hyperlink';

export interface EmptyStateProps {
  icon: any;
  title: string;
  subTitle?: string;
  other?: ReactNode;
  linkText?: ((url: string) => string) | string;
  openUrl?: (url: string, text?: string) => void;
}

const EmptyState: React.FC<EmptyStateProps> = (props: EmptyStateProps) => {
  const {icon, title, subTitle, other} = props;
  return (
    <View style={EmptyStateStyle.container}>
      <Image source={icon} />
      <View style={EmptyStateStyle.rowTitle}>
        <CTTypography.Text
          style={EmptyStateStyle.title}
          font={Font.Medium}
          level="2"
          text={title}
        />
      </View>
      <View style={EmptyStateStyle.rowSubTitle}>
        <HyberLink
          onPress={props.openUrl}
          linkText={props.linkText}
          linkStyle={EmptyStateStyle.link}>
          <Text style={EmptyStateStyle.text}>{subTitle}</Text>
        </HyberLink>
      </View>
      {other && <View style={EmptyStateStyle.other}>{other}</View>}
    </View>
  );
};

export default EmptyState;
