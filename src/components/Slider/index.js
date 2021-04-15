import React from 'react';
import {FlatList, View, StyleSheet, Image, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export default function Slider({images = []}) {
  return (
    <FlatList
      data={images}
      horizontal
      style={styles.list}
      pagingEnabled
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id + ''}
      renderItem={({item}, index) => (
        <View style={styles.item}>
          <Image style={styles.image} source={{uri: item.file.url}} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#f5f5f5',
  },
  item: {
    width: width,
  },
  image: {
    width: width,
    height: height * 0.25,
    resizeMode: 'cover',
  },
});
