import { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface BottomSheetBackgroundProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export const BottomSheetBackground = ({ style, children }: BottomSheetBackgroundProps) => (
  <View
    style={[
      {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#A259FF',
        borderRadius: 28,
        borderStyle: 'dashed',
        marginHorizontal: 12,
        marginBottom: 32,
        marginTop: 10,
        flex: 1,
        // Sombra para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 8,
        // Sombra para Android
        elevation: 8,
      },
      style,
    ]}
  >
    {children}
  </View>
);