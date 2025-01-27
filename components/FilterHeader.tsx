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
  rightIcon: ImageSourcePropType;
  label: string;
}

const FilterHeader = ({ leftIcon, rightIcon, label }: Props) => {
  return (
    <View className="flex flex-row justify-between items-center">
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex flex-row bg-primary-200 p-3 rounded-full"
      >
        <Image source={leftIcon} className="size-6" />
      </TouchableOpacity>
      <Text className="font-rubik-medium text-base mr-2 text-black-300">
        {label}
      </Text>
      <Image source={rightIcon} className="size-6" />
    </View>
  );
};

export default FilterHeader;
