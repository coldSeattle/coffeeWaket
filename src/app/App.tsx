/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the Redux TypeScript template
 * https://github.com/rahsheen/react-native-template-redux-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Modal,
  RefreshControl,
  StatusBar,
  Text,
  View,
} from 'react-native';

import {
  fetchPhotosAsync,
  refreshPhotosAsync,
  setError,
} from '../features/photos/api.slice';
import { PhotoItem } from '../features/photos/PhotoItem';
import { useAppDispatch, useAppSelector } from './hooks';
import { styles } from './index.styles';

declare const global: { HermesInternal: null | {} };

const App = () => {
  const [page, setPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const { photos, status, photo, error } = useAppSelector(state => state.api);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPhotosAsync({ page: 1 }));
  }, [error]);
  useEffect(() => {
    dispatch(fetchPhotosAsync({ page: page }));
    setPage(prev => prev + 1);
  }, []);

  const handleOnPressPhoto = () => {
    if (photo?.id === -1) return;
    setModalVisible(true);
  };

  const handleLoadMore = () => {
    dispatch(fetchPhotosAsync({ page: page + 1 }));
    setPage(prev => prev + 1);
  };

  const handleOnRefresh = () => {
    dispatch(refreshPhotosAsync({ page: page + 1 }));
    setPage(prev => prev + 1);
  };

  const handleCloseModal = () => setModalVisible(false);

  if (error?.isError) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <Text>Something went wrong...</Text>
        <Button title="reset" onPress={() => dispatch(setError(false))} />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View className="w-full h-full">
          <PhotoItem
            imageStyles={styles.container}
            onPress={handleCloseModal}
            status={status}
            item={{ id: photo?.id, urls: photo?.urls }}
          />
        </View>
      </Modal>
      <FlatList
        className="w-full h-full"
        numColumns={2}
        data={photos}
        onEndReachedThreshold={0.4}
        onEndReached={handleLoadMore}
        renderItem={({ item }) => (
          <PhotoItem onPress={handleOnPressPhoto} status={status} item={item} />
        )}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        refreshControl={
          <RefreshControl
            refreshing={Boolean(status === 'loading')}
            onRefresh={handleOnRefresh}
          />
        }
      />
    </>
  );
};

export default App;
