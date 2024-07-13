import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '../components/TabBar'

const _layout = () => {
  return (
    <Tabs
      tabBar={props => <TabBar{...props} />}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: "Home",
          headerShown: false //hide header for this tab
        }}
      />
      <Tabs.Screen
        name='location'
        options={{
          title: "Locations"
        }}
      />
      <Tabs.Screen
        name='setting'
        options={{
          title: "Settings"
        }}
      />
    </Tabs>
  )
}

export default _layout