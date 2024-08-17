import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from './theme/colors'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { MapPinIcon, CalendarDaysIcon } from 'react-native-heroicons/solid'
import { debounce } from 'lodash'
import { fetchForecastData, fetchLocationData } from './api/weather'
import * as Progress from 'react-native-progress'
import { getData, storeData } from './utils/asyncStorage'

export default function App() {
    const [showSearch, toggleSearch] = useState(false);
    const [locations, setLocations] = useState([]);
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(true);


    const handleLocation = (loc) => {
        // console.log("location ", loc);
        setLocations([]);
        toggleSearch(false);
        setLoading(true);
        fetchForecastData({
            city: loc.name,
            days: '7'
        }).then(data => {
            setWeather(data);
            setLoading(false);
            storeData('city', loc.name);
            // console.log('got forecats data : ', data);
        })
    }

    const handleSearch = (value) => {
        // fetch locations from api when ser search 
        if (value.length > 2) {
            fetchLocationData({ city: value }).then(data => {
                setLocations(data);
            })
        }
    }

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const fetchWeatherData = async () => {
        let currentCity = await getData('city');
        let cityName = "colombo";
        if (currentCity) cityName = currentCity;
        fetchForecastData({
            city: cityName,
            days: '7'
        }).then(data => {
            setWeather(data);
            setLoading(false);
        })
    }


    const handleTextDebounce = useCallback(debounce(handleSearch, 100), []);
    const { current, location } = weather;

    return (
        <View className='flex-1 relative '>
            <StatusBar style='light' />
            <Image
                source={require('./assets/images/background.png')}
                blurRadius={4}
                className='absolute h-full w-full'
            />
            {
                loading ? (
                    <View className='flex-1 flex-row justify-center items-center'>
                        <Progress.CircleSnail thickness={13} size={150} color={'white'} />
                    </View>
                ) : (
                    <SafeAreaView className='flex flex-1'>
                        {/* search section */}
                        <View style={{ height: '7%' }} className='mx-4 relative z-50 mt-12'>
                            <View className='flex-row justify-end items-center rounded-full' style={{ backgroundColor: showSearch ? theme.white(0.5) : 'transparent' }} >
                                {
                                    showSearch ? (
                                        <TextInput
                                            onChangeText={handleTextDebounce}
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
                                                        <Text className='text-black text-lg ml-2'>{loc?.name}, {loc?.country}</Text>
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
                                {location?.name},
                                <Text className='text-lg font-semibold text-gray-300'>
                                    {" " + location?.country}
                                </Text>
                            </Text>
                            {/* imgae for weather */}
                            <View className='flex-row justify-center'>
                                {/* <Image className='h-52' source={require('../assets/images/partlyCloudy.png')} /> */}
                                <Image className='h-52 w-52 ' source={{ uri: 'https:' + current?.condition?.icon }} />
                            </View>

                            {/* degree / celcius */}
                            <View className='space-y-2'>
                                <Text className='text-center font-bold text-white text-6xl ml-5'> {current?.temp_c}&#176; </Text>
                                <Text className='text-center text-white text-xl tracking-widest'>{current?.condition?.text} </Text>
                            </View>
                            {/* stats */}
                            <View className='flex-row justify-between mx-4'>
                                <View className='flex-row space-x-2 items-center'>
                                    <Image
                                        source={require('./assets/images/sun.png')}
                                        className='h-6 w-6'
                                        style={{ tintColor: 'white' }}
                                    />
                                    <Text className='text-white font-semibold text-base'>{weather?.forecast?.forecastday[0]?.astro?.sunrise}</Text>
                                </View>
                                <View className='flex-row space-x-2 items-center'>
                                    <Image
                                        source={require('./assets/images/drop.png')}
                                        className='h-6 w-6'
                                        style={{ tintColor: 'white' }}
                                    />
                                    <Text className='text-white font-semibold text-base'>{current?.humidity}</Text>
                                </View>
                                <View className='flex-row space-x-2 items-center'>
                                    <Image
                                        source={require('./assets/images/wind.png')}
                                        className='h-6 w-6'
                                        style={{ tintColor: 'white' }}
                                    />
                                    <Text className='text-white font-semibold text-base'>{current?.wind_kph}</Text>
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

                                {
                                    weather?.forecast?.forecastday?.map((item, index) => {
                                        let date = new Date(item.date);
                                        let options = { weekday: 'long' };
                                        let dayName = date.toLocaleDateString('en-US', options);
                                        dayName = dayName.split(',')[0];
                                        return (
                                            <View
                                                key={index}
                                                className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4'
                                                style={{ backgroundColor: theme.white(.25) }}
                                            >
                                                {/* <Image source={require('../assets/images/heavyRain.png')} className='h-11 w-11' /> */}
                                                <Image source={{ uri: 'https:' + item?.day?.condition?.icon }} className='h-11 w-11' />
                                                <Text className='text-white'>{dayName}</Text>
                                                <Text className='text-white text-xl font-semibold'>{item?.day?.avgtemp_c}&#176;</Text>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                    </SafeAreaView>
                )
            }
        </View>
    )
}