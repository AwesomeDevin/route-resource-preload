/// <reference types="react" />

declare module "ling_core/Image" 

declare module "ling_core/components/affix" {
  export { default } from 'antd/lib/affix';
  export * from 'antd/lib/affix';
}
declare module "ling_core/utils/prefix" {
  export function getPrefix(componentName: string, customPrefix?: string): string;
}
declare module "ling_core/utils" {
  export * from "ling_core/utils/prefix";
}
declare module "ling_core/components/icon/icon" {
  import './icon.scss';
  import React from 'react';
  export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
      /**
       * 图标类型
       */
      component?: React.ReactNode;
      /**
       * 图标尺寸
       */
      size?: React.CSSProperties['height'] & React.CSSProperties['width'];
      /**
       * @deprecated
       * html 字符串
       */
      html?: string;
  }
  export function Icon({ className, style, component, children, html: __html, size, ...props }: IconProps): JSX.Element;
  export default Icon;
}
declare module "ling_core/components/icon" {
  export { default } from "ling_core/components/icon/icon";
}
declare module "ling_core/components/tooltip/tooltip" {
  import './tooltip.scss';
  import { PresetColorType } from 'antd/lib/_util/colors';
  import { AdjustOverflow } from 'antd/lib/_util/placements';
  import { LiteralUnion } from 'antd/lib/_util/type';
  import { placements as Placements } from 'rc-tooltip/lib/placements';
  import { TooltipProps as RcTooltipProps } from 'rc-tooltip/lib/Tooltip';
  import React from 'react';
  export type TooltipPlacement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
  export interface TooltipAlignConfig {
      points?: [string, string];
      offset?: [number | string, number | string];
      targetOffset?: [number | string, number | string];
      overflow?: {
          adjustX: boolean;
          adjustY: boolean;
      };
      useCssRight?: boolean;
      useCssBottom?: boolean;
      useCssTransform?: boolean;
  }
  export interface AbstractTooltipProps extends Partial<Omit<RcTooltipProps, 'children'>> {
      /**
       * 类型
       * @default default
       */
      type?: 'default' | 'primary' | 'lite';
      style?: React.CSSProperties;
      className?: string;
      color?: LiteralUnion<PresetColorType, string>;
      /**
       * 气泡框位置，可选 top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom
       * @default top
       */
      placement?: TooltipPlacement;
      builtinPlacements?: typeof Placements;
      openClassName?: string;
      /**
       * 箭头是否指向目标元素中心
       * @default false
       */
      arrowPointAtCenter?: boolean;
      /**
       * 气泡被遮挡时自动调整位置
       * @default true
       */
      autoAdjustOverflow?: boolean | AdjustOverflow;
      /**
       * 浮层渲染父节点，默认渲染到 body 上
       * @default () => document.body
       */
      getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
      children?: React.ReactNode;
  }
  export type RenderFunction = () => React.ReactNode;
  export interface TooltipPropsWithOverlay extends AbstractTooltipProps {
      /**
       * 提示文字
       */
      title?: React.ReactNode | RenderFunction;
      overlay: React.ReactNode | RenderFunction;
  }
  export interface TooltipPropsWithTitle extends AbstractTooltipProps {
      title: React.ReactNode | RenderFunction;
      overlay?: React.ReactNode | RenderFunction;
  }
  export type TooltipProps = TooltipPropsWithTitle | TooltipPropsWithOverlay;
  /**
   * 基础对话框
   *
   * ### 何时使用
   * 鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。
   *
   * ### 使用方式
   * ```js
   * import Tooltip from '@ling-design/core/es/components/tooltip'
   * ```
   */
  export const Tooltip: React.FC<TooltipProps>;
  export default Tooltip;
}
declare module "ling_core/components/tooltip" {
  import Tooltip from "ling_core/components/tooltip/tooltip";
  export { AbstractTooltipProps, TooltipAlignConfig, TooltipPlacement, TooltipProps, TooltipPropsWithOverlay, TooltipPropsWithTitle, } from "ling_core/components/tooltip/tooltip";
  export default Tooltip;
}
declare module "ling_core/components/ajax-upload-image/ajax-upload-image" {
  import './ajax-upload-image.scss';
  import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
  import { RcFile as OriRcFile, UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
  import React from 'react';
  import { TooltipPlacement } from "ling_core/components/tooltip";
  type BeforeUploadValueType = void | boolean | string | Blob | File;
  export interface RcFile extends OriRcFile {
      readonly lastModifiedDate: Date;
  }
  export interface AjaxUploadImageProps {
      /**
       * 宽度
       * @default 96
       */
      width?: number;
      /**
       * 高度
       * @default 96
       *
       */
      height?: number;
      /** 是否禁用 */
      disabled?: boolean;
      /** ItemClassName */
      itemClassName?: string;
      /**
       * 容器节点className
       */
      className?: string;
      /** 接受的文件类型,如image/png */
      accept?: string;
      /** 背景尺寸模式  */
      sizeMode?: 'cover' | 'contain';
      /**
       * 限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件
       */
      maxCount?: number;
      /**
       *  备注信息
       * */
      tip?: React.ReactNode;
      /**
       * tooltip展示位置，参数类似tooltip组件
       */
      placement?: TooltipPlacement;
      /**
       * 是否展示操作相关按钮
       * @default true
       */
      enableAction?: boolean;
      /**
       * 是否允许查看图片
       * @default true
       */
      enablePreview?: boolean;
      /** 上传请求时是否携带 cookie */
      withCredentials?: boolean;
      /** 上传文件改变时的状态 */
      onChange?: (info: UploadChangeParam<UploadFile>) => void;
      /**
       * 触发预览
       */
      onPreview?: (file: UploadFile) => void;
      /**
       * 上传请求的 http method
       * @default post
       */
      method?: 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch';
      /**
       * 上传的目标地址
       */
      action?: string;
      /**
       * 触发删除
       */
      onRemove?: (file: UploadFile) => boolean | Promise<boolean>;
      /**
       * 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传（ resolve 传入 File 或 Blob 对象则上传 resolve 传入对象）；也可以返回 Upload.LIST_IGNORE，此时列表中将不展示此文件。 注意：IE9 不支持该方法
       */
      beforeUpload?: (file: RcFile, FileList: RcFile[]) => BeforeUploadValueType | Promise<BeforeUploadValueType>;
      /**
       * 上传所需额外参数或返回上传额外参数的方法
       */
      data?: any;
      /**
       * 通过覆盖默认的上传行为，可以自定义自己的上传实现
       */
      customRequest?: (options: RcCustomRequestOptions) => void;
      /**
       * 支持上传文件夹
       * @default false
       */
      directory?: boolean;
      /**
       * 是否支持多选
       * @default false
       */
      multiple?: boolean;
      /**
       * 发到后台的文件参数名
       */
      name?: string;
      /**
       * 默认已上传的文件列表
       */
      defaultFileList?: UploadFile[];
      /**
       * 已上传的文件列表
       */
      fileList?: UploadFile[];
      /**
       * 自定义上传列表项
       */
      itemRender?: (originNode: React.ReactElement, file: UploadFile, fileList: object[], actions: {
          download: any;
          preview: any;
          remove: any;
      }) => React.ReactElement;
      /**
       * 是否展示文件列表
       * @default true
       */
      showUploadList?: boolean;
      /**
       * 是否展示上传控件
       *  @default true
       */
      enableUpload?: boolean;
      /**
       * 是否展示裁剪控件
       *  @default false
       */
      enableCrop?: boolean;
  }
  export const AjaxUploadImage: React.FC<AjaxUploadImageProps>;
  export default AjaxUploadImage;
}
declare module "ling_core/components/ajax-upload-image" {
  import AjaxUploadImage from "ling_core/components/ajax-upload-image/ajax-upload-image";
  export { AjaxUploadImageProps } from "ling_core/components/ajax-upload-image/ajax-upload-image";
  export default AjaxUploadImage;
}
declare module "ling_core/components/alert/alert" {
  import './alert.scss';
  import { AlertProps as AntdAlertProps } from 'antd/lib/alert';
  import React from 'react';
  export interface AlertProps extends AntdAlertProps {
      /**
       * 样式类型，在原 alert 基础上扩展
       * @default info
       */
      newType?: 'success' | 'info' | 'warning' | 'error' | 'primary' | 'infogray';
  }
  /**
   * 提示
   *
   * ### 何时使用
   * 当某个页面需要向用户显示警告的信息时。
   * 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。
   *
   * ### 使用方式
   * ```js
   * import Alert from '@ling-design/core/es/components/alert'
   * ```
   */
  export const Alert: React.FC<AlertProps>;
  export default Alert;
}
declare module "ling_core/components/alert" {
  import Alert from "ling_core/components/alert/alert";
  export { AlertProps } from "ling_core/components/alert/alert";
  export default Alert;
}
declare module "ling_core/components/anchor" {
  export { default } from 'antd/lib/anchor';
  export * from 'antd/lib/anchor';
}
declare module "ling_core/components/ant-tabs" {
  export { default } from 'antd/lib/tabs';
  export * from 'antd/lib/tabs';
}
declare module "ling_core/components/auto-complete" {
  export { default } from 'antd/lib/auto-complete';
  export * from 'antd/lib/auto-complete';
}
declare module "ling_core/components/avatar" {
  export { default } from 'antd/lib/avatar';
  export * from 'antd/lib/avatar';
}
declare module "ling_core/components/back-top" {
  export { default } from 'antd/lib/back-top';
  export * from 'antd/lib/back-top';
}
declare module "ling_core/components/badge" {
  export { default } from 'antd/lib/badge';
  export * from 'antd/lib/badge';
}
declare module "ling_core/Icons" {
  import Ai from './ai.svg';
  import Analysis from './analysis.svg';
  import AntOutlineTag from './ant-outline-tag.svg';
  import ArrowDown from './arrow-down.svg';
  import ArrowDownCaret from './arrow-down-caret.svg';
  import ArrowLeft from './arrow-left.svg';
  import ArrowRight from './arrow-right.svg';
  import ArrowUp from './arrow-up.svg';
  import Attachment from './attachment.svg';
  import Bind from './bind.svg';
  import BindClose from './bind-close.svg';
  import Book from './book.svg';
  import Calendar from './calendar.svg';
  import Camera from './camera.svg';
  import Check from './check.svg';
  import CheckBox from './checkbox.svg';
  import CheckBoxCurrent from './checkbox-current.svg';
  import Checked from './checked.svg';
  import Clear from './clear.svg';
  import Close from './close.svg';
  import Copy from './copy.svg';
  import Delete from './delete.svg';
  import Dialog from './dialog.svg';
  import Download from './download.svg';
  import DropShadow from './drop-shadow.svg';
  import Edit from './edit.svg';
  import EmptyFavoriteDark from './empty-favorite-dark.svg';
  import EmptyFavoriteGray from './empty-favorite-gray.svg';
  import EmptyFavoriteTheme from './empty-favorite-theme.svg';
  import EmptyPermissionGray from './empty-permission-gray.svg';
  import EmptyRecordDark from './empty-record-dark.svg';
  import EmptyRecordGray from './empty-record-gray.svg';
  import EmptyRecordTheme from './empty-record-theme.svg';
  import EmptySearchDark from './empty-search-dark.svg';
  import EmptySearchGray from './empty-search-gray.svg';
  import EmptySearchTheme from './empty-search-theme.svg';
  import EmptySignalDark from './empty-signal-dark.svg';
  import EmptySignalGray from './empty-signal-gray.svg';
  import EmptySignalTheme from './empty-signal-theme.svg';
  import ErrorSvg from './error.svg';
  import Eye from './eye.svg';
  import EyeGray from './eye-gray.svg';
  import EyeGrayClose from './eye-gray-close.svg';
  import File from './file.svg';
  import FileGray from './file-gray.svg';
  import Filter from './filter.svg';
  import FlipHori from './flip-hori.svg';
  import FlipVert from './flip-vert.svg';
  import FullPage from './full-page.svg';
  import Image from './image.svg';
  import ImageActive from './image-active.svg';
  import ImageSimple from './image-simple.svg';
  import Info from './info.svg';
  import InputClear from './input-clear.svg';
  import LastStep from './last-step.svg';
  import LayoutAll from './layout-all.svg';
  import LayoutDefault from './layout-default.svg';
  import LayoutHorizontal from './layout-horizontal.svg';
  import LayoutSquare from './layout-square.svg';
  import LayoutVertical from './layout-vertical.svg';
  import LingLogo from './ling-logo.svg';
  import LingYxLogo from './ling-logo-yx.svg';
  import LingLogo2 from './ling-logo2.svg';
  import LingLogo3 from './ling-logo3.svg';
  import Loading from './loading.svg';
  import Menu from './menu.svg';
  import MenuArrow from './menu-arrow.svg';
  import More from './more.svg';
  import MorePage from './more-page.svg';
  import Move from './move.svg';
  import NextStep from './next-step.svg';
  import NoneShadow from './none-shadow.svg';
  import NotifiCation from './notification.svg';
  import OvalShadow from './oval-shadow.svg';
  import Page from './page.svg';
  import ParkGridNine from './park-grid-nine.svg';
  import PauseCircle from './pause-circle.svg';
  import PluginIn from './plugin-in.svg';
  import Plus from './plus.svg';
  import PS from './PS.svg';
  import QuestionCircle from './question-circle.svg';
  import Refresh from './refresh.svg';
  import Remove from './remove.svg';
  import ResultSuccess from './result-success.svg';
  import Search from './search.svg';
  import Random from './shaizi.svg';
  import SidebarAiDesign from './sidebar-ai-design.svg';
  import SidebarBackground from './sidebar-background.svg';
  import SidebarCollection from './sidebar-collection.svg';
  import SidebarColor from './sidebar-color.svg';
  import SidebarComponent from './sidebar-component.svg';
  import SidebarDesignModel from './sidebar-design-model.svg';
  import SidebarFontStyle from './sidebar-font-style.svg';
  import SidebarForeground from './sidebar-foreground.svg';
  import SidebarForegroundIntensity from './sidebar-foregroundIntensity.svg';
  import SidebarGoodsBackground from './sidebar-goods-background.svg';
  import SidebarGoodsForeground from './sidebar-goods-foreground.svg';
  import SidebarKoutu from './sidebar-koutu.svg';
  import SidebarKoutuActive from './sidebar-koutu-active.svg';
  import SidebarLayout from './sidebar-layout.svg';
  import SidebarMotionDiy from './sidebar-motion-diy.svg';
  import SidebarMultiSize from './sidebar-multi-size.svg';
  import SidebarPintu from './sidebar-pintu.svg';
  import SidebarScene from './sidebar-scene.svg';
  import Size from './size.svg';
  import SizeAuto from './size-auto.svg';
  import SizeOriginal from './size-original.svg';
  import SizeRect from './size-rect.svg';
  import Sketch from './Sketch.svg';
  import Sort from './sort.svg';
  import SortGray from './sort-gray.svg';
  import Switch from './switch.svg';
  import TextSvg from './text.svg';
  import ThreePoint from './three-point.svg';
  import Unchecked from './unchecked.svg';
  import Upload from './upload.svg';
  import User from './user.svg';
  import Users from './users.svg';
  import WhLock from './wh-lock.svg';
  import WhUnLock from './wh-unlock.svg';
  import ZoomIn from './zoom-in.svg';
  export { Ai, Analysis, AntOutlineTag, ArrowDown, ArrowDownCaret, ArrowLeft, ArrowRight, ArrowUp, Attachment, Bind, BindClose, Book, Calendar, Camera, Check, CheckBox, CheckBoxCurrent, Checked, Clear, Close, Copy, Delete, Dialog, Download, DropShadow, Edit, EmptyFavoriteDark, EmptyFavoriteGray, EmptyFavoriteTheme, EmptyPermissionGray, EmptyRecordDark, EmptyRecordGray, EmptyRecordTheme, EmptySearchDark, EmptySearchGray, EmptySearchTheme, EmptySignalDark, EmptySignalGray, EmptySignalTheme, ErrorSvg, Eye, EyeGray, EyeGrayClose, File, FileGray, Filter, FlipHori, FlipVert, FullPage, Image, ImageActive, ImageSimple, Info, InputClear, LastStep, LayoutAll, LayoutDefault, LayoutHorizontal, LayoutSquare, LayoutVertical, LingLogo, LingLogo2, LingLogo3, LingYxLogo, Loading, Menu, MenuArrow, More, MorePage, Move, NextStep, NoneShadow, NotifiCation, OvalShadow, Page, ParkGridNine, PauseCircle, PluginIn, Plus, PS, QuestionCircle, Random, Refresh, Remove, ResultSuccess, Search, SidebarAiDesign, SidebarBackground, SidebarCollection, SidebarColor, SidebarComponent, SidebarDesignModel, SidebarFontStyle, SidebarForeground, SidebarForegroundIntensity, SidebarGoodsBackground, SidebarGoodsForeground, SidebarKoutu, SidebarKoutuActive, SidebarLayout, SidebarMotionDiy, SidebarMultiSize, SidebarPintu, SidebarScene, Size, SizeAuto, SizeOriginal, SizeRect, Sketch, Sort, SortGray, Switch, TextSvg, ThreePoint, Unchecked, Upload, User, Users, WhLock, WhUnLock, ZoomIn, };
}
declare module "ling_core/components/breadcrumb/breadcrumb" {
  import './breadcrumb.scss';
  import { BreadcrumbProps as AntdBreadcrumbProps } from 'antd/lib/breadcrumb';
  import React from 'react';
  export interface BreadcrumbProps extends AntdBreadcrumbProps {
  }
  /**
   * 面包屑导航
   *
   * ### 何时使用
   * - 当系统拥有超过两级以上的层级结构时；
   * - 当需要告知用户『你在哪里』时；
   * - 当需要向上导航的功能时。
   *
   * ### 使用方式
   * ```js
   * import Breadcrumb from '@ling-design/core/es/components/breadcrumb'
   * ```
   */
  export const Breadcrumb: React.FC<BreadcrumbProps>;
  export default Breadcrumb;
}
declare module "ling_core/components/breadcrumb/breadcrumb-item" {
  import { BreadcrumbItemProps as AntdBreadcrumbItemProps } from 'antd/lib/breadcrumb';
  import React from 'react';
  export interface BreadcrumbItemProps extends AntdBreadcrumbItemProps {
  }
  export const BreadcrumbItem: React.FC<BreadcrumbItemProps>;
  export default BreadcrumbItem;
}
declare module "ling_core/components/breadcrumb" {
  import { BreadcrumbProps } from "ling_core/components/breadcrumb/breadcrumb";
  import Item from "ling_core/components/breadcrumb/breadcrumb-item";
  import { BreadcrumbItemProps } from "ling_core/components/breadcrumb/breadcrumb-item";
  export { BreadcrumbItemProps, BreadcrumbProps };
  interface CompoundedComponent extends React.FC<BreadcrumbProps> {
      Item: typeof Item;
  }
  const Breadcrumb: CompoundedComponent;
  export default Breadcrumb;
}
declare module "ling_core/components/button/button" {
  import './button.scss';
  import { ButtonProps as AntdButtonProps } from 'antd/lib/button';
  import React from 'react';
  export type BaseButtonProps = {
      /** 按钮大小
       * @default M
       */
      size?: 'XL' | 'L' | 'M' | 'S';
      /** 样式类型: 文字 text，实心 solid，描边 stroke
       * @default stroke
       */
      shape?: 'text' | 'solid' | 'stroke';
      /**
       * 按钮类型：主要 primary，成功 success，拒绝 warning，中性 ghost
       * @default primary
       */
      type?: 'primary' | 'success' | 'warning' | 'ghost' | 'error';
      /** button类型
       * @default button
       */
      htmlType?: 'button' | 'reset' | 'submit';
      /** 是否禁用
       * @default false
       */
      disabled?: boolean;
      /**
       * 用户自定义类名
       */
      className?: string;
      /**
       * 是否加载中状态
       */
      loading?: boolean;
      /**
       * 图标
       */
      icon?: React.ReactNode;
      onClick?: React.MouseEventHandler<HTMLElement>;
  };
  export type IButtonProps = AntdButtonProps | (BaseButtonProps & Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>);
  export type ButtonProps = IButtonProps & {
      /**
       * 右侧图标
       */
      suffixIcon?: React.ReactNode;
  };
  /**
   * 按钮。
   *
   * 由于设计稿和原 antd Button 组件差异较大，该按钮组件进行了重写，属性与原 antd Button 组件不同。
   *
   * ### 何时使用
   * 标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
   *
   *
   * ### 使用方式
   * ```js
   * import Button from '@ling-design/core/es/components/button'
   * ```
   */
  export const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<unknown>>;
  export default Button;
}
declare module "ling_core/components/button/action-button" {
  import * as React from 'react';
  import { ButtonProps } from "ling_core/components/button/button";
  export interface ActionButtonProps {
      type?: 'primary' | 'success' | 'warning' | 'ghost' | 'error';
      actionFn?: (...args: any[]) => any | PromiseLike<any>;
      close?: Function;
      autoFocus?: boolean;
      prefixCls?: string;
      buttonProps?: ButtonProps;
      emitEvent?: boolean;
      quitOnNullishReturnValue?: boolean;
  }
  const ActionButton: React.FC<ActionButtonProps>;
  export default ActionButton;
}
declare module "ling_core/components/button" {
  import ActionButton from "ling_core/components/button/action-button";
  import Button from "ling_core/components/button/button";
  export type { BaseButtonProps, ButtonProps } from "ling_core/components/button/button";
  export { ActionButton };
  export default Button;
}
declare module "ling_core/components/dropdown/button" {
  import { DropdownButtonProps as AntdDropdownButtonProps, DropdownButtonType } from 'antd/lib/dropdown/dropdown-button';
  import React from 'react';
  export { DropdownButtonType };
  export interface DropdownButtonProps extends AntdDropdownButtonProps {
      display?: string;
  }
  const Button: React.FC<DropdownButtonProps>;
  export default Button;
}
declare module "ling_core/components/dropdown/dropdown" {
  import './dropdown.scss';
  import { DropDownProps as AntdDropDownProps } from 'antd/lib/dropdown';
  import React from 'react';
  export interface DropDownProps extends AntdDropDownProps {
      display?: string;
  }
  const DropDown: React.FC<DropDownProps>;
  export default DropDown;
}
declare module "ling_core/components/dropdown/item" {
  import React from 'react';
  export interface DropdownItemProps {
      /**
       * 点击事件
       */
      onClick?: () => void;
  }
  const DropDownItem: React.FC<DropdownItemProps>;
  export default DropDownItem;
}
declare module "ling_core/components/dropdown" {
  import type { DropdownButtonProps, DropdownButtonType } from "ling_core/components/dropdown/button";
  import Button from "ling_core/components/dropdown/button";
  import type { DropDownProps } from "ling_core/components/dropdown/dropdown";
  import type { DropdownItemProps } from "ling_core/components/dropdown/item";
  import Item from "ling_core/components/dropdown/item";
  export { DropdownButtonProps, DropdownButtonType, DropdownItemProps, DropDownProps, };
  export interface CompoundedComponent extends React.FC<DropDownProps> {
      Button: typeof Button;
      Item: typeof Item;
  }
  const DropDown: CompoundedComponent;
  export default DropDown;
}
declare module "ling_core/components/button-popup/base-popup" {
  import React from 'react';
  import { DropDownProps } from "ling_core/components/dropdown";
  export interface BasePopupItem {
      key: React.Key;
      text: string;
  }
  export interface BasePopupProps extends Omit<DropDownProps, 'overlay' | 'children'> {
      /**
       * 数据项
       */
      items: BasePopupItem[];
      /**
       * 触发点击后是否隐藏下拉菜单项
       */
      hideOnClick?: boolean;
      /**
       * 自定义触发体
       */
      children: (visible: boolean) => React.ReactNode;
      /**
       * 数据项点击
       */
      onItemClick?: (key: React.Key) => void;
  }
  const BasePopup: React.FC<BasePopupProps>;
  export default BasePopup;
}
declare module "ling_core/components/button-popup/button-popup" {
  import './button-popup.scss';
  import React from 'react';
  import { BaseButtonProps } from "ling_core/components/button";
  import { BasePopupProps } from "ling_core/components/button-popup/base-popup";
  export interface ButtonPopupProps extends BaseButtonProps, Omit<BasePopupProps, 'children'> {
      /**
       * 是否显示 suffixIcon
       */
      showSuffixIcon?: boolean;
      children: React.ReactNode;
  }
  const ButtonPopup: React.FC<ButtonPopupProps>;
  export default ButtonPopup;
}
declare module "ling_core/components/button-popup" {
  import type { BasePopupItem, BasePopupProps } from "ling_core/components/button-popup/base-popup";
  import BasePopup from "ling_core/components/button-popup/base-popup";
  import type { ButtonPopupProps } from "ling_core/components/button-popup/button-popup";
  import ButtonPopup from "ling_core/components/button-popup/button-popup";
  export { BasePopupItem, BasePopupProps, ButtonPopupProps };
  export { BasePopup };
  export default ButtonPopup;
}
declare module "ling_core/components/calendar/calendar" {
  import './calendar.scss';
  import { CalendarMode, HeaderRender } from 'antd/lib/calendar/generateCalendar';
  import enUS from 'antd/lib/calendar/locale/en_US';
  import { Moment } from 'moment';
  import React from 'react';
  export interface CalendarProps<DateType = Moment> extends Omit<React.HTMLAttributes<HTMLElement>, 'defaultValue' | 'onChange' | 'onSelect'> {
      /** 自定义渲染日期单元格，返回内容会被追加到单元格 */
      dateCellRender?: (date: DateType) => React.ReactNode;
      /** 自定义渲染日期单元格，返回内容覆盖单元格 */
      dateFullCellRender?: (date: DateType) => React.ReactNode;
      /** 默认展示的日期 */
      defaultValue?: DateType;
      /** 不可选择的日期，参数为当前 value，注意使用时不要直接修改 */
      disabledDate?: (currentDate: DateType) => boolean;
      /** 是否全屏显示
       * @default true
       */
      fullscreen?: boolean;
      /** 自定义头部内容 */
      headerRender?: HeaderRender<DateType>;
      /** 国际化配置
       * @default (默认配置)
       */
      locale?: typeof enUS;
      /** 初始模式
       * @default "month"
       */
      mode?: 'month' | 'year';
      /** 自定义渲染月单元格，返回内容会被追加到单元格 */
      monthCellRender?: (date: DateType) => React.ReactNode;
      /** 自定义渲染月单元格，返回内容覆盖单元格 */
      monthFullCellRender?: (date: DateType) => React.ReactNode;
      /** 设置可以显示的日期 */
      validRange?: [DateType, DateType];
      /** 展示日期 */
      value?: DateType;
      /** 日期变化回调 */
      onChange?: (date: DateType) => void;
      /** 日期面板变化回调 */
      onPanelChange?: (date: DateType, mode: CalendarMode) => void;
      /** 点击选择日期回调 */
      onSelect?: (date: DateType) => void;
  }
  /**
   * 按照日历形式展示数据的容器。
   *
   * ### 何时使用
   *
   * 当数据是日期或按照日期划分时，例如日程、课表、价格日历等，农历等。目前支持年/月切换。
   *
   * ### 使用方式
   * ```js
   * import Cascader from '@ling-design/core/es/components/cascader'
   * ```
   */
  export const Calendar: React.FC<CalendarProps>;
  export default Calendar;
}
declare module "ling_core/components/calendar" {
  import Calendar from "ling_core/components/calendar/calendar";
  export { CalendarProps } from "ling_core/components/calendar/calendar";
  export default Calendar;
}
declare module "ling_core/components/card" {
  export { default } from 'antd/lib/card';
  export * from 'antd/lib/card';
}
declare module "ling_core/components/carousel/carousel" {
  import './carousel.scss';
  import type { CarouselProps as AntdCarouselProps, CarouselRef } from 'antd/lib/carousel';
  import React from 'react';
  export interface CarouselProps extends AntdCarouselProps {
      /**
       * 是否展示左右控制按钮
       */
      showControls?: boolean;
  }
  /**
   * 轮播
   *
   * ### 何时使用
   * 当有一组平级的内容。
   * 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。
   * 常用于一组图片或卡片轮播。
   *
   * ### 使用方式
   * ```js
   * import Carousel from '@ling-design/core/es/components/carousel'
   * ```
   *
   */
  const Carousel: React.ForwardRefExoticComponent<CarouselProps & React.RefAttributes<CarouselRef>>;
  export default Carousel;
}
declare module "ling_core/components/carousel" {
  import { CarouselProps, default as Carousel } from "ling_core/components/carousel/carousel";
  export type { CarouselProps };
  export default Carousel;
}
declare module "ling_core/components/cascader/cascader" {
  import './cascader.scss';
  import { BaseOptionType, DefaultOptionType, FieldNames, MultipleCascaderProps, SingleCascaderProps, ValueType } from 'rc-cascader/lib/Cascader';
  import { CustomTagProps, DisplayValueType, Placement, RenderDOMFunc } from 'rc-select/lib/BaseSelect';
  import React from 'react';
  export interface CascaderProps<OptionType extends BaseOptionType = DefaultOptionType> extends Omit<React.HTMLAttributes<HTMLElement>, 'defaultValue' | 'onChange'> {
      /** 是否支持清除
       * @default true
       */
      alowClear?: boolean;
      /** 是否支持全选（仅限单选模式支持，开启后，一级目录展示「全选」按钮，子级目录需要在 Option 中配置 `alowAll`）
       * @default false
       */
      alowAll?: boolean;
      /** 自动获取焦点
       * @default false
       */
      autoFocus?: boolean;
      /** 是否有边框
       * @default true
       */
      bordered?: boolean;
      /** （单选时生效）当此项为 true 时，点选每级菜单选项值都会发生变化，具体见上面的演示
       * @default false
       */
      changeOnSelect?: boolean;
      /** 自定义类名 */
      className?: string;
      /** 默认的选中项
       * @default []
       */
      defaultValue?: string[] | number[];
      /** 禁用
       * @default false
       */
      disabled?: boolean;
      /** 选择后展示的渲染函数 */
      displayRender?: (label: any, selectedOptions: any) => React.ReactNode;
      /** 自定义浮层类名 */
      dropdownClassName?: string;
      /** 自定义下拉框内容
       * @default label => label.join(/)
       */
      dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
      /** 自定义次级菜单展开图标 */
      expandIcon?: React.ReactNode;
      /** 次级菜单的展开方式，可选 'click' 和 'hover'
       * @default "click"
       */
      expandTrigger?: 'hover' | 'click';
      /** 自定义 options 中 label value children 的字段
       * @default { label: label, value: value, children: children }
       */
      fieldNames?: FieldNames;
      /** 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codepen.io/afc163/pen/zEjNOy?editors=0010)
       * @default () => document.body
       */
      getPopupContainer?: RenderDOMFunc;
      /** 用于动态加载选项，无法与 showSearch 一起使用 */
      loadData?: (selectOptions: OptionType[]) => void;
      /** 最多显示多少个 tag，响应式模式会对性能产生损耗 */
      maxTagCount?: number | 'responsive';
      /** 隐藏 tag 时显示的内容 */
      maxTagPlaceholder?: React.ReactNode | ((omittedValues: DisplayValueType[]) => React.ReactNode);
      /** 当下拉列表为空时显示的内容
       * @default "Not Found"
       */
      notFoundContent?: React.ReactNode;
      /** 控制浮层显隐 */
      open?: boolean;
      /** 可选项数据源 */
      options?: Option[];
      /** 输入框占位文本
       * @default "请选择"
       */
      placeholder?: string;
      /** 浮层预设位置：bottomLeft bottomRight topLeft topRight
       * @default "bottomLeft"
       */
      placement?: Placement;
      /** 在选择框中显示搜索框
       * @default false
       */
      showSearch?: boolean | ShowSearchType<OptionType>;
      /** 输入框大小 */
      size?: 'large' | 'middle' | 'small';
      /** 自定义样式 */
      style?: React.CSSProperties;
      /** 自定义的选择框后缀图标 */
      suffixIcon?: React.ReactNode;
      /** 自定义 tag 内容，多选时生效 */
      tagRender?: (props: CustomTagProps) => React.ReactElement;
      /** 指定选中项 */
      value?: ValueType;
      /** 选择完成后的回调 */
      onChange?: SingleCascaderProps<OptionType>['onChange'] | MultipleCascaderProps<OptionType>['onChange'];
      /** 展开下拉菜单的回调 */
      onDropdownVisibleChange?: (open: boolean) => void;
      /** 支持多选节点 */
      multiple?: boolean;
      /** 设置搜索的值，需要与 showSearch 配合使用 */
      searchValue?: string;
      /** 监听搜索，返回输入的值 */
      onSearch?: (search: string) => void;
      /** 下拉菜单列的样式 */
      dropdownMenuColumnStyle?: React.CSSProperties;
      children?: React.ReactElement;
  }
  interface ShowSearchType<OptionType extends BaseOptionType = DefaultOptionType> {
      /** 接收 inputValue path 两个参数，当 path 符合筛选条件时，应返回 true，反之则返回 false */
      filter?: (inputValue: string, options: OptionType[], fieldNames: FieldNames) => boolean;
      /** 搜索结果展示数量
       * @default 50
       */
      limit?: number | false;
      /** 搜索结果列表是否与输入框同宽（效果）
       * @default true
       */
      matchInputWidth?: boolean;
      /** 用于渲染 filter 后的选项 */
      render?: (inputValue: string, path: OptionType[], prefixCls: string, fieldNames: FieldNames) => React.ReactNode;
      /** 用于排序 filter 后的选项 */
      sort?: (a: OptionType[], b: OptionType[], inputValue: string, fieldNames: FieldNames) => number;
  }
  export interface Option {
      value: string | number;
      label?: React.ReactNode;
      disabled?: boolean;
      children?: Option[];
      isLeaf?: boolean;
      alowAll?: boolean;
  }
  /**
   * 级联选择框。
   *
   * ### 何时使用
   *
   * - 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
   * - 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。
   * - 比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。
   *
   * ### 使用方式
   * ```js
   * import Cascader from '@ling-design/core/es/components/cascader'
   * ```
   */
  export const Cascader: React.FC<CascaderProps>;
  export default Cascader;
}
declare module "ling_core/components/cascader" {
  import Cascader from "ling_core/components/cascader/cascader";
  export { CascaderProps } from "ling_core/components/cascader/cascader";
  export default Cascader;
}
declare module "ling_core/components/checkbox/checkbox" {
  import './checkbox.scss';
  import type { CheckboxChangeEvent, CheckboxProps as AntdCheckboxProps } from 'antd/lib/checkbox';
  import React from 'react';
  export { CheckboxChangeEvent };
  export interface CheckboxProps extends AntdCheckboxProps {
      size?: 'small' | 'middle';
  }
  const Checkbox: React.FC<CheckboxProps>;
  export default Checkbox;
}
declare module "ling_core/components/checkbox/group" {
  import type { CheckboxGroupProps as AntdCheckboxGroupProps, CheckboxOptionType } from 'antd/lib/checkbox/Group';
  import React from 'react';
  export { CheckboxOptionType };
  export interface CheckboxGroupProps extends AntdCheckboxGroupProps {
      size?: 'small' | 'middle';
  }
  const CheckboxGroup: React.FC<CheckboxGroupProps>;
  export default CheckboxGroup;
}
declare module "ling_core/components/checkbox" {
  import type { CheckboxChangeEvent, CheckboxProps } from "ling_core/components/checkbox/checkbox";
  import type { CheckboxGroupProps, CheckboxOptionType } from "ling_core/components/checkbox/group";
  import Group from "ling_core/components/checkbox/group";
  export { CheckboxChangeEvent, CheckboxGroupProps, CheckboxOptionType, CheckboxProps, };
  export interface CompoundedComponent extends React.FC<CheckboxProps> {
      Group: typeof Group;
  }
  const Checkbox: CompoundedComponent;
  export { Group };
  export default Checkbox;
}
declare module "ling_core/components/grid/col" {
  export { default } from 'antd/lib/col';
  export * from 'antd/lib/col';
}
declare module "ling_core/components/col" {
  export { default } from "ling_core/components/grid/col";
  export * from "ling_core/components/grid/col";
}
declare module "ling_core/components/collapse" {
  export { default } from 'antd/lib/collapse';
  export * from 'antd/lib/collapse';
}
declare module "ling_core/components/comment" {
  export { default } from 'antd/lib/comment';
  export * from 'antd/lib/comment';
}
declare module "ling_core/components/config-provider" {
  import AntdConfigProvider, { ConfigProviderProps as AntdConfigProviderProps } from 'antd/lib/config-provider';
  import React from 'react';
  export * from 'antd/lib/config-provider';
  const ConfigProvider: React.FC<AntdConfigProviderProps> & {
      ConfigContext: typeof AntdConfigProvider.ConfigContext;
      SizeContext: typeof AntdConfigProvider.SizeContext;
      config: typeof AntdConfigProvider.config;
  };
  export default ConfigProvider;
}
declare module "ling_core/components/time-picker/time-picker" {
  import './time-picker.scss';
  import enUS from 'antd/lib/calendar/locale/en_US';
  import { Moment } from 'moment';
  import { PanelMode } from 'rc-picker/lib/interface';
  import { RenderDOMFunc } from 'rc-select/lib/BaseSelect';
  import React from 'react';
  import { RangePickerProps as DateRangePickerProps } from "ling_core/components/date-picker/date-picker";
  export interface TimePickerProps<DateType = Moment> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'onSelect' | 'placeholder'> {
      /** 是否显示清除按钮
       * @default true
       */
      allowClear?: boolean;
      /** 自动获取焦点
       * @default false
       */
      autoFocus?: boolean;
      /** 是否有边框
       * @default true
       */
      bordered?: boolean;
      /** 选择器类名 */
      className?: string;
      /** 自定义的清除图标 */
      clearIcon?: React.ReactNode;
      /** 清除按钮的提示文案
       * @default clear
       */
      clearText?: string;
      /** 默认时间 */
      defaultValue?: DateType;
      /** 禁用全部操作
       * @default false
       */
      disabled?: boolean;
      /** 禁止选择部分小时选项 */
      disabledHours?: () => number[];
      /** 禁止选择部分分钟选项 */
      disabledMinutes?: (hour: number) => number[];
      /** 禁止选择部分秒选项 */
      disabledSeconds?: (hour: number, minute: number) => number[];
      /** 展示的时间格式
       * @default "HH:mm:ss"
       */
      format?: string;
      /** 国际化配置
       * @default (默认配置)
       */
      locale?: typeof enUS;
      /** 定义浮层的容器，默认为 body 上新建 div */
      getPopupContainer?: RenderDOMFunc;
      /** 隐藏禁止选择的选项
       * @default false
       */
      hideDisabledOptions?: boolean;
      /** 小时选项间隔
       * @default 1
       */
      hourStep?: number;
      /** 设置输入框为只读（避免在移动设备上打开虚拟键盘）
       * @default false
       */
      inputReadOnly?: boolean;
      /** 分钟选项间隔
       * @default 1
       */
      minuteStep?: number;
      /** 面板是否打开
       * @default false
       */
      open?: boolean;
      /** 没有值的时候显示的内容
       * @default "请选择时间"
       */
      placeholder?: string | [string, string];
      /** 弹出层类名 */
      popupClassName?: string;
      /** 弹出层样式对象 */
      popupStyle?: object;
      /** 选择框底部显示自定义的内容 */
      renderExtraFooter?: (mode: PanelMode) => React.ReactNode;
      /** 秒选项间隔
       * @default 1
       */
      secondStep?: number;
      /** 面板是否显示“此刻”按钮 */
      showNow?: boolean;
      /** 自定义的选择框后缀图标 */
      suffixIcon?: React.ReactNode;
      /** 使用 12 小时制，为 true 时 format 默认为 h:mm:ss a
       * @default false
       */
      use12Hours?: boolean;
      /** 当前时间 */
      value?: DateType;
      /** 时间发生变化的回调 */
      onChange?: (time: DateType | null, timeString: string) => void;
      /** 面板打开/关闭时的回调 */
      onOpenChange?: (open: boolean) => void;
  }
  export interface RangePickerProps extends DateRangePickerProps {
      /** 始末时间是否自动排序
       * @default true
       */
      order?: boolean;
  }
  export const RangePicker: React.FC<RangePickerProps>;
  /**
   * 当用户需要输入一个时间，可以点击标准输入框，弹出时间面板进行选择。
   *
   * ### 使用方式
   * ```js
   * import TimePicker from '@ling-design/core/es/components/time-picker'
   * ```
   */
  export const TimePicker: React.FC<TimePickerProps> & {
      RangePicker: typeof RangePicker;
  };
  export default TimePicker;
}
declare module "ling_core/components/time-picker" {
  import TimePicker from "ling_core/components/time-picker/time-picker";
  export { TimePickerProps, RangePickerProps as TimeRangePickerProps, } from "ling_core/components/time-picker/time-picker";
  export default TimePicker;
}
declare module "ling_core/components/date-picker/date-picker" {
  import './date-picker.scss';
  import { PickerLocale } from 'antd/lib/date-picker/generatePicker';
  import { Moment } from 'moment';
  import { CustomFormat, DisabledTime, DisabledTimes, EventValue, OnPanelChange, PanelMode, PickerMode, RangeValue } from 'rc-picker/lib/interface';
  import { MonthCellRender } from 'rc-picker/lib/panels/MonthPanel/MonthBody';
  import { SharedTimeProps } from 'rc-picker/lib/panels/TimePanel';
  import { RangeDateRender, RangeInfo, RangePickerDateProps, RangeType } from 'rc-picker/lib/RangePicker';
  import { RenderDOMFunc } from 'rc-select/lib/BaseSelect';
  import React from 'react';
  import { TimePickerProps } from "ling_core/components/time-picker";
  type TQuickSelectKey = 'recentWeek' | 'recentMonth' | 'recentQuarter' | 'recentYear' | 'curWeek' | 'curMonth' | 'curQuarter' | 'curYear';
  export interface BaseProps<DateType> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'placeholder' | 'defaultValue' | 'onChange' | 'onSelect'> {
      /** 是否显示清除按钮
       * @default true
       */
      allowClear?: boolean;
      /** 自动获取焦点
       * @default false
       */
      autoFocus?: boolean;
      /** 是否有边框
       * @default true
       */
      bordered?: boolean;
      /** 选择器 className */
      className?: string;
      /** 自定义日期单元格的内容 */
      dateRender?: (currentDate: DateType, today: DateType) => React.ReactNode;
      /** 禁用
       * @default false
       */
      disabled?: boolean;
      /** 不可选择的日期 */
      disabledDate?: (currentDate: DateType) => boolean;
      /** 额外的弹出日历 className */
      dropdownClassName?: string;
      /** 定义浮层的容器，默认为 body 上新建 div */
      getPopupContainer?: RenderDOMFunc;
      /** 设置输入框为只读（避免在移动设备上打开虚拟键盘）
       * @default false
       */
      inputReadOnly?: boolean;
      /** 国际化配置
       * @default [默认配置](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json)
       */
      locale?: PickerLocale;
      /** 日期面板的状态（设置后无法选择年份/月份？） */
      mode?: PanelMode;
      /** 自定义下一个图标 */
      nextIcon?: React.ReactNode;
      /** 控制弹层是否展开 */
      open?: boolean;
      /** 自定义渲染面板 */
      panelRender?: (originPanel: React.ReactNode) => React.ReactNode;
      /** 设置选择器类型
       * @default "date"
       */
      picker?: PickerMode;
      /** 输入框提示文字 */
      placeholder?: string | [string, string];
      /** 额外的弹出日历样式
       * @default {}
       */
      popupStyle?: React.CSSProperties;
      /** 自定义上一个图标 */
      prevIcon?: React.ReactNode;
      /** 输入框大小，large 高度为 40px，small 为 24px，默认是 32px */
      size?: 'large' | 'middle' | 'small';
      /** 自定义输入框样式
       * @default {}
       */
      style?: React.CSSProperties;
      /** 自定义的清除图标 */
      clearIcon?: React.ReactNode;
      /** 自定义的选择框后缀图标 */
      suffixIcon?: React.ReactNode;
      /** 自定义 << 切换图标 */
      superNextIcon?: React.ReactNode;
      /** 自定义 >> 切换图标 */
      superPrevIcon?: React.ReactNode;
      /** 弹出日历和关闭日历的回调 */
      onOpenChange?: (open: boolean) => void;
      /** 日历面板切换的回调 */
      onPanelChange?: (mode: PanelMode | null, viewValue: DateType) => void;
  }
  export interface DatePickerProps<DateType = Moment> extends Omit<BaseProps<DateType>, 'onPanelChange'> {
      /** 默认面板日期 */
      defaultPickerValue?: DateType;
      /** 默认日期，如果开始时间或结束时间为 null 或者 undefined，日期范围将是一个开区间 */
      defaultValue?: DateType;
      /** 不可选择的时间 */
      disabledTime?: DisabledTime<DateType>;
      /** 设置日期格式，为数组时支持多格式匹配，展示以第一个为准。配置参考 moment.js，支持自定义格式
       * @default "YYYY-MM-DD"
       */
      format?: string | CustomFormat<DateType> | (string | CustomFormat<DateType>)[];
      /** 在面板中添加额外的页脚 */
      renderExtraFooter?: (mode: any) => React.ReactNode;
      /** 当设定了 showTime 的时候，面板是否显示“此刻”按钮 */
      showNow?: boolean;
      /** 增加时间选择功能
       * @default [TimePicker Options](https://ant.design/components/time-picker-cn/#API)
       */
      showTime?: boolean | SharedTimeProps<DateType>;
      /** 是否展示“今天”按钮
       * @default true
       */
      showToday?: boolean;
      /** 日期 */
      value?: DateType;
      /** 时间发生变化的回调 */
      onChange?: (value: DateType | null, dateString: string) => void;
      /** 点击确定按钮的回调 */
      onOk?: (date: DateType) => void;
      /** 日期面板变化时的回调 */
      onPanelChange?: OnPanelChange<DateType>;
      placeholder?: string;
  }
  export interface WeekPickerProps<DateType = Moment> extends DatePickerProps<DateType> {
      /** 默认面板日期 */
      defaultPickerValue?: DateType;
      /** 默认日期 */
      defaultValue?: DateType;
      /** 展示的日期格式，配置参考 moment.js
       * @default YYYY-wo
       */
      format?: string;
      /** 在面板中添加额外的页脚 */
      renderExtraFooter?: (mode: PanelMode) => React.ReactNode;
      /** 日期 */
      value?: DateType;
      /** 时间发生变化的回调，发生在用户选择时间时 */
      onChange?: (value: DateType | null, dateString: string) => void;
  }
  export interface MonthPickerProps<DateType = Moment> extends DatePickerProps<DateType> {
      /** 默认面板日期 */
      defaultPickerValue?: DateType;
      /** 默认日期 */
      defaultValue?: DateType;
      /** 展示的日期格式
       * @default "YYYY-MM"
       */
      format?: string;
      /** 自定义的月份内容渲染方法 */
      monthCellRender?: MonthCellRender<DateType>;
      /** 在面板中添加额外的页脚 */
      renderExtraFooter?: (mode: PanelMode) => React.ReactNode;
      /** 日期 */
      value?: DateType;
      /** 时间发生变化的回调，发生在用户选择时间时 */
      onChange?: (value: DateType | null, dateString: string) => void;
  }
  export interface YearPickerProps<DateType = Moment> extends DatePickerProps<DateType> {
      /** 默认面板日期 */
      defaultPickerValue?: DateType;
      /** 默认日期 */
      defaultValue?: DateType;
      /** 展示的日期格式
       * @default "YYYY"
       */
      format?: string;
      /** 在面板中添加额外的页脚 */
      renderExtraFooter?: (mode: PanelMode) => React.ReactNode;
      /** 日期 */
      value?: DateType;
      /** 时间发生变化的回调，发生在用户选择时间时 */
      onChange?: (value: DateType | null, dateString: string) => void;
  }
  export interface QuarterPickerProps<DateType = Moment> extends DatePickerProps<DateType> {
      /** 默认面板日期 */
      defaultPickerValue?: DateType;
      /** 默认日期 */
      defaultValue?: DateType;
      /** 展示的日期格式
       * @default "YYYY-QQ"
       */
      format?: string;
      /** 在面板中添加额外的页脚 */
      renderExtraFooter?: (mode: PanelMode) => React.ReactNode;
      /** 日期 */
      value?: DateType;
      /** 时间发生变化的回调，发生在用户选择时间时 */
      onChange?: (value: DateType | null, dateString: string) => void;
  }
  export interface RangePickerProps<DateType = Moment> extends Omit<BaseProps<DateType>, 'dateRender' | 'disabled' | 'mode' | 'onPanelChange'> {
      /** 允许起始项部分为空
       * @default [false, false]
       */
      allowEmpty?: [boolean, boolean];
      /** 自定义日期单元格的内容 */
      dateRender?: RangeDateRender<DateType>;
      /** 默认面板日期 */
      defaultPickerValue?: [DateType, DateType];
      /** 默认日期 */
      defaultValue?: RangeValue<DateType>;
      /** 禁用起始项 */
      disabled?: [boolean, boolean];
      /** 不可选择的时间 */
      disabledTime?: (date: EventValue<DateType>, type: RangeType) => DisabledTimes;
      /** 展示的日期格式
       * @default "YYYY-MM-DD HH:mm:ss"
       */
      format?: string;
      /** 预设时间范围快捷选择 */
      ranges?: Record<string, Exclude<RangeValue<DateType>, null> | (() => Exclude<RangeValue<DateType>, null>)>;
      /** 在面板中添加额外的页脚 */
      renderExtraFooter?: () => React.ReactNode;
      /** 设置分隔符
       * @default <SwapRightOutlined />
       */
      separator?: React.ReactNode;
      /** 增加时间选择功能
       * @default [TimePicker Options](https://ant.design/components/time-picker-cn/#API)
       */
      showTime?: RangePickerDateProps<DateType>['showTime'];
      /** 日期 */
      value?: RangeValue<DateType>;
      /** 待选日期发生变化的回调。 */
      onCalendarChange?: (values: RangeValue<DateType>, formatString: [string, string], info: RangeInfo) => void;
      /** 日期范围发生变化的回调 */
      onChange?: (values: RangeValue<DateType>, formatString: [string, string]) => void;
      mode?: [PanelMode, PanelMode];
      placeholder?: [string, string];
      onPanelChange?: (values: RangeValue<DateType>, modes: [PanelMode, PanelMode]) => void;
      /**
       * 快捷选择触发
       */
      onQuickSelect?: (values: RangeValue<DateType>) => void;
      /**
       * 快捷选择控件key
       */
      quickSelectKeys?: TQuickSelectKey[] | TQuickSelectKey[][];
      defaultQuickSelectKey?: TQuickSelectKey;
  }
  export const WeekPicker: React.FC<WeekPickerProps>;
  export const MonthPicker: React.FC<MonthPickerProps>;
  export const YearPicker: React.FC<YearPickerProps>;
  export const RangePicker: React.FC<RangePickerProps>;
  export const TimePicker: React.FC<TimePickerProps>;
  export const QuarterPicker: React.FC<QuarterPickerProps>;
  /**
   * 输入或选择日期的控件。
   *
   * ### 何时使用
   *
   * 当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。
   *
   * ### 使用方式
   * ```js
   * import DatePicker from '@ling-design/core/es/components/date-picker'
   * ```
   */
  export const DatePicker: React.FC<DatePickerProps> & {
      WeekPicker: typeof WeekPicker;
      MonthPicker: typeof MonthPicker;
      YearPicker: typeof YearPicker;
      RangePicker: typeof RangePicker;
      TimePicker: typeof TimePicker;
      QuarterPicker: typeof QuarterPicker;
  };
  export default DatePicker;
}
declare module "ling_core/components/date-picker" {
  import DatePicker from "ling_core/components/date-picker/date-picker";
  export { DatePickerProps } from "ling_core/components/date-picker/date-picker";
  export default DatePicker;
}
declare module "ling_core/components/descriptions" {
  export { default } from 'antd/lib/descriptions';
  export * from 'antd/lib/descriptions';
}
declare module "ling_core/components/divider" {
  export { default } from 'antd/lib/divider';
  export * from 'antd/lib/divider';
}
declare module "ling_core/components/drawer" {
  export { default } from 'antd/lib/drawer';
  export * from 'antd/lib/drawer';
}
declare module "ling_core/components/empty/constant" {
  import { EmptyTheme, EmptyType } from "ling_core/components/empty/empty";
  export function selectIconByTypeAndTheme(type: EmptyType, theme: EmptyTheme): any;
}
declare module "ling_core/components/empty/empty" {
  import './empty.scss';
  import React from 'react';
  export type EmptyType = 'search' | 'favorite' | 'signal' | 'record';
  export type EmptyTheme = 'gray' | 'dark' | 'theme';
  export interface EmptyProps {
      /**
       * 内联样式
       */
      style?: React.CSSProperties;
      /**
       * 容器类名
       */
      className?: string;
      /**
       * svg icon 尺寸，默认 128px
       */
      size?: number;
      /**
       * 错误类型
       */
      type?: EmptyType;
      /**
       * 错误主题，适用于不同的背景色
       */
      theme?: EmptyTheme;
      /**
       * 错误标题
       */
      title?: string | React.ReactNode;
      /**
       * 错误描述
       */
      desc?: React.ReactNode;
  }
  const Empty: React.FC<EmptyProps>;
  export default Empty;
}
declare module "ling_core/components/empty" {
  import type { EmptyProps } from "ling_core/components/empty/empty";
  import Empty from "ling_core/components/empty/empty";
  export { EmptyProps };
  export default Empty;
}
declare module "ling_core/components/form/form" {
  import './form.scss';
  import { FormInstance, FormProps } from 'antd/lib/form';
  import React from 'react';
  /**
   * 表单
   *
   * ### 何时使用
   * 高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。
   *
   * ### 使用方式
   * ```js
   * import Form from '@ling-design/core/es/components/form'
   * ```
   */
  const InternalForm: React.ForwardRefExoticComponent<FormProps<any> & React.RefAttributes<FormInstance<any>>>;
  export default InternalForm;
}
declare module "ling_core/components/form/form-item" {
  import './form.scss';
  import { FormItemProps as AntdFormItemProps } from 'antd/lib/form';
  import React from 'react';
  export interface FormItemProps extends AntdFormItemProps {
  }
  /**
   * 表单
   *
   * ### 何时使用
   *
   *
   * ### 使用方式
   * ```js
   * import FormItem from '@ling-design/core/es/components/form/form-item'
   * ```
   */
  export const FormItem: React.FC<FormItemProps>;
  export default FormItem;
}
declare module "ling_core/components/form/form-section" {
  import './form.scss';
  import React from 'react';
  export interface FormSectionProps {
      /**
       * 标题
       */
      title: string;
  }
  export const FormSection: React.FC<FormSectionProps>;
  export default FormSection;
}
declare module "ling_core/components/form/form-title" {
  import './form.scss';
  import React from 'react';
  export const FormTitle: React.FC;
  export default FormTitle;
}
declare module "ling_core/components/form" {
  import AntdForm, { ErrorListProps, FormInstance, FormListProps, FormProps } from 'antd/lib/form';
  import { Rule, RuleObject, RuleRender } from 'rc-field-form/lib/interface';
  import InternalForm from "ling_core/components/form/form";
  import FormItem, { FormItemProps } from "ling_core/components/form/form-item";
  import FormSection, { FormSectionProps } from "ling_core/components/form/form-section";
  import FormTitle from "ling_core/components/form/form-title";
  export { ErrorListProps, FormInstance, FormItemProps, FormListProps, FormProps, FormSectionProps, Rule, RuleObject, RuleRender, };
  type InternalFormType = typeof InternalForm;
  interface CompoundedComponent extends InternalFormType {
      Item: typeof FormItem;
      Title: typeof FormTitle;
      Section: typeof FormSection;
      List: typeof AntdForm.List;
      useForm: typeof AntdForm.useForm;
      ErrorList: typeof AntdForm.ErrorList;
      Provider: typeof AntdForm.Provider;
  }
  const Form: CompoundedComponent;
  export default Form;
}
declare module "ling_core/components/grid/row" {
  export { default } from 'antd/lib/row';
  export * from 'antd/lib/row';
}
declare module "ling_core/components/grid" {
  export { default as Col } from "ling_core/components/grid/col";
  export { default as Row } from "ling_core/components/grid/row";
  export { default } from 'antd/lib/grid';
}
declare module "ling_core/components/popover/popover" {
  import './popover.scss';
  import { PopoverProps as AntdPopoverProps } from 'antd/lib/popover';
  import React from 'react';
  export interface PopoverProps extends AntdPopoverProps {
      showArrow?: boolean;
      /**
       * 内容是否默认带padding
       * @default false
       */
      noPadding?: boolean;
      /**
       * 内容是否默认带窄边padding
       * @default false
       */
      narrowPadding?: boolean;
  }
  const Popover: React.ForwardRefExoticComponent<PopoverProps & React.RefAttributes<unknown>>;
  export default Popover;
}
declare module "ling_core/components/popover/popoverItem" {
  import './popover.scss';
  import React from 'react';
  export interface PopoverItemProps {
      onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
      children: JSX.Element;
      type?: 'warning';
  }
  export default function PopoverItem(props: PopoverItemProps): JSX.Element;
}
declare module "ling_core/components/popover" {
  import Popover from "ling_core/components/popover/popover";
  import PopoverItem from "ling_core/components/popover/popoverItem";
  export type { PopoverProps } from "ling_core/components/popover/popover";
  export type { PopoverItemProps } from "ling_core/components/popover/popoverItem";
  export default Popover;
  export { PopoverItem };
}
declare module "ling_core/components/header/help" {
  export function cssName(name: string): string;
}
declare module "ling_core/components/header/header-help" {
  function HeaderHelp(): JSX.Element;
  export default HeaderHelp;
}
declare module "ling_core/components/spin/spin" {
  import './spin.scss';
  import { SpinProps as AntdSpinProps } from 'antd';
  import { SpinIndicator } from 'antd/lib/spin';
  import React from 'react';
  export interface SpinProps extends AntdSpinProps {
      /**
       * 延迟显示加载效果的时间（防止闪烁）
       */
      delay?: number;
      /**
       * 加载指示符
       */
      indicator?: SpinIndicator;
      /**
       * 尺寸
       */
      size?: 'small' | 'default' | 'large';
      /**
       * 是否为加载中
       */
      spinning?: boolean;
      /**
       * 自定义描述文案
       */
      tip?: string;
      /**
       * 包装器的类属性
       */
      wrapperClassName?: string;
  }
  const Spin: React.FC<SpinProps>;
  export default Spin;
}
declare module "ling_core/components/spin" {
  import { SpinProps } from "ling_core/components/spin/spin";
  import Spin from "ling_core/components/spin/spin";
  export { SpinProps };
  export default Spin;
}
declare module "ling_core/components/tabs/tabs" {
  import './tabs.scss';
  import React from 'react';
  export interface TabItem {
      key: string;
      name: string;
  }
  export interface TabProps {
      /**
       * Tab类型，switch卡片式导航、page页面导航、module模块导航、submodule模块内次级导航
       * @default module
       */
      type: 'switch' | 'page' | 'module' | 'submodule' | 'pagesimple';
      /**
       * 组件尺寸
       * @default small
       */
      size?: 'small' | 'middle' | 'large';
      /**
       * tab 排列方向
       * @default left
       */
      align?: 'left' | 'center' | 'right';
      /**
       * 自定义样式名
       */
      className?: string;
      /**
       * 自定义样式
       */
      style?: React.CSSProperties;
      /**
       * tab 项
       */
      tabs: TabItem[];
      /**
       * 当前选中key，受控
       */
      activeKey?: string;
      /**
       * Tab 切换触发
       */
      onChange?: (key: string, item: TabItem) => void;
      /**
       * 是否需要下边
       */
      bordered?: boolean;
  }
  /**
   * 导航组件
   * ### 何时使用
   * 页面导航、模块内导航、switch 导航
   *
   * ### 使用方式
   * ```js
   * import Tabs from '@ling-design/core/es/components/tabs'
   */
  const Tabs: React.FC<TabProps>;
  export default Tabs;
}
declare module "ling_core/components/tabs" {
  import Tab from "ling_core/components/tabs/tabs";
  export type { TabItem, TabProps } from "ling_core/components/tabs/tabs";
  export default Tab;
}
declare module "ling_core/components/header/types" {
  export type MessageStatus = 'UNREAD' | 'READ';
  export type PlatformType = 'LING' | 'DESIGN';
  export interface Message {
      /**
       * id
       */
      id: number;
      /**
       * 用户 id
       */
      userId: number;
      /**
       * 消息 id
       */
      messageId: number;
      /**
       *
       */
      businessId: number;
      /**
       * 标题
       */
      title: string;
      /**
       * 内容
       */
      content: string;
      /**
       * 跳转链接
       */
      url: string;
      /**
       * 类型
       */
      type: 'SYSTEM_NOTICE' | 'VERSION_INFO' | 'TOAST_NOTIFIER';
      /**
       * 状态
       * UNREAD: 未读
       * READ: 已读
       */
      status: 'UNREAD' | 'READ';
      /**
       * 链接类型
       * SELF: 本站
       * BLANK: 新标签页
       */
      urlTargetType: 'SELF' | 'BLANK';
      /**
       * 创建时间
       */
      createdAt: number;
      /**
       * 更新时间
       */
      updatedAt: number;
  }
  export interface User {
      /**
       * 头像
       */
      avatar: string;
      /**
       * 用户类型
       */
      type: 'USER' | 'ERP' | 'MERCHANT' | 'COMPANY_USER';
      /**
       * 昵称
       */
      nickname: string;
      /**
       * 用户名
       */
      username: string;
  }
  export interface Link {
      /**
       * 链接名
       */
      name: string;
      /**
       * 跳转地址
       */
      path?: string;
      /**
       * 点击事件
       */
      onClick?: () => void;
  }
  export interface HelpLink extends Link {
      /**
       * 图标 svg 字符串
       */
      icon: string;
  }
  export interface HelpData {
      /**
       * 帮助链接
       */
      helpLinks: {
          /**
           * 二维码图片地址
           */
          qrcode: string;
          /**
           * 链接
           */
          links: HelpLink[];
          /**
           * 描述
           */
          descs: string[];
      };
  }
}
declare module "ling_core/components/header/notice-api" {
  import { MessageStatus, PlatformType } from "ling_core/components/header/types";
  export interface NoticeBaseParams {
      /**
       * 消息状态
       * UNREAD: 未读
       * READ: 已读
       */
      status?: MessageStatus;
      /**
       * 平台
       */
      platformType?: PlatformType;
  }
  export interface NoticeParams extends NoticeBaseParams {
      /**
       * 页码
       */
      page: number;
      /**
       * 分页大小
       */
      size: number;
  }
  function fetchCount(baseURL: string, params: NoticeBaseParams): Promise<any>;
  function fetchList(baseURL: string, params: NoticeParams): Promise<any>;
  function setReadBatch(baseURL: string, ids: number[]): Promise<any>;
  function setReadAll(baseURL: string): Promise<any>;
  export { fetchCount, fetchList, setReadAll, setReadBatch };
}
declare module "ling_core/components/header/header-notice" {
  import type { Message, PlatformType } from "ling_core/components/header/types";
  interface NotiProps {
      /**
       * 通知接口 notificationBaseUrl
       */
      notificationBaseUrl: string;
      /**
       * 平台 platform
       */
      platform?: PlatformType;
      /**
       * 点击消息列表回调
       */
      onMsgClick?: (message: Message) => boolean;
  }
  function Notification(props: NotiProps): JSX.Element;
  export default Notification;
}
declare module "ling_core/components/input/group" {
  import { GroupProps as AntdGroupProps } from 'antd/lib/input/Group';
  import React from 'react';
  export interface GroupProps extends AntdGroupProps {
  }
  const Group: React.FC<GroupProps>;
  export default Group;
}
declare module "ling_core/components/input/helper" {
  export function formatClearIcon(allowClear?: boolean): boolean | {
      clearIcon: JSX.Element;
  };
  interface showCountProps {
      formatter: (args: {
          count: number;
          maxLength?: number;
      }) => string;
  }
  export function formatShowCount(showCount?: boolean): showCountProps | boolean | undefined;
}
declare module "ling_core/components/input/input" {
  import './input.scss';
  import { InputProps as AntdInputProps, InputRef } from 'antd/lib/input';
  import React from 'react';
  export interface InputProps extends AntdInputProps {
      /**
       * 显示字数，这里屏蔽 Antd formatter 用法
       */
      showCount?: boolean;
      /**
       * 是否允许清空
       */
      allowClear?: boolean;
  }
  const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<InputRef>>;
  export { InputRef };
  export default Input;
}
declare module "ling_core/components/input/password" {
  import './input.scss';
  import { PasswordProps as AntdPasswordProps } from 'antd/lib/input/Password';
  import React from 'react';
  export interface PasswordProps extends AntdPasswordProps {
  }
  const Password: React.FC<PasswordProps>;
  export default Password;
}
declare module "ling_core/components/input/search" {
  import { SearchProps as AntdSearchProps } from 'antd/lib/input/Search';
  import React from 'react';
  export interface SearchProps extends AntdSearchProps {
  }
  const Search: React.FC<SearchProps>;
  export default Search;
}
declare module "ling_core/components/input/textarea" {
  import { TextAreaProps as AntdTextAreaProps } from 'antd/lib/input/TextArea';
  import React from 'react';
  export interface TextAreaProps extends AntdTextAreaProps {
      /**
       * 显示字数，这里屏蔽 Antd formatter 用法
       */
      showCount?: boolean;
  }
  const Textarea: React.FC<TextAreaProps>;
  export default Textarea;
}
declare module "ling_core/components/input" {
  import type { GroupProps } from "ling_core/components/input/group";
  import Group from "ling_core/components/input/group";
  import type { InputProps, InputRef } from "ling_core/components/input/input";
  import type { PasswordProps } from "ling_core/components/input/password";
  import Password from "ling_core/components/input/password";
  import type { SearchProps } from "ling_core/components/input/search";
  import Search from "ling_core/components/input/search";
  import type { TextAreaProps } from "ling_core/components/input/textarea";
  import TextArea from "ling_core/components/input/textarea";
  export { GroupProps, InputProps, InputRef, PasswordProps, SearchProps, TextAreaProps, };
  interface CompoundedComponent extends React.ForwardRefExoticComponent<InputProps & React.RefAttributes<InputRef>> {
      Group: typeof Group;
      TextArea: typeof TextArea;
      Password: typeof Password;
      Search: typeof Search;
  }
  const Input: CompoundedComponent;
  export default Input;
}
declare module "ling_core/components/input-search/input-search" {
  import './input-search.scss';
  import React from 'react';
  import { InputProps } from "ling_core/components/input";
  export interface InputSearchProps extends Omit<InputProps, 'size' | 'onChange'> {
      /**
       * 组件类名
       */
      className?: string;
      /**
       * 搜索关键词
       */
      keyword?: string;
      /**
       * 是否禁用
       */
      disabled?: boolean;
      /**
       * 搜索框占位词
       */
      placeholder?: string;
      /**
       * 是否允许清空
       */
      allowClear?: boolean;
      /**
       * 搜索框后缀的内容
       */
      suffix?: React.ReactNode;
      /**
       * 输入框为空的时候触发搜索回调
       */
      searchOnEmpty?: boolean;
      /**
       * 失去焦点时触发搜索回调
       */
      searchOnBlur?: boolean;
      /**
       * 搜索词变化的回调
       */
      onChange?: (keyword: string) => void;
      /**
       * 按下搜索/回车的回调
       */
      onSearch?: (keyword: string) => void;
  }
  const InputSearch: React.FC<InputSearchProps>;
  export default InputSearch;
}
declare module "ling_core/components/input-search" {
  export type { InputSearchProps } from "ling_core/components/input-search/input-search";
  export { default } from "ling_core/components/input-search/input-search";
}
declare module "ling_core/components/header/header-search" {
  import React from 'react';
  import { InputSearchProps } from "ling_core/components/input-search";
  export interface SearchModule {
      /**
       * 是否开启
       */
      enable?: boolean;
      /**
       * 占位词
       */
      placeholder?: string;
      /**
       * 是否展示热词面板
       */
      showHotData?: boolean;
      /**
       * 搜索框默认值
       */
      keyword?: string;
      /**
       * 为空的时候是否搜索
       */
      searchOnEmpty?: boolean;
      /**
       * 搜索框前缀
       */
      addonBefore?: React.ReactNode;
      /**
       * 搜索热词 neos 配置地址
       */
      hotDataUrl: string;
      /**
       * 搜索框回调
       */
      onSearch?: InputSearchProps['onSearch'];
  }
  interface SearchProps {
      /**
       * 搜索功能（样式不兼容后台）
       */
      searchModule?: SearchModule;
  }
  function HeaderSearch(props: SearchProps): JSX.Element;
  export default HeaderSearch;
}
declare module "ling_core/components/header/header-user" {
  import { Link, User } from "ling_core/components/header/types";
  interface UserProps {
      /**
       * 用户信息
       */
      user?: User | null;
      /**
       * 链接
       */
      userLinks?: Array<Array<Link>>;
      /**
       * 登录回调
       */
      onLogin?: () => void;
      /**
       * 退出登录回调
       */
      onLogout?: () => void;
  }
  function HeaderUser(props: UserProps): JSX.Element;
  export default HeaderUser;
}
declare module "ling_core/components/header/header" {
  import './header.scss';
  import { SearchModule } from "ling_core/components/header/header-search";
  import { Link, Message, PlatformType, User } from "ling_core/components/header/types";
  export interface HeaderProps {
      /**
       * 用户信息
       */
      user?: User | null;
      /**
       * 是否显示 logo
       */
      showLogo?: boolean;
      /**
       * logo 链接和打开方式
       */
      logoInfo?: {
          link: string;
          target?: string;
          imgUrl?: string;
      };
      /**
       * 是否显示除logo以外的主区域
       */
      showHeaderMain?: boolean;
      /**
       * 是否显示帮助中心
       */
      showHeaderHelp?: boolean;
      /**
       * 自定义部分
       */
      slot?: JSX.Element | null;
      /**
       * 搜索功能（样式不兼容后台）
       */
      searchModule?: SearchModule;
      /**
       * 搜索功能（用户需要自己传入搜索）
       */
      search?: JSX.Element | null;
      /**
       * 通知接口 baseUrl
       */
      notificationBaseUrl: string;
      /**
       * 通知接口 平台
       */
      platform?: PlatformType;
      /**
       * neos 配置
       */
      helpDataUrl: string;
      /**
       * 用户头像 popover 配置的链接
       */
      userLinks?: Array<Array<Link>>;
      /**
       * 点击消息列表回调
       */
      onMsgClick?: (message: Message) => boolean;
      /**
       * 退出登录回调
       */
      onLogout?: () => void;
      /**
       * 登录回调
       */
      onLogin?: () => void;
  }
  export function selectCompRoot(): HTMLDivElement;
  function Header(props: HeaderProps): JSX.Element;
  export default Header;
}
declare module "ling_core/components/header" {
  import type { HeaderProps } from "ling_core/components/header/header";
  import Header from "ling_core/components/header/header";
  export { HeaderProps };
  export default Header;
}
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
      lazy?: boolean;
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
      /** 是否懒加载
       * @default false
       */
      lazy?: boolean;
      /** 是否懒加载回收节点
       * @default false
       */
      lazyRetrieve?: boolean;
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
declare module "ling_core/components/input-number/input-number" {
  import './input-number.scss';
  import { InputNumberProps as AntdInputNumberProps } from 'antd/lib/input-number';
  import React from 'react';
  type InputNumberValueType = number | string;
  export interface InputNumberProps<T extends InputNumberValueType = InputNumberValueType> extends AntdInputNumberProps<T> {
      /**
       * 输入框后缀说明
       */
      suffix?: string;
      /**
       * 值
       */
      value?: T;
  }
  const InputNumber: React.FC<InputNumberProps>;
  export default InputNumber;
}
declare module "ling_core/components/input-number" {
  import type { InputNumberProps } from "ling_core/components/input-number/input-number";
  import InputNumber from "ling_core/components/input-number/input-number";
  export { InputNumberProps };
  export default InputNumber;
}
declare module "ling_core/components/layout/sider" {
  import './sider.scss';
  import { CollapseType, SiderTheme } from 'antd/lib/layout/Sider';
  import React from 'react';
  export interface SiderProps extends React.HTMLAttributes<HTMLElement> {
      /** 触发响应式布局的断点 */
      breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
      /** 当前收起状态 */
      collapsed?: boolean;
      /** 收缩宽度，设置为 0 会出现特殊 trigger
       * @default 80
       */
      collapsedWidth?: number;
      /** 是否可收起
       * @default false
       */
      collapsible?: boolean;
      /** 是否默认收起
       * @default false
       */
      defaultCollapsed?: boolean;
      /** 翻转折叠提示箭头的方向，当 Sider 在右边时可以使用
       * @default false
       */
      reverseArrow?: boolean;
      /** 主题颜色
       * @default "dark"
       */
      theme?: SiderTheme;
      /** 自定义 trigger，设置为 null 时隐藏 trigger */
      trigger?: React.ReactNode;
      /** 宽度
       * @default 200
       */
      width?: number | string;
      /** 指定当 collapsedWidth 为 0 时出现的特殊 trigger 的样式 */
      zeroWidthTriggerStyle?: React.CSSProperties;
      /** 触发响应式布局断点时的回调 */
      onBreakpoint?: (broken: boolean) => void;
      /** 展开-收起时的回调函数，有点击 trigger 以及响应式反馈两种方式可以触发 */
      onCollapse?: (collapsed: boolean, type: CollapseType) => void;
  }
  /**
   * 侧边栏。
   *
   * ### 使用方式
   * ```js
   * import Sider from '@ling-design/core/es/components/layout/sider'
   * ```
   */
  export const Sider: React.FC<SiderProps>;
  export default Sider;
}
declare module "ling_core/components/layout/layout" {
  import './layout.scss';
  import React from 'react';
  import Sider from "ling_core/components/layout/sider";
  export interface LayoutProps extends React.HTMLAttributes<HTMLElement> {
      /** 表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动 */
      hasSider?: boolean;
  }
  interface LayoutContentProps extends LayoutProps {
      grid?: boolean;
  }
  export const Content: React.FC<LayoutContentProps>;
  export const Footer: React.FC<LayoutProps>;
  export const Header: React.FC<LayoutProps>;
  /**
   * 布局容器。
   *
   * ### 使用方式
   * ```js
   * import Layout from '@ling-design/core/es/components/layout'
   * ```
   */
  export const Layout: React.FC<LayoutProps> & {
      Header: typeof Header;
      Footer: typeof Footer;
      Content: typeof Content;
      Sider: typeof Sider;
  };
  export default Layout;
}
declare module "ling_core/components/layout" {
  export { default } from "ling_core/components/layout/layout";
  export * from "ling_core/components/layout/layout";
  export { SiderProps } from "ling_core/components/layout/sider";
}
declare module "ling_core/components/list" {
  export { default } from 'antd/lib/list';
  export * from 'antd/lib/list';
}
declare module "ling_core/components/masonry/const" {
  export const DEFAULT_COLUMNS_COUNT = 1;
  export const DEFAULT_GUTTER = 20;
  export const DEFAULT_COLUMNS_COUNT_POINTS: {
      1000: number;
  };
  export enum MasonryType {
      'column' = "column",
      'flex' = "flex"
  }
  export enum MasonryDirection {
      'row' = "row",
      'column' = "column"
  }
}
declare module "ling_core/components/masonry/hooks" {
  export const useHasMounted: () => boolean;
  export const useWindowWidth: () => number;
  export const useColumnCount: (columnsCountBreakPoints: {
      [props: number]: number;
  }, adaptiveWidth?: number) => number;
}
declare module "ling_core/components/masonry/masonry-absolute/utils" {
  import React from 'react';
  export const getListAndHeight: ({ children, columnCount, wrapRef, gutter, }: {
      children: React.ReactNode;
      columnCount: number;
      wrapRef: any;
      gutter: number;
  }) => {
      list: {
          node: React.ReactNode;
          style: {
              [props: string]: any;
          };
      }[];
      height: number;
  };
}
declare module "ling_core/components/masonry/masonry-absolute" {
  import './index.scss';
  import React from 'react';
  import { MasonryProps } from "ling_core/components/masonry";
  const MasonryAbsolute: React.FC<MasonryProps & {
      columnCount: number;
  }>;
  export default MasonryAbsolute;
}
declare module "ling_core/components/masonry/masonry-column" {
  import './index.scss';
  import React from 'react';
  import { MasonryProps } from "ling_core/components/masonry/masonry";
  const MasonryColumn: React.FC<MasonryProps & {
      columnCount: number;
  }>;
  export default MasonryColumn;
}
declare module "ling_core/components/masonry/masonry-flex/utils" {
  import React from 'react';
  export const getColumns: (children: React.ReactNode, columnCount: number) => {
      children: React.ReactNode[];
  }[];
  export const getColumnsSortWithHeight: (children: React.ReactNode, columnCount: number, ceilWidth: number, gutter: number) => {
      height: number;
      children: React.ReactNode[];
  }[];
}
declare module "ling_core/components/masonry/masonry-flex" {
  import './index.scss';
  import React from 'react';
  import { MasonryProps } from "ling_core/components/masonry/masonry";
  const MasonryFlex: React.FC<MasonryProps & {
      columnCount: number;
  }>;
  export default MasonryFlex;
}
declare module "ling_core/components/masonry/masonry" {
  import React from 'react';
  export interface MasonryProps {
      /**
       * 排列方向
       * @default 'row'
       */
      direction?: 'row' | 'column';
      /**
       * 是否需要按高度排序
       * @default true
       */
      sortWithHeight?: boolean;
      /**
       * 是否开启绝对定位方法实现瀑布流
       * @default false
       */
      useAbsolute?: boolean;
      /**
       * 自适应的配置
       * @default { 1000: 4 }
       */
      columnsCountBreakPoints?: {
          [props: number]: number;
      };
      /**
       * 自适应宽度
       */
      adaptiveWidth?: number;
      /**
       * children
       */
      children?: React.ReactNode;
      /**
       * className
       */
      className?: string;
      /**
       * style
       */
      style?: Record<string, unknown>;
      /**
       * 间隔
       * @default 20
       */
      gutter?: number;
  }
  export const Masonry: React.FC<MasonryProps>;
  export default Masonry;
}
declare module "ling_core/components/masonry/masonry-item" {
  import './index.scss';
  import React from 'react';
  const MasonryItem: React.FC<{
      width?: number;
      height: number;
      fixedHeight?: number;
      placeholderHeight?: number;
      lazy?: boolean;
      children: React.ReactNode;
  }>;
  export default MasonryItem;
}
declare module "ling_core/components/masonry/masonry-item-absolute" {
  import React from 'react';
  const MasonryAbsoluteItem: React.FC<{
      width: number;
      height: number;
      children: React.ReactNode;
  }>;
  export default MasonryAbsoluteItem;
}
declare module "ling_core/components/masonry" {
  import Masonry from "ling_core/components/masonry/masonry";
  import MasonryItem from "ling_core/components/masonry/masonry-item";
  import MasonryAbsoluteItem from "ling_core/components/masonry/masonry-item-absolute";
  export { MasonryAbsoluteItem, MasonryItem };
  export type { MasonryProps } from "ling_core/components/masonry/masonry";
  export default Masonry;
}
declare module "ling_core/components/mentions" {
  export { default } from 'antd/lib/mentions';
  export * from 'antd/lib/mentions';
}
declare module "ling_core/components/menu" {
  export { default } from 'antd/lib/menu';
  export * from 'antd/lib/menu';
}
declare module "ling_core/components/menu-mini/types" {
  import React from 'react';
  export interface Zone {
      isTop?: any;
      /**
       * id
       */
      id: string;
      /**
       * 名称
       */
      name: string;
      /**
       * 专区码
       */
      code: string;
      /**
       * 封面
       */
      cover: string;
      /**
       * 是否加入专区
       */
      joined: boolean;
      /**
       * 内容类型
       * IMAGE：图片
       * MOTION：动图
       * VIDEO：视频
       * PAGE：页面
       * MINIAPP：小程序
       */
      /**
       * 状态
       * ENABLE：启用
       * DISABLE：禁用
       */
      /**
       * 可见性
       * PUBLIC：公开
       * PRIVATE：私有
       * INDIVIDUAL：个人
       */
      visibility: 'PRIVATE' | 'PUBLIC' | 'INDIVIDUAL';
      /**
       * 业务类型
       * SELF_OPERATED：自营业务类型(自营)
       * HIRD_PARTY：第三方业务类型(企业版)
       * EXPERIENCE：体验专区(体验版)
       */
      businessType: 'SELF_OPERATED' | 'THIRD_PARTY' | 'EXPERIENCE';
  }
  export interface Menu {
      /**
       * key
       */
      key: number;
      /**
       * 图标
       */
      icon?: React.ReactNode;
      /**
       * 名称
       */
      name: string;
      /**
       * 路由
       */
      path?: string;
      /**
       * 分割线
       */
      divide?: boolean;
      /**
       * 标签
       */
      tag?: React.ReactNode;
      /**
       * tips
       */
      tips?: React.ReactNode;
      /**
       * 补充内容
       */
      addon?: React.ReactNode;
      /**
       * 选中规则
       */
      selectedRule?: RegExp;
      /**
       * 子菜单
       */
      children?: Menu[];
  }
  export interface MenuItemProps {
      /**
       * 菜单项
       */
      menu: Menu;
      /**
       * 是否是叶子节点
       */
      isLeafNode: boolean;
      /**
       * 点击事件
       */
      onMenuClick?: (menu: Menu) => void;
  }
  export interface MenuProps {
      /**
       * 主题
       */
      theme?: 'light' | 'dark';
      /**
       * logo Tips
       */
      logoTips?: string;
      /**
       * logo链接
       */
      logoUrl?: string | JSX.Element;
      /**
       * 当前选中专区
       */
      zone?: Zone | null;
      /**
       * 专区列表
       */
      zones?: Zone[];
      /**
       * 专区列表区分私有和公开
       */
      enableSplitZones?: boolean;
      /**
       * 打开的菜单
       */
      openKeys: number[];
      /**
       * 菜单项列表
       */
      menus: Menu[];
      zonesListFooter?: {
          /**
           * 文案
           */
          text: React.ReactNode;
          /**
           * 跳转地址
           */
          href?: string;
          /**
           * 点击事件
           */
          onClick?: () => void;
      };
      /**
       * 底部配置项
       */
      footer?: Menu[];
      /**
       * 增加返回
       */
      back?: Menu;
      /**
       * 是否展示当前专区信息,默认展示
       */
      showZone?: boolean;
      /**
       * 是否展示logo
       */
      showLogo?: boolean;
      /**
       * 专区切换
       */
      onZoneChange?: (zone: Zone) => void;
      /**
       * 点击事件
       */
      onMenuClick?: (menu: Menu) => void;
  }
}
declare module "ling_core/components/menu-mini/menu-item" {
  import { Menu, MenuItemProps } from "ling_core/components/menu-mini/types";
  export function menuItemSelected(menu: Menu): boolean;
  function MenuItem(props: MenuItemProps): JSX.Element;
  export default MenuItem;
}
declare module "ling_core/components/menu-mini/util" {
  export const defaultLogoUrl = "//img14.360buyimg.com/ling/jfs/t1/141524/30/32780/7459/64185bcfF9f55126f/56ede840bbfb4820.png";
}
declare module "ling_core/components/menu-mini/zone-select" {
  import './menu.scss';
  import { MenuProps } from "ling_core/components/menu-mini/types";
  function ZoneSelect(props: MenuProps): JSX.Element;
  export default ZoneSelect;
}
declare module "ling_core/components/menu-mini/menu" {
  import './menu.scss';
  import { MenuProps } from "ling_core/components/menu-mini/types";
  function Menu(props: MenuProps): JSX.Element;
  export default Menu;
}
declare module "ling_core/components/menu-mini" {
  import Menu from "ling_core/components/menu-mini/menu";
  import type { MenuProps } from "ling_core/components/menu-mini/types";
  export { MenuProps };
  export default Menu;
}
declare module "ling_core/components/menu-next/types" {
  import React from 'react';
  export interface Zone {
      isTop?: any;
      /**
       * id
       */
      id: string;
      /**
       * 名称
       */
      name: string;
      /**
       * 专区码
       */
      code: string;
      /**
       * 封面
       */
      cover: string;
      /**
       * 是否加入专区
       */
      joined: boolean;
      /**
       * 内容类型
       * IMAGE：图片
       * MOTION：动图
       * VIDEO：视频
       * PAGE：页面
       * MINIAPP：小程序
       */
      /**
       * 状态
       * ENABLE：启用
       * DISABLE：禁用
       */
      /**
       * 可见性
       * PUBLIC：公开
       * PRIVATE：私有
       * INDIVIDUAL：个人
       */
      visibility: 'PRIVATE' | 'PUBLIC' | 'INDIVIDUAL';
      /**
       * 业务类型
       * SELF_OPERATED：自营业务类型
       * HIRD_PARTY：第三方业务类型
       * EXPERIENCE：体验专区
       */
      businessType: 'SELF_OPERATED' | 'THIRD_PARTY' | 'EXPERIENCE';
  }
  export interface Menu {
      /**
       * key
       */
      key: number;
      /**
       * 图标
       */
      icon?: React.ReactNode;
      /**
       * 名称
       */
      name: string;
      /**
       * 路由
       */
      path?: string;
      /**
       * 分割线
       */
      divide?: boolean;
      /**
       * 标签
       */
      tag?: React.ReactNode;
      /**
       * tips
       */
      tips?: React.ReactNode;
      /**
       * 补充内容
       */
      addon?: React.ReactNode;
      /**
       * 选中规则
       */
      selectedRule?: RegExp;
      /**
       * 子菜单
       */
      children?: Menu[];
  }
  export interface MenuItemProps {
      /**
       * 菜单项
       */
      menu: Menu;
      /**
       * 是否是叶子节点
       */
      isLeafNode: boolean;
      /**
       * 点击事件
       */
      onMenuClick?: (menu: Menu) => void;
  }
  export interface MenuProps {
      /**
       * 主题
       */
      theme?: 'light' | 'dark';
      /**
       * logo Tips
       */
      logoTips?: string;
      /**
       * logo链接
       */
      logoUrl?: string;
      /**
       * 当前选中专区
       */
      zone?: Zone | null;
      /**
       * 专区列表
       */
      zones?: Zone[];
      /**
       * 专区列表区分私有和公开
       */
      enableSplitZones?: boolean;
      /**
       * 打开的菜单
       */
      openKeys: number[];
      /**
       * 菜单项列表
       */
      menus: Menu[];
      /**
       * 底部配置项
       */
      footer?: {
          /**
           * 文案
           */
          text: React.ReactNode;
          /**
           * 跳转地址
           */
          href?: string;
          /**
           * 点击事件
           */
          onClick?: () => void;
      };
      /**
       * 是否展示logo
       */
      showLogo?: boolean;
      /**
       * 专区切换
       */
      onZoneChange?: (zone: Zone) => void;
      /**
       * 点击事件
       */
      onMenuClick?: (menu: Menu) => void;
  }
}
declare module "ling_core/components/menu-next/menu-item" {
  import { Menu, MenuItemProps } from "ling_core/components/menu-next/types";
  export function menuItemSelected(menu: Menu): boolean;
  function MenuItem(props: MenuItemProps): JSX.Element;
  export default MenuItem;
}
declare module "ling_core/components/menu-next/util" {
  export const defaultLogoUrl = "//img14.360buyimg.com/ling/jfs/t1/141524/30/32780/7459/64185bcfF9f55126f/56ede840bbfb4820.png";
}
declare module "ling_core/components/menu-next/menu" {
  import './menu.scss';
  import { MenuProps } from "ling_core/components/menu-next/types";
  function Menu(props: MenuProps): JSX.Element;
  export default Menu;
}
declare module "ling_core/components/menu-next" {
  import Menu from "ling_core/components/menu-next/menu";
  import type { MenuProps } from "ling_core/components/menu-next/types";
  export { MenuProps };
  export default Menu;
}
declare module "ling_core/components/message" {
  export { default } from 'antd/lib/message';
  export * from 'antd/lib/message';
}
declare module "ling_core/components/modal/modal" {
  import './modal.scss';
  import { ModalProps as AntdProps } from 'antd/lib/modal';
  import React from 'react';
  type getContainerFunc = () => HTMLElement;
  export interface ModalProps extends AntdProps {
      /**
       * 是否全屏
       * @default false
       */
      isFullScreen?: boolean;
      /**
       * 是否展示底部按钮
       * @default true
       */
      showFooter?: boolean;
      /**
       * 对话框是否可见
       */
      visible?: boolean;
      /**
       * 是否居中
       * @default true
       */
      centered?: boolean;
      /**
       * 标题
       */
      title?: React.ReactNode;
      /**
       * 是否显示右上角的关闭按钮
       * @default true
       */
      closable?: boolean;
      /**
       * 点击确定回调
       */
      onOk?: (e: React.MouseEvent<HTMLElement>) => void;
      /**
       * 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调
       */
      onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
      cancelFunc?: (...args: any[]) => any;
      close?: () => void;
      /**
       * Modal 完全关闭后的回调
       */
      afterClose?: () => void;
      /**
       * 宽度
       * @default 520
       */
      width?: string | number;
      /**
       * 底部内容
       */
      footer?: React.ReactNode;
      /**
       * 确认按钮文字
       */
      okText?: React.ReactNode;
      /**
       * 取消按钮文字
       */
      cancelText?: React.ReactNode;
      /**
       * 点击蒙层是否允许关闭
       * @default true
       */
      maskClosable?: boolean;
      /**
       * 强制渲染 Modal
       * @default false
       */
      forceRender?: boolean;
      /**
       * 关闭时销毁 Modal 里的子元素
       * @default false
       */
      destroyOnClose?: boolean;
      /**
       * 可用于设置浮层的样式，调整浮层位置等
       */
      style?: React.CSSProperties;
      /**
       * 对话框外层容器的类名
       */
      wrapClassName?: string;
      /**
       * 指定 Modal 挂载的 HTML 节点, false 为挂载在当前 dom
       * @default document.body
       */
      getContainer?: string | HTMLElement | getContainerFunc | false;
      /**
       * 设置 Modal 的 z-index
       * @default 1000
       */
      zIndex?: number;
      /**
       * Modal body 样式
       */
      bodyStyle?: React.CSSProperties;
      /**
       * 遮罩样式
       */
      maskStyle?: React.CSSProperties;
      /**
       * 是否展示遮罩
       * @default true
       */
      mask?: boolean;
      /**
       * 是否支持键盘 esc 关闭
       * @default true
       */
      keyboard?: boolean;
      /**
       * 自定义渲染对话框
       */
      modalRender?: (node: React.ReactNode) => React.ReactNode;
      /**
       * 对话框关闭后是否需要聚焦触发元素
       * @default true
       */
      focusTriggerAfterClose?: boolean;
      /**
       * body 内文案对齐方式
       */
      textAlign?: React.CSSProperties['textAlign'];
      className?: string;
      actionButton?: boolean;
      maskTransitionName?: string;
      transitionName?: string;
      wrapProps?: any;
      prefixCls?: string;
      isConfirm?: boolean;
      okButtonProps?: any;
      cancelButtonProps?: any;
      hiddenCancelButton?: boolean;
  }
  export interface ModalFuncProps {
      showFooter?: boolean;
      prefixCls?: string;
      className?: string;
      visible?: boolean;
      title?: React.ReactNode;
      closable?: boolean;
      content?: React.ReactNode;
      onOk?: (...args: any[]) => any;
      onCancel?: (...args: any[]) => any;
      cancelFunc?: (...args: any[]) => any;
      afterClose?: () => void;
      centered?: boolean;
      width?: string | number;
      okText?: React.ReactNode;
      cancelText?: React.ReactNode;
      icon?: React.ReactNode;
      mask?: boolean;
      maskClosable?: boolean;
      zIndex?: number;
      okCancel?: boolean;
      style?: React.CSSProperties;
      wrapClassName?: string;
      maskStyle?: React.CSSProperties;
      type?: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm';
      keyboard?: boolean;
      getContainer?: string | HTMLElement | getContainerFunc | false;
      autoFocusButton?: null | 'ok' | 'cancel';
      transitionName?: string;
      maskTransitionName?: string;
      bodyStyle?: React.CSSProperties;
      closeIcon?: React.ReactNode;
      modalRender?: (node: React.ReactNode) => React.ReactNode;
      isConfirm?: boolean;
      textAlign?: React.CSSProperties['textAlign'];
      focusTriggerAfterClose?: boolean;
      hiddenCancelButton?: boolean;
  }
  /**
   * 基础对话框
   *
   * ### 何时使用
   * 需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。
   *
   * ### 使用方式
   * ```js
   * import Modal from '@ling-design/core/es/components/modal'
   * ```
   *
   * Modal.method()
   *
   * 包括
   * Modal.info(config)
   * Modal.confirm(config)
   *
   * config 配置同 Modal props
   */
  export const Modal: React.FC<ModalProps>;
  export default Modal;
}
declare module "ling_core/components/modal/confirm" {
  import type { ModalFuncProps } from "ling_core/components/modal/modal";
  export const destroyFns: Array<() => void>;
  type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps);
  export type ModalFunc = (props: ModalFuncProps) => {
      destroy: () => void;
      update: (configUpdate: ConfigUpdate) => void;
  };
  export type ModalStaticFunctions = Record<NonNullable<ModalFuncProps['type']>, ModalFunc>;
  export default function confirm(config: ModalFuncProps): {
      destroy: (...args: any[]) => void;
      update: (configUpdate: ConfigUpdate) => void;
  };
  export function withInfo(props: ModalFuncProps): ModalFuncProps;
  export function withConfirm(props: ModalFuncProps): ModalFuncProps;
  export function withError(props: ModalFuncProps): ModalFuncProps;
  export function withWarning(props: ModalFuncProps): ModalFuncProps;
}
declare module "ling_core/components/modal" {
  import { ModalStaticFunctions } from "ling_core/components/modal/confirm";
  import OriginModal, { ModalProps } from "ling_core/components/modal/modal";
  export { ModalProps };
  type ModalType = typeof OriginModal & ModalStaticFunctions & {
      destroyAll: () => void;
  };
  const Modal: ModalType;
  export default Modal;
}
declare module "ling_core/components/notification" {
  export { default } from 'antd/lib/notification';
  export * from 'antd/lib/notification';
}
declare module "ling_core/components/page-header" {
  export { default } from 'antd/lib/page-header';
  export * from 'antd/lib/page-header';
}
declare module "ling_core/components/pagination/pagination" {
  import './pagination.scss';
  import { PaginationProps as AntdPaginationProps } from 'antd/lib/pagination';
  import React from 'react';
  export interface IPaginationProps {
      /**
       * 当为 small 时，是小尺寸分页
       * @default default
       */
      size?: 'default' | 'small';
      /**
       * 当前页数
       */
      current?: number;
      /**
       * 默认的当前页数
       * @default 1
       */
      defaultCurrent?: number;
      /**
       * 默认的每页条数
       * @default 10
       */
      defaultPageSize?: number;
      /**
       * 禁用分页
       */
      disabled?: boolean;
      /**
       * 只有一页时是否隐藏分页器
       * @default false
       */
      hideOnSinglePage?: boolean;
      /**
       * 用于自定义页码的结构，可用于优化 SEO
       */
      itemRender?: (page: any, type: 'page' | 'prev' | 'next', originalElement: any) => React.ReactNode;
      /**
       * 每页条数
       */
      pageSize?: number;
      /**
       * 指定每页可以显示多少条
       * @default [10, 20, 50, 100]
       */
      pageSizeOptions?: string[];
      /**
       * 当 size 未指定时，根据屏幕宽度自动调整尺寸
       */
      responsive?: boolean;
      /**
       * 是否显示较少页面内容
       * @default false
       */
      showLessItems?: boolean;
      /**
       * 是否可以快速跳转至某页
       * @default false
       */
      showQuickJumper?: boolean | {
          goButton: React.ReactNode;
      };
      /**
       * 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true
       */
      showSizeChanger?: boolean;
      /**
       * 是否显示原生 tooltip 页码提示
       * @default true
       */
      showTitle?: boolean;
      /**
       * 用于显示数据总量和当前数据顺序
       */
      showTotal?: (total: any, range: any) => void;
      /**
       * 当添加该属性时，显示为简单分页
       */
      simple?: boolean;
      /**
       * 数据总数
       * @default 0
       */
      total?: number;
      /**
       * 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
       */
      onChange?: (page: any, pageSize: any) => void;
      /**
       * pageSize 变化的回调
       */
      onShowSizeChange?: (current: any, size: any) => void;
      /**
       * 自定义类名
       */
      className?: string;
  }
  export type PaginationProps = IPaginationProps & AntdPaginationProps;
  /**
   * 分页。
   *
   * ### 何时使用
   * 当加载/渲染所有数据将花费很多时间时；
   * 可切换页码浏览数据。
   *
   * ### 使用方式
   * ```js
   * import Pagination from '@ling-design/core/es/components/pagination'
   * ```
   */
  export const Pagination: React.FC<PaginationProps>;
  export default Pagination;
}
declare module "ling_core/components/pagination" {
  import Pagination from "ling_core/components/pagination/pagination";
  export { PaginationProps } from "ling_core/components/pagination/pagination";
  export default Pagination;
}
declare module "ling_core/components/popconfirm/popconfirm" {
  import './popconfirm.scss';
  import { PopoverProps as AntdPopoverProps } from 'antd/lib/popover';
  import React from 'react';
  export interface IPopconfirmProps {
      /**
       * 样式类型
       * @default default
       */
      type?: 'default' | 'primary';
      /**
       * 主按钮文字
       * @default 确定
       */
      okText?: string;
      /**
       * 标题
       */
      title?: string;
      /**
       * 内容
       */
      content: string;
      /**
       * 手动控制展示隐藏，当展示关闭按钮时需要手动控制
       */
      visible?: boolean;
      /**
       * 次按钮文字
       * @default 取消
       */
      cancelText?: string;
      /**
       * 次按钮回调
       */
      onCancel?: (e: any) => any;
      /**
       * 主按钮回调
       */
      onConfirm?: (e: any) => any;
      /**
       * 关闭按钮回调
       */
      onClose?: () => any;
      onVisibleChange?: (visible: boolean, e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLDivElement>) => void;
      /**
       * 是否展示关闭按钮
       */
      showClose?: boolean;
      /**
       * 是否展示下方按钮
       */
      showActions?: boolean;
      /**
       * 是否展示次级按钮
       * @default true
       */
      showCancelButton?: boolean;
      /**
       * 是否展示主按钮
       * @default true
       */
      showMainButton?: boolean;
      disabled?: boolean;
  }
  export type PopconfirmProps = AntdPopoverProps & IPopconfirmProps;
  /**
   * 提示
   *
   * ### 何时使用
   * 目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。
   *
   * ### 使用方式
   * ```js
   * import Popconfirm from '@ling-design/core/es/components/popconfirm'
   * ```
   */
  export const Popconfirm: React.ForwardRefExoticComponent<AntdPopoverProps & IPopconfirmProps & React.RefAttributes<unknown>>;
  export default Popconfirm;
}
declare module "ling_core/components/popconfirm" {
  import Popconfirm from "ling_core/components/popconfirm/popconfirm";
  export { PopconfirmProps } from "ling_core/components/popconfirm/popconfirm";
  export default Popconfirm;
}
declare module "ling_core/components/progress" {
  export { default } from 'antd/lib/progress';
  export * from 'antd/lib/progress';
}
declare module "ling_core/components/radio/interface" {
  export type { RadioChangeEvent, RadioGroupProps, RadioProps, } from 'antd/lib/radio/interface';
}
declare module "ling_core/components/radio/group" {
  import React from 'react';
  import { RadioGroupProps as AntdRadioGroupProps } from "ling_core/components/radio/interface";
  export interface RadioGroupProps extends AntdRadioGroupProps {
      size?: 'small' | 'middle';
  }
  const RadioGroup: React.FC<RadioGroupProps>;
  export default RadioGroup;
}
declare module "ling_core/components/radio/radio" {
  import './radio.scss';
  import React from 'react';
  import { RadioProps as AntdRadioProps } from "ling_core/components/radio/interface";
  export interface RadioProps extends AntdRadioProps {
      size?: 'small' | 'middle';
  }
  const Radio: React.FC<RadioProps>;
  export default Radio;
}
declare module "ling_core/components/radio/radio-button" {
  import { RadioButtonProps as AntdRadioButtonProps } from 'antd/lib/radio/radioButton';
  import React from 'react';
  export interface RadioButtonProps extends AntdRadioButtonProps {
  }
  const RadioButton: React.FC<RadioButtonProps>;
  export default RadioButton;
}
declare module "ling_core/components/radio" {
  import type { RadioGroupProps } from "ling_core/components/radio/group";
  import Group from "ling_core/components/radio/group";
  import type { RadioProps } from "ling_core/components/radio/radio";
  import type { RadioButtonProps } from "ling_core/components/radio/radio-button";
  import Button from "ling_core/components/radio/radio-button";
  export type { RadioChangeEvent } from "ling_core/components/radio/interface";
  export { RadioButtonProps, RadioGroupProps, RadioProps };
  export interface CompoundedComponent extends React.FC<RadioProps> {
      Group: typeof Group;
      Button: typeof Button;
  }
  const Radio: CompoundedComponent;
  export { Button, Group };
  export default Radio;
}
declare module "ling_core/components/rate" {
  export { default } from 'antd/lib/rate';
  export * from 'antd/lib/rate';
}
declare module "ling_core/components/tag/tag" {
  import './tag.scss';
  import React from 'react';
  export type TagFill = 'solid' | 'stroke';
  export type TagType = 'primary' | 'success' | 'warning' | 'danger' | 'default';
  export type TagSize = 'small' | 'middle' | 'large';
  export interface TagProps {
      /**
       * 内联样式
       */
      style?: React.CSSProperties;
      /**
       * 容器样式名
       */
      className?: string;
      /**
       * 标签填充，stroke（描边) or solid（实色）
       * ⚠️ 当值为 solid 时，仅对 type = primary 样式作出修改，其余类型不兼容
       */
      fill?: TagFill;
      /**
       * 标签类型
       */
      type?: TagType;
      /**
       * 标签颜色（暂未用到）
       */
      color?: string;
      /**
       * 标签大小
       */
      size?: TagSize;
      /**
       * 是否可见
       */
      visible?: boolean;
      /**
       * 是否可关闭
       */
      closable?: boolean;
      /**
       * 是否禁用
       */
      disabled?: boolean;
      /**
       * 子元素
       */
      children?: React.ReactNode;
      /**
       * 关闭事件
       */
      onClose?: (event: React.MouseEvent<HTMLSpanElement>) => void;
      /**
       * 是否圆角
       * @default true
       */
      rounded?: boolean;
      /**
       * 是否有边框
       * @default true
       */
      bordered?: boolean;
  }
  const Tag: React.FC<TagProps>;
  export default Tag;
}
declare module "ling_core/components/tag" {
  import type { TagFill, TagProps, TagSize, TagType } from "ling_core/components/tag/tag";
  import Tag from "ling_core/components/tag/tag";
  export { TagFill, TagProps, TagSize, TagType };
  export default Tag;
}
declare module "ling_core/components/rect-card/rect-card" {
  import './rect-card.scss';
  import React from 'react';
  import { TagType } from "ling_core/components/tag";
  export interface RectCardProps {
      style?: React.CSSProperties;
      className?: string;
      children: React.ReactNode;
      enableChecked?: boolean;
      checked?: boolean;
      tag?: {
          type: TagType;
          name: string;
      };
      overlay?: React.ReactElement;
      additional?: {
          title?: string;
          desc?: React.ReactNode;
      };
      onCheckedChange?: (checked: boolean) => void;
  }
  const RectCard: React.FC<RectCardProps>;
  export default RectCard;
}
declare module "ling_core/components/rect-card" {
  import RectCard from "ling_core/components/rect-card/rect-card";
  export { RectCardProps } from "ling_core/components/rect-card/rect-card";
  export default RectCard;
}
declare module "ling_core/components/result" {
  export { default } from 'antd/lib/result';
  export * from 'antd/lib/result';
}
declare module "ling_core/components/row" {
  export { default } from "ling_core/components/grid/row";
  export * from "ling_core/components/grid/row";
}
declare module "ling_core/components/select/select" {
  import './select.scss';
  import { SelectValue } from 'antd/lib/select';
  import { BaseSelectRef, CustomTagProps, DisplayValueType, Placement, RenderDOMFunc } from 'rc-select/lib/BaseSelect';
  import { BaseOptionType, DefaultOptionType, FieldNames, FilterFunc, SelectHandler } from 'rc-select/lib/Select';
  import React from 'react';
  type ArrayElementType<T> = T extends (infer E)[] ? E : T;
  export interface SelectProps<ValueType = SelectValue, OptionType extends BaseOptionType = DefaultOptionType> extends Omit<React.HTMLAttributes<HTMLElement>, 'defaultValue' | 'onChange' | 'onFocus' | 'onSelect'> {
      /** 支持清除
       * @default false
       */
      allowClear?: boolean;
      /** 是否在选中项后清空搜索框，只在 mode 为 multiple 或 tags 时有效
       * @default true
       */
      autoClearSearchValue?: boolean;
      /** 默认获取焦点
       * @default false
       */
      autoFocus?: boolean;
      placement?: Placement;
      /** 是否有边框
       * @default true
       */
      bordered?: boolean;
      /** 自定义的多选框清空图标 */
      clearIcon?: React.ReactNode;
      /** 是否默认高亮第一个选项
       * @default true
       */
      defaultActiveFirstOption?: boolean;
      /** 是否默认展开下拉菜单 */
      defaultOpen?: boolean;
      /** 指定默认选中的条目 */
      defaultValue?: ValueType;
      /** 是否禁用
       * @default false
       */
      disabled?: boolean;
      /** 下拉菜单的 className 属性 */
      dropdownClassName?: string;
      /** 下拉菜单和选择器同宽。默认将设置 min-width，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动
       * @default true
       */
      dropdownMatchSelectWidth?: boolean | number;
      /** 自定义下拉框内容 */
      dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
      /** 下拉菜单的 style 属性 */
      dropdownStyle?: React.CSSProperties;
      /** 自定义节点 label、value、options 的字段
       * @default { label: label, value: value, options: options }
       */
      fieldNames?: FieldNames;
      /** 是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false
       * @default true
       */
      filterOption?: boolean | FilterFunc<OptionType>;
      /** 搜索时对筛选结果项的排序函数, 类似Array.sort里的 compareFunction */
      filterSort?: (optionA: OptionType, optionB: OptionType) => number;
      /** 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codesandbox.io/s/4j168r7jw0)
       * @default () => document.body
       */
      getPopupContainer?: RenderDOMFunc;
      /** 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 string 变为 { value: string, label: ReactNode } 的格式
       * @default false
       */
      labelInValue?: boolean;
      /** 设置弹窗滚动高度
       * @default 256
       */
      listHeight?: number;
      /** 加载中状态
       * @default false
       */
      loading?: boolean;
      /** 最多显示多少个 tag，响应式模式会对性能产生损耗 */
      maxTagCount?: number | 'responsive';
      /** 隐藏 tag 时显示的内容 */
      maxTagPlaceholder?: React.ReactNode | ((omittedValues: DisplayValueType[]) => React.ReactNode);
      /** 最大显示的 tag 文本长度 */
      maxTagTextLength?: number;
      /** 自定义多选时当前选中的条目图标 */
      menuItemSelectedIcon?: React.ReactNode;
      /** 设置 Select 的模式为多选或标签 */
      mode?: 'multiple' | 'tags';
      /** 当下拉列表为空时显示的内容
       * @default "Not Found"
       */
      notFoundContent?: React.ReactNode;
      /** 是否展开下拉菜单 */
      open?: boolean;
      /** 搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索。若通过 options 属性配置选项内容，建议设置 optionFilterProp="label" 来对内容进行搜索。
       * @default "value"
       */
      optionFilterProp?: string;
      /** 回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 value。[示例](https://codesandbox.io/s/antd-reproduction-template-tk678)
       * @default "children"
       */
      optionLabelProp?: string;
      /** 数据化配置选项内容，相比 jsx 定义会获得更好的渲染性能 */
      options?: {
          label: any;
          value: any;
      }[];
      /** 选择框默认文本 */
      placeholder?: string;
      /** 自定义的多选框清除图标 */
      removeIcon?: React.ReactNode;
      /** 控制搜索文本 */
      searchValue?: string;
      /** 是否显示下拉小箭头 */
      showArrow?: boolean;
      /** 单选为 true，多选为 false */
      /** 使单选模式可搜索
       * @default false
       */
      showSearch?: boolean;
      /** 选择框大小
       * @default middle
       */
      size?: 'large' | 'middle' | 'small';
      /** 自定义的选择框前缀图标 */
      prefixIcon?: React.ReactNode;
      /** 自定义的选择框后缀图标 */
      suffixIcon?: React.ReactNode;
      /** 显示列表选中指示器 */
      showIndicator?: boolean;
      /** 自定义 tag 内容 render，仅在 mode 为 multiple 或 tags 时生效 */
      tagRender?: (props: CustomTagProps) => React.ReactElement;
      /** 在 tags 和 multiple 模式下自动分词的分隔符 */
      tokenSeparators?: string[];
      /** 指定当前选中的条目，多选时为一个数组。（value 数组引用未变化时，Select 不会更新） */
      value?: ValueType;
      /** 设置 false 时关闭虚拟滚动
       * @default true
       */
      virtual?: boolean;
      /** 失去焦点时回调 */
      onBlur?: React.FocusEventHandler<HTMLElement>;
      /** 选中 option，或 input 的 value 变化时，调用此函数 */
      onChange?: (value: ValueType, option: OptionType | OptionType[]) => void;
      /** 清除内容时回调 */
      onClear?: () => void;
      /** 取消选中时调用，参数为选中项的 value (或 key) 值，仅在 multiple 或 tags 模式下生效 */
      onDeselect?: SelectHandler<ArrayElementType<ValueType>, OptionType>;
      /** 展开下拉菜单的回调 */
      onDropdownVisibleChange?: (open: boolean) => void;
      /** 获得焦点时回调 */
      onFocus?: React.FocusEventHandler<HTMLElement>;
      /** 按键按下时回调 */
      onInputKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
      /** 鼠标移入时回调 */
      onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
      /** 鼠标移出时回调 */
      onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
      /** 下拉列表滚动时的回调 */
      onPopupScroll?: React.UIEventHandler<HTMLDivElement>;
      /** 文本框值变化时回调 */
      onSearch?: (value: string) => void;
      /** 被选中时调用，参数为选中项的 value (或 key) 值 */
      onSelect?: SelectHandler<ArrayElementType<ValueType>, OptionType>;
      /**
       * 宽度自适应
       */
      isAdapt?: boolean;
  }
  export interface SelectOptionProps extends React.HTMLAttributes<HTMLElement> {
      children: React.ReactNode;
      /** 是否禁用
       * @default false
       */
      disabled?: boolean;
      /** 选项上的原生 title 提示 */
      title?: string;
      /** 默认根据此属性值进行筛选 */
      value?: string | number;
  }
  export interface SelectOptGroupProps extends React.HTMLAttributes<HTMLElement> {
      /** Key */
      key?: string;
      /** 组名 */
      label?: string | React.ReactElement;
  }
  export const Option: React.FC<SelectOptionProps>;
  export const OptGroup: React.FC<SelectOptGroupProps>;
  /**
   * 下拉选择器。
   *
   * ### 何时使用
   *
   * - 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
   * - 当选项少时（少于 5 项），建议直接将选项平铺，使用 `Radio` 是更好的选择。
   *
   * ### 使用方式
   * ```js
   * import Select from '@ling-design/core/es/components/select'
   * ```
   */
  export function InternalSelect<T>(props: SelectProps<T>, ref: React.ForwardedRef<BaseSelectRef>): JSX.Element;
  const _default: <T = SelectValue>(props: SelectProps<T, DefaultOptionType> & React.RefAttributes<BaseSelectRef>) => ReturnType<typeof InternalSelect>;
  export default _default;
}
declare module "ling_core/components/select" {
  import InternalSelect from "ling_core/components/select/select";
  import { OptGroup, Option, SelectOptGroupProps, SelectOptionProps, SelectProps } from "ling_core/components/select/select";
  type InternalSelectType = typeof InternalSelect;
  interface CompoundedComponent extends InternalSelectType {
      OptGroup: typeof OptGroup;
      Option: typeof Option;
  }
  const Select: CompoundedComponent;
  export { SelectOptGroupProps, SelectOptionProps, SelectProps };
  export default Select;
}
declare module "ling_core/components/space" {
  export { default } from 'antd/lib/space';
  export * from 'antd/lib/space';
}
declare module "ling_core/components/share-modal" {
  import './index.scss';
  import React from 'react';
  export interface ShareModalType {
      /**
       * 分享链接
       */
      shareURL: string;
      /**
       * 选中的模板
       */
      selectedList: any[];
      /**
       * 如有传children则为popver形式
       */
      children?: React.ReactNode;
      /**
       * 是否显示弹窗
       */
      visible: boolean;
      /**
       * 改变显示弹窗状态
       */
      setVisible: any;
      /**
       * 复制成功后用与埋点等操作
       */
      onSuccess?: () => void;
      /**
       * popover位置
       */
      overlayInnerStyle?: React.CSSProperties;
      zonePermissions: any[];
      zone: any;
      type: 'template' | 'material' | 'folder' | 'folder_file';
      /**
       * 来自羚珑 ling 或者管理平台
       */
      origin: string;
      onGetShareURL: (param: {
          type: 'template' | 'material' | 'folder' | 'folder_file';
          elementIds: any[];
          scope: Scope;
          validPeriod: any;
          userIds: string[];
          urlType: 'platform' | 'ling';
      }) => Promise<string>;
      onGetUser: (keyword: string) => Promise<user[]>;
      /**
       * 第二次分享
       */
      secondSharing?: boolean;
      /**
       * 是否包含未发布模板, 包含未发布组件不能分享到前台
       */
      isPublish?: boolean;
      /**
       * 额外提示
       */
      shareTip?: React.ReactNode;
  }
  export function getPrefix(componentName: string, customPrefix?: string): string;
  export enum Scope {
      ALL = "ALL",
      ZONE = "ZONE",
      USER = "USER"
  }
  type user = {
      userId: string;
      nickname: string;
      username: string;
  };
  function ShareModal(props: ShareModalType): JSX.Element;
  export default ShareModal;
}
declare module "ling_core/components/sidebar/sidebar" {
  import './sidebar.scss';
  import React, { ReactNode } from 'react';
  interface BaseSidebarItem {
      /**
       * key
       */
      key: React.Key;
      /**
       * 菜单标题
       */
      title?: ReactNode;
      /**
       * 是否有分割线
       */
      divider?: boolean;
  }
  export interface SidebarItem extends BaseSidebarItem {
      /**
       * 菜单图标，需要 16px
       */
      icon?: ReactNode;
      /**
       * 子菜单
       */
      children?: BaseSidebarItem[];
      /**
       * 是否需要tooltip
       */
      tips?: ReactNode;
  }
  export interface SidebarProps {
      /**
       * 根节点样式
       */
      style?: React.CSSProperties;
      /**
       * 根节点类名
       */
      className?: string;
      /**
       * 菜单配置
       */
      menus?: SidebarItem[];
      /**
       * 初始展开的 SubMenu 菜单项 key 数组
       */
      defaultOpenKeys?: string[];
      /**
       * 初始选中的菜单项 key 数组
       */
      defaultSelectedKeys?: string[];
      /**
       * 当前展开的 SubMenu 菜单项 key 数组
       */
      openKeys?: string[];
      /**
       * 当前选中的菜单项 key 数组
       */
      selectedKeys?: string[];
      /**
       * 	SubMenu 展开/关闭的回调
       */
      onOpenChange?: (openKeys: string[]) => void;
      /**
       * 	点击子菜单标题
       */
      onTitleClick?: (key: string) => void;
      /**
       *	点击 MenuItem 调用此函数
       */
      onClick?: (key: string) => void;
  }
  const Sidebar: React.FC<SidebarProps>;
  export default Sidebar;
}
declare module "ling_core/components/sidebar" {
  import type { SidebarItem, SidebarProps } from "ling_core/components/sidebar/sidebar";
  import Sidebar from "ling_core/components/sidebar/sidebar";
  export { SidebarItem, SidebarProps };
  export default Sidebar;
}
declare module "ling_core/components/skeleton" {
  export { default } from 'antd/lib/skeleton';
  export * from 'antd/lib/skeleton';
}
declare module "ling_core/components/slider/slider" {
  import './slider.scss';
  import { SliderMarks } from 'antd/lib/slider';
  import { TooltipPlacement } from 'antd/lib/tooltip';
  import * as CSS from 'csstype';
  import React from 'react';
  export interface SliderBaseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
      /** 支持清除, 单选模式有效
       * @default false
       */
      allowClear?: boolean;
      /** 值为 true 时，滑块为禁用状态
       * @default false
       */
      disabled?: boolean;
      /** 是否只能拖拽到刻度上
       * @default false
       */
      dots?: boolean;
      /** Tooltip 渲染父节点，默认渲染到 body 上
       * @default () => document.body
       */
      getTooltipPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
      /** marks 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列
       * @default true
       */
      included?: boolean;
      /** 刻度标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标签可以单独设置样式
       * @default { number: ReactNode } or { number: { style: CSSProperties, label: ReactNode } }
       */
      marks?: SliderMarks;
      /** 最大值
       * @default 100
       */
      max?: number;
      /** 最小值
       * @default 0
       */
      min?: number;
      /** 反向坐标轴
       * @default false
       */
      reverse?: boolean;
      /** 步长，取值必须大于 0，并且可被 (max - min) 整除。当 marks 不为空对象时，可以设置 step 为 null，此时 Slider 的可选值仅有 marks 标出来的部分
       * @default 1
       */
      step?: number | null;
      /** Slider 会把当前值传给 tipFormatter，并在 Tooltip 中显示 tipFormatter 的返回值，若为 null，则隐藏 Tooltip
       * @default IDENTITY
       */
      tipFormatter?: null | ((value?: number) => React.ReactNode);
      /** 设置 Tooltip 展示位置。参考 Tooltip */
      tooltipPlacement?: TooltipPlacement;
      /** 值为 true 时，Tooltip 将会始终显示；否则始终不显示，哪怕在拖拽及移入时 */
      tooltipVisible?: boolean;
      /** 值为 true 时，Slider 为垂直方向
       * @default false
       */
      vertical?: boolean;
      /** 状态判断条件 */
      condition?: StatusCondition;
      /** 状态值 */
      status?: string;
  }
  export interface StatusCondition {
      label: string | ((status: string) => string);
      style?: CSS.StandardLonghandPropertiesHyphen | ((status: string) => CSS.StandardLonghandPropertiesHyphen);
  }
  export interface SliderSingleProps extends SliderBaseProps {
      /** 双滑块模式
       * @default false
       */
      range?: false;
      /** 设置初始取值。当 range 为 false 时，使用 number，否则用 [number, number]
       * @default 0
       */
      defaultValue?: number;
      /** 设置当前取值。当 range 为 false 时，使用 number，否则用 [number, number] */
      value?: number;
      /** 与 onmouseup 触发时机一致，把当前值作为参数传入 */
      onAfterChange?: (value: SliderSingleProps['value']) => void;
      /** 当 Slider 的值发生改变时，会触发 onChange 事件，并把改变后的值作为参数传入 */
      onChange?: (value: SliderSingleProps['value']) => void;
      /** 滑轨样式 */
      handleStyle?: React.CSSProperties;
      /** 滑块手柄样式 */
      trackStyle?: React.CSSProperties;
  }
  export interface SliderRangeProps extends SliderBaseProps {
      /** 双滑块模式 */
      range: true | SliderRange;
      /** 设置初始取值。当 range 为 false 时，使用 number，否则用 [number, number]
       * @default [0, 0]
       */
      defaultValue?: [number, number];
      /** 设置当前取值。当 range 为 false 时，使用 number，否则用 [number, number] */
      value?: [number, number];
      /** 与 onmouseup 触发时机一致，把当前值作为参数传入 */
      onAfterChange?: (value: SliderRangeProps['value']) => void;
      /** 当 Slider 的值发生改变时，会触发 onChange 事件，并把改变后的值作为参数传入 */
      onChange?: (value: SliderRangeProps['value']) => void;
      /** 滑轨样式 */
      handleStyle?: React.CSSProperties[];
      /** 滑块手柄样式 */
      trackStyle?: React.CSSProperties[];
  }
  export type SliderProps = SliderSingleProps | SliderRangeProps;
  interface SliderRange {
      /** 范围刻度是否可被拖拽
       * @default false
       */
      draggableTrack?: boolean;
  }
  /**
   * 滑动型输入器，展示当前值和可选范围。
   *
   * ### 何时使用
   *
   * 当用户需要在数值区间/自定义区间内进行选择时，可为连续或离散值。
   *
   * ### 使用方式
   * ```js
   * import Slider from '@ling-design/core/es/components/slider'
   * ```
   */
  export const Slider: React.FC<SliderProps>;
  export default Slider;
}
declare module "ling_core/components/slider" {
  import Slider from "ling_core/components/slider/slider";
  export { SliderProps, SliderSingleProps } from "ling_core/components/slider/slider";
  export default Slider;
}
declare module "ling_core/components/statistic" {
  export { default } from 'antd/lib/statistic';
  export * from 'antd/lib/statistic';
}
declare module "ling_core/components/steps/step" {
  import './steps.scss';
  import { StepProps as AntdStepProps } from 'antd/lib/steps';
  import React from 'react';
  export interface IStepProps {
      className?: string;
      /**
       * 步骤的详情描述，可选
       */
      description?: React.ReactNode;
      /**
       * 步骤图标的类型，可选
       */
      icon?: React.ReactNode;
      onClick?: React.MouseEventHandler<HTMLElement>;
      /**
       * 指定状态。当不配置该属性时，会使用 Steps 的 current 来自动指定状态。可选：wait process finish error
       * @default wait
       */
      status?: 'wait' | 'process' | 'finish' | 'error';
      /**
       * 禁用点击
       * @default false
       */
      disabled?: boolean;
      /**
       * 标题
       */
      title?: React.ReactNode;
      /**
       * 子标题
       */
      subTitle?: React.ReactNode;
  }
  export type StepProps = IStepProps & AntdStepProps;
  export const Step: React.FC<StepProps>;
  export default Step;
}
declare module "ling_core/components/steps/steps" {
  import './steps.scss';
  import { StepsProps as AntdStepsProps } from 'antd/lib/steps';
  import type { ProgressDotRender } from 'rc-steps/lib/Steps';
  import React from 'react';
  export interface IStepsProps {
      /**
       * 步骤条类型，有 default 和 navigation 两种
       * @default default
       */
      type?: 'default' | 'navigation';
      /**
       * 步骤条类名
       */
      className?: string;
      /**
       * 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 status 属性覆盖状态
       * @default 0
       */
      current?: number;
      /**
       * 指定步骤条方向。目前支持水平（horizontal）和竖直（vertical）两种方向
       * @default horizontal
       */
      direction?: 'horizontal' | 'vertical';
      /**
       * 起始序号，从 0 开始记数
       * @default 0
       */
      initial?: number;
      /**
       * 指定标签放置位置，默认水平放图标右侧，可选 vertical 放图标下方
       */
      labelPlacement?: 'horizontal' | 'vertical';
      /**
       * 点状步骤条，可以设置为一个 function，labelPlacement 将强制为 vertical
       * @default false
       */
      progressDot?: boolean | ProgressDotRender;
      /**
       * 当屏幕宽度小于 532px 时自动变为垂直模式
       * @default true
       */
      responsive?: boolean;
      /**
       * 指定大小，目前支持普通（default）和迷你（small）
       * @default default
       */
      size?: 'default' | 'small';
      /**
       * 指定当前步骤的状态，可选 wait process finish error
       * @default process
       */
      status?: 'wait' | 'process' | 'finish' | 'error';
      /**
       * 点击切换步骤时触发
       */
      onChange?: (current: number) => void;
  }
  export type StepsProps = IStepsProps & AntdStepsProps;
  /**
   * 步骤条
   * ### 何时使用
   * 当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。
   *
   * ### 使用方式
   * ```js
   * import Steps from '@ling-design/core/es/components/Steps'
   * ```
   *
   */
  export const Steps: React.FC<StepsProps>;
  export default Steps;
}
declare module "ling_core/components/steps" {
  import Step from "ling_core/components/steps/step";
  import { StepProps } from "ling_core/components/steps/step";
  import { StepsProps } from "ling_core/components/steps/steps";
  export { StepProps, StepsProps };
  interface CompoundedComponent extends React.FC<StepsProps> {
      Step: typeof Step;
  }
  const Steps: CompoundedComponent;
  export default Steps;
}
declare module "ling_core/components/switch/switch" {
  import './switch.scss';
  import React from 'react';
  export type SwitchSize = 'small' | 'default';
  export type SwitchChangeEventHandler = (checked: boolean, event: MouseEvent) => void;
  export type SwitchClickEventHandler = SwitchChangeEventHandler;
  export interface SwitchProps {
      prefixCls?: string;
      /**
       * 开关大小，可选值：default small（未兼容）
       */
      size?: SwitchSize;
      /**
       * Switch 器类名
       */
      className?: string;
      /**
       * 指定当前是否选中
       */
      checked?: boolean;
      /**
       * 初始是否选中
       */
      defaultChecked?: boolean;
      /**
       * 变化时回调函数
       */
      onChange?: SwitchChangeEventHandler;
      /**
       * 点击时回调函数
       */
      onClick?: SwitchClickEventHandler;
      /**
       * 选中时的内容（未兼容）
       */
      checkedChildren?: React.ReactNode;
      /**
       * 非选中时的内容（未兼容）
       */
      unCheckedChildren?: React.ReactNode;
      /**
       * 是否禁用
       */
      disabled?: boolean;
      /**
       * 加载中的开关（未兼容）
       */
      loading?: boolean;
      /**
       * 组件自动获取焦点
       */
      autoFocus?: boolean;
      /**
       * 覆盖 Switch 样式
       */
      style?: React.CSSProperties;
  }
  function Switch(props: SwitchProps): JSX.Element;
  export default Switch;
}
declare module "ling_core/components/switch" {
  import Switch from "ling_core/components/switch/switch";
  export type { SwitchProps } from "ling_core/components/switch/switch";
  export default Switch;
}
declare module "ling_core/components/table/interface" {
  import { ColumnType as AntdColumnType } from 'antd/lib/table/interface';
  export type ColumnContentType = 'number' | 'image' | null;
  export interface ColumnType<RecordType> extends AntdColumnType<RecordType> {
      contentType?: ColumnContentType;
  }
  export interface ColumnGroupType<RecordType> extends Omit<ColumnType<RecordType>, 'dataIndex'> {
      children: ColumnsType<RecordType>;
  }
  export type ColumnsType<RecordType = unknown> = (ColumnGroupType<RecordType> | ColumnType<RecordType>)[];
}
declare module "ling_core/components/table/table" {
  import './table.scss';
  import { TablePaginationConfig as AntdTablePaginationConfig, TableProps as AntdTableProps } from 'antd/lib/table';
  import React from 'react';
  import { ColumnsType } from "ling_core/components/table/interface";
  export interface TableProps<RecordType> extends Omit<AntdTableProps<RecordType>, 'columns'> {
      columns: ColumnsType<RecordType>;
      headerComponent?: React.ReactNode;
  }
  export type TablePaginationConfig = AntdTablePaginationConfig;
  function Table<T extends object>(props: TableProps<T>): JSX.Element;
  export default Table;
}
declare module "ling_core/components/table/column" {
  import { ColumnType } from "ling_core/components/table/interface";
  export interface ColumnProps<RecordType> extends ColumnType<RecordType> {
      children?: null;
  }
  /** This is a syntactic sugar for `columns` prop. So HOC will not work on this. */
  function Column<RecordType>(_: ColumnProps<RecordType>): any;
  export default Column;
}
declare module "ling_core/components/table" {
  import Table, { TablePaginationConfig, TableProps } from "ling_core/components/table/table";
  export { ColumnProps } from "ling_core/components/table/column";
  export type { ColumnGroupType, ColumnsType, ColumnType } from "ling_core/components/table/interface";
  export { TablePaginationConfig, TableProps };
  export default Table;
}
declare module "ling_core/components/template-card/template-card" {
  import './template-card.scss';
  import React from 'react';
  import { CheckboxChangeEvent } from "ling_core/components/checkbox";
  export interface TemplateCardProps {
      /** 卡片样式
       * @default fixed
       */
      type?: 'fixed';
      /** 卡片内容
       * @default null
       */
      content?: React.ReactElement | HTMLElement;
      /** 卡片底部内容
       * @default null
       */
      btns?: React.ReactElement;
      /** 卡片信息内容
       * @default null
       */
      info?: React.ReactElement;
      /** 是否显示底部
       * @default true
       */
      isShowFooter?: boolean;
      /** 是否显示复选框
       * @default true
       */
      isShowCheck?: boolean;
      /** 用户自定义类名
       *
       */
      className?: string;
      /** 是否选中状态
       * @default false
       */
      isSelected?: boolean;
      /** 是否禁用状态
       * @default false
       */
      disabled?: boolean;
      /** 卡片宽度
       * @default 320
       */
      width?: number;
      onClick?: React.MouseEventHandler<HTMLElement>;
      onChange?: (e: CheckboxChangeEvent) => void;
  }
  /**
   * 固定模板
   *
   * 使用
   * ---
   *
   *
   * ### 使用方式
   * ```js
   * import TemplateCard from '@ling-design/core/es/components/template-card'
   * <TemplateCard
      {...args}
      onChange={handleChange}
      isSelected={isSelected}
      content={} // 卡片内容
      btns={} // 底部按钮
      info="卡片信息内容"
    />
   * ```
   */
  export const TemplateCard: React.FC<TemplateCardProps>;
  export default TemplateCard;
}
declare module "ling_core/components/template-card" {
  import TemplateCard from "ling_core/components/template-card/template-card";
  export { TemplateCardProps } from "ling_core/components/template-card/template-card";
  export default TemplateCard;
}
declare module "ling_core/components/timeline" {
  export { default } from 'antd/lib/timeline';
  export * from 'antd/lib/timeline';
}
declare module "ling_core/components/transfer" {
  export { default } from 'antd/lib/transfer';
  export * from 'antd/lib/transfer';
}
declare module "ling_core/components/tree/tree" {
  import './tree.scss';
  import { AntdTreeNodeAttribute, AntTreeNode } from 'antd/lib/tree';
  import { NodeDragEventParams, NodeMouseEventHandler, NodeMouseEventParams } from 'rc-tree/lib/contextTypes';
  import { BasicDataNode, DataNode, EventDataNode, IconType, Key } from 'rc-tree/lib/interface';
  import React from 'react';
  interface CheckInfo<TreeDataType extends BasicDataNode = DataNode> {
      event: 'check';
      node: EventDataNode<any>;
      checked: boolean;
      nativeEvent: MouseEvent;
      checkedNodes: TreeDataType[];
      checkedNodesPositions?: {
          node: TreeDataType;
          pos: string;
      }[];
      halfCheckedKeys?: Key[];
  }
  export interface TreeProps<TreeDataType extends BasicDataNode = DataNode> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onClick' | 'onDoubleClick' | 'draggable' | 'onDragStart' | 'onDragEnter' | 'onDragEnd' | 'onDragLeave' | 'onDragOver' | 'onDrop' | 'onMouseEnter' | 'onMouseLeave' | 'onLoad' | 'onSelect'> {
      /** 是否允许拖拽时放置在该节点 */
      allowDrop?: ({ dropNode, dropPosition }: {
          dropNode: any;
          dropPosition: any;
      }) => boolean;
      /** 是否自动展开父节点
       * @default false
       */
      autoExpandParent?: boolean;
      /** 是否节点占据一行
       * @default false
       */
      blockNode?: boolean;
      /** 节点前添加 Checkbox 复选框
       * @default false
       */
      checkable?: boolean;
      /** （受控）选中复选框的树节点（注意：父子节点有关联，如果传入父节点 key，则子节点自动选中；相应当子节点 key 都传入，父节点也自动选中。当设置 checkable 和 checkStrictly，它是一个有 checked 和 halfChecked 属性的对象，并且父子节点的选中与否不再关联
       * @default []
       */
      checkedKeys?: string[] | {
          checked: string[];
          halfChecked: string[];
      };
      /** checkable 状态下节点选择完全受控（父子节点选中状态不再关联）
       * @default false
       */
      checkStrictly?: boolean;
      /** 默认选中复选框的树节点
       * @default []
       */
      defaultCheckedKeys?: string[];
      /** 默认展开所有树节点
       * @default false
       */
      defaultExpandAll?: boolean;
      /** 默认展开指定的树节点
       * @default []
       */
      defaultExpandedKeys?: string[];
      /** 默认展开父节点
       * @default true
       */
      defaultExpandParent?: boolean;
      /** 默认选中的树节点
       * @default []
       */
      defaultSelectedKeys?: string[];
      /** 将树禁用
       * @default false
       */
      disabled?: boolean;
      /** 设置节点可拖拽，可以通过 icon: false 关闭拖拽提示图标
       * @default false
       */
      draggable?: boolean | ((node: AntTreeNode) => boolean) | {
          icon?: React.ReactNode | false;
          nodeDraggable?: (node: AntTreeNode) => boolean;
      };
      /** （受控）展开指定的树节点
       * @default []
       */
      expandedKeys?: string[];
      /** 自定义节点 title、key、children 的字段
       * @default { title: title, key: key, children: children }
       */
      fieldNames?: object;
      /** 按需筛选树节点（高亮），返回 true */
      filterTreeNode?: (treeNode: EventDataNode<any>) => boolean;
      /** 设置虚拟滚动容器高度，设置后内部节点不再支持横向滚动 */
      height?: number;
      /** 自定义树节点图标。 */
      icon?: ((treeNode: AntdTreeNodeAttribute) => React.ReactNode) | React.ReactNode;
      /** 异步加载数据 */
      loadData?: (treeNode: EventDataNode<any>) => Promise<void>;
      /** （受控）已经加载的节点，需要配合 loadData 使用
       * @default []
       */
      loadedKeys?: string[];
      /** 支持点选多个节点（节点本身）
       * @default false
       */
      multiple?: boolean;
      /** 是否可选中
       * @default true
       */
      selectable?: boolean;
      /** （受控）设置选中的树节点 */
      selectedKeys?: string[];
      /** 是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式
       * @default false
       */
      showIcon?: boolean;
      /** 是否展示连接线
       * @default false
       */
      showLine?: boolean | {
          showLeafIcon: boolean;
      };
      /** 自定义树节点的展开/折叠图标 */
      switcherIcon?: React.ReactElement<any>;
      /** 自定义渲染节点 */
      titleRender?: (node: TreeDataType) => React.ReactNode;
      /** treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一） */
      treeData?: TreeDataType[];
      /** （受控）已经加载的节点，需要配合 loadData 使用
       * @default []
       */
      treeLoadedKeys?: string[];
      /** 设置 false 时关闭虚拟滚动
       * @default true
       */
      virtual?: boolean;
      /** 点击复选框触发 */
      onCheck?: (checked: {
          checked: Key[];
          halfChecked: Key[];
      } | Key[], info: CheckInfo<TreeDataType>) => void;
      /** dragend 触发时调用 */
      onDragEnd?: (info: NodeDragEventParams) => void;
      /** dragenter 触发时调用 */
      onDragEnter?: (info: NodeDragEventParams & {
          expandedKeys: Key[];
      }) => void;
      /** dragleave 触发时调用 */
      onDragLeave?: (info: NodeDragEventParams) => void;
      /** dragover 触发时调用 */
      onDragOver?: (info: NodeDragEventParams) => void;
      /** 开始拖拽时调用 */
      onDragStart?: (info: NodeDragEventParams) => void;
      /** drop 触发时调用 */
      onDrop?: (info: NodeDragEventParams & {
          dragNode: EventDataNode<any>;
          dragNodesKeys: Key[];
          dropPosition: number;
          dropToGap: boolean;
      }) => void;
      /** 展开/收起节点时触发 */
      onExpand?: (expandedKeys: Key[], info: {
          node: EventDataNode<any>;
          expanded: boolean;
          nativeEvent: MouseEvent;
      }) => void;
      /** 节点加载完毕时触发 */
      onLoad?: (loadedKeys: Key[], info: {
          event: 'load';
          node: EventDataNode<any>;
      }) => void;
      /** 响应右键点击 */
      onRightClick?: (info: {
          event: React.MouseEvent;
          node: EventDataNode<any>;
      }) => void;
      /** 点击树节点触发 */
      onSelect?: (selectedKeys: Key[], info: {
          event: 'select';
          selected: boolean;
          node: EventDataNode<any>;
          selectedNodes: TreeDataType[];
          nativeEvent: MouseEvent;
      }) => void;
      onClick?: NodeMouseEventHandler;
      onDoubleClick?: NodeMouseEventHandler;
      onMouseEnter?: (info: NodeMouseEventParams) => void;
      onMouseLeave?: (info: NodeMouseEventParams) => void;
  }
  export interface TreeNodeProps<TreeDataType extends BasicDataNode = DataNode> extends TreeProps {
      /** 当树为 checkable 时，设置独立节点是否展示 Checkbox */
      checkable?: boolean;
      /** 禁掉 checkbox
       * @default false
       */
      disableCheckbox?: boolean;
      /** 禁掉响应
       * @default false
       */
      disabled?: boolean;
      /** 自定义图标。可接收组件，props 为当前节点 props */
      icon?: IconType;
      /** 设置为叶子节点 (设置了 loadData 时有效)。为 false 时会强制将其作为父节点 */
      isLeaf?: boolean;
      /** 被树的 (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys 属性所用。注意：整个树范围内的所有节点的 key 值不能重复！
       * @default (内部计算出的节点位置)
       */
      key?: string;
      /** 设置节点是否可被选中
       * @default true
       */
      selectable?: boolean;
      /** 标题
       * @default "---"
       */
      title?: React.ReactNode | ((data: TreeDataType) => React.ReactNode);
  }
  export interface DirectoryTreeProps extends TreeProps {
      /** 目录展开逻辑，可选：false | click | doubleClick
       * @default "click"
       */
      expandAction?: false | 'click' | 'doubleClick';
  }
  export const TreeNode: React.FC<TreeNodeProps>;
  export { DataNode as TreeDataNode };
  export const DirectoryTree: React.FC<DirectoryTreeProps>;
  /**
   * 多层次的结构列表
   *
   * ### 何时使用
   *
   * 文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用 `树控件` 可以完整展现其中的层级关系，并具有展开收起选择等交互功能。
   *
   * ### 使用方式
   * ```js
   * import Tree from '@ling-design/core/es/components/tree'
   * ```
   */
  export const Tree: React.FC<TreeProps> & {
      TreeNode: typeof TreeNode;
      DirectoryTree: typeof DirectoryTree;
  };
  export default Tree;
}
declare module "ling_core/components/tree" {
  import Tree from "ling_core/components/tree/tree";
  export { TreeDataNode, TreeNodeProps, TreeProps } from "ling_core/components/tree/tree";
  export default Tree;
}
declare module "ling_core/components/transfer-select/transfer" {
  import './transfer.scss';
  import React from 'react';
  export interface TreeNodeData {
      /**
       * 树节点文案
       */
      title: string;
      /**
       * 树节点 key
       */
      key: string;
      children?: TreeNodeData[];
  }
  export interface TransferSelectProps {
      /**
       * 树结构数据
       */
      treeData: TreeNodeData[];
      /**
       * 默认选中项
       */
      defaultValue?: string[];
      /**
       * 搜索框 placeholder
       */
      searchPlaceholder?: string;
      /**
       * 展开节点图标
       */
      expandedIcon?: React.ReactNode;
      /**
       * 叶子节点图标
       */
      leafIcon?: React.ReactNode;
      /**
       * 选中信息回调
       */
      onSelect?: (keys: string[]) => any;
  }
  /**
   * 穿梭框
   *
   * ### 何时使用
   * 需要在多个可选项中进行多选时。
   *
   * ### 使用方式
   * ```js
   * import TransferSelect from '@ling/core/components/transfer-select'
   * ```
   */
  export const TransferSelect: React.FC<TransferSelectProps>;
  export default TransferSelect;
}
declare module "ling_core/components/transfer-select" {
  import TransferSelect from "ling_core/components/transfer-select/transfer";
  export type { TransferSelectProps, TreeNodeData } from "ling_core/components/transfer-select/transfer";
  export default TransferSelect;
}
declare module "ling_core/components/tree-select/tree-select" {
  import './tree-select.scss';
  import AntdTreeSelect from 'antd/lib/tree-select';
  import { CustomTagProps, DisplayValueType, RenderDOMFunc } from 'rc-select/lib/BaseSelect';
  import { SelectHandler } from 'rc-select/lib/Select';
  import { BaseOptionType, ChangeEventExtra, DefaultOptionType, FieldNames, LegacyDataNode, SimpleModeConfig } from 'rc-tree-select/lib/TreeSelect';
  import { CheckedStrategy } from 'rc-tree-select/lib/utils/strategyUtil';
  import React from 'react';
  export interface TreeSelectProps<ValueType = string | string[], OptionType extends BaseOptionType = DefaultOptionType> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect'> {
      /** 显示清除按钮
       * @default false
       */
      allowClear?: boolean;
      /** 当多选模式下值被选择，自动清空搜索框
       * @default true
       */
      autoClearSearchValue?: boolean;
      /** 是否显示边框
       * @default true
       */
      bordered?: boolean;
      /** 指定默认选中的条目 */
      defaultValue?: string | string[];
      /** 是否禁用
       * @default false
       */
      disabled?: boolean;
      /** 下拉菜单的 className 属性 */
      dropdownClassName?: string;
      /** 下拉菜单和选择器同宽。默认将设置 min-width，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动
       * @default true
       */
      dropdownMatchSelectWidth?: boolean | number;
      /** 自定义下拉框内容 */
      dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
      /** 下拉菜单的 style 属性 */
      dropdownStyle?: React.CSSProperties;
      /** 自定义节点 label、value、children 的字段
       * @default { label: label, value: value, children: children }
       */
      fieldNames?: FieldNames;
      /** 是否根据输入项进行筛选，默认用 treeNodeFilterProp 的值作为要筛选的 TreeNode 的属性值
       * @default function
       */
      filterTreeNode?: boolean | ((inputValue: string, treeNode: DefaultOptionType) => boolean);
      /** 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codepen.io/afc163/pen/zEjNOy?editors=0010)
       * @default () => document.body
       */
      getPopupContainer?: RenderDOMFunc;
      /** 是否把每个选项的 label 包装到 value 中，会把 value 类型从 string 变为 {value: string, label: ReactNode, halfChecked(treeCheckStrictly 时有效): string[] } 的格式
       * @default false
       */
      labelInValue?: boolean;
      /** 设置弹窗滚动高度
       * @default 256
       */
      listHeight?: number;
      /** 异步加载数据 */
      loadData?: (dataNode: LegacyDataNode) => Promise<unknown>;
      /** 最多显示多少个 tag，响应式模式会对性能产生损耗 */
      maxTagCount?: number | 'responsive';
      /** 隐藏 tag 时显示的内容 */
      maxTagPlaceholder?: React.ReactNode | ((omittedValues: DisplayValueType[]) => React.ReactNode);
      /** 支持多选（当设置 treeCheckable 时自动变为 true）
       * @default false
       */
      multiple?: boolean;
      /** 当下拉列表为空时显示的内容
       * @default "Not Found"
       */
      notFoundContent?: React.ReactNode;
      /** 选择框默认文字 */
      placeholder?: string;
      /** 搜索框的值，可以通过 onSearch 获取用户输入 */
      searchValue?: string;
      /** 是否显示 suffixIcon，单选模式下默认 true */
      showArrow?: boolean;
      /** 配置 treeCheckable 时，定义选中项回填的方式。TreeSelect.SHOW_ALL: 显示所有选中节点(包括父节点)。TreeSelect.SHOW_PARENT: 只显示父节点(当父节点下所有子节点都选中时)。 默认只显示子节点
       * @default TreeSelect.SHOW_CHILD
       */
      showCheckedStrategy?: CheckedStrategy;
      /** 是否支持搜索框
       * @default 单选：false | 多选：true
       */
      showSearch?: boolean;
      /** 选择框大小 */
      size?: 'large' | 'middle' | 'small';
      /** 自定义的选择框后缀图标, 多选模式下必须同时设置 showArrow 为 true */
      suffixIcon?: React.ReactNode;
      /** 自定义树节点的展开/折叠图标 */
      switcherIcon?: React.ReactNode;
      /** 自定义 tag 内容，多选时生效 */
      tagRender?: (props: CustomTagProps) => React.ReactElement;
      /** 显示 Checkbox
       * @default false
       */
      treeCheckable?: boolean;
      /** checkable 状态下节点选择完全受控（父子节点选中状态不再关联），会使得 labelInValue 强制为 true
       * @default false
       */
      treeCheckStrictly?: boolean;
      /** treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（value 在整个树范围内唯一）
       * @default []
       */
      treeData?: OptionType[];
      /** 使用简单格式的 treeData，具体设置参考可设置的类型 (此时 treeData 应变为这样的数据结构: [{id:1, pId:0, value:'1', title:"test1",...},...]， pId 是父节点的 id)
       * @default false
       */
      treeDataSimpleMode?: boolean | SimpleModeConfig;
      /** 默认展开所有树节点
       * @default false
       */
      treeDefaultExpandAll?: boolean;
      /** 默认展开的树节点 */
      treeDefaultExpandedKeys?: string[];
      /** 设置展开的树节点 */
      treeExpandedKeys?: string[];
      /** 是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式
       * @default false
       */
      treeIcon?: boolean;
      /** 是否展示线条样式，请参考 Tree - showLine
       * @default false
       */
      treeLine?: boolean | {
          showLeafIcon: boolean;
      };
      /** 输入项过滤对应的 treeNode 属性
       * @default "value"
       */
      treeNodeFilterProp?: string;
      /** 作为显示的 prop 设置
       * @default "title"
       */
      treeNodeLabelProp?: string;
      /** 指定当前选中的条目 */
      value?: ValueType;
      /** 设置 false 时关闭虚拟滚动
       * @default true
       */
      virtual?: boolean;
      /** 选中树节点时调用此函数 */
      onChange?: (value: ValueType, labelList: React.ReactNode[], extra: ChangeEventExtra) => void;
      /** 展开下拉菜单的回调 */
      onDropdownVisibleChange?: (open: boolean) => void;
      /** 文本框值变化时回调 */
      onSearch?: (value: string) => void;
      /** 被选中时调用 */
      onSelect?: SelectHandler<ValueType, OptionType>;
      /** 展示节点时调用 */
      onTreeExpand?: (expandedKeys: React.Key[]) => void;
  }
  /**
   * 树型选择控件。
   *
   * ### 何时使用
   *
   * 类似 Select 的选择控件，可选择的数据结构是一个树形结构时，可以使用 TreeSelect，例如公司层级、学科系统、分类目录等等。
   *
   * ### 使用方式
   * ```js
   * import TreeSelect from '@ling-design/core/es/components/tree-select'
   * ```
   */
  export const TreeSelect: React.FC<TreeSelectProps> & {
      TreeNode: typeof AntdTreeSelect.TreeNode;
      SHOW_ALL: typeof AntdTreeSelect.SHOW_ALL;
      SHOW_PARENT: typeof AntdTreeSelect.SHOW_PARENT;
      SHOW_CHILD: typeof AntdTreeSelect.SHOW_CHILD;
  };
  export default TreeSelect;
}
declare module "ling_core/components/tree-select" {
  import TreeSelect from "ling_core/components/tree-select/tree-select";
  export { TreeSelectProps } from "ling_core/components/tree-select/tree-select";
  export default TreeSelect;
}
declare module "ling_core/components/typography" {
  export { default } from 'antd/lib/typography';
  export * from 'antd/lib/typography';
}
declare module "ling_core/components/upload" {
  export { default } from 'antd/lib/upload';
  export * from 'antd/lib/upload';
}
declare module "ling_core/components/upload-file/upload-file" {
  import './upload-file.scss';
  import { HttpRequestHeader, ItemRender, RcFile, ShowUploadListInterface, UploadChangeParam, UploadFile, UploadListProgressProps, UploadListType, UploadLocale } from 'antd/lib/upload/interface';
  import { UploadProps as RcUploadProps, UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
  import React from 'react';
  type PreviewFileHandler = (file: File | Blob) => PromiseLike<string>;
  type BeforeUploadValueType = void | boolean | string | Blob | File;
  export interface UploadFileProps<T = any> extends Pick<RcUploadProps, 'capture'> {
      /**
       * 发到后台的文件参数名
       */
      name?: string;
      /**
       * 默认已经上传的文件列表
       */
      defaultFileList?: Array<UploadFile<T>>;
      /**
       * 已经上传的文件列表（受控）
       */
      fileList?: Array<UploadFile<T>>;
      /**
       * 上传的地址
       */
      action?: string | ((file: RcFile) => string) | ((file: RcFile) => PromiseLike<string>);
      /**
       * 支持上传文件夹
       */
      directory?: boolean;
      /**
       * 上传所需额外参数或返回上传额外参数的方法
       */
      data?: Record<string, unknown> | ((file: UploadFile<T>) => Record<string, unknown> | Promise<Record<string, unknown>>);
      /**
       * 上传请求的 http method
       */
      method?: 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch';
      /**
       * 设置上传的请求头部，IE10 以上有效
       */
      headers?: HttpRequestHeader;
      /**
       * 是否展示文件列表, 可设为一个对象，用于单独设定 showPreviewIcon, showRemoveIcon, showDownloadIcon, removeIcon 和 downloadIcon
       */
      showUploadList?: boolean | ShowUploadListInterface;
      /**
       * 是否支持多选文件，ie10+ 支持。开启后按住 ctrl 可选择多个文件
       */
      multiple?: boolean;
      /** 接受的文件类型,如image/png */
      accept?: string;
      /**
       * 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传（ resolve 传入 File 或 Blob 对象则上传 resolve 传入对象）；也可以返回 Upload.LIST_IGNORE，此时列表中将不展示此文件。 注意：IE9 不支持该方法
       */
      beforeUpload?: (file: RcFile, FileList: RcFile[]) => BeforeUploadValueType | Promise<BeforeUploadValueType>;
      /**
       * 上传文件改变时的状态
       */
      onChange?: (info: UploadChangeParam<UploadFile<T>>) => void;
      /**
       * 当文件被拖入上传区域时执行的回调功能
       */
      onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
      /**
       * 上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card
       */
      listType?: UploadListType;
      /**
       * 自定义className
       */
      className?: string;
      /**
       * 点击文件链接或预览图标时的回调
       */
      onPreview?: (file: UploadFile<T>) => void;
      /**
       * 点击下载文件时的回调，如果没有指定，则默认跳转到文件 url 对应的标签页
       */
      onDownload?: (file: UploadFile<T>) => void;
      /**
       * 点击移除文件时的回调，返回值为 false 时不移除。支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除
       */
      onRemove?: (file: UploadFile<T>) => void | boolean | Promise<void | boolean>;
      /**
       * 是否支持服务端渲染
       */
      supportServerRender?: boolean;
      /**
       * 自定义style
       */
      style?: React.CSSProperties;
      /**
       * 是否可用
       */
      disabled?: boolean;
      /**
       * 通过覆盖默认的上传行为，可以自定义自己的上传实现
       */
      customRequest?: (options: RcCustomRequestOptions) => void;
      /**
       * 上传请求时是否携带 cookie
       */
      withCredentials?: boolean;
      /**
       * 点击打开文件对话框
       */
      openFileDialogOnClick?: boolean;
      /**
       * 语言设置
       */
      locale?: UploadLocale;
      /**
       * 组件位置Id
       */
      id?: string;
      /**
       * 自定义文件预览逻辑
       */
      previewFile?: PreviewFileHandler;
      /** 自定义显示icon */
      iconRender?: (file: UploadFile<T>, listType?: UploadListType) => React.ReactNode;
      /**
       * 自定义缩略图是否使用 <img /> 标签进行显示
       */
      isImageUrl?: (file: UploadFile) => boolean;
      /**
       * 自定义进度条样式
       */
      progress?: UploadListProgressProps;
      /**
       * 自定义上传列表项
       */
      itemRender?: ItemRender<T>;
      /** 限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件 */
      maxCount?: number;
  }
  export const LingUploadFile: React.FC<UploadFileProps>;
  export default LingUploadFile;
}
declare module "ling_core/components/upload-file" {
  import UploadFile from "ling_core/components/upload-file/upload-file";
  export { UploadFileProps } from "ling_core/components/upload-file/upload-file";
  export default UploadFile;
}
declare module "ling_core/components/upload-image/upload-image" {
  import './upload-image.scss';
  import { UploadProps } from 'antd/es/upload/interface';
  import React from 'react';
  import { TooltipPlacement } from "ling_core/components/tooltip";
  export interface UploadImageProps {
      /** 宽度 */
      width?: number;
      /** 高度 */
      height?: number;
      /** 是否禁用 */
      disabled?: boolean;
      /** 容器节点ClassName */
      uploadImageClassName?: string;
      /** 接受的文件类型,如image/png */
      accept?: string;
      /** 是否上传中 */
      loading?: boolean;
      /** 组件value */
      value?: string;
      /** 背景尺寸模式  */
      sizeMode?: 'cover' | 'contain';
      /**
       *  备注信息
       * */
      tip?: React.ReactNode;
      /**
       * tooltip展示位置，参数类似tooltip组件
       */
      placement?: TooltipPlacement;
      /**
       * 是否展示操作按钮
       */
      enableAction?: boolean;
      /**
       * 是否允许查看图片
       */
      enablePreview?: boolean;
      /** 所选文件发生变化 */
      onChange?: (file: File) => void;
      /** 选择文件报错 */
      onError?: (error: string) => void;
      /**
       * 触发预览
       */
      onPreview?: () => void;
      /**
       * 触发删除
       */
      onDelete?: () => void;
      /**
       * 是否需要截取功能
       */
      enableCrop?: boolean;
      /**
       * 截取尺寸
       */
      cropSize?: number[];
      /**
       * 是否开启压缩
       */
      enableCompress?: boolean;
      /**
       * 图片裁剪质量
       */
      quality?: number;
      /**
       * 截取形状
       */
      shape?: 'rect' | 'round';
      /**
       * 是否支持旋转
       */
      rotate?: boolean;
      /**
       * 是否支持多选
       */
      multiple?: boolean;
      /**
       * 操作对齐方式
       */
      actionAlign?: 'left' | 'center' | 'right';
      compressRatio?: number;
  }
  export const UploadImage: React.FC<UploadImageProps & Omit<UploadProps, 'beforeUpload'>>;
  export default UploadImage;
}
declare module "ling_core/components/upload-image" {
  import UploadImage from "ling_core/components/upload-image/upload-image";
  export { UploadImageProps } from "ling_core/components/upload-image/upload-image";
  export default UploadImage;
}
declare module "ling_core/components/version" {
  export { default } from 'antd/lib/version';
  export * from 'antd/lib/version';
}
declare module "ling_core/Components" {
  export { default as Affix, AffixProps } from "ling_core/components/affix";
  export { default as AjaxUploadImage } from "ling_core/components/ajax-upload-image";
  export { default as Alert, AlertProps } from "ling_core/components/alert";
  export { default as Anchor, AnchorLinkProps, AnchorProps } from "ling_core/components/anchor";
  export { default as AntdTabs, TabsProps as AntdTabsProps, TabPaneProps, TabsPosition, } from "ling_core/components/ant-tabs";
  export { default as AutoComplete, AutoCompleteProps } from "ling_core/components/auto-complete";
  export { default as Avatar, AvatarProps } from "ling_core/components/avatar";
  export { default as BackTop, BackTopProps } from "ling_core/components/back-top";
  export { default as Badge, BadgeProps } from "ling_core/components/badge";
  export { default as Breadcrumb, BreadcrumbProps } from "ling_core/components/breadcrumb";
  export { default as Button, ButtonProps } from "ling_core/components/button";
  export { BasePopup, BasePopupItem, BasePopupProps, default as ButtonPopup, ButtonPopupProps, } from "ling_core/components/button-popup";
  export { default as Calendar, CalendarProps } from "ling_core/components/calendar";
  export { default as Card, CardProps } from "ling_core/components/card";
  export { default as Carousel, CarouselProps } from "ling_core/components/carousel";
  export { default as Cascader, CascaderProps } from "ling_core/components/cascader";
  export { default as Checkbox, CheckboxOptionType, CheckboxProps, } from "ling_core/components/checkbox";
  export { default as Col, ColProps } from "ling_core/components/col";
  export { default as Collapse, CollapsePanelProps, CollapseProps, } from "ling_core/components/collapse";
  export { default as Comment, CommentProps } from "ling_core/components/comment";
  export { default as ConfigProvider } from "ling_core/components/config-provider";
  export { default as DatePicker, DatePickerProps } from "ling_core/components/date-picker";
  export { default as Descriptions, DescriptionsProps } from "ling_core/components/descriptions";
  export { default as Divider, DividerProps } from "ling_core/components/divider";
  export { default as Drawer, DrawerProps } from "ling_core/components/drawer";
  export { default as Dropdown, DropdownButtonProps, DropdownButtonType, DropDownProps, } from "ling_core/components/dropdown";
  export { default as Empty, EmptyProps } from "ling_core/components/empty";
  export { ErrorListProps, default as Form, FormInstance, FormItemProps, FormListProps, FormProps, FormSectionProps, Rule, RuleObject, RuleRender, } from "ling_core/components/form";
  export { default as Grid } from "ling_core/components/grid";
  export { default as Header, HeaderProps } from "ling_core/components/header";
  export { default as Icon } from "ling_core/components/icon";
  export { default as Image, ImageProps } from "ling_core/components/image";
  export { default as Input, InputProps } from "ling_core/components/input";
  export { default as InputNumber, InputNumberProps } from "ling_core/components/input-number";
  export { default as InputSearch, InputSearchProps } from "ling_core/components/input-search";
  export { default as Layout, LayoutProps, SiderProps } from "ling_core/components/layout";
  export { default as List, ListProps } from "ling_core/components/list";
  export { default as Masonry, MasonryAbsoluteItem, MasonryItem, MasonryProps, } from "ling_core/components/masonry";
  export { MentionProps, default as Mentions } from "ling_core/components/mentions";
  export { default as Menu, MenuProps } from "ling_core/components/menu";
  export { MenuProps as MenuMenuMiniProps, default as MenuMini, } from "ling_core/components/menu-mini";
  export { default as MenuNext, MenuProps as MenuNextProps } from "ling_core/components/menu-next";
  export { default as message, ArgsProps as MessageArgsProps } from "ling_core/components/message";
  export { default as Modal, ModalProps } from "ling_core/components/modal";
  export { default as notification } from "ling_core/components/notification";
  export { default as PageHeader, PageHeaderProps } from "ling_core/components/page-header";
  export { default as Pagination, PaginationProps } from "ling_core/components/pagination";
  export { default as Popconfirm, PopconfirmProps } from "ling_core/components/popconfirm";
  export { default as Popover, PopoverItem, PopoverItemProps, PopoverProps, } from "ling_core/components/popover";
  export { default as Progress, ProgressProps } from "ling_core/components/progress";
  export { default as Radio, RadioButtonProps, RadioChangeEvent, RadioGroupProps, RadioProps, } from "ling_core/components/radio";
  export { default as Rate, RateProps } from "ling_core/components/rate";
  export { default as RectCard } from "ling_core/components/rect-card";
  export { default as Result, ResultProps } from "ling_core/components/result";
  export { default as Row, RowProps } from "ling_core/components/row";
  export { default as Select, SelectOptGroupProps, SelectOptionProps, SelectProps, } from "ling_core/components/select";
  export { default as ShareModal } from "ling_core/components/share-modal";
  export { default as Sidebar, SidebarItem, SidebarProps } from "ling_core/components/sidebar";
  export { default as Skeleton, SkeletonProps } from "ling_core/components/skeleton";
  export { default as Slider, SliderProps, SliderSingleProps } from "ling_core/components/slider";
  export { default as Space, SpaceProps } from "ling_core/components/space";
  export { default as Spin, SpinProps } from "ling_core/components/spin";
  export { default as Statistic, StatisticProps } from "ling_core/components/statistic";
  export { default as Steps, StepsProps } from "ling_core/components/steps";
  export { default as Switch, SwitchProps } from "ling_core/components/switch";
  export { default as Table, ColumnGroupType as TableColumnGroupType, ColumnProps as TableColumnProps, ColumnsType as TableColumnsType, ColumnType as TableColumnType, TablePaginationConfig, TableProps, } from "ling_core/components/table";
  export { TabItem, TabProps, default as Tabs } from "ling_core/components/tabs";
  export { default as Tag, TagProps, TagType } from "ling_core/components/tag";
  export { default as TemplateCard, TemplateCardProps } from "ling_core/components/template-card";
  export { default as TimePicker, TimePickerProps, TimeRangePickerProps, } from "ling_core/components/time-picker";
  export { default as Timeline, TimelineItemProps, TimelineProps, } from "ling_core/components/timeline";
  export { AbstractTooltipProps, default as Tooltip, TooltipAlignConfig, TooltipPlacement, TooltipProps, TooltipPropsWithOverlay, TooltipPropsWithTitle, } from "ling_core/components/tooltip";
  export { default as Transfer, TransferItem, TransferProps } from "ling_core/components/transfer";
  export { default as TransferSelect, TransferSelectProps, TreeNodeData, } from "ling_core/components/transfer-select";
  export { default as Tree, TreeDataNode, TreeNodeProps, TreeProps } from "ling_core/components/tree";
  export { default as TreeSelect, TreeSelectProps } from "ling_core/components/tree-select";
  export { default as Typography, TypographyProps } from "ling_core/components/typography";
  export { default as Upload, UploadProps } from "ling_core/components/upload";
  export { default as UploadFile } from "ling_core/components/upload-file";
  export { default as UploadImage } from "ling_core/components/upload-image";
  export { default as version } from "ling_core/components/version";
}



/// <reference types="react" />
declare module "ling_biz/hooks/use-dragging" {
  const useDragging: <T>({ onDragStart, onDrag, onDragEnd, }: {
      onDragStart?: (e: React.MouseEvent | {
          clientX: number;
          clientY: number;
      }) => void;
      onDrag?: (e: MouseEvent) => T;
      onDragEnd?: (e: MouseEvent, value: T) => void;
  }) => [(e: React.SyntheticEvent) => void, (e: React.MouseEvent | {
      clientX?: number;
      clientY?: number;
  }) => void, (e: MouseEvent) => void];
  export default useDragging;
}
declare module "ling_biz/AnglePicker" {
  interface AnglePickerProps {
      /**
       * 角度
       *
       * @type {number}
       * @memberof AnglePickerProps
       */
      value: number;
      onChange?: (angle: number) => void;
      onFinishModification?: (isChanged: boolean) => void;
      /**
       * 圆角直径大小
       *
       * @type {number}
       * @memberof AnglePickerProps
       */
      size?: number;
      /**
       * 取整参数
       *
       * @type {number}
       * @memberof AnglePickerProps
       */
      snap?: number;
      /**
       * 顺时针还是逆时针，默认是像 PS / Keynote 那样逆时针
       */
      clockWise?: boolean;
      draggable?: boolean;
      disabled?: boolean;
  }
  /**
   * 圆形角度拾取器
   *
   * @param {AnglePickerProps}
   * @returns
   */
  function AnglePicker({ value, onChange, size, snap, clockWise, draggable, disabled, onFinishModification, }: AnglePickerProps): JSX.Element;
  namespace AnglePicker {
      var defaultProps: {
          size: number;
          snap: number;
      };
  }
  export { AnglePicker };
  export default AnglePicker;
}
declare module "ling_biz/components/color-picker/ColorBlock" {
  import React from 'react';
  interface ColorBlockProps extends React.HTMLAttributes<HTMLDivElement> {
      /**
       * 自定义样式名
       */
      className?: string;
      /**
       * 自定义样式
       */
      style?: React.CSSProperties;
      /**
       * 颜色
       */
      color: string;
      /**
       * 组件透明度
       */
      opacity?: number;
      /**
       * 组件是否为混合色
       */
      isFixed?: boolean;
  }
  export function ColorBlock({ className, color, opacity, isFixed, ...props }: ColorBlockProps): JSX.Element;
  export default ColorBlock;
}
declare module "ling_biz/components/color-picker/const" {
  export const PICKER_TYPES: {
      readonly gradient: "gradient";
      readonly plain: "plain";
  };
  export const PICKER_TABS: readonly [{
      readonly value: "plain";
      readonly label: "纯色";
  }, {
      readonly value: "gradient";
      readonly label: "渐变";
  }];
}
declare module "ling_biz/components/color-picker/ColorGridList/utils" {
  /**
   * 用于动态计算颜色列表高度，例如：带方案组的颜色组件
   */
  export function calcColorListHeight(length: number): number;
}
declare module "ling_biz/components/color-picker/ColorGridList" {
  import { ColorPickerValue, GradientColor, PickType } from '../types.d';
  export * from "ling_biz/components/color-picker/ColorGridList/utils";
  export interface ColorGridListProps {
      /**
       * 自定义样式名
       */
      className?: string;
      /**
       * 颜色类型
       */
      colorType?: PickType;
      /**
       * 颜色数据列表
       */
      colors?: (string | GradientColor)[];
      /**
       * 选取颜色时触发
       */
      onSelect?: (color: ColorPickerValue) => void;
      /**
       * 埋点上报
       */
      clickReport?: object;
  }
  function ColorGridList(props: ColorGridListProps): JSX.Element;
  export default ColorGridList;
}
declare module "ling_biz/components/color-picker/ColorDisplay" {
  import React from 'react';
  import { ColorPickerValue } from '../types.d';
  interface ColorDisplayProps {
      /**
       * 颜色条数据，支持纯色和渐变
       */
      value: ColorPickerValue | string;
      /**
       * 自定义样式名称
       */
      className?: string;
      /**
       * 自定义样式
       */
      style?: React.CSSProperties;
      /**
       * 设置禁用样式
       */
      disabled?: boolean;
      /**
       * 设置获得焦点样式
       */
      selected?: boolean;
      /**
       * 是否显示icon，默认: true
       */
      icon?: boolean;
  }
  export function ColorDisplay(props: ColorDisplayProps): JSX.Element;
  export default ColorDisplay;
}
declare module "ling_biz/WrapInputNumber" {
  import { InputNumber } from 'ling_core/Components';
  import React, { Component } from 'react';
  interface WrapInputNumberProps {
      /**
       * 当前值，介于受控和非受控之间
       */
      value?: number;
      /**
       * 值改变时触发回调，debounce 存在时会有一定的防抖时间
       */
      onChange?: (value: number) => void;
      /**
       * 输入框前缀内容
       */
      prefix?: string | React.ReactElement;
      /**
       * 输入框后内容
       */
      suffix?: string | React.ReactElement;
      /**
       * 输入框容器样式
       */
      wrapStyle?: React.CSSProperties;
      /**
       * 组件失去焦点时触发
       */
      onFinishModification?: (value: number) => void;
      /**
       * 组件宽度
       */
      width?: number | string;
      /**
       * 防抖时间，默认为：0
       */
      debounce?: number;
      /**
       * 相关主题，推荐为：surround
       */
      theme?: 'default' | 'default_darker' | 'transparent' | 'transparent_gray' | 'underline' | 'surround';
      /**
       * 是否允许为空
       */
      allowEmpty?: boolean;
      /**
       * 最小值
       */
      min?: number;
      /**
       * 最大值
       */
      max?: number;
      /**
       * 使用异常样式
       */
      isError?: boolean;
      /**
       * 提示
       */
      tips?: string;
      /**
       * 格式化字符
       */
      char?: string;
  }
  export default class WrapInputNumber extends Component<Omit<React.ComponentProps<typeof InputNumber>, 'onChange'> & WrapInputNumberProps, {
      inputValue: number;
      hasError: boolean;
  }> {
      debounceChange: any;
      isFocus: boolean;
      constructor(props: any);
      oldValue: any;
      isChanged: boolean;
      cancelDebounce: () => void;
      componentDidMount(): void;
      componentWillUnmount(): void;
      UNSAFE_componentWillReceiveProps(nextProps: any): void;
      onFocus: (e: any) => void;
      onChange: (value: any) => void;
      onBlur: (e: any) => void;
      onKeyUp: (e: any) => void;
      finishModification: () => void;
      isInputInRange(value: number): boolean;
      render(): JSX.Element;
  }
}
declare module "ling_biz/components/color-picker/ColorPickerPanel" {
  import './ColorPickerAssets.scss';
  import React from 'react';
  interface ColorPickerPanelProps {
      /**
       * 自定义样式名
       */
      className?: string;
      /**
       * 自定义样式
       */
      style?: React.CSSProperties;
      /**
       * 颜色值
       */
      color: string;
      /**
       * 颜色改变时触发
       */
      onChange?: (color: string) => void;
  }
  export function ColorPickerPanel({ color, onChange, className, style, }: ColorPickerPanelProps): JSX.Element;
  export default ColorPickerPanel;
}
declare module "ling_biz/hooks/use-key" {
  export default function useKey(callback: (keycode: number, event: KeyboardEvent) => void, { detectKeys, keyevent, deps, disabled, }?: {
      detectKeys?: string[] | number[];
      keyevent?: 'keydown' | 'keyup' | 'keypress';
      deps?: any[];
      disabled?: boolean;
  }): void;
}
declare module "ling_biz/hooks/use-stop-dragging" {
  const useStopDragging: ({ limits, stop, initialPos, colorStopRef, onPosChange, onDragStart, onDragEnd, onDeleteColor, }: {
      limits: {
          min: number;
          max: number;
          drop: number;
      };
      stop: {
          id: number;
          color: string;
          offset: number;
          pointX: number;
          isActive?: boolean;
      };
      initialPos?: number;
      colorStopRef: React.RefObject<HTMLElement>;
      onPosChange: ({ id, offset }: {
          id: number;
          offset: number;
      }) => void;
      onDragStart?: (id: number) => void;
      onDragEnd?: (id: number) => void;
      onDeleteColor: (id: number) => void;
  }) => ((e: import("react").SyntheticEvent<Element, Event>) => void)[];
  export default useStopDragging;
}
declare module "ling_biz/components/color-picker/GradientPanel/ColorStop" {
  import * as types from '../types.d';
  const ColorStop: ({ stop, limits, onPosChange, onDeleteColor, onDragStart, onDragEnd, }: {
      stop: types.Stop;
      limits: types.Limits;
      onPosChange: ({ id, offset }: {
          id: number;
          offset: number;
      }) => void;
      onDragStart?: (id: number) => void;
      onDragEnd?: (id: number) => void;
      onDeleteColor: (id: number) => void;
  }) => JSX.Element;
  export default ColorStop;
}
declare module "ling_biz/components/color-picker/GradientPanel/ColorStopsHolder" {
  import * as types from '../types.d';
  const ColorStopsHolder: ({ width, stops, disabled, onAddColor, ...rest }: {
      width: number;
      stops: types.Stop[];
      disabled: boolean;
      limits: types.Limits;
      onAddColor: ({ offset, pointX }: {
          offset: number;
          pointX: number;
      }) => void;
      onPosChange: ({ id, offset }: {
          id: number;
          offset: number;
      }) => void;
      onDragStart?: (id: number) => void;
      onDragEnd?: (id: number) => void;
      onDeleteColor: (id: number) => void;
  }) => JSX.Element;
  export default ColorStopsHolder;
}
declare module "ling_biz/components/color-picker/GradientPanel/constants" {
  export const COLORS: {
      value: string;
      name: string;
  }[];
  export const HALF_STOP_WIDTH: number;
  export const DEFAULT_STOP_REMOVAL_DROP = 50;
  export const DEFAULT_WIDTH = 220;
  export const DEFAULT_HEIGHT = 32;
  export const DEFAULT_MAX_STOPS = 5;
  export const DEFAULT_MIN_STOPS = 2;
}
declare module "ling_biz/components/color-picker/GradientPanel/GradientBar" {
  import * as types from '../types.d';
  function GradientBar({ palette, paletteHeight, width, stopRemovalDrop, minStops, maxStops, onPaletteChange, activeColorId, onActiveColorIdChange, }: {
      palette: types.Palette;
      paletteHeight?: number;
      width?: number;
      stopRemovalDrop?: number;
      minStops?: number;
      maxStops?: number;
      onPaletteChange: (palette: types.Palette) => void;
      activeColorId: number;
      onActiveColorIdChange: (id: number) => void;
  }): JSX.Element;
  export default GradientBar;
}
declare module "ling_biz/components/color-picker/GradientPanel" {
  import React from 'react';
  import * as types from '../types.d';
  export interface GradientPickerProps {
      /**
       * 自定义样式名称
       */
      className?: string;
      /**
       * 自定义样式
       */
      style?: React.CSSProperties;
      /**
       * 渐变值
       */
      colorStops: types.Palette;
      /**
       * 是否显示渐变角度，默认：true
       */
      showAngle?: boolean;
      /**
       * 渐变角度
       */
      angle?: number;
      /**
       * 值改变时触发
       */
      onChange?: (value: types.GradientColor) => void;
  }
  export function GradientPanel({ className, style, colorStops: palette, angle, showAngle, onChange, }: GradientPickerProps): JSX.Element;
  export default GradientPanel;
}
declare module "ling_biz/components/color-picker/PlainPanel" {
  interface PlainPanelProps {
      color: string;
      onChange: (color: string) => void;
  }
  export default function PlainPanel({ color, onChange }: PlainPanelProps): JSX.Element;
}
declare module "ling_biz/components/color-picker/PresetColor/presetColors" {
  import { GradientColor } from '../types.d';
  export const presetPlainColors: string[];
  export const presetGradientColors: GradientColor[];
  const _default: {
      presetPlainColors: string[];
      presetGradientColors: GradientColor[];
  };
  export default _default;
}
declare module "ling_biz/components/color-picker/PresetColor" {
  import { ColorPickerValue, CustomTagEvents, PickType } from '../types.d';
  interface PresetColorProps {
      colorType: PickType;
      onSelect: (color: ColorPickerValue) => void;
      customTagEvents?: CustomTagEvents;
  }
  export default function PresetColor(props: PresetColorProps): JSX.Element;
}
declare module "ling_biz/components/color-picker/ColorPicker/TabGroup" {
  import './index.scss';
  import React from 'react';
  interface TabGroupProps {
      activeKey?: string | number;
      tabs: tab[];
      onChange: (string: any) => void;
      className?: string;
  }
  interface tab {
      label: React.ReactNode | string;
      value: string | number;
  }
  function TabGroup({ tabs, activeKey, onChange, className }: TabGroupProps): JSX.Element;
  export default TabGroup;
}
declare module "ling_biz/components/color-picker/ColorPicker" {
  import { TooltipPlacement } from 'antd/lib/tooltip';
  import React from 'react';
  import { ColorPickerValue, CustomColorList, CustomTagEvents, GradientColor, PickType } from '../types.d';
  export interface ColorPickerProps {
      /**
       * 自定义样式名
       */
      className?: string;
      /**
       * 自定义样式
       */
      style?: React.CSSProperties;
      /**
       * 设置拾色器面板Tab：eg: ["gradient", "plain"]
       */
      pickTypes?: PickType[];
      /**
       * 当前拾色器选中的Tab: "gradient" | "plain"
       */
      colorType: PickType;
      /**
       * 村色面板值
       */
      color: string;
      /**
       * 渐变面板色值
       */
      gradientColor: GradientColor;
      /**
       * 自定义触发器组件，默认为：<ColorDisplay />
       */
      children?: React.ReactNode;
      /**
       * 获得焦点状态
       */
      selected?: boolean;
      /**
       * 是否禁用组件
       */
      disabled?: boolean;
      /**
       * Popover的placement属性，详见Anttd
       */
      placement?: TooltipPlacement;
      /**
       * 模板颜色集，存在该参数时，颜色选择器会显示当前模板颜色
       */
      customColorList?: CustomColorList;
      /**
       * 数据埋点位
       */
      customTagEvents?: CustomTagEvents;
      /**
       * 颜色组件自定义底部，默认为预设色
       */
      renderFoot?: (activeTab: PickType, handleChange: (value: ColorPickerValue) => void, customColorList?: CustomColorList, customTagEvents?: CustomTagEvents) => React.ReactNode;
      /**
       * Popover的getPopupContainer属性，详见Anttd
       */
      getPopupContainer?: (triggerNode: Element) => HTMLElement;
      /**
       * 当前面板颜色值改变时触发回调
       */
      onChange: (value: ColorPickerValue) => void;
      /**
       * Popover的onVisibleChange别名
       */
      onOpen?: (isOpened: boolean) => void;
      /**
       * 切换Tab触发
       */
      onTypeChange?: (type: PickType) => void;
      /**
       * Popover关闭时触发
       */
      onFinishModification?: () => void;
  }
  export default function ColorPicker({ pickTypes, colorType, color, gradientColor, placement, children, style, className, selected, disabled, renderFoot, getPopupContainer, onTypeChange, onOpen, onChange, onFinishModification, customColorList, customTagEvents, }: ColorPickerProps): JSX.Element;
}
declare module "ling_biz/components/color-picker/GradientColorPicker" {
  import { ColorPickerProps } from "ling_biz/components/color-picker/ColorPicker";
  import { ColorStops, GradientColor } from '../types.d';
  export interface GradientColorPickerProps extends Omit<ColorPickerProps, 'colorType' | 'color' | 'gradientColor' | 'onChange'> {
      angle: number;
      colorStops: ColorStops;
      onChange: (value: GradientColor) => void;
  }
  export default function GradientColorPicker({ colorStops, angle, onChange, ...rest }: GradientColorPickerProps): JSX.Element;
}
declare module "ling_biz/components/color-picker/PlainColorPicker" {
  import { ColorPickerProps } from "ling_biz/components/color-picker/ColorPicker";
  export interface PlainColorPickerProps extends Omit<ColorPickerProps, 'colorType' | 'gradientColor' | 'onChange'> {
      color: string;
      onChange: (color: string) => void;
  }
  export default function PlainColorPicker({ color, onChange, ...rest }: PlainColorPickerProps): JSX.Element;
}
declare module "ling_biz/ColorPicker" {
  import ColorBlock from "ling_biz/components/color-picker/ColorBlock";
  import ColorGridList, { calcColorListHeight, ColorGridListProps } from "ling_biz/components/color-picker/ColorGridList";
  import ColorPicker, { ColorPickerProps } from "ling_biz/components/color-picker/ColorPicker";
  import GradientColorPicker, { GradientColorPickerProps } from "ling_biz/components/color-picker/GradientColorPicker";
  import PlainColorPicker, { PlainColorPickerProps } from "ling_biz/components/color-picker/PlainColorPicker";
  import PresetColor from "ling_biz/components/color-picker/PresetColor";
  export * from "ling_biz/components/color-picker/const";
  export * from './types.d';
  export type { ColorGridListProps, ColorPickerProps, GradientColorPickerProps, PlainColorPickerProps, };
  export { calcColorListHeight, ColorBlock, ColorGridList, ColorPicker, GradientColorPicker, PlainColorPicker, PresetColor, };
  export default ColorPicker;
}
declare module "ling_biz/components/watermark/util" {
  export enum EContentType {
      image = "image",
      text = "text"
  }
  export interface IWaterFnProps {
      content: string;
      contentType: EContentType;
      container: HTMLElement | null;
      width: number;
      height: number;
      textAlign: CanvasTextAlign;
      textBaseline: CanvasTextBaseline;
      font: string;
      fillStyle: string;
      globalAlpha: number;
      rotate: number;
      zIndex: number;
  }
  export class WatermarkClass {
      observer?: MutationObserver;
      _props?: IWaterFnProps;
      constructor(props: IWaterFnProps);
      init(props: any): void;
      update(props: any): void;
      observe(props: any): Promise<void>;
      modifyContainer(props: any): Promise<any>;
      createWatermark(props: any): Promise<void>;
      updateWatermark(props: any, watermarkDiv?: any): Promise<void>;
      getStyleAttr(props: any): Promise<string>;
      createTextDataUrl({ width, height, textAlign, textBaseline, font, fillStyle, globalAlpha, rotate, content, }: {
          width: any;
          height: any;
          textAlign: any;
          textBaseline: any;
          font: any;
          fillStyle: any;
          globalAlpha: any;
          rotate: any;
          content: any;
      }): string;
      createImageDataUrl(props: any): any;
  }
}
declare module "ling_biz/Watermark" {
  import React from 'react';
  import { IWaterFnProps } from "ling_biz/components/watermark/util";
  export interface IWatermarkProps extends Omit<Partial<IWaterFnProps>, 'container'> {
      children?: JSX.Element | JSX.Element[];
      className?: string;
      style?: React.CSSProperties;
  }
  function Watermark(props: IWatermarkProps): JSX.Element;
  export default Watermark;
}
declare module "ling_biz/WatermarkClass" {
  import React from 'react';
  import { IWaterFnProps, WatermarkClass } from "ling_biz/components/watermark/util";
  export interface IWatermarkProps extends Omit<Partial<IWaterFnProps>, 'container'> {
      children?: JSX.Element | JSX.Element[];
      className?: string;
      style?: React.CSSProperties;
      show?: boolean;
  }
  class Watermark extends React.Component<IWatermarkProps> {
      _container: React.RefObject<HTMLDivElement>;
      watermark: WatermarkClass | undefined;
      constructor(props: any);
      componentDidUpdate(): void;
      componentDidMount(): void;
      render(): JSX.Element;
  }
  export default Watermark;
}
declare module "ling_biz/utils/hash" {
  export function hashStr(str: string, max?: number): number;
  export function getHashProbability(value: string, baseNum: number): number;
}
declare module "ling_biz/utils/getImgSrc" {
  export const jdCloudBucket: string[];
  export function isJdCloudBucket(key: string): any;
  export const JD_CLOUD_PREFIX = "//ling-cdn.s3.cn-north-1.jdcloud-oss.com";
  export function jdCloudBucketUrl(url: string): string;
  /**
   * 获取 OSS 完整地址
   */
  export function prefixOSS(key: any, useCDN?: boolean): any;
  /**
   * 将来源原始信息转为正式来源信息，后续流程会提取!source信息上报
   * @param jfsUrl
   * @returns
   */
  export function enableJFSSource(jfsUrl: string): any;
  /**
   * 获取图片完整地址
   *
   * @export
   *
   * @typedef Options
   * @property {number}           [width]        宽度
   * @property {number}           [height]       高度
   * @property {number}           [quality]      质量（1 最小，99 最大）
   * @property {[number,number]}  [cc]           居中裁剪参数（宽比例系数, 高比例系数）
   * @property {[number,number,number,number]}  [cr] 裁剪任意矩形参数（宽, 高, 左上角点X坐标, 左上角点Y坐标）
   * @property {boolean}  [withoutWebp]   不需要webp
   * @property {boolean}  [webpFirst]     优先使用webp
   * @property {boolean}  [isNeedHttp]    返回链接是否需要http
   *
   * @param {object|string} imageObj 图片文件对象（支持 jfs_url url dataUrl）
   * @param {Options} [options={}] 可选参数
   * @returns
   */
  export default function getImgSrc(image: {
      jfs_url?: string;
      url?: string;
      dataUrl?: string;
  } | string, options?: {
      width?: number;
      height?: number;
      quality?: number;
      cc?: [number, number];
      cr?: [number, number, number, number];
      withoutWebp?: boolean;
      webpFirst?: boolean;
      isNeedHttp?: boolean;
  }): string | null;
  /**
   * 获取 JFS 完整地址
   */
  export function prefixJFS(jfsUrl: string, version?: number): string;
}
declare module "ling_biz/GroupTag" {
  import './index.scss';
  import React from 'react';
  export interface IGroupTag {
      /**
       * 标题
       */
      title: string | number;
      /**
       * 自定义class
       */
      className?: string;
      /**
       * 自定义样式
       */
      style?: React.CSSProperties;
  }
  class GroupTag extends React.Component<IGroupTag> {
      render(): JSX.Element;
  }
  export default GroupTag;
}
declare module "ling_biz/ZoneChangeModal" {
  import './index.scss';
  function ZoneChangeModal(props: any): any;
  export default ZoneChangeModal;
}
declare module "ling_biz/RightContextMenu" {
  import './index.scss';
  import React from 'react';
  export interface RightContextMenuType {
      /**
       *  右侧菜单内容
       */
      children: JSX.Element | JSX.Element[];
      /**
       *  目标元素，需要右击弹窗菜单的元素
       */
      targetNode: HTMLElement;
      /**
       *  容器元素，需要点击隐藏菜单的元素，默认为document.body
       */
      containerNode?: HTMLElement;
  }
  export default function RightContextMenu({ children, targetNode, containerNode, }: RightContextMenuType): React.ReactPortal;
}
declare module "ling_biz/components/multiple-upload/type" {
  import type { LingDesignData, LingParsedData } from '@ling-design/sdk';
  import { RcFile } from 'antd/lib/upload';
  export type TUploadType = 'TEMPLATE' | 'DESIGN' | 'MATERIAL' | 'OTHER';
  export interface IUploadType {
      label: string;
      value: TUploadType;
      accept?: string[];
  }
  export type AcceptedFileType = '.psd' | '.sketch' | '.png' | '.jpg' | '.jpeg' | '.svg';
  export enum EImageTemplateType {
      /**
       * 固定尺寸
       */ Fixed = "FIXED",
      /**
       * 多尺寸
       */
      Multiple = "MULTIPLE",
      /**
       * 长图
       */
      Splice = "SPLICE"
  }
  /**
   * 设计稿模板解析结果
   * P.S. 保持原有的数据结构
   */
  export type TemplateUploadResult = {
      uid: string;
      name: string;
      size: number;
      data: LingParsedData | LingDesignData;
      uploadType?: TUploadType;
  };
  export interface TemplateItem {
      uid: string;
      file: RcFile;
      /**
       * 模块预览图
       */
      cover?: string;
      /**
       * 设计稿解析状态
       */
      status: 'pending' | 'success' | 'error';
      /**
       * 设计稿解析后的原始数据
       */
      parsedData?: LingParsedData;
      /**
       * 错误信息
       */
      errMsg?: string;
      /**
       * 没有logo和商品图层
       */
      noLogoGoods?: boolean;
      hashMap?: {
          [hash: string]: string;
      };
      uploadType?: TUploadType;
  }
  export type TemplateUploadProps = {
      /**
       * 支持的文件类型, .psd,.sketch
       */
      accept: AcceptedFileType | AcceptedFileType[];
      /**
       * 是否支持多选文件
       */
      multiple?: boolean;
      /**
       * 单文件支持的最大尺寸，单位为 MB
       */
      maxSize?: number;
      /**
       * 限制上传数量
       */
      maxCount?: number;
      /**
       * 专区 ID
       * P.S. 如果传入专区 ID，则会触发字体映射逻辑
       */
      zoneID?: string;
      /**
       * 点击「完成」按钮触发回调
       */
      onFinish?: (templates: TemplateUploadResult[], templateType: EImageTemplateType) => void;
      /**
       * 点击「取消」按钮触发回调
       */
      onCancel?: (templates: TemplateUploadResult[], templateType: EImageTemplateType) => void;
      /**
       * 点击删除按钮
       */
      onDelete?: (template: TemplateItem) => void;
      /**
       * 解析完成回调
       */
      onParseFinish?: () => void;
      /**
       * 标记完成回调
       */
      onMarkFinish?: () => void;
      /**
       * 解析失败
       */
      onFailed?: (file: RcFile, msg: string) => void;
      /**
       * 上传左侧提示
       */
      tips?: React.ReactNode;
      /**
       * 是否需要类型选择
       */
      showUploadType?: boolean;
      /**
       * 弹窗/页面形式
       */
      type?: 'modal' | 'page' | 'content';
      /**
       * 模板类型
       */
      templateType?: EImageTemplateType;
      setTemplateType?: React.Dispatch<React.SetStateAction<EImageTemplateType>>;
      /**
       * 确认按钮文案
       */
      okText?: string;
      /**
       * 取消按钮文案
       */
      cancelText?: string;
      /**
       * 上传文件类型，模板 | 稿件
       */
      sourceType?: 'template' | 'design';
      /**
       * 上传弹窗是否显示
       */
      modalVisible?: boolean;
      /**
       * 关闭弹窗
       */
      closeModal?: () => void;
      /**
       * 是否展示左侧tips
       */
      showTips?: boolean;
      /**
       * 自定义内容
       */
      slot?: React.ReactNode;
      /**
       * 弹窗modalTitle
       */
      modalTitle?: string;
      /**
       * 隐藏取消按钮
       */
      hiddenCancelButton?: boolean;
      /**
       * 隐藏预览图
       */
      hidePreview?: boolean;
      /**
       * 小尺寸样式
       */
      isSmallSize?: boolean;
      /**
       * 隐藏打标
       */
      hideMark?: boolean;
      /**
       * 是否展示类型选择
       */
      showUploadTypeSelector?: boolean;
  };
}
declare module "ling_biz/components/multiple-upload/constants" {
  import { AcceptedFileType, EImageTemplateType } from "ling_biz/components/multiple-upload/type";
  export const AcceptedFileTypeName: {
      [key in AcceptedFileType]: string;
  };
  export const radiosType: ({
      label: string;
      value: EImageTemplateType;
      text: string;
      image: string;
      maxCount?: undefined;
  } | {
      maxCount: number;
      label: string;
      value: EImageTemplateType;
      text: string;
      image: string;
  })[];
  /**
   * 图片 & 视频图层通用类型
   */
  export const LayerType: {
      readonly Text: "text";
      readonly Pattern: "pattern";
      readonly Label: "label";
      readonly Background: "background";
      readonly Goods: "goods";
      readonly Mask: "mask";
      readonly Group: "group";
      readonly Normal: "normal";
      readonly Widget: "widget";
      readonly Logo: "logo";
      readonly JDTag: "jdTag";
      readonly QRcode: "qrcode";
      readonly Button: "button";
      readonly Effect: "effect";
      readonly Selection: "selection";
      readonly PileUp: "pileup";
      readonly Vector: "vector";
      readonly WaterMark: "watermark";
      readonly Rule: "rule";
      readonly Media: "media";
      readonly Audio: "audio";
      readonly Canvas: "canvas";
  };
  export const LayerName: {
      readonly text: "文案";
      readonly pattern: "装饰";
      readonly label: "标签";
      readonly background: "背景";
      readonly goods: "商品";
      readonly mask: "图片";
      readonly group: "编组";
      readonly normal: "图片";
      readonly logo: "LOGO";
      readonly qrcode: "二维码";
      readonly widget: "挂件";
      readonly jdTag: "标识";
      readonly pileup: "堆品";
      readonly vector: "图形";
      readonly rule: "规范检测区";
      readonly media: "动态装饰";
      readonly audio: "音频";
  };
}
declare module "ling_biz/components/multiple-upload/designUtils" {
  export interface ICardInfo {
      width: number;
      height: number;
      name: string;
      hash: string;
      imgElement?: HTMLElement;
      base64?: string;
      jfsUrl?: string;
  }
  /**
   * 简易版压缩图片
   * @param file File 对象
   * @param maxRenderPX 最大渲染像素
   * @param quality 渲染质量
   */
  export function compressorImage(args: {
      imgElement: HTMLImageElement;
      maxRenderPX?: number;
      quality?: number;
  }): HTMLCanvasElement | HTMLImageElement;
  /**
   * 获取图片信息
   * @param file File
   * @returns
   */
  export function getImageInfo(file: File | Blob): Promise<ICardInfo>;
  /**
   * 读取 url 并转换为 Blob/ File 文件
   * @param url 图片 URL
   * @returns
   */
  export function fetchURLToBlob(url: string, useFile?: boolean): Promise<Blob | File>;
}
declare module "ling_biz/components/multiple-upload/utils" {
  import type { LingTreeNode } from '@ling-design/sdk';
  import { IUploadType, TemplateUploadResult } from "ling_biz/components/multiple-upload/type";
  interface MarkerOption {
      name: string;
      value: string;
  }
  export const uploadTypes: IUploadType[];
  export function getLayerMarkerSelectOptions(type: string): MarkerOption[];
  export function amendLayerTree(tree: LingTreeNode[]): void;
  /**
   *
   * 模板解析接口入参
   */
  export const templateFormatParam: (e: TemplateUploadResult[]) => {
      templateType: string;
      coverWidth: any;
      coverHeight: any;
      coverUrl: any;
      parseResults: {
          fileName: string;
          previewImage: string;
          tree: any;
          variantMap: string;
          size: {
              width: number;
              height: number;
          };
      }[];
  };
  export function designFormatParam(e: TemplateUploadResult[]): {
      name: string;
      coverWidth: number;
      coverHeight: number;
      coverUrl: string;
      jsonData: string;
      hashMap: any;
  }[];
  /**
   * 速度：
   * 10000000 次循环 3.8 秒
   * 1000000 次循环 0.5 秒
   *
   * 注：即使是 10000000 次循环，出现重复ID的次数也几乎为零
   */
  export function getRandomId(): string;
  export function getRandomVariantMapKey(): string;
}
declare module "ling_biz/components/multiple-upload/designParser" {
  /**
   * 设计稿客户端解析
   * TODO: 改为 Web Worker
   */
  import { ConverterOptions, LingDesignData, LingParsedData } from '@ling-design/sdk';
  export function designParse(file: Blob | ArrayBuffer, options?: ConverterOptions): Promise<LingParsedData | LingDesignData>;
  /**
   * 处理解析数据中的图片
   * @param docSchema 解析 sketch 数据
   */
  export function handleDocumentImages(docSchema: any): Promise<{
      doc: any;
      hashMap: {
          [hash: string]: string;
      };
  }>;
}
declare module "ling_biz/components/multiple-upload/store" {
  import { TemplateItem } from "ling_biz/components/multiple-upload/type";
  interface UploaderState {
      templateList: TemplateItem[];
      resetTemplates: () => void;
      addTemplate: (template: TemplateItem) => void;
      getTemplateById: (id: string) => TemplateItem;
      removeTemplateById: (id: string) => void;
      updateTemplateById: (id: string, data: any) => void;
      updateLayerItemById: (templateId: string, layerKey: number, data: any) => void;
  }
  export const useStore: import("zustand").UseBoundStore<import("zustand").StoreApi<UploaderState>>;
}
declare module "ling_biz/components/multiple-upload/MarkTreeListItem" {
  import type { LingTreeNode } from '@ling-design/sdk';
  import { TemplateItem, TemplateUploadProps } from "ling_biz/components/multiple-upload/type";
  interface MarkTreeListItemProps {
      data: TemplateItem;
      onMarkFinish?: TemplateUploadProps['onMarkFinish'];
  }
  /**
   * 获取可标记的图层列表
   * @param tree 扁平化的图层树结构
   */
  export function generateMarkerLayers(tree: LingTreeNode[]): LingTreeNode[];
  export default function MarkTreeListItem(options: MarkTreeListItemProps): JSX.Element;
}
declare module "ling_biz/components/multiple-upload/parser" {
  /**
   * 设计稿客户端解析
   * TODO: 改为 Web Worker
   */
  import type { ConverterOptions, LingDesignData } from '@ling-design/sdk';
  import { LingParsedData } from '@ling-design/sdk';
  export function templateParse(file: Blob | ArrayBuffer, options?: ConverterOptions): Promise<LingParsedData | LingDesignData>;
}
declare module "ling_biz/components/multiple-upload/Progress/FakeProgress" {
  /**
   * Fake Progress
   * https://github.com/piercus/fake-progress
   */
  interface FakeProgressProps {
      /**
       * https://en.wikipedia.org/wiki/Time_constant
       */
      timeConstant?: number;
      /**
       * 是否自动启动
       */
      autoStart?: boolean;
  }
  export default class FakeProgress {
      timeConstant: number;
      progress: number;
      autoStart: boolean;
      _intervalFrequency: number;
      private _intervalId;
      _time: number;
      constructor(opts?: FakeProgressProps);
      start(): void;
      end(): void;
      stop(): void;
      setProgress(progress: number): void;
      _onInterval(): void;
  }
}
declare module "ling_biz/components/multiple-upload/Progress" {
  interface ProgressProps {
      status: 'success' | 'error' | 'pending';
      onChange?: (percent: number) => void;
  }
  export default function Progress(options: ProgressProps): JSX.Element;
}
declare module "ling_biz/components/multiple-upload/UploaderItem" {
  import { UploadFile } from 'antd/lib/upload/interface';
  import { TemplateItem, TemplateUploadProps } from "ling_biz/components/multiple-upload/type";
  interface UploaderItemProps {
      data: TemplateItem;
      file: UploadFile;
      onDelete?: () => void;
      hideMark?: boolean;
      hidePreview?: boolean;
      isSmallSize?: boolean;
      onMarkFinish?: TemplateUploadProps['onMarkFinish'];
      showUploadTypeSelector?: boolean;
      onUploadTypeChange?: (value: string) => void;
  }
  export default function UploaderItem(params: UploaderItemProps): JSX.Element;
}
declare module "ling_biz/components/multiple-upload/StepUpload" {
  import { RcFile } from 'antd/lib/upload/interface';
  import { AcceptedFileType, TemplateItem, TemplateUploadProps } from "ling_biz/components/multiple-upload/type";
  interface StepUploadProps {
      className?: string;
      accept: AcceptedFileType | AcceptedFileType[];
      action: string;
      multiple: boolean;
      maxSize: number;
      maxCount?: number;
      onUploadBefore?: (file: RcFile) => void;
      hideMark?: boolean;
      hidePreview?: boolean;
      isSmallSize?: boolean;
      onDelete?: (template: TemplateItem) => void;
      onMarkFinish?: TemplateUploadProps['onMarkFinish'];
      showUploadTypeSelector?: boolean;
  }
  export default function StepUpload(options: StepUploadProps): JSX.Element;
}
declare module "ling_biz/components/multiple-upload/Tips" {
  export default function Tips(): JSX.Element;
}
declare module "ling_biz/components/multiple-upload/multiple-upload" {
  import { TemplateUploadProps, TemplateUploadResult } from "ling_biz/components/multiple-upload/type";
  import { designFormatParam, templateFormatParam } from "ling_biz/components/multiple-upload/utils";
  export type { TemplateUploadResult };
  export { designFormatParam, templateFormatParam };
  function TemplateUpload(props: TemplateUploadProps): JSX.Element;
  export default TemplateUpload;
}
declare module "ling_biz/MultipleUpload" {
  import MultipleUpload, { templateFormatParam, designFormatParam } from "ling_biz/components/multiple-upload/multiple-upload";
  import { TemplateUploadProps, TemplateUploadResult } from "ling_biz/components/multiple-upload/type";
  export { TemplateUploadProps, TemplateUploadResult, templateFormatParam, designFormatParam };
  export default MultipleUpload;
}
declare module "ling_biz/components/sidebar/type" {
  export interface ISidebarItem {
      key: string;
      title: string | JSX.Element;
      /**
       * 标题是否需要换行
       */
      titleWrap?: boolean;
      Icon: JSX.Element;
      Content?: JSX.Element;
      children?: ISidebarItem[];
      link?: string;
      openNewWindow?: boolean;
  }
  export interface ISidebarProps {
      items: ISidebarItem[];
      activeKey: string;
      onChange: (e: string) => void;
      onChildrenClick: (activeKey: string, childrenKey: string, openNewWindow?: boolean) => void;
      preloadPage?: (e: string) => void;
  }
}
declare module "ling_biz/components/sidebar/utils" {
  export function isSidebarActive(link: any): any;
}
declare module "ling_biz/components/sidebar/sidebar" {
  import './index.scss';
  import React from 'react';
  import { ISidebarProps } from "ling_biz/components/sidebar/type";
  const Sidebar: React.FC<ISidebarProps>;
  export default Sidebar;
}
declare module "ling_biz/Sidebar" {
  import Sidebar from "ling_biz/components/sidebar/sidebar";
  export default Sidebar;
}
declare module "ling_biz/components/rotate-form/type" {
  export interface IRotateItem {
      rotate: number;
      x: number;
      y: number;
  }
  export interface IRotate {
      leftTop?: IRotateItem;
      top?: IRotateItem;
      rightTop?: IRotateItem;
      left?: IRotateItem;
      middle?: IRotateItem;
      right?: IRotateItem;
      leftBottom?: IRotateItem;
      bottom?: IRotateItem;
      rightBottom?: IRotateItem;
      mirror?: boolean;
  }
}
declare module "ling_biz/components/rotate-form/const" {
  import { IRotate } from "ling_biz/components/rotate-form/type";
  export interface IConfigItemStyle {
      left: string | number;
      top: string | number;
  }
  export interface IConfigItem {
      title: string;
      key: keyof Omit<IRotate, 'mirror'>;
      style: IConfigItemStyle;
  }
  export const config: IConfigItem[];
  export const defaultOption: {
      rotate: number;
      x: number;
      y: number;
  };
  export const rightArr: ("bottom" | "left" | "right" | "top" | "middle" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom")[];
  export const leftArr: ("bottom" | "left" | "right" | "top" | "middle" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom")[];
}
declare module "ling_biz/components/rotate-form/input-rotate" {
  import React from 'react';
  interface IRotateItem {
      rotate: number;
      x: number;
      y: number;
  }
  interface IProps {
      value: IRotateItem;
      onChange: (e: IRotateItem) => void;
      disabled: boolean;
  }
  const Index: React.FC<IProps>;
  export default Index;
}
declare module "ling_biz/components/rotate-form/rotate-img" {
  import { IRotate } from "ling_biz/components/rotate-form/type";
  interface IProps {
      value: IRotate | null;
      coverUrl: string;
  }
  const Index: React.FC<IProps>;
  export default Index;
}
declare module "ling_biz/components/rotate-form/utils" {
  import { IRotate } from "ling_biz/components/rotate-form/type";
  export function getMirrorRightOptions(options: IRotate): Partial<IRotate>;
  export function getMirrorOptions(options: IRotate): any;
}
declare module "ling_biz/components/rotate-form/rotate-form" {
  import React from 'react';
  import { IRotate } from "ling_biz/components/rotate-form/type";
  export interface IRotatoFormProps {
      coverUrl: string;
      value: IRotate;
      onChange: (e: IRotate) => void;
  }
  const RotatoForm: React.FC<IRotatoFormProps>;
  export default RotatoForm;
}
declare module "ling_biz/RotateForm" {
  import RotatoForm, { IRotatoFormProps } from "ling_biz/components/rotate-form/rotate-form";
  import { IRotate } from "ling_biz/components/rotate-form/type";
  export { IRotate, IRotatoFormProps };
  export default RotatoForm;
}
declare module "ling_biz/components/card-hover/card-hover" {
  import './index.scss';
  import React from 'react';
  export interface ICardHoverProps {
      style?: Record<string, unknown>;
      items: {
          key?: string;
          title: string;
          onClick?: (key?: string) => void;
          renderButton?: React.ReactNode;
      }[];
  }
  const CardHover: React.FC<ICardHoverProps>;
  export default CardHover;
}
declare module "ling_biz/CardHover" {
  import CardHover, { ICardHoverProps } from "ling_biz/components/card-hover/card-hover";
  export { ICardHoverProps };
  export default CardHover;
}
declare module "ling_biz/components/btn-arrow/btn-arrow" {
  import React from 'react';
  export interface IBtnArrowProps {
      className?: string;
      onClick: (e: any) => void;
      btnText?: string;
      arrow?: 'left' | 'right';
  }
  const BtnArrow: React.FC<IBtnArrowProps>;
  export default BtnArrow;
}
declare module "ling_biz/BtnArrow" {
  import BtnArrow, { IBtnArrowProps } from "ling_biz/components/btn-arrow/btn-arrow";
  export { IBtnArrowProps };
  export default BtnArrow;
}
declare module "ling_biz/components/checkbox-card/checkbox-card" {
  import './index.scss';
  import { CheckboxProps } from 'ling_core/Components';
  export default function CheckboxCard(props: CheckboxProps): JSX.Element;
}
declare module "ling_biz/CheckboxCard" {
  import CheckboxCard from "ling_biz/components/checkbox-card/checkbox-card";
  export default CheckboxCard;
}
declare module "ling_biz/components/radio-card/radio-card" {
  import './index.scss';
  import { RadioProps } from 'ling_core/Components';
  export default function RadioCard(props: RadioProps): JSX.Element;
}
declare module "ling_biz/RadioCard" {
  import RadioCard from "ling_biz/components/radio-card/radio-card";
  export default RadioCard;
}
declare module "ling_biz/components/size-custom/size-setting" {
  import React from 'react';
  interface IProps {
      width: number | undefined;
      height: number | undefined;
      setWidth: React.Dispatch<React.SetStateAction<number | undefined>>;
      setHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
      min?: number;
      max?: number;
      clear?: boolean;
  }
  function SizeSetting(props: IProps): JSX.Element;
  const _default_1: React.MemoExoticComponent<typeof SizeSetting>;
  export default _default_1;
}
declare module "ling_biz/components/size-custom/size-custom" {
  import './index.scss';
  import { ISizeObject } from '@ling-design/service';
  import React from 'react';
  export interface SizeCustomProps {
      onFinish: (e: {
          width: number;
          height: number;
      }) => void;
      min?: number;
      max?: number;
      className?: string;
      disabled?: boolean;
      value?: ISizeObject | null;
      showTips?: boolean;
  }
  export const PREVIEW_SIZE_LIMIT: {
      min: number;
      max: number;
  };
  const SizeCustom: React.FC<SizeCustomProps>;
  export default SizeCustom;
}
declare module "ling_biz/SizeCustom" {
  import SizeCustom, { SizeCustomProps } from "ling_biz/components/size-custom/size-custom";
  export { SizeCustomProps };
  export default SizeCustom;
}
declare module "ling_biz/components/media-center-modal/media-center-modal" {
  import './index.scss';
  import { ButtonProps } from 'ling_core/Components';
  import React from 'react';
  export interface MediaCenterModalProps {
      onChange: (value: string, data: any) => void;
      panels?: string;
      modalTitle?: string;
      className?: string;
      buttonText?: string;
      buttonIcon?: JSX.Element;
      buttonProps?: ButtonProps;
      renderButton?: JSX.Element;
  }
  const MediaCenterModal: React.FC<MediaCenterModalProps>;
  export default MediaCenterModal;
}
declare module "ling_biz/MediaCenterModal" {
  import MediaCenterModal, { MediaCenterModalProps } from "ling_biz/components/media-center-modal/media-center-modal";
  export { MediaCenterModalProps };
  export default MediaCenterModal;
}
declare module "ling_biz/components/size-select/type" {
  export type SizeItem = {
      _id?: string;
      name: string;
      width: number;
      height: number;
      checked?: boolean;
      groupName?: string;
  };
  export type SizeItemList = SizeItem[];
  export type SizeGroup = {
      id: string;
      name: string;
      sizes: {
          name: string;
          width: number;
          height: number;
          checked?: boolean;
          groupName?: string;
      }[];
      type?: string;
      label?: string;
      showSubList?: boolean;
  };
  export type SizeGroupList = SizeGroup[];
  export type TabValue = 'MY' | 'ZONE';
  export type SizeClassify = {
      key: TabValue;
      name: string;
  };
}
declare module "ling_biz/components/size-select/constant" {
  import { SizeClassify } from "ling_biz/components/size-select/type";
  export const CREATE_OR_MODIFY_SIZE_MODAL_TITLE: {
      create: string;
      modify: string;
  };
  export const DEFAULT_MAX_VALUE = 10000;
  export const DEFAULT_MIN_VALUE = 50;
  export const DEFAULT_MAX_SIZE_NUM = 100;
  export const SIZE_GROUP_NAME_MAX_LENGTH = 60;
  export const SIZE_TEXTAREA_PLACEHOLDER = "\u683C\u5F0F\u4E3A\uFF1A\u4F4D\u7F6E\u540D \u5BBD \u9AD8\uFF08\u4E2D\u95F4\u7528\u7A7A\u683C\u533A\u9694\uFF0C\u4F4D\u7F6E\u540D\u53EF\u4E0D\u586B\u5199\uFF09\uFF0C\u591A\u4E2A\u5C3A\u5BF8\u7528\u6362\u884C\u533A\u5206\u3002";
  export const SIZE_SHOW_MODE_CONFIG: {
      custom: {
          source: string;
          editable: boolean;
          setList: string;
      };
      zone: {
          source: string;
          editable: boolean;
          setList: string;
      };
      ling: {
          source: string;
          editable: boolean;
          setList: string;
      };
  };
  export const EXCEEDS_MAX_MUN_WARM = "\u5F53\u524D\u5269\u4F59\u53EF\u9009\u6570\u91CF\u5C0F\u4E8E\u6574\u7EC4\u6570\u91CF\uFF0C\u8BF7\u81EA\u884C\u52FE\u9009";
  export const LastOpenZoneCode = "ling_size_select_zone_code";
  export const LastOpenZoneCodeInZone = "ling_size_select_zone_code_in_zone";
  /**
   * @deprecated
   * 作用同 LastOpenZoneCode，请使用LastOpenZoneCode代替
   */
  export const LastOpenZoneId = "ling_size_select_zone_code";
  export const SIZE_ENTRY_PARAMS: {
      type: string;
      placeholder: string;
      prefix: string;
      suffix: string;
  }[];
  export enum ESizeClassify {
      My = "MY",
      Zone = "ZONE"
  }
  export const SIZE_CLASSIFY: SizeClassify[];
  export const SIZE_CLASSIFY_REPORT: {
      [key in ESizeClassify]: string;
  };
}
declare module "ling_biz/components/size-select/help" {
  import { SizeGroup, SizeGroupList, SizeItem, SizeItemList } from "ling_biz/components/size-select/type";
  export function getSelectedTotal(sizeGroupList: SizeGroupList): any;
  export function getChooseSizeItemNum(sizeItemList: SizeItemList): any;
  export function generateSizeItemListFromSizesValueStr(sizesValue: string): SizeItemList;
  export const isValidSizes: (sizeItemList: SizeItemList, maxValue: number, minValue: number) => boolean;
  export const isValidSizeItem: (sizeItem: SizeItem, maxValue: number, minValue: number) => boolean;
  export const parseSizes: (editingData: SizeGroup) => string;
  export const checkedAll: (sizeGroup: SizeGroup, sizeMaxValue: number, sizeMinValue: number) => void;
  export const unChooseAll: (sizeGroup: SizeGroup) => void;
  export const getValidSubSizeNum: (sizeGroup: SizeGroup, maxValue: number, minValue: any) => any;
  export function isDevCps(zoneCode: string): boolean;
  export function getSelectedSizes({ lingSource, zoneSource, customSource, }: {
      lingSource: SizeGroupList;
      zoneSource: SizeGroupList;
      customSource: SizeItem;
  }): SizeItem[];
}
declare module "ling_biz/components/size-select/store/lingStore" {
  import { SizeGroupList } from "ling_biz/components/size-select/type";
  interface LingState {
      lingSource: SizeGroupList;
      updateLingSource: (lingSource: SizeGroupList) => void;
  }
  export const useLingStore: import("zustand").UseBoundStore<import("zustand").StoreApi<LingState>>;
}
declare module "ling_biz/components/size-select/store/customStore" {
  import { SizeItem } from "ling_biz/components/size-select/type";
  export const initCustomSource: {
      name: string;
      width: number;
      height: number;
      checked: boolean;
  };
  interface CustomState {
      customSource: SizeItem;
      updateCustomSource: (customSource: SizeItem) => void;
  }
  export const useCustomStore: import("zustand").UseBoundStore<import("zustand").StoreApi<CustomState>>;
}
declare module "ling_biz/components/size-select/store/changeStore" {
  interface ChangeState {
      selectedTotal: number;
      updateSelectedTotal: (selectedTotal: number) => void;
  }
  export const useChangeStore: import("zustand").UseBoundStore<import("zustand").StoreApi<ChangeState>>;
}
declare module "ling_biz/components/size-select/components/SizeGroup/SubSize" {
  import { SizeItem } from "ling_biz/components/size-select/type";
  interface SubSizeProps {
      item: SizeItem;
      onClick: (target: any, sizeIndex: number) => void;
      index: number;
      sizeMaxValue?: number;
      sizeMinValue?: number;
      max?: number;
  }
  export default function SubSize(props: SubSizeProps): JSX.Element;
}
declare module "ling_biz/components/size-select/components/SizeGroup" {
  import { SizeSelectProps } from "ling_biz/components/size-select/size-select";
  import { SizeGroup as ISizeGroup, SizeGroupList, TabValue } from "ling_biz/components/size-select/type";
  interface Props extends SizeSelectProps {
      mode: TabValue;
      sizeGroupConfig: ISizeGroup;
      index: string;
      defaultShowSub?: boolean;
      source: SizeGroupList;
      updateSource: (source: SizeGroupList) => void;
  }
  export default function SizeGroup(props: Props): JSX.Element;
}
declare module "ling_biz/components/size-select/components/TabContiner/Content" {
  import './index.scss';
  import { SizeSelectProps } from "ling_biz/components/size-select/size-select";
  import { SizeGroupList, TabValue } from "ling_biz/components/size-select/type";
  interface Props extends SizeSelectProps {
      mode: TabValue;
      sizeGroup: SizeGroupList;
      updateSource: (source: SizeGroupList) => void;
  }
  export default function Content(props: Props): JSX.Element;
}
declare module "ling_biz/components/size-select/components/TabContiner/CustomAndLingSizes/Custom" {
  export default function Custom(): JSX.Element;
}
declare module "ling_biz/components/size-select/components/TabContiner/CustomAndLingSizes" {
  import { SizeSelectProps } from "ling_biz/components/size-select/size-select";
  export default function CustomAndLingSizes(props: SizeSelectProps): JSX.Element;
}
declare module "ling_biz/components/size-select/store/zoneStore" {
  import { SizeGroupList } from "ling_biz/components/size-select/type";
  interface ZoneState {
      zoneSource: SizeGroupList;
      updateZoneSource: (zoneSource: SizeGroupList) => void;
  }
  export const useZoneStore: import("zustand").UseBoundStore<import("zustand").StoreApi<ZoneState>>;
}
declare module "ling_biz/components/size-select/components/TabContiner/ZoneSizes" {
  import { SizeSelectProps } from "ling_biz/components/size-select/size-select";
  export default function ZoneSizes(props: SizeSelectProps): JSX.Element;
}
declare module "ling_biz/components/size-select/size-select" {
  import './size-select.scss';
  import React from 'react';
  import { ESizeClassify } from "ling_biz/components/size-select/constant";
  import { SizeItem } from "ling_biz/components/size-select/type";
  export interface SizeSelectProps {
      /**
       * 组件最外层元素类名
       */
      className?: string;
      /**
       * 组件最外层元素样式
       */
      style?: Record<string, unknown>;
      /**
       * 允许选择的尺寸的宽高最大值
       * @default 12000
       */
      sizeMaxValue?: number;
      /**
       * 允许选择的尺寸的宽高最小值
       * @default 50
       */
      sizeMinValue?: number;
      /**
       * 允许选择最多的尺寸数目
       * @default 100
       */
      max?: number;
      /**
       * 当选择发生改变时会触发的回调函数
       */
      onChange?: (sizes: SizeItem[]) => void;
      /**
       * 是否展示表单的尺寸建议文案
       * @default false
       */
      showTips?: boolean;
      /**
       * 是否展示自定义尺寸
       * @default true
       */
      showCustomSize?: boolean;
      /**
       * 切换专区回调函数
       */
      onZoneChange?: (code: string) => void;
      /**
       * 埋点上报
       */
      logReport?: (event: string) => void;
      /**
       * 清空选中
       */
      clear?: boolean;
      /**
       * 专区选择下拉框是否可见
       */
      zoneDropdownVisible?: boolean;
      /**
       * 专区选择下拉框回调函数
       */
      onZoneDropdownVisibleChange?: (zoneDropdownVisible: boolean) => void;
      /**
       * tab选项
       * @default MY
       */
      defaultTabValue?: ESizeClassify;
      /**
       * 专区Code
       */
      zoneCode?: string;
      /**
       * 是否默认展开尺寸组
       * @default true
       */
      defaultShowSub?: boolean;
  }
  export const SizeSelect: React.FC<SizeSelectProps>;
  export default SizeSelect;
}
declare module "ling_biz/SizeSelect" {
  import { ESizeClassify } from "ling_biz/components/size-select/constant";
  import { isDevCps } from "ling_biz/components/size-select/help";
  import SizeSelect, { SizeSelectProps } from "ling_biz/components/size-select/size-select";
  import { SizeItem } from "ling_biz/components/size-select/type";
  export { ESizeClassify, isDevCps, SizeItem, SizeSelectProps };
  export default SizeSelect;
}
declare module "ling_biz/components/size-group/constant" {
  import { SizeItem } from "ling_biz/SizeSelect";
  export const SIZES_PRESET: SizeItem[];
}
declare module "ling_biz/components/size-form/size-form" {
  import './index.scss';
  import { SizeItem } from "ling_biz/SizeSelect";
  export const initCustomSize: {
      name: string;
      checked: boolean;
      width: number;
      height: number;
  };
  export interface SizeFormProps {
      options: SizeItem[];
      onChange: (e: SizeItem[]) => void;
      min?: number;
      max?: number;
      className?: string;
  }
  export const PREVIEW_SIZE_LIMIT: {
      min: number;
      max: number;
  };
  export default function SizeForm(props: SizeFormProps): JSX.Element;
}
declare module "ling_biz/SizeForm" {
  import { SIZES_PRESET } from "ling_biz/components/size-group/constant";
  import SizeForm, { initCustomSize, SizeFormProps } from "ling_biz/components/size-form/size-form";
  export { initCustomSize, SizeFormProps, SIZES_PRESET };
  export default SizeForm;
}
declare module "ling_biz/components/size-group/size-group" {
  import './index.scss';
  import React from 'react';
  import { SizeItem } from "ling_biz/SizeSelect";
  export interface SizeGroupProps {
      className?: string;
      options?: SizeItem[];
      onChange: (sizeItem: SizeItem[]) => void;
      maxLength?: number;
  }
  function SizeGroup(props: SizeGroupProps): JSX.Element;
  const _default_2: React.MemoExoticComponent<typeof SizeGroup>;
  export default _default_2;
}
declare module "ling_biz/SizeGroup" {
  import SizeGroup, { SizeGroupProps } from "ling_biz/components/size-group/size-group";
  export { SizeGroupProps };
  export default SizeGroup;
}
declare module "ling_biz/components/tag-select/constant" {
  export enum ETagSelectType {
      null = "null",
      zone = "zone",
      mine = "mine"
  }
  export const TypeTitleMap: {
      null: string;
      zone: string;
      mine: string;
  };
  export enum Placement {
      lt = "TOP_LEFT",
      rt = "TOP_RIGHT",
      rb = "BOTTOM_RIGHT",
      lb = "BOTTOM_LEFT"
  }
  export type TPlacement = 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_RIGHT' | 'BOTTOM_LEFT';
  export const PlacementTitleMap: {
      TOP_LEFT: string;
      TOP_RIGHT: string;
      BOTTOM_RIGHT: string;
      BOTTOM_LEFT: string;
  };
  export const positionTitleMap: {
      left: string;
      right: string;
      bottom: string;
      top: string;
  };
  export const pageSize = 9;
}
declare module "ling_biz/components/tag-select/type" {
  import { ICanvasStandard } from '@ling-design/service';
  export interface TagItem {
      id: string;
      name: string;
      cover: string;
      width: number;
      height: number;
      canvasStandard: ICanvasStandard;
  }
}
declare module "ling_biz/components/tag-select/CanvasStandardForm/TagCoordinate" {
  export interface ICoodinate {
      bottom?: number;
      left?: number;
      right?: number;
      top?: number;
  }
  interface IProps {
      value: ICoodinate;
      keys: (keyof ICoodinate)[];
      onChange: (e: ICoodinate) => void;
      disabled?: boolean;
  }
  export default function TagCoordinate(props: IProps): JSX.Element;
}
declare module "ling_biz/components/tag-select/utils" {
  import { ISizeObject, IXSizeSizeItem, TBrandPosition } from '@ling-design/service';
  import { ICoodinate } from "ling_biz/components/tag-select/CanvasStandardForm/TagCoordinate";
  import { Placement } from "ling_biz/components/tag-select/constant";
  import { TagItem } from "ling_biz/components/tag-select/type";
  export function getPositionKeys(value: TBrandPosition): (keyof ICoodinate)[];
  export const initialCanvasStandard: {
      restrictPosition: boolean;
      restrictSize: boolean;
      position: Placement;
      width: number;
      height: number;
      bottom: number;
      left: number;
      right: number;
      top: number;
  };
  export const initialTag: TagItem;
  export function TagData2ApiData(size: ISizeObject, tag: TagItem | null): IXSizeSizeItem;
}
declare module "ling_biz/components/tag-select/CanvasStandardForm/TagPlacement" {
  import { TPlacement } from "ling_biz/components/tag-select/constant";
  interface IProps {
      value: TPlacement;
      disabled?: boolean;
      onChange: (e: TPlacement) => void;
  }
  export default function TagPlacement(props: IProps): JSX.Element;
}
declare module "ling_biz/components/input-size/input-size" {
  import React from 'react';
  interface Size {
      width: number | undefined;
      height: number | undefined;
  }
  export type InputSizeValue = Size & {
      lockAspectRatio: boolean;
  };
  export interface InputSizeProps {
      value: InputSizeValue;
      style?: React.CSSProperties;
      /**
       * 是否禁用
       */
      disabled?: boolean;
      /**
       * 宽度说明文字
       */
      suffixW?: string;
      /**
       * 高度说明文字
       */
      suffixH?: string;
      onChange?: (variant: InputSizeValue) => void;
      onFinish?: (value: number) => void;
  }
  export default function InputSize(props: InputSizeProps): JSX.Element;
}
declare module "ling_biz/components/input-size" {
  import InputSize, { InputSizeValue } from "ling_biz/components/input-size/input-size";
  export { InputSizeValue };
  export default InputSize;
}
declare module "ling_biz/components/tag-select/CanvasStandardForm" {
  import { TagItem } from "ling_biz/components/tag-select/type";
  interface IProps {
      value: TagItem;
      onChange: (e: TagItem) => void;
  }
  export default function CanvasStandardForm(props: IProps): JSX.Element;
}
declare module "ling_biz/components/tag-select/MyMaterial/const" {
  export const LastOpenMaterial = "ling_last_open_material";
}
declare module "ling_biz/components/tag-select/MyMaterial/utils" {
  export function uploadImage2(file: Blob, fileName?: string): Promise<[string | null, string | null]>;
  export function uploadSvgFile(file: Blob, fileName?: string): Promise<[string | null, string | null]>;
  /**
   * 上传图片到用户素材目录，得到上传后的jfs地址
   */
  export function uploadImageToMaterialFolder(folderId: string, imageList: any): Promise<IElementMaterial>;
}
declare module "ling_biz/components/tag-select/MyMaterial/UploadButton" {
  interface IProps {
      onFinish: () => void;
      individualTag: string;
  }
  export default function UploadButton(props: IProps): JSX.Element;
}
declare module "ling_biz/components/tag-select/MyMaterial" {
  import { TagItem } from "ling_biz/components/tag-select/type";
  interface IProps {
      logReport?: (e: string) => void;
      value: TagItem | null;
      onChange: (e: TagItem | null) => void;
  }
  export default function MyMaterial(props: IProps): JSX.Element;
}
declare module "ling_biz/components/tag-select/ZoneLogo/const" {
  export const LastOpenZoneCode = "ling_tag_select_zone_code";
}
declare module "ling_biz/components/tag-select/ZoneLogo/utils" {
  import { IBrandLogo } from '@ling-design/service';
  export function logo2Tag(logo: IBrandLogo): {
      id: string;
      cover: string;
      name: string;
      width: number;
      height: number;
      canvasStandard: any;
  };
  export function isDevCps(zoneCode: string): boolean;
}
declare module "ling_biz/components/tag-select/ZoneLogo" {
  import { TagItem } from "ling_biz/components/tag-select/type";
  interface IProps {
      logReport?: (e: string) => void;
      value: TagItem | null;
      onChange: (e: TagItem | null) => void;
      /**
       * 默认专区Code
       */
      zoneCode?: string;
  }
  export default function ZoneLogo(props: IProps): JSX.Element;
}
declare module "ling_biz/components/tag-select/tag-select" {
  import './index.scss';
  import { ETagSelectType } from "ling_biz/components/tag-select/constant";
  import { TagItem } from "ling_biz/components/tag-select/type";
  export interface TagSelectProps {
      value: TagItem | null;
      onChange: (e: TagItem | null) => void;
      logReport?: (log: string) => void;
      /**
       * 标识类型
       */
      tagType?: ETagSelectType;
      /**
       * 默认专区Code
       */
      zoneCode?: string;
  }
  export default function TagSelect(props: TagSelectProps): JSX.Element;
}
declare module "ling_biz/TagSelect" {
  import { ETagSelectType } from "ling_biz/components/tag-select/constant";
  import TagSelect, { TagSelectProps } from "ling_biz/components/tag-select/tag-select";
  import { TagItem } from "ling_biz/components/tag-select/type";
  import { TagData2ApiData } from "ling_biz/components/tag-select/utils";
  import { logo2Tag } from "ling_biz/components/tag-select/ZoneLogo/utils";
  export { ETagSelectType, logo2Tag, TagData2ApiData, TagItem, TagSelectProps };
  export default TagSelect;
}
declare module "ling_biz/components/sidebar-ai/const" {
  import { ISidebarItem } from "ling_biz/components/sidebar/type";
  export enum EAiSideBar {
      Cutout = "Cutout",
      Design = "Design",
      MultiSize = "MultiSize",
      More = "More",
      Collection = "Collection",
      Pintu = "Pintu",
      Diy = "Diy",
      Inpainting = "Inpainting"
  }
  export const aiSidebarTitleMap: {
      Cutout: string;
      Design: string;
      MultiSize: string;
      More: string;
      Collection: string;
      Pintu: string;
      Diy: string;
      Inpainting: string;
  };
  export const aiSidebarLinkMap: {
      Cutout: string;
      Design: string;
      MultiSize: string;
      Collection: string;
      Pintu: string;
      Diy: string;
      Inpainting: string;
  };
  export const aiSidebarItems: ISidebarItem[];
}
declare module "ling_biz/components/sidebar-ai/utils" {
  import { ISidebarItem } from "ling_biz/components/sidebar/type";
  import { EAiSideBar } from "ling_biz/components/sidebar-ai/const";
  export const initAcitveSidebar = EAiSideBar.Design;
  export function pathnameToSidebarKey(aiSidebarItems: ISidebarItem[]): EAiSideBar;
  export function isAi(link: string): boolean;
}
declare module "ling_biz/components/sidebar-ai/sidebar-ai" {
  import React from 'react';
  import { EAiSideBar } from "ling_biz/components/sidebar-ai/const";
  interface ISidebarAiProps {
      activeKey: string;
      onActiveChange: (activeSidebar: EAiSideBar) => void;
      onRouteChange: (key: string, openNewWindow?: boolean) => void;
      preloadPage?: (e: string) => void;
  }
  const SidebarAI: React.FC<ISidebarAiProps>;
  export default SidebarAI;
}
declare module "ling_biz/SidebarAi" {
  import { aiSidebarItems, aiSidebarLinkMap, aiSidebarTitleMap, EAiSideBar } from "ling_biz/components/sidebar-ai/const";
  import SidebarAI from "ling_biz/components/sidebar-ai/sidebar-ai";
  import { isAi, pathnameToSidebarKey } from "ling_biz/components/sidebar-ai/utils";
  export { aiSidebarItems, aiSidebarLinkMap, aiSidebarTitleMap, EAiSideBar, isAi, pathnameToSidebarKey, };
  export default SidebarAI;
}
declare module "ling_biz/components/btn-down" {
  import React from 'react';
  interface IProps {
      up: boolean;
      onChange: any;
      text: string;
      className?: string;
      style?: React.CSSProperties;
  }
  const BtnDown: React.FC<IProps>;
  export default BtnDown;
}
declare module "ling_biz/hooks/use-dragger" {
  import EventEmitter3 from 'eventemitter3';
  export const Event: {
      onCloseOtherDragger: string;
      onReduceOtherDraggerZIndex: string;
  };
  export const dragModalEmitter: EventEmitter3<string | symbol, any>;
  export const COMMON_Z_INDEX = 500;
  export const PRIOR_Z_INDEX = 501;
  interface IProps {
      modalRef?: React.MutableRefObject<HTMLDivElement>;
      disableDragEvents?: string[];
      disableDragTags?: string[];
      disableDragSelectors?: string[];
  }
  function useDragger({ modalRef, disableDragTags, disableDragEvents, disableDragSelectors, }: IProps): {
      translate: {
          translateX: number;
          translateY: number;
      };
      isDragging: boolean;
      onDragStart: (e: any) => void;
      zIndex: number;
      dragId: import("react").MutableRefObject<string>;
  };
  export default useDragger;
}
declare module "ling_biz/components/download-progress-btn/components/DraggerModal" {
  import React from 'react';
  interface DraggerModelProps {
      title: string;
      onCancel: () => void;
      children?: React.ReactNode;
      className?: string;
      visible?: boolean;
      width?: number;
  }
  function DraggerModal({ visible, width, children, onCancel, title, className, }: DraggerModelProps): JSX.Element;
  export default DraggerModal;
}
declare module "ling_biz/components/download-progress-btn/emitter" {
  import EventEmitter3 from 'eventemitter3';
  export const Event: {
      openRenderProgressModel: string;
      addTask: string;
      deleteTask: string;
      editTask: string;
      onTaskExecute: string;
      onTaskRetry: string;
  };
  export const emitter: EventEmitter3<string | symbol, any>;
}
declare module "ling_biz/components/download-progress-btn/useTaskList" {
  import React from 'react';
  interface TaskItem {
      handler: React.FunctionComponent<{
          item: any;
          taskId: number | string;
          [key: string]: any;
      }>;
      taskId: string;
      data: any;
  }
  function useTaskList(): TaskItem[];
  export default useTaskList;
}
declare module "ling_biz/components/download-progress-btn" {
  import React from 'react';
  function DownloadProgressBtn(props: {
      className?: string;
      downloadTipsText?: string | React.ReactNode;
  }): JSX.Element;
  namespace DownloadProgressBtn {
      var emitter: import("eventemitter3")<string | symbol, any>;
      var Event: {
          openRenderProgressModel: string;
          addTask: string;
          deleteTask: string;
          editTask: string;
          onTaskExecute: string;
          onTaskRetry: string;
      };
  }
  export default DownloadProgressBtn;
}
declare module "ling_biz/components/filterbar" {
  import './index.scss';
  import React from 'react';
  export interface CheckOption {
      number: number;
      onChecked?: (checked: boolean) => void;
  }
  export interface SwitchOption {
      title?: string;
      key: string;
      checked?: boolean;
  }
  export interface InputOption {
      key: string;
      placeholder?: string;
      width?: number;
  }
  export interface SelectOption {
      key: string;
      title: string;
      defaultValue?: string;
      options: {
          label: React.ReactNode;
          value: string;
      }[];
  }
  export interface ColorOption {
      key: string;
      title: string;
      placeholder?: string;
  }
  export interface DataFilterProps {
      /**
       * 使用自定义全选按钮
       */
      checkOption?: CheckOption;
      /**
       * Switch 配置
       */
      switchOptions?: SwitchOption[];
      /**
       * 输入框配置
       */
      inputOption?: InputOption;
      /**
       * Select 配置
       */
      selectOptions?: SelectOption[];
      /**
       * 全选后显示的内容
       */
      subContent?: React.ReactNode;
      /**
       * 是否显示操作节点
       */
      showSubContent?: boolean;
      /**
       * 是否在表格内部使用
       */
      useInTable?: boolean;
      /**
       * 是否隐藏
       */
      isHidden?: boolean;
      /**
       *
       */
      onChange: (value: string | boolean, type: string) => void;
      /**
       * 颜色筛选控件
       */
      colorOption?: ColorOption;
  }
  export function DataFilter(props: DataFilterProps): JSX.Element;
  export default DataFilter;
}
declare module "ling_biz/components/form/type" {
  export interface TOption {
      label: string;
      value: string | boolean;
      disabled?: boolean;
      tips?: React.ReactNode;
      avatar?: string;
  }
  interface MultiDebounceSelectFormItem {
      type: 'multidebounceselect';
      verify?: (value: string) => boolean;
      fetchOptions: (search: string) => Promise<TOption[]>;
      value: string | string[] | boolean;
  }
  interface DebounceSelectFormItem {
      type: 'debounceselect';
      verify?: (value: string) => boolean;
      fetchOptions: (search: string) => Promise<TOption[]>;
      value: string | string[] | boolean;
  }
  interface MultiSelectFormItem {
      type: 'multiselect';
      options: TOption[];
      verify?: (value: string) => boolean;
      value: string | string[] | boolean;
  }
  interface FileFormItem {
      type: 'file' | 'tide_plugin';
      verify?: (value: string) => boolean;
      value: string | string[] | boolean;
      enableMulti?: boolean;
  }
  interface CustomFormItem {
      type: 'custom';
      verify?: (value: string) => boolean;
      value: string | string[] | boolean;
  }
  interface RadioFormItem {
      type: 'radio';
      options: TOption[];
      verify?: (value: string | boolean) => boolean;
      value: string | string[] | boolean;
  }
  interface CheckboxFormItem {
      type: 'checkbox';
      options: TOption[];
      verify?: (value: string[]) => boolean;
      value: string | string[] | boolean;
  }
  interface SelectFormItem {
      type: 'select';
      options: TOption[];
      verify?: (value: string) => boolean;
      value: string | string[] | boolean;
  }
  interface DatePickerFormItem {
      type: 'datepicker';
      picker?: 'week' | 'month' | 'quarter' | 'year';
      verify?: (value: string) => boolean;
      value: string | string[] | boolean;
  }
  interface SliderFormItem {
      type: 'slider';
      max: number;
      min: number;
      verify?: (value: number | number) => boolean;
      step?: number;
      value: string | string[] | boolean;
  }
  export interface CommonFormItem {
      label: React.ReactNode;
      required?: boolean;
      field: string;
      width?: number | string;
      labelWidth?: number;
      maxLength?: number;
      maxSize?: number;
      disabled?: boolean;
      before?: React.ReactNode;
      allowClear?: boolean;
      append?: React.ReactNode | ((values: Record<string, any>, handleChange: (v: any, field: string) => void) => React.ReactNode);
      verifyTips?: string;
      placeholder?: string;
      show?: boolean;
      render?: () => React.ReactNode;
      showCount?: boolean;
      tips?: React.ReactNode;
      fixedWidth?: number;
      suffix?: React.ReactNode;
      dropdownStyle?: React.CSSProperties;
      dropdownClassName?: string;
      wrapStyle?: React.CSSProperties;
      /**
       * 是否需要填满整行
       */
      fill?: boolean;
      /**
       * 主要作用于switch类型组件，控制switch append内容是否常显，为true则常显
       */
      switchAppendVisible?: boolean;
  }
  type DiffFormItem = {
      type: 'input' | 'image' | 'textarea' | 'switch' | 'password' | 'number';
      verify?: (value: string) => boolean;
      value: string | string[] | boolean;
      size?: number[];
      enableMulti?: boolean;
      enableCrop?: boolean;
      enableCompress?: boolean;
  } | RadioFormItem | SelectFormItem | CheckboxFormItem | FileFormItem | CustomFormItem | MultiSelectFormItem | DebounceSelectFormItem | MultiDebounceSelectFormItem | DatePickerFormItem | SliderFormItem;
  export type IFormItem = CommonFormItem & DiffFormItem;
  export interface IFormData {
      [key: string]: string | string[] | boolean;
  }
}
declare module "ling_biz/components/form/debounceSelect" {
  import { SelectProps } from 'ling_core/Components';
  import React from 'react';
  export interface DebounceSelectProps<TOption = any> extends Omit<SelectProps<TOption>, 'options' | 'children'> {
      fetchOptions: (search: string) => Promise<TOption[]>;
      debounceTimeout?: number;
  }
  export default function DebounceSelect<ValueType extends {
      key?: string;
      label: React.ReactNode;
      value: string | number;
  } = any>({ fetchOptions, debounceTimeout, ...props }: DebounceSelectProps): JSX.Element;
}
declare module "ling_biz/components/form/upload" {
  import { Component, ReactNode, RefObject } from 'react';
  import React from 'react';
  interface UploadProps {
      style?: React.CSSProperties;
      onUploadSuccess?: (fileurls: string[], filename: string[], filesize: number[], files?: any[]) => void;
      url?: string;
      action?: boolean;
      onClose?: () => void;
      ID?: string;
      note?: ReactNode;
      disabled: boolean;
      maxSize?: number;
      size?: number[];
      accept?: string;
      width?: number;
      height?: number;
      enableCrop?: boolean;
      enableMulti?: boolean;
      enableCompress?: boolean;
      compressRatio?: number;
  }
  interface UploadState {
      isLoading: boolean;
  }
  /**
   * 图片上传组件
   */
  export default class Upload extends Component<UploadProps, UploadState> {
      inputRef: RefObject<HTMLInputElement>;
      totalFileNum: number;
      curFileNum: number;
      constructor(props: UploadProps);
      handleChange: (file: File) => Promise<void>;
      closeHandler: () => void;
      beforeUpload: (file: any, fileList: any) => boolean;
      render(): JSX.Element;
  }
}
declare module "ling_biz/components/form/item" {
  import React from 'react';
  import { IFormItem } from "ling_biz/components/form/type";
  type IFormItemProps = IFormItem & {
      ID?: string;
      onChange: (value: string | string[] | boolean, field: string) => void;
      values: Record<string, string | string[] | boolean>;
      disabled?: boolean;
      verifyTipsVisible?: boolean;
      showCount?: boolean;
  };
  const _default_3: React.NamedExoticComponent<IFormItemProps>;
  export default _default_3;
}
declare module "ling_biz/Form" {
  import React, { CSSProperties } from 'react';
  import { IFormData, IFormItem } from "ling_biz/components/form/type";
  interface Props {
      forms: (IFormItem & {
          ID?: string;
      })[];
      onsubmit?: (formData: IFormData, verifyStatus: boolean, verifyFailFields: string[]) => void;
      onchange?: (formData: IFormData) => void;
      onchangeField?: (value: string | string[] | boolean, field: string) => void;
      onchangeVerifyStatus?: (status: boolean, verifyFailFields: string[]) => void;
      oncancel?: () => void;
      loading?: boolean;
      submitText?: string;
      style?: CSSProperties;
      verifyTipsConfig?: {
          text?: string;
          showFailFields?: boolean;
      };
  }
  const _default_4: React.MemoExoticComponent<React.ForwardRefExoticComponent<Props & React.RefAttributes<unknown>>>;
  export default _default_4;
}
declare module "ling_biz/components/media-center-modal-v2/media-center-modal" {
  import './index.scss';
  import { ButtonProps, ModalProps } from 'ling_core/Components';
  import React from 'react';
  export interface MediaCenterModalProps {
      onChange: (value: string, data: any) => void;
      panels?: string;
      modalTitle?: string;
      className?: string;
      buttonText?: string;
      buttonIcon?: JSX.Element;
      buttonProps?: ButtonProps;
      renderButton?: JSX.Element;
      multiple?: boolean;
      max?: number;
      modalProps?: ModalProps;
  }
  const MediaCenterModalV2: React.FC<MediaCenterModalProps>;
  export default MediaCenterModalV2;
}
declare module "ling_biz/components/media-center-modal-v2" {
  import MediaCenterModalV2, { MediaCenterModalProps } from "ling_biz/components/media-center-modal-v2/media-center-modal";
  export { MediaCenterModalProps };
  export default MediaCenterModalV2;
}
declare module "ling_biz/components/slider-with-input" {
  import { Slider } from 'ling_core/Components';
  import React from 'react';
  interface SliderWithInputProps extends Omit<React.ComponentProps<typeof Slider>, 'ref'> {
      className?: string;
      clstag?: string;
      title?: string;
      value: number;
      maxLength?: number;
      suffix?: string;
      inputWidth?: number;
      hideInput?: boolean;
      onChange: (value: number) => void;
      onAfterChange?: (value: number) => void;
      onFinishModification?: (value: number) => void;
  }
  export default function SliderWithInput(props: SliderWithInputProps): JSX.Element;
}
declare module "ling_biz/components/tag-list/tags" {
  import React from 'react';
  export interface TagsItem {
      /**
       * 标签 label
       */
      label: string;
      /**
       * 标签 value
       */
      value?: string | number;
      /**
       * 自定义标签样式
       */
      style?: React.CSSProperties;
  }
  export interface TagsProps {
      /**
       * 取值类型
       */
      activeType?: 'label' | 'value';
      /**
       * 前缀文本
       */
      prefixText?: string;
      /**
       * tabs 数据
       */
      tags?: TagsItem[];
      /**
       * className
       */
      className?: string;
      /**
       * 当前选中值
       */
      activeKey?: string;
      /**
       * 自定义样式
       */
      style?: React.CSSProperties;
      /**
       * tag onChange事件
       */
      onChange?: (item: TagsItem) => void;
  }
  export const Tags: React.FC<TagsProps>;
  export default Tags;
}
declare module "ling_biz/components/tag-list" {
  import React from 'react';
  import { TagsProps } from "ling_biz/components/tag-list/tags";
  export interface TagProps {
      tag: React.ReactNode;
      active?: boolean;
      onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  }
  export const Tag: React.FC<TagProps>;
  export interface TagListProps {
      style?: React.CSSProperties;
      className?: string;
      children?: React.ReactNode;
  }
  export type { TagsProps };
  export const TagList: {
      (props: TagListProps): JSX.Element;
      Tag: React.FC<TagProps>;
      FoldTag: React.FC<FoldTagProps>;
      Tags: React.FC<TagsProps>;
  };
  export interface FoldTagProps {
      fold?: boolean;
      useIcon?: boolean;
      onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  }
  export const FoldTag: React.FC<FoldTagProps>;
  export default TagList;
}
declare module "ling_biz/Components" {
  export { default as AnglePicker } from "ling_biz/AnglePicker";
  export { default as BtnArrow } from "ling_biz/BtnArrow";
  export { default as BtnDown } from "ling_biz/components/btn-down";
  export { default as CardHover } from "ling_biz/CardHover";
  export { default as CheckboxCard } from "ling_biz/CheckboxCard";
  export { default as ColorPicker } from "ling_biz/ColorPicker";
  export { default as DownloadProgressBtn } from "ling_biz/components/download-progress-btn";
  export { default as Filter } from "ling_biz/components/filterbar";
  export { default as Form } from "ling_biz/Form";
  export { default as GroupTag } from "ling_biz/GroupTag";
  export { default as MediaCenterModal } from "ling_biz/MediaCenterModal";
  export { default as MediaCenterModalV2 } from "ling_biz/components/media-center-modal-v2";
  export { default as MultipleUpload } from "ling_biz/MultipleUpload";
  export { default as RadioCard } from "ling_biz/RadioCard";
  export { IRotate, IRotatoFormProps, default as RotateForm } from "ling_biz/RotateForm";
  export { default as Sidebar } from "ling_biz/Sidebar";
  export { default as SidebarAi } from "ling_biz/SidebarAi";
  export { initCustomSize, default as SizeForm, SIZES_PRESET } from "ling_biz/SizeForm";
  export { default as SizeGroup } from "ling_biz/SizeGroup";
  export { default as SliderWithInput } from "ling_biz/components/slider-with-input";
  export { default as TagList, TagListProps } from "ling_biz/components/tag-list";
  export { default as TagSelect } from "ling_biz/TagSelect";
  export { default as Watermark } from "ling_biz/Watermark";
  export { default as WatermarkClass } from "ling_biz/WatermarkClass";
  export { default as WrapInputNumber } from "ling_biz/WrapInputNumber";
  export { default as ZoneChangeModal } from "ling_biz/ZoneChangeModal";
}
declare module "ling_biz/components/popup-button-modal" {
  import { ModalProps } from 'ling_core/Components';
  import React, { ReactElement } from 'react';
  interface IProps extends ModalProps {
      isConfirm?: boolean;
      children: ReactElement;
      disabled?: boolean;
      okText?: React.ReactNode;
      danger?: boolean;
      sideActionText?: string;
      destroyOnClose?: boolean;
      onSideAction?: () => void;
      showFooter?: boolean;
  }
  /**
   * 对话框组件
   * @param props
   */
  export default function PopupButtonModal(props: IProps): JSX.Element;
}
declare module "ling_biz/store/pubStore" {
  import PubStore from 'zustand-pub';
  const pubStore: PubStore;
  export default pubStore;
}
declare module "ling_biz/store/platformStore" {
  import { IZone, TUserGroupCode } from '@ling-design/service';
  export interface IPlatformState {
      zones: IZone[];
      zone?: IZone;
      currentZoneActions: string[];
      zonePermissions: {
          value: TUserGroupCode;
          label: string;
      }[];
      canCreateExperience: boolean;
  }
  export interface IPlatformAction {
      fetchZones: () => Promise<boolean>;
      fetchZoneInfo: (zoneCode: string) => Promise<any>;
      updateZonePermissions: (zoneId: string) => void;
      fetchCanCreateExperience: () => void;
  }
  const usePlatformStore: import("zustand").UseBoundStore<import("zustand").StoreApi<IPlatformState & IPlatformAction>>;
  export { usePlatformStore };
}
declare module "ling_biz/components/label-filter-v2/type" {
  import { ReactNode } from 'react';
  export type TLabelType = 'template' | 'material' | 'subject' | 'material_audio' | 'material_video' | 'material_animation' | 'material_decoration_complex' | 'material_text_complex' | 'material_image_complex' | 'material_scene' | 'template_motion' | 'template_video';
  export type TZoneLabelTagType = 'TEMPLATE' | 'TEMPLATE_VIDEO' | 'TEMPLATE_MOTION';
  export interface ILabel {
      name: string;
      code: string;
      description?: string;
      related?: boolean;
      id?: string;
      valid?: boolean;
      hide?: boolean;
      hot?: boolean;
      folder?: boolean;
      newest?: boolean;
      parentId?: string;
      sort?: number;
      top?: boolean;
  }
  export interface ITreeNode extends ILabel {
      childrenTagList?: ITreeNode[];
      childrenList?: ITreeNode[];
      startTime?: number;
      endTime?: number;
      icon?: ReactNode;
      open?: boolean;
  }
}
declare module "ling_biz/components/label-filter" {
  import { CSSProperties } from 'react';
  import { TLabelType, TZoneLabelTagType } from "ling_biz/components/label-filter-v2/type";
  interface IProps {
      type: TLabelType;
      subjectSubType?: TZoneLabelTagType;
      className?: string;
      zoneId?: string;
      removePaddingTop?: boolean;
      onChange: (tagIds: string[]) => void;
      maxHeight?: number;
      style?: CSSProperties;
      enableLabelManage?: boolean;
  }
  /**
   * 标签过滤组件
   * @param props
   */
  export default function LabelFilter(props: IProps): JSX.Element;
}
declare module "ling_biz/components/label-filter-v2" {
  import { CSSProperties } from 'react';
  import { TLabelType, TZoneLabelTagType } from "ling_biz/components/label-filter-v2/type";
  interface IProps {
      type: TLabelType;
      subjectSubType?: TZoneLabelTagType;
      className?: string;
      zoneId?: string;
      removePaddingTop?: boolean;
      onChange: (tagIds: string[]) => void;
      style?: CSSProperties;
      enableLabelManage?: boolean;
  }
  /**
   * 标签过滤组件
   * @param props
   */
  export default function LabelFilterV2(props: IProps): JSX.Element;
}
declare module "ling_biz/components/label-filter-pick" {
  import { CSSProperties } from 'react';
  import { TLabelType, TZoneLabelTagType } from "ling_biz/components/label-filter-v2/type";
  interface IProps {
      type: TLabelType;
      subjectSubType?: TZoneLabelTagType;
      className?: string;
      zoneId?: string;
      removePaddingTop?: boolean;
      onChange: (tagIds: string[]) => void;
      maxHeight?: number;
      style?: CSSProperties;
      enableLabelManage?: boolean;
  }
  /**
   * 标签过滤组件包装
   * @param props
   */
  export default function LabelFilterPick(props: IProps): JSX.Element;
}
declare module "ling_biz/platform/common/constant" {
  export const LAYOUT_TYPE: {
      label: string;
      value: string;
  }[];
  export const STATUS: {
      label: string;
      value: string;
  }[];
  export const NO_AUDIT_STATUS: {
      label: string;
      value: string;
  }[];
}
declare module "ling_biz/platform/common/layoutIconMap" {
  const iconMap: {
      [key: string]: JSX.Element;
  };
  export default iconMap;
}
declare module "ling_biz/platform/select-material-modal" {
  import { IElementMaterial } from '@ling-design/service';
  interface IProps {
      visible: boolean;
      onCancel?: () => void;
      onSelect?: (materials: IElementMaterial[]) => void;
  }
  export default function SelectMaterialModal(props: IProps): JSX.Element;
}
declare module "ling_biz/AiModelDetail" {
  import React from 'react';
  interface IProps {
      zoneId?: string;
      onSuccess: () => void;
      onCancel: () => void;
      visible: boolean;
      originId?: string;
  }
  interface IDataSet {
      id?: string;
      imageUrl: string;
      categoryTags: {
          category: string;
          tags: string;
      }[];
  }
  export const createMaterial: (image: {
      width: number;
      height: number;
      url: string;
      name: string;
  }, zoneId: string) => Promise<IDataSet[]>;
  function EditModal(props: IProps): JSX.Element;
  const _default_5: React.MemoExoticComponent<typeof EditModal>;
  export default _default_5;
}
declare module "ling_biz/platform/avatar-update-record" {
  /**
   * 带头像的更新记录
   */
  interface Iprops {
      nickname: string;
      updatedAt?: number;
      avatar: string;
      desc?: string;
      dongdongId?: string;
      dongdongType?: 'USER' | 'ERP' | 'MERCHANT' | 'COMPANY_USER';
      showdongdong?: boolean;
  }
  export default function AvatarUpdateRecord(props: Iprops): JSX.Element;
}
declare module "ling_biz/AiModelPage" {
  interface IProps {
      zoneId?: string;
      zoneCode?: string;
  }
  function AiModelPage(props: IProps): JSX.Element;
  export default AiModelPage;
}
declare module "ling_biz/platform/ai-prompt-select-modal" {
  interface IProps {
      visible: boolean;
      onCancel: () => void;
      onOk: (value: string) => void;
  }
  export default function AiPromptSelectModal(props: IProps): JSX.Element;
}
declare module "ling_biz/AiModelGenerateImage" {
  interface IProps {
      visible: boolean;
      onCancel: () => void;
      onSuccess: () => void;
      zoneId: string;
      defaultModelId?: string;
  }
  export default function AiMoelGenerateImageModal(props: IProps): JSX.Element;
}
declare module "ling_biz/hooks/use-api-call" {
  type APIResponse = {
      ok: boolean;
      data?: any;
      status?: number;
      [key: string]: any;
  };
  /**
   * 通用的 API 调用 Hooks
   *
   * @export
   * @returns
   */
  export default function useApiCall(api: () => Promise<APIResponse>, { initialData, onSuccess, onError, disabled, deps, }?: {
      initialData?: any;
      onSuccess?: (data: any) => {
          data?: any;
      } | void;
      onError?: (res: APIResponse) => void;
      deps?: any[];
      disabled?: boolean;
  }): {
      data: any;
      isLoading: boolean;
      error: any;
      run: () => void;
  };
}
declare module "ling_biz/hooks/use-column-option" {
  import React from 'react';
  export const DEFAULT_OPTOIN: {
      default: number;
      1200: number;
      1600: number;
      1880: number;
      2140: number;
  };
  export const COLUMN_OPTOIN_BIG: {
      default: number;
      1200: number;
      1600: number;
      2140: number;
  };
  export const GUTTER = 20;
  export function useColumnOption(option?: {
      default: number;
      1200: number;
      1600: number;
      1880: number;
      2140: number;
  }, gutter?: number, useDebounce?: boolean): {
      containerRef: React.MutableRefObject<any>;
      columnOption: {
          col: number;
          cellWidth: number;
      };
  };
  export const ColumnConfigContext: React.Context<{
      col: number;
      cellWidth: number;
  }>;
  export function useColumnOptionConfig(): {
      col: number;
      cellWidth: number;
  };
}
declare module "ling_biz/hooks/use-drop" {
  import React from 'react';
  export interface DropAreaState {
      isHovering: boolean;
  }
  export interface DropProps {
      onDragOver: React.DragEventHandler;
      onDragEnter: React.DragEventHandler;
      onDragLeave: React.DragEventHandler;
      onDrop: React.DragEventHandler;
      onPaste: React.ClipboardEventHandler;
  }
  export interface DropAreaOptions {
      onFiles?: (files: File[], event?: React.DragEvent) => void;
      onUri?: (url: string, event?: React.DragEvent) => void;
      onDom?: (content: any, event?: React.DragEvent) => void;
      onText?: (text: string, event?: React.ClipboardEvent) => void;
  }
  /**
   * 监听拖放事件，用法待补充，或见cutout业务
   * Warning: 未充分测试...
   */
  const useDrop: (options?: DropAreaOptions) => [DropProps, DropAreaState];
  export default useDrop;
}
declare module "ling_biz/hooks/use-lastest" {
  /**
   * 保证之前render里能拿到最新的值，例如一些回调函数
   * @param current 传入需要保持的值
   */
  function useLatest<T>(current: T): import("react").MutableRefObject<T>;
  export default useLatest;
}
declare module "ling_biz/hooks/use-event" {
  import { RefObject } from 'react';
  /**
   * 在对象上监听事件，自动挂载以及卸载   listener可以直接书写无需包裹useCallback, 保证在target以及type不变情况下只add一次事件，且保证listener最新
   * useEvent(xxxRef, 'click', listener)
   * @param target 监听对象  Ref Dom元素  或者'window' 'document'(兼容服务端渲染)
   * @param type 事件类型
   * @param listener 监听函数
   * @param cleanup
   */
  function useEvent<T extends Window = Window, K extends keyof WindowEventMap = keyof WindowEventMap>(target: Window | 'window' | null, type: K, listener: WindowEventListener<K>, cleanup?: (...args: any[]) => void): void;
  function useEvent<T extends Document = Document, K extends keyof DocumentEventMap = keyof DocumentEventMap>(target: Document | 'document' | null, type: K, listener: DocumentEventListener<K>, cleanup?: (...args: any[]) => void): void;
  function useEvent<T extends HTMLElement = HTMLElement, K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap>(target: RefObject<T> | T | null, type: K, listener: ElementEventListener<K>, cleanup?: (...args: any[]) => void): void;
  export type ElementEventListener<K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap> = (this: HTMLElement, ev: HTMLElementEventMap[K]) => any;
  export type DocumentEventListener<K extends keyof DocumentEventMap = keyof DocumentEventMap> = (this: Document, ev: DocumentEventMap[K]) => any;
  export type WindowEventListener<K extends keyof WindowEventMap = keyof WindowEventMap> = (this: Document, ev: WindowEventMap[K]) => any;
  export default useEvent;
}
declare module "ling_biz/hooks/use-hover" {
  import React from 'react';
  interface ListenerType {
      addEventListener(name: string, handler: () => void): any;
      removeEventListener(name: string, handler: () => void): any;
  }
  export default function useHover<T extends ListenerType>(): [
      React.MutableRefObject<T>,
      boolean
  ];
}
declare module "ling_biz/hooks/use-image" {
  /**
   * 加载一个image，用于canvas绘图等
   * @param url
   * @param crossOrigin  （我猜你需要填 'Anonymous'
   */
  export default function useImage(url: string, crossOrigin?: string): [HTMLImageElement | undefined, string];
}
declare module "ling_biz/hooks/use-interval" {
  export default function useInterval(callback: () => void, delay: number): void;
}
declare module "ling_biz/hooks/use-key-press" {
  /**
   * 检测某个按键是否按下
   */
  const useKeyPress: (key: string) => boolean;
  export default useKeyPress;
}
declare module "ling_biz/hooks/use-merged-state" {
  export default function useMergedState<T extends object>(initialState: T | (() => T)): [T, (S?: Partial<T>, deep?: boolean) => void];
}
declare module "ling_biz/hooks/use-mount" {
  const useMount: (fn: () => any) => void;
  export default useMount;
}
declare module "ling_biz/hooks/use-unmount" {
  const useUnmount: (fn: () => any) => void;
  export default useUnmount;
}
declare module "ling_biz/hooks/use-raf-state" {
  import { Dispatch, SetStateAction } from 'react';
  type FunctionReturn<S> = () => S;
  function useRafState<S>(initialState: S | FunctionReturn<S>): [S, Dispatch<SetStateAction<S>>, Dispatch<SetStateAction<S>>];
  export default useRafState;
}
declare module "ling_biz/hooks/use-mouse-bound" {
  import React from 'react';
  export interface TrackingRecord {
      x: number;
      y: number;
      payload: any;
  }
  export interface State {
      current: TrackingRecord | null;
      records: TrackingRecord[];
      tracking: boolean;
      clear: () => void;
  }
  /**
   * 监听目标的鼠标事件，仅在目标范围内有效，或者当在目标内部按下鼠标后
   * @param target
   * @param options options.button 监听的鼠标按键 onTracing 记录轨迹时对每个轨迹进行处理  onDone 当松开鼠标时回调
   * return {
   *   current, // 当前鼠标位置，在target内时有效，否则为null
   *   records, // 历史数据, 每次onDone之后会记录下轨迹数据
   *   tracking, // 当前轨迹，在target内按下鼠标后开始记录轨迹，移出目标外依然有效，直到松开鼠标
   *   clear, // 清除历史数据
   * }
   */
  function useMouseBound<T extends HTMLElement = HTMLElement>(target: React.RefObject<T> | T | null, options?: {
      button?: number;
      onTracing?: (record: TrackingRecord, e: MouseEvent) => TrackingRecord;
      onDone?: (record: TrackingRecord[]) => void;
  }): State;
  export default useMouseBound;
}
declare module "ling_biz/hooks/use-promise" {
  type GetPromiseResolveType<T> = T extends Promise<infer U> ? U : never;
  /**
   * Usage:
   * const [data, loading, error] = usePromise(() => fetch('...'));
   * @param promise
   */
  export default function usePromise<T extends Promise<any>>(fn: () => T): [GetPromiseResolveType<T> | null, boolean, any];
}
declare module "ling_biz/hooks/use-scroll" {
  import { RefObject } from 'react';
  type Pos = {
      x: number;
      y: number;
      w: number;
      h: number;
  };
  export default function useScroll<T extends HTMLElement>({ onScroll, scrollRef, }: {
      onScroll: (currentPos: Pos) => void;
      scrollRef?: RefObject<T>;
  }): void;
}
declare module "ling_biz/hooks/use-timeout" {
  /**
   * 定时器 hooks
   *
   * @export
   * @param {number} ms 定时毫秒
   * @param {any[]} [deps=[]] 刷新依赖
   * @returns {[boolean, () => void, () => void]} [isReady, cancel, reset]
   */
  export default function useTimeout(ms: number, deps?: any[]): [boolean, () => void, () => void];
}
declare module "ling_biz/hooks/use-touch-bound" {
  import React from 'react';
  export interface TrackingRecord {
      x: number;
      y: number;
      x1?: number;
      y1?: number;
      payload: any;
  }
  export interface State {
      current: TrackingRecord | null;
      records: TrackingRecord[];
      tracking: boolean;
      clear: () => void;
  }
  /**
   * 监听目标的触控事件，仅在目标范围内有效，或者当在目标内部触摸屏幕后
   * @param target
   * @param options options.button 监听的按键 onTracing 记录轨迹时对每个轨迹进行处理  onDone 当松手指时回调
   * return {
   *   current, // 当前触控位置，在target内时有效，否则为null
   *   records, // 历史数据, 每次onDone之后会记录下轨迹数据
   *   tracking, // 当前轨迹，在target内点击屏幕后开始记录轨迹，移出目标外依然有效，直到松开手指
   *   clear, // 清除历史数据
   * }
   */
  function useTouchBound<T extends HTMLElement = HTMLElement>(target: React.RefObject<T> | T | null, options?: {
      button?: number;
      onTracing?: (record: TrackingRecord, e: TouchEvent) => TrackingRecord;
      onDone?: (record: TrackingRecord[]) => void;
  }): State;
  export default useTouchBound;
}
declare module "ling_biz/hooks/use-window-resize" {
  export default function useWindowSize(): {
      width: number;
      height: number;
  };
}
declare module "ling_biz/hooks/use-window-scroll" {
  export default function useWindowScroll(): {
      scrollTop: number;
  };
}
declare module "ling_biz/Hooks" {
  import useApiCall from "ling_biz/hooks/use-api-call";
  import { COLUMN_OPTOIN_BIG, useColumnOption } from "ling_biz/hooks/use-column-option";
  import useDragger from "ling_biz/hooks/use-dragger";
  import useDragging from "ling_biz/hooks/use-dragging";
  import useDrop from "ling_biz/hooks/use-drop";
  import useEvent from "ling_biz/hooks/use-event";
  import useHover from "ling_biz/hooks/use-hover";
  import useImage from "ling_biz/hooks/use-image";
  import useInterval from "ling_biz/hooks/use-interval";
  import useKeyPress from "ling_biz/hooks/use-key-press";
  import useLatest from "ling_biz/hooks/use-lastest";
  import useMergedState from "ling_biz/hooks/use-merged-state";
  import useMount from "ling_biz/hooks/use-mount";
  import useMouseBound, { TrackingRecord } from "ling_biz/hooks/use-mouse-bound";
  import usePromise from "ling_biz/hooks/use-promise";
  import useRafState from "ling_biz/hooks/use-raf-state";
  import useScroll from "ling_biz/hooks/use-scroll";
  import useStopDragging from "ling_biz/hooks/use-stop-dragging";
  import useTimeout from "ling_biz/hooks/use-timeout";
  import useTouchBound from "ling_biz/hooks/use-touch-bound";
  import useUnmount from "ling_biz/hooks/use-unmount";
  import useWindowSize from "ling_biz/hooks/use-window-resize";
  import useWindowScroll from "ling_biz/hooks/use-window-scroll";
  export { COLUMN_OPTOIN_BIG, TrackingRecord, useApiCall, useColumnOption, useDragger, useDragging, useDrop, useEvent, useHover, useImage, useInterval, useKeyPress, useLatest, useMergedState, useMount, useMouseBound, usePromise, useRafState, useScroll, useStopDragging, useTimeout, useTouchBound, useUnmount, useWindowScroll, useWindowSize, };
}
