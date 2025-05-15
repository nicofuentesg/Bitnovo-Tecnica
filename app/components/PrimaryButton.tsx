import React from 'react';
import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native';

interface PrimaryButtonProps {
  text: string;
  enabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, enabled = true, onPress, className = '' }) => {
  return (
    <TouchableOpacity
      className={`rounded-lg py-3 px-6 bg-accent ${!enabled ? 'opacity-50' : ''} ${className}`}
      onPress={onPress}
      disabled={!enabled}
      activeOpacity={0.8}
    >
      <Text className="text-white text-lg font-mulish-bold text-center">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton; 