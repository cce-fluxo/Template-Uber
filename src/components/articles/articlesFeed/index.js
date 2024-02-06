import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { colors } from '../../../constants/theme';

import ArticlesCard from '../articlesCard';

export default function ArticlesFeed() {
  const [articlesList, setArticlesList] = useState([
    {
      id: 1,
      articlesPostTitle: 'Como reciclar?',
      articlesPostText: 'Texto do post',
      articlesImageSource: require('../../../pictures/seletive.png'),
    },
    {
      id: 2,
      articlesPostTitle: 'Reciclagem de papel',
      articlesPostText: 'Texto do post',
      articlesImageSource: require('../../../pictures/paper.jpg'),
    },
    {
      id: 3,
      articlesPostTitle: 'Coperativas de reciclagem',
      articlesPostText: 'Texto do post',
      articlesImageSource: require('../../../pictures/coop.jpg'),
    },
    {
      id: 4,
      articlesPostTitle: 'Economia sustentável',
      articlesPostText: 'Texto do post',
      articlesImageSource: require('../../../pictures/sustentavel.jpg'),
    },
  ]);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ paddingRight: 10 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={articlesList}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <ArticlesCard articlesInformation={item} />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    height: 240,
    width: '100%',
    backgroundColor: colors.background,
    alignItems: 'center',
    borderRadius: 10,
  },
});
