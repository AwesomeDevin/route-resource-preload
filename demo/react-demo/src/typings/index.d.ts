declare module 'ling_core/Components'
declare module "ling_core/components/image/image" {
  import './image.scss';
  import { ImageProps as AntdImageProps } from 'antd/lib/image';
  import React from 'react';
  interface PreviewType {
      visible?: boolean;
      onVisibleChange?: (visible: any, prevVisible: any) => void;
      getContainer?: string | HTMLElement | (() => HTMLElement);
      src?: string;
      mask?: React.ReactNode;
      maskClassName?: string;
      current?: number;
  }
  export interface ImageProps extends AntdImageProps {
      /** 预览参数，为 false 时禁用
       * @default true
       */
      preview?: boolean | PreviewType;
      /** 图像描述
       * @default -
       */
      alt?: string;
      /** 加载失败容错地址
       * @default -
       */
      fallback?: string;
      /** 图像高度
       * @default -
       */
      height?: string | number;
      /** 图像宽度
       * @default -
       */
      width?: string | number;
      /** 加载占位, 为 true 时使用默认占位
       * @default -
       */
      placeholder?: React.ReactNode;
      /** 图片地址
       * @default -
       */
      src?: string;
      /** 是否马赛克背景
       * @default true
       */
      mosaicBackground?: boolean;
      /** 内容自适应居中
       * @default false
       */
      contentFit?: boolean;
      /** 加载错误回调
       * @default -
       */
      onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  }
  export const Image: React.FC<ImageProps>;
  export default Image;
}
declare module "ling_core/components/image/preview-group" {
  import AntdPreviewGroup, { icons } from 'antd/lib/image/PreviewGroup';
  export { icons };
  export default AntdPreviewGroup;
}
declare module "ling_core/components/image" {
  import type { ImageProps } from "ling_core/components/image/image";
  import InternalPreviewGroup from "ling_core/components/image/preview-group";
  export { ImageProps };
  interface CompoundedComponent extends React.FC<ImageProps> {
      PreviewGroup: typeof InternalPreviewGroup;
  }
  const Image: CompoundedComponent;
  export default Image;
}
declare module "ling_core/Components" {
  export { default as Image, ImageProps } from "ling_core/components/image";
  
}
declare module 'antd'