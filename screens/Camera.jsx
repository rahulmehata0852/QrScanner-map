import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Linking, ScrollView, RefreshControl } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Cameras = () => {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions(null);
    const [scanData, setScanData] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [scanError, setScanError] = useState(false);
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        if (scanData) {
            console.log('Scanned data:', scanData);
            setScanning(false);
            setScanError(false);

            if (scanData.data) {
                Linking.openURL(scanData.data)
            }

        }

    }, [scanData]);

    useEffect(() => {
        setScanData(null)
    }, [])

    const handleBarcodeScanned = ({ type, data }) => {
        try {
            setScanning(true);
            setTimeout(() => {
                setScanData({ type, data });
            }, 2000);
        } catch (error) {
            setScanError(true);
            setScanning(false); s
            console.error('Error scanning barcode:', error);
        }
    };


    const useee = e => {
        setRefreshing(true);
        setScanData(null);

        // Simulating a refreshing action with setTimeout (replace this with your actual refreshing logic)
        setTimeout(() => {
            setRefreshing(false);
        }, 2000); // Replace 
    }


    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
        setScanData(null)
    };


    if (scanData !== null) return <>

        <View style={styles.scanResult}>
            <Button onPress={e => setScanData(null)} title='Open camera' />
            <Text style={styles.scanText}>{scanData.data}</Text>
        </View>

    </>


    return (
        <ScrollView style={{ marginTop: 137, }} refreshControl={< RefreshControl refreshing={refreshing} onRefresh={useee} />} >

            <View style={{ height: 600 }} >



                <Camera onBarCodeScanned={handleBarcodeScanned} style={styles.camera} type={type}>
                    {scanning && (
                        <View style={styles.overlay}>
                            <ActivityIndicator size="large" color="white" />
                        </View>
                    )}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                            <Text style={styles.text}>
                                <MaterialCommunityIcons style={{ color: 'white' }} name="camera-flip-outline" size={40} color="black" />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        height: '100%',
        marginTop: 130,
        position: "absolute"
    },

    height: {
        height: "100%"
    },

    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 30,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        borderColor: 'black',
        borderWidth: 2,
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 20,
    },
    overlay: {
        // ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    scanResult: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        // backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    scanText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default Cameras;
