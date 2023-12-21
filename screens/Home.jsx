import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Map from './Map'
import { Button, Portal } from 'react-native-paper'
import Cameras from './Camera'

const Home = () => {


    const [toggle, setToggle] = useState("map")


    return <>

        <View style={{ gap: 5, overflow: "hidden", borderColor: "brown", borderWidth: 2, padding: 5, backgroundColor: "aqua", borderRadius: 10, flexDirection: "row", justifyContent: "space-between" }} >


            <Button onPress={e => setToggle("map")} style={{ ...styles.map, backgroundColor: toggle === "map" ? "rgba(255,0,0,0.98)" : "white" }}  ><Text style={{}} >Map</Text></Button>
            <Button onPress={e => setToggle("camera")} style={{ ...styles.camera, backgroundColor: toggle !== "map" ? "rgba(255,0,0,0.98)" : "white" }}  ><Text style={{}} >Camaera</Text></Button>


        </View>

        <Portal>


            {
                toggle === "map" ? (<Map />)
                    : (<Cameras />)

            }
        </Portal>



    </>
}


const styles = StyleSheet.create({

    map: {
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "row",
        width: "auto",
        alignItems: "center",
        borderRadius: 5, width: "50%",
        justifyContent: "center"
    },
    camera: {

        display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "whitesmoke", borderRadius: 5, width: "50%", justifyContent: "center"
    }

})





export default Home
