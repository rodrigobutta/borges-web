import { AxiosInstance } from 'axios';
import React from 'react';

//#region Grid

export interface IGridProps {
  provider?: AxiosInstance | null;
  url: string;
  columns: IGridPropsColumn[];
  hiddenFilters?: any;
  excludeFilters?: any;
  requestQuery?: any;
  rowsPerPage?: number;
}

export interface IGridPropsColumn {
  canSort?: boolean;
  filterConfig?: IGridPropsColumnFilterConfig;
  filterType?: string;
  isInitial?: boolean;
  propertyName?: string;
  propertyNameForSort?: string;
  render?: (value: any, obj: any) => React.ReactNode;
  title: string;
}

export interface IGridPropsColumnFilterConfig {
  optionDataType?: string;
  options?: IGridPropsColumnFilterConfigOption[];
  filterTargetFields?: string[];
  propertyNameForFilter?: string;
  requestQuery?: any;
  mapper?: (data: any) => IGridPropsColumnFilterConfigOption[];
  provider?: AxiosInstance | null;
  url?: string;
}

export interface IGridPropsColumnFilterConfigOption {
  text: string;
  value: string;
}

//#endregion

//#region Upload Image

export interface IUploadImageProps {
  label?: string;
  src?: string;
  disabled?: boolean;
  progressPercent?: number;
  onChange: IUploadImagePropsChangeEvent;
  onDelete: () => void;
}

export type IUploadImagePropsChangeEvent = (
  e: React.ChangeEvent<HTMLInputElement>,
  options: {
    clearInputCache: () => void;
  },
) => void;

//#endregion

//#region Upload Image

export interface IUploadFileProps {
  label?: string;
  srcFileName?: string;
  srcFileUrl?: string;
  disabled?: boolean;
  progressPercent?: number;
  onChange: IUploadFilePropsChangeEvent;
  onDelete: () => void;
}

export type IUploadFilePropsChangeEvent = (
  e: React.ChangeEvent<HTMLInputElement>,
  options: {
    clearInputCache: () => void;
  },
) => void;

//#endregion
