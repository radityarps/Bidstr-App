import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";

import icons from "../../constants/icons";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="projects"
          options={{
            title: "Projects",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.projects}
                color={color}
                name="Projects"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
