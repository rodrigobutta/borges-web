import React, { FC } from 'react';

import { Progress } from 'antd';

import {
  CloudUploadOutlined,
  EditOutlined,
  DeleteOutlined,
  PictureOutlined,
  FileOutlined,
  SelectOutlined,
} from '@ant-design/icons';

import clsx from 'clsx';
import { IUploadFileProps } from '../../interfaces';

const UploadFile: FC<IUploadFileProps> = ({
  label,
  srcFileName,
  srcFileUrl,
  disabled,
  onChange,
  onDelete,
  progressPercent,
}) => {
  const inputFileRef = React.useRef<any>();

  const onClickUploadFile = React.useCallback(() => {
    if (!disabled) {
      inputFileRef.current?.click();
    }
  }, [disabled]);

  const clearInputCache = React.useCallback(() => {
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  }, []);

  const onChangeFile = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e, {
        clearInputCache,
      });
    },
    [onChange, clearInputCache],
  );

  const onClickDeleteFile = React.useCallback(() => {
    onDelete && onDelete();
    clearInputCache();
  }, [onDelete, clearInputCache]);

  const onClickOpenFile = React.useCallback(() => {
    window.open(srcFileUrl, '_blank')?.focus();
  }, [srcFileUrl]);

  return (
    <div className='aracar-upload__file'>
      {srcFileName ? (
        <div className='aracar-upload__file--preview'>
          {!disabled && (
            <div className='aracar-upload__file--preview__actionbuttons'>
              <button className='actionbuttons--edit' onClick={onClickUploadFile}>
                <EditOutlined />
              </button>
              <button className='actionbuttons--delete' onClick={onClickDeleteFile}>
                <DeleteOutlined />
              </button>
            </div>
          )}
          <div className='aracar-upload__file--preview__main'>
            <>
              <FileOutlined />
              <p>
                {srcFileName} <SelectOutlined onClick={onClickOpenFile} />
              </p>
            </>
          </div>
          {!!progressPercent && progressPercent > 0 && progressPercent < 100 ? (
            <div className='aracar-upload__file--preview__progress'>
              <Progress percent={progressPercent} showInfo={false} />
            </div>
          ) : null}
        </div>
      ) : (
        <div
          onClick={onClickUploadFile}
          className={clsx('aracar-upload__file--main', {
            editable: !disabled,
            disabled: !!disabled,
          })}
        >
          {disabled ? (
            <>
              <PictureOutlined />
              <p>Vazio</p>
            </>
          ) : (
            <>
              <CloudUploadOutlined />
              <p>Carregar arquivo</p>
            </>
          )}
        </div>
      )}

      <input ref={inputFileRef} type='file' onChange={onChangeFile} />

      {label && (
        <div className='aracar-upload__file--footer'>
          <p>{label}</p>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
