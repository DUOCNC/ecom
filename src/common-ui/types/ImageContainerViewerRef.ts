import {IImageInfo} from 'react-native-image-zoom-viewer/built/image-viewer.type';

export interface ImageContainerViewerRef {
  show: (imageUrls: Array<IImageInfo>, position: number) => void;
}
