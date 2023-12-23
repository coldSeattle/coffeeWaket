import { ImageStyle, StyleProp } from 'react-native';
import { IPhotoItem } from '../../shared/alias-types/photos.types';

type PhotoItemPropsTypes = {
  item: IPhotoItem | {};
  status: 'idle' | 'loading' | 'failed';
  onPress: () => void;
  imageStyles?: StyleProp<ImageStyle>;
};

export type { PhotoItemPropsTypes };
