import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from '../theme/colors'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { MapPinIcon, CalendarDaysIcon } from 'react-native-heroicons/solid'

const Home = () => {
    const [showSearch, toggleSearch] = useState(false);
    const [locations, setLocations] = useState([1, 2, 3, 4])

    const handleLocation = (loc) => {
        console.log("location ", loc);
    }
    return (
        <View className='flex-1 relative '>
            <StatusBar style='light' />
            <Image
                source={require('../assets/images/background.png')}
                blurRadius={4}
                className='absolute h-full w-full'
            />
            <SafeAreaView className='flex flex-1'>
                {/* search section */}
                <View className='mx-4 relative z-50 top-0'>
                    <View className='flex-row justify-end items-center rounded-full' style={{ backgroundColor: showSearch ? theme.white(0.5) : 'transparent' }} >
                        {
                            showSearch ? (
                                <TextInput
                                    placeholder='search city'
                                    placeholderTextColor={'lightgray'}
                                    className='pl-6 h-10 pb-1 flex-1 text-black'>
                                </TextInput>
                            ) : null
                        }
                        <TouchableOpacity
                            onPress={() => toggleSearch(!showSearch)}
                            className='rounded-full p-3 m-1'
                            style={{ backgroundColor: theme.white(0.3) }}
                        >
                            <MagnifyingGlassIcon color={'black'} size="25" />
                        </TouchableOpacity>
                    </View>
                    {
                        locations.length > 0 && showSearch ? (
                            <View className='absolute w-full top-16 rounded-3xl bg-gray-300'>
                                {
                                    locations.map((loc, index) => {
                                        let showBorder = index + 1 != locations.length;
                                        let borderClass = showBorder ? 'border-b-2 border-b-gray-400' : '';
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                className={"flex-row items-center border-0 p-3 px-4 mb-1 " + borderClass}
                                                onPress={() => handleLocation(loc)}
                                            >
                                                <MapPinIcon size="20" color="gray" />
                                                <Text className='text-black text-lg ml-2'>London, United Kingdom</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        ) : null
                    }
                </View>
                {/* content */}
                <View className='mx-4 flex  justify-around flex-1 mb-2'>
                    {/* location */}
                    <Text className='text-white text-center font-bold text-2xl'>
                        Rome,
                        <Text className='text-lg font-semibold text-gray-300'>
                            Italy
                        </Text>
                    </Text>
                    {/* imgae for weather */}
                    <View className='flex-row justify-center'>
                        <Image className='h-52' source={require('../assets/images/partlyCloudy.png')} />
                    </View>
                    {/* degree / celcius */}
                    <View className='space-y-2'>
                        <Text className='text-center font-bold text-white text-6xl ml-5'> 23&#176; </Text>
                        <Text className='text-center text-white text-xl tracking-widest'> Partly Cloudy </Text>
                    </View>
                    {/* stats */}
                    <View className='flex-row justify-between mx-4'>
                        <View className='flex-row space-x-2 items-center'>
                            <Image
                                source={require('../assets/images/sun.png')}
                                className='h-6 w-6'
                                style={{ tintColor: 'white' }}
                            />
                            <Text className='text-white font-semibold text-base'>6:15 AM</Text>
                        </View>
                        <View className='flex-row space-x-2 items-center'>
                            <Image
                                source={require('../assets/images/drop.png')}
                                className='h-6 w-6'
                                style={{ tintColor: 'white' }}
                            />
                            <Text className='text-white font-semibold text-base'>35%</Text>
                        </View>
                        <View className='flex-row space-x-2 items-center'>
                            <Image
                                source={require('../assets/images/wind.png')}
                                className='h-6 w-6'
                                style={{ tintColor: 'white' }}
                            />
                            <Text className='text-white font-semibold text-base'>45Kkm</Text>
                        </View>
                    </View>
                </View>
                {/* next days */}
                <View className='mb-9 space-y-3'>
                    <View className='flex-row items-center mx-5 space-x-2'>
                        <CalendarDaysIcon color={'white'} size={'22'} />
                        <Text className='text-white text-base'>Daily Forecast</Text>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                    >
                        <View
                            className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4'
                            style={{ backgroundColor: theme.white(.25) }}
                        >
                            <Image source={require('../assets/images/heavyRain.png')} className='h-11 w-11' />
                            <Text className='text-white'>Monday</Text>
                            <Text className='text-white text-xl font-semibold'>13&#176;</Text>
                        </View>

                        <View
                            className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4'
                            style={{ backgroundColor: theme.white(.25) }}
                        >
                            <Image source={require('../assets/images/heavyRain.png')} className='h-11 w-11' />
                            <Text className='text-white'>Monday</Text>
                            <Text className='text-white text-xl font-semibold'>13&#176;</Text>
                        </View>

                        <View
                            className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4'
                            style={{ backgroundColor: theme.white(.25) }}
                        >
                            <Image source={require('../assets/images/heavyRain.png')} className='h-11 w-11' />
                            <Text className='text-white'>Monday</Text>
                            <Text className='text-white text-xl font-semibold'>13&#176;</Text>
                        </View>
                        <View
                            className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4'
                            style={{ backgroundColor: theme.white(.25) }}
                        >
                            <Image source={require('../assets/images/heavyRain.png')} className='h-11 w-11' />
                            <Text className='text-white'>Monday</Text>
                            <Text className='text-white text-xl font-semibold'>13&#176;</Text>
                        </View>
                        <View
                            className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4'
                            style={{ backgroundColor: theme.white(.25) }}
                        >
                            <Image source={require('../assets/images/heavyRain.png')} className='h-11 w-11' />
                            <Text className='text-white'>Monday</Text>
                            <Text className='text-white text-xl font-semibold'>13&#176;</Text>
                        </View>
                        <View
                            className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4'
                            style={{ backgroundColor: theme.white(.25) }}
                        >
                            <Image source={require('../assets/images/heavyRain.png')} className='h-11 w-11' />
                            <Text className='text-white'>Monday</Text>
                            <Text className='text-white text-xl font-semibold'>13&#176;</Text>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default Home