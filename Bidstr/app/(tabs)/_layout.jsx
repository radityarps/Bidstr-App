import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";

import icons from "../../constants/icons";

const TabIcon = ({ icon, color, name, focused, style, classImg }) => {
  return (
    <View className={style ? style : "flex items-center justify-center gap-2"}>
      <Image
        source={icon}
        resizeMode={classImg ? "center" : "contain"}
        tintColor={color}
        className={classImg ? classImg : "w-[24px] h-[24px]"}
      />
      {name ? (
        <Text
          className={`${focused ? "font-semibold" : "font-regular"} text-xs`}
          style={{ color: color }}
        >
          {name}
        </Text>
      ) : null}
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#F6B203",
          tabBarInactiveTintColor: "#585C61",
          tabBarStyle: { backgroundColor: "#FFFFFF", height: 65 },
        }}
      >
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
        <Tabs.Screen
          name="workers"
          options={{
            title: "Workers",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.workers}
                color={color}
                name="Workers"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            headerShown: false,
            tabBarIcon: ({ color, focused, style }) => (
              <TabIcon
                icon={icons.chat}
                style="flex justify-center items-center bg-white shadow-sm shadow-black rounded-full top-[-25px] p-[5px]"
                classImg="bg-secondary w-[8px] h-[8px] p-7 rounded-full"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: "Orders",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.orders}
                color={color}
                name="Orders"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
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
