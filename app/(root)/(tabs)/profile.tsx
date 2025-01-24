import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/appwrite";

interface SettingsItemsProps {
  icon: ImageSourcePropType;
  label: string;
  onPress?: () => void;
  textStyles?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  label,
  onPress,
  showArrow,
  textStyles,
}: SettingsItemsProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row justify-between items-center py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-7" />
      <Text
        className={`mt-1.5 font-rubik-medium text-lg text-black-300 ${textStyles}`}
      >
        {label}
      </Text>
    </View>

    {/* Arrow icon */}
    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("Success", "You have been logged out successfully");
      refetch();
    } else {
      Alert.alert("Error", "An error occurred while logging out");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-28 px-7"
      >
        <View className="flex flex-row justify-between items-center mt-5">
          <Text className="font-rubik-bold text-xl">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>
        {/* Profile image section */}
        <View className="flex justify-center items-center mt-5">
          <View className="flex flex-col items-center mt-5 rounded-full">
            {/* edit and avatar icon placing */}
            <View className="relative">
              <Image
                source={{ uri: user?.avatar || images.avatar }}
                className="size-44 relative rounded-full"
              />
              <TouchableOpacity className="absolute bottom-0.5 right-1">
                <Image source={icons.edit} className="size-9" />
              </TouchableOpacity>
            </View>
            <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
          </View>
        </View>

        {/* Profile link section */}
        <View className="flex flex-col mt-10">
          <SettingsItem icon={icons.calendar} label="My Booking" showArrow />
          <SettingsItem icon={icons.wallet} label="Payments" showArrow />
          {/* {settings.slice(0, 2).map((setting, index) => (
            <SettingsItem
              key={index}
              icon={setting.icon}
              label={setting.title}
              showArrow
            />
          ))} */}
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.slice(2).map((setting, index) => (
            <SettingsItem
              key={index}
              icon={setting.icon}
              label={setting.title}
              showArrow
            />
          ))}
        </View>

        {/* Logout button */}
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          <SettingsItem
            icon={icons.logout}
            label="Logout"
            onPress={handleLogout}
            textStyles="text-danger"
            showArrow={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
