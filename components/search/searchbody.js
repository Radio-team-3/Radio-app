import React, {Component} from "react";
import { StyleSheet, FlatList, View } from "react-native";

import { Card } from "react-native-elements";

export default class SearchBody extends Component{
    render() {
        const musicData = this.props.musicData;
        return(
            <FlatList
                data={musicData}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item, index }) => (
                    <Card containerStyle={styles.card} key={item.id}>
                        <View style={styles.displayInline}>
                            <Card.Image style={styles.cardimg} source={{uri: item.album.cover ? item.album.cover : '../../assets/fulllogo.jpeg'}} />
                            <View style={styles.cardbody}>
                                <Card.Title style={styles.cardTitle}>{item.title}</Card.Title>
                                <Card.FeaturedSubtitle style={styles.cardSubTitle}>Artist - {item.artist.name}</Card.FeaturedSubtitle>
                            </View>
                        </View> 
                    </Card>
                )}
            />               
        );
    }
}

const styles = StyleSheet.create({
    card: {
        width: 300,
        borderColor: '#A6A7E7',
        backgroundColor: '#191C55',
        marginBottom: 5
    },
    displayInline: {
        flexDirection: 'row',
        alignContent: 'center',
        width: 250
    },
    cardimg: {
        resizeMode: "contain",
        width: 55,
        height: 55
    },
    cardbody: {
        marginLeft: 15,
    },
    cardTitle: {
        color: '#FFF',
        fontSize: 16,
    },
    cardSubTitle: {
        color: '#A6A7E7',
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 0,
        paddingBottom: 0,
    }
});