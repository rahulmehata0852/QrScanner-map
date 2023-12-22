import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Button, StyleSheet, View, Text } from 'react-native';
import * as Location from "expo-location"
import { ActivityIndicator } from 'react-native-paper';

export default function Map() {

    const [err, seterr] = useState(null)
    const [mapRegion, setMapRegion] = useState(null)


    const userLocation = async () => {
        let a = await Location.requestForegroundPermissionsAsync();
        if (a.status !== "granted") {
            seterr("Permision to access location was denied")
            return;
        }
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
        setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
        console.log(location.coords.latitude, location.coords.longitude);
    }



    useEffect(() => {
        userLocation()
    }, [])

    if (mapRegion === null) return <View style={{ flexDirection: "row", height: "100%", width: "auto", justifyContent: "center", alignItems: "center" }} >
        <ActivityIndicator />
        <Text style={{ margin: 5 }}>Loading ...</Text>

    </View>

    return mapRegion && (
        <View style={styles.container}>
            <MapView
                region={mapRegion}
                style={styles.map} >
                <Marker coordinate={mapRegion} title='Marker' />
            </MapView>
            <Button title='Get Location' onPress={userLocation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        marginTop: 130,
        width: '100%',
        height: '75%',
    },
});
