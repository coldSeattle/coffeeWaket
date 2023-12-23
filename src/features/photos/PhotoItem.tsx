import React, { memo } from 'react';
import { Pressable, View } from 'react-native';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import { useAppDispatch } from '../../app/hooks';
import { setOpenedPhoto } from './api.slice';
import { styles } from './index.styles';
import { PhotoItemPropsTypes } from './index.types';

const PhotoItem = memo(function PhotoItem({
  item,
  status,
  onPress,
  imageStyles,
}: PhotoItemPropsTypes) {
  const dispatch = useAppDispatch();

  const { id, height, urls, width } = item;

  const handleOnPress = () => {
    dispatch(setOpenedPhoto({ id, urls }));
    onPress();
  };

  if (!urls?.regular) return <View style={styles.container} />;
  FastImage.preload([{ uri: urls.regular }]);
  return (
    <Pressable onPress={handleOnPress}>
      <FastImage
        key={`${id}_${urls.regular}`}
        style={[styles.container, imageStyles]}
        source={{
          uri: urls.regular,
          headers: { Authorization: Config.ACCESS_KEY },
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </Pressable>
  );
});

export { PhotoItem };
