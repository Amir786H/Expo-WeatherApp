import { StatusBar } from "expo-status-bar";
import { Button, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "theme";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon, CalendarDaysIcon, MoonIcon } from "react-native-heroicons/solid";
import { useCallback, useContext, useEffect, useState } from "react";
import { debounce } from "lodash";
import { fetchLocations, fetchWeatherForecast } from "api/weather";
import { weatherImages } from "constants";
import * as Progress from 'react-native-progress';
import { getData, storeData } from "utils/asyncStorage";
import { GlobalContext } from "context/GlobalContext";

export default function HomeScreen() {
    const [showSearch, toggleSearch] = useState(false);
    const [locations, setLocations] = useState([]);
    const [weather, setWeather] = useState({})
    const [loading, setLoading] = useState(true);
    const { state, toggleTheme } = useContext(GlobalContext);

    const handleLocation = (loc) => {
        // console.log('location: ', loc);
        setLocations([]);
        toggleSearch(false);
        setLoading(true);
        fetchWeatherForecast({
            cityName: loc.name,
            days: '7'
        }).then(data => {
            // console.log('got weather data: ', JSON.stringify(data));
            setWeather(data);
            setLoading(false);
            storeData('city', loc.name);
        })
    }

    const handleSearch = value => {
        // console.log('value: ', value);
        if (value.length > 2) {
            fetchLocations({ cityName: value }).then(data => {
                // console.log('got loctions: ', data);
                setLocations(data);
            });
        }
    }

    useEffect(() => {
        fetchMyWeatherData();
    }, [])

    const fetchMyWeatherData = async () => {
        let myCity = await getData('city');
        let cityName = 'Allahabad';

        if (myCity) cityName = myCity;

        fetchWeatherForecast({
            cityName,
            days: '7'
        }).then(data => {
            setWeather(data);
            setLoading(false);
        })
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 1200), [])

    const { current, location } = weather;

    // ae2306f7f4ee4835950193852251005

    return (
        <View className="flex-1 relative">
            <StatusBar style={state.theme === 'light' ? 'dark' : 'light'} />

            <Image blurRadius={state.theme === 'light' ? 70 : 10} source={require("../assets/images/bg.png")}
                className="absolute h-full w-full"
            />

            {
                loading ? (
                    <View className="flex-1 flex-row justify-center items-center">
                        <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
                    </View>
                ) : (
                    <SafeAreaView className="flex flex-1">

                        {/* search section */}
                        <View style={{ height: '7%' }} className="mx-4 relative z-50">
                            <View className="flex-row justify-end items-center rounded-full top-10 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-3xl" style={{ backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent' }}>
                                {
                                    showSearch ? (
                                        <TextInput
                                            placeholder="Search city"
                                            placeholderTextColor={'lightgray'}
                                            onChangeText={handleTextDebounce}
                                            className="pl-6 h-10 pb-1 pt-1 flex-1 text-base text-white"
                                        />
                                    ) : null
                                }

                                <TouchableOpacity
                                    onPress={() => toggleSearch(!showSearch)}
                                    style={{ backgroundColor: theme.bgWhite(0.3) }}
                                    className="rounded-full p-3 m-1" >
                                    <MagnifyingGlassIcon color="white" size={25} />
                                </TouchableOpacity>
                            </View>

                            {
                                locations.length > 0 && showSearch ? (
                                    <View className="absolute w-full bg-gray-300 rounded-3xl mt-28">
                                        {
                                            locations.map((loc, index) => {
                                                let showBorder = index + 1 != locations.length;
                                                let borderClass = showBorder ? 'border-b-2 border-b-gray-400' : '';

                                                return (
                                                    <TouchableOpacity key={index}
                                                        onPress={() => handleLocation(loc)}
                                                        className={"flex-row items-center p-3 border-0" + borderClass}
                                                    >
                                                        <MapPinIcon color="black" size={20} />
                                                        <Text className="text-black text-lg ml-2">{loc?.name}, {loc?.country}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }

                                    </View>
                                ) : null
                            }

                        </View>

                        {/* Toggle Button Section */}
                        {/* <View className="mx-8 top-40 w-1/6 absolute">
                            <MoonIcon className="top-10" color={state.theme === 'light' ? '#000' : '#fff'} size={25} />
                        </View> */}

                        {/* Forecast section */}

                        <View className="mx-4 justify-around flex-1 mb-2">
                            {/* location */}

                            <Text className="text-white text-center text-2xl font-bold">
                                {location?.name},
                                <Text className="text-lg font-semibold text-gray-300">
                                    {" " + location?.country}
                                </Text>
                            </Text>
                            {/* Weather Image with Context Api theme toggle feature */}
                            <TouchableOpacity onPress={toggleTheme}>
                                <View className="flex-row justify-center">
                                    <Image source={weatherImages[current?.condition?.text]}
                                        className="w-52 h-52"
                                    />
                                </View>
                            </TouchableOpacity>
                            {/* Celcius Data */}
                            <View className="space-y-2">
                                <Text className="text-white text-center font-bold text-6xl ml-5">
                                    {current?.temp_c}&#176;
                                </Text>
                                <Text className="text-white text-center text-xl tracking-widest">
                                    {current?.condition?.text}
                                </Text>
                            </View>
                            {/* other stats */}

                            <View className="flex-row justify-between mx-4">
                                {/* make it re-usable component */}
                                <View className="flex-row space-x-2 items-center">
                                    <Image source={require('../assets/icons/wind.png')} className="h-6 w-6" />
                                    <Text className="text-white font-semibold text-base left-2">
                                        {current?.wind_kph}km
                                    </Text>
                                </View>
                                <View className="flex-row space-x-2 items-center">
                                    <Image source={require('../assets/icons/drop.png')} className="h-6 w-6" />
                                    <Text className="text-white font-semibold text-base left-2">
                                        {current?.humidity}%
                                    </Text>
                                </View>
                                <View className="flex-row space-x-2 items-center">
                                    <Image source={require('../assets/icons/sun.png')} className="h-6 w-6" />
                                    <Text className="text-white font-semibold text-base left-2">
                                        {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* forecast for next days */}
                        <View className="mb-2 space-y-3">
                            <View className="flex-row items-center mx-4 space-x-2 bottom-5">
                                <CalendarDaysIcon color="white" size={22} />
                                <Text className="text-white text-base left-2">Daily Forecast</Text>
                            </View>
                            <ScrollView horizontal
                                contentContainerStyle={{ paddingHorizontal: 15 }}
                                showsHorizontalScrollIndicator={false}
                            >
                                {
                                    weather?.forecast?.forecastday?.map((item, index) => {
                                        let date = new Date(item.date);
                                        let options = { weekday: 'long', month: 'long', day: 'numeric' };
                                        let dayName = date.toLocaleDateString('en-US', options);
                                        dayName = dayName.split(',')[0];
                                        return (
                                            <View key={index} className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4 mb-14"
                                                style={{ backgroundColor: theme.bgWhite(0.15) }}>
                                                <Image source={weatherImages[item?.day?.condition?.text]}
                                                    className="h-11 w-11" />
                                                <Text className="text-white">{dayName}</Text>
                                                <Text className="text-white text-xl font-semibold">
                                                    {item?.day?.avgtemp_c}&#176;
                                                </Text>
                                            </View>
                                        )
                                    })
                                }

                            </ScrollView>
                        </View>
                    </SafeAreaView>
                )
            }


        </View >
    )
}