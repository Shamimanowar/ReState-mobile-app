import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import icons from "@/constants/icons";
import images from "@/constants/images";
import FilterHeader from "./FilterHeader";
import Filters from "./Filters";
import Button from "./Button";

interface Props {
  closer: () => void;
  modalOpen: boolean;
}

const PopModal = ({ closer, modalOpen }: Props) => {
  const [bedNo, setBedNo] = useState<number>(1);
  const [bathNo, setBathNo] = useState<number>(1);

  const handleBad = (type: string) => {
    if (type === "-") {
      setBedNo((prev) => {
        return prev <= 1 ? prev : prev - 1;
      });
    } else {
      setBedNo((prev) => prev + 1);
    }
  };

  const handleBath = (type: string) => {
    if (type === "-") {
      setBathNo((prev) => {
        return prev <= 1 ? prev : prev - 1;
      });
    } else {
      setBathNo((prev) => prev + 1);
    }
  };

  const handleModal = () => {
    closer();
  };

  const windowHeight = Dimensions.get("window").height;

  const modalHeight = 4 * (windowHeight / 5);

  const [value, setValue] = useState(0);
  return (
    <View className="flex justify-center items-center flex-1">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={handleModal}
      >
        <View className="flex-1 justify-end">
          <View
            className="bg-white py-7 px-5 flex flex-col justify-start rounded-t-3xl"
            style={{ height: modalHeight }}
          >
            <FilterHeader
              leftIcon={icons.backArrow}
              rightText="Reset"
              label="Filter"
              goBack={closer}
            />

            <View className="mt-3 w-full h-48 flex flex-col justify-start relative">
              <Text className="font-rubik-bold text-xl leading-6 text-black-300 mt-5">
                Price Range
              </Text>
              <Image
                source={images.barChart}
                className="w-full h-48"
                resizeMode="contain"
              />

              <View className="absolute top-36 left-28">
                <Text className="text-2xl font-bold">The Slider Goes here</Text>
              </View>
            </View>
            <View className="">
              <Text className="font-rubik-bold text-xl leading-6 text-black-300 mt-3">
                Property Type
              </Text>
              <Filters flexWrap lastIndex={6} />
            </View>

            <Text className="font-rubik-bold text-xl leading-6 text-black-300 mt-7">
              Home Details
            </Text>

            <View className="flex flex-col gap-4 mt-5">
              <View className="flex flex-row justify-between items-center">
                <Text className="text-sm text-black-200 font-rubik">
                  Bedrooms
                </Text>
                <View className="flex flex-row gap-5 items-center">
                  <TouchableOpacity onPress={() => handleBad("-")}>
                    <Text className="text-xl font-rubik-bold text-black-200">
                      {" "}
                      -{" "}
                    </Text>
                  </TouchableOpacity>

                  <Text className="text-base font-rubik text-black-300">
                    {bedNo}
                  </Text>

                  <TouchableOpacity onPress={() => handleBad("+")}>
                    <Text className="text-xl font-rubik-bold text-black-200">
                      {" "}
                      +{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="flex flex-row justify-between items-center">
                <Text className="text-sm text-black-200 font-rubik">
                  Bathrooms
                </Text>
                <View className="flex flex-row gap-5 items-center">
                  <TouchableOpacity onPress={() => handleBath("-")}>
                    <Text className="text-xl font-rubik-bold text-black-200">
                      {" "}
                      -{" "}
                    </Text>
                  </TouchableOpacity>

                  <Text className="text-base font-rubik text-black-300">
                    {bathNo}
                  </Text>

                  <TouchableOpacity onPress={() => handleBath("+")}>
                    <Text className="text-xl font-rubik-bold text-black-200">
                      {" "}
                      +{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <Text className="font-rubik-bold text-xl leading-6 text-black-300 mt-6 mb-6">
              Building Size
            </Text>

            <View className="flex flex-row justify-center items-center">
              <Text>Slider Goes here</Text>
            </View>

            <View className="flex h-16 justify-center items-center w-full mt-16">
              <Button title="Set Filter" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PopModal;
