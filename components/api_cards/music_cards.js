//import React from "react";
//import { StyleSheet, FlatList } from "react-native";
//import { Card } from "react-native-elements";
//
//const DATA = [
//    {
//        id: 1,
//        title: 'Already',
//        artist: 'Beyonce',
//        image_url: require('../../assets/fulllogo.jpeg'),
//    },
//    {
//        id: 2,
//        title: 'Hotline Bling',
//        artist: 'Drake',
//        image_url: require('../../assets/images/logo-2.png') ,
//    },
//    {
//        id: 3,
//        title: 'Leave The Door Open',
//        artist: 'Bruno Mars, Anderson .Paak, Silk Sonic',
//        image_url: require('../../assets/fulllogo.jpeg'),
//    },
//];
//
//const MusicCards = () => {
//    return (
//        <FlatList
//            horizontal={true}
//            data={DATA}
//            keyExtractor={(value, index) => index.toString()}
//            renderItem={({ item }) => (
//                <Card containerStyle={styles.card} key={item.id}>
//                  <Card.Image style={styles.cardimg} source={item.image_url}></Card.Image>
//                  <Card.Divider />
//                  <Card.Title style={styles.cardTitle}>{item.title}</Card.Title>
//                  <Card.FeaturedSubtitle style={styles.cardSubTitle}>Artist - {item.artist}</Card.FeaturedSubtitle>
//                </Card>
//            )}
//        />
//    );
//}
//export default MusicCards;
//
//const styles = StyleSheet.create({
//    card: {
//        width: 200,
//        borderColor: '#A6A7E7',
//        backgroundColor: '#191C55',
//    },
//    cardimg: {
//        resizeMode: "contain",
//    },
//    cardTitle: {
//        color: '#FFF',
//        fontSize: 16,
//    },
//    cardSubTitle: {
//        color: '#A6A7E7',
//        fontSize: 14,
//        fontStyle: 'italic',
//        textAlign: 'center',
//        marginBottom: 0,
//        paddingBottom: 0,
//    }
//});