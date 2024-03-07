import React, {useCallback, useEffect, useState} from 'react';
import {ErrorType, Layout, Typography} from 'common-ui';
import {TouchableOpacity} from 'react-native';
import {mobileService} from 'services';
import {colors} from 'assets/v2';

interface Props {
  onVerifyVersion: () => void;
}

const VerifyVersionView: React.FC<Props> = ({children, onVerifyVersion}) => {
  const [error, setError] = useState<ErrorType | false>(false);
  const [msgError, setMsgError] = useState<string | undefined>(undefined);
  const verifyVersion = useCallback(() => {
    mobileService.getVersion(
      () => {
        onVerifyVersion();
      },
      (code, msg) => {
        setError(code);
        setMsgError(msg);
      },
    );
  }, [onVerifyVersion]);
  useEffect(() => {
    verifyVersion();
  }, [verifyVersion]);
  return (
    <Layout.Error
      bottom={
        <TouchableOpacity
          onPress={() => {
            setError(false);
            verifyVersion();
          }}>
          <Typography
            color={colors.primary.o500}
            textType="medium"
            text="Thử lại"
          />
        </TouchableOpacity>
      }
      subTitle={msgError}
      error={error}>
      <Layout.Container alignItems="center" justifyContent="center">
        {children}
      </Layout.Container>
    </Layout.Error>
  );
};

export default VerifyVersionView;
