import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { router } from "expo-router";

interface Props {
  leftIcon: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  label: string;
  rightText?: string;
  rightTextStyle?: string;
  goBack?: () => void;
}

const FilterHeader = ({
  leftIcon,
  rightIcon,
  label,
  rightText,
  goBack,
}: Props) => {
  return (
    <View className="flex flex-row justify-between items-center">
      <TouchableOpacity
        onPress={goBack ? goBack : () => router.back()}
        className="flex flex-row bg-primary-200 p-3 rounded-full"
      >
        <Image source={leftIcon} className="size-6" />
      </TouchableOpacity>
      <Text className="font-rubik-medium text-base mr-2 text-black-300">
        {label}
      </Text>
      {rightText && (
        <Text className={`text-sm text-primary-300 font-rubik`}>
          {rightText}
        </Text>
      )}
      {rightIcon && <Image source={rightIcon} className="size-6" />}
    </View>
  );
};

export default FilterHeader;
