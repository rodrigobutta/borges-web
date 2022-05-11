import React, { FC } from 'react';

import { notification, Progress } from 'antd';

import { CloudUploadOutlined, EditOutlined, DeleteOutlined, PictureOutlined } from '@ant-design/icons';

import clsx from 'clsx';
import { IUploadImageProps } from '../../interfaces';

const UploadImage: FC<IUploadImageProps> = ({ label, src, disabled, onChange, onDelete, progressPercent }) => {
  const [innerSrc, setInnerSrc] = React.useState('');

  const inputFileRef = React.useRef<any>();

  const shownSrc = React.useMemo(() => {
    return innerSrc || src;
  }, [src, innerSrc]);

  const allowedExtensions = React.useMemo(() => ['jpg', 'jpeg', 'gif', 'png', 'tiff', 'pdf', 'jfif'], []);

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
      const files = e.target.files;

      if (!files || files.length === 0) {
        return;
      }

      const file = files[0];
      const extension = file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase();

      if (allowedExtensions.indexOf(extension) === -1) {
        notification.error({
          message:
            `Formato de arquivo inválido(${extension}). Somente ` + allowedExtensions.join(', ') + ' são permitidos',
          key: '1',
          duration: 6,
        });
        return false;
      }

      const imagePreview = URL.createObjectURL(file);
      setInnerSrc(imagePreview);

      onChange(e, {
        clearInputCache,
      });
    },
    [onChange, clearInputCache, allowedExtensions],
  );

  const onClickDeleteFile = React.useCallback(() => {
    onDelete && onDelete();
    setInnerSrc('');
    clearInputCache();
  }, [onDelete, clearInputCache]);

  return (
    <div className='aracar-upload__image'>
      {shownSrc ? (
        <div className='aracar-upload__image--preview'>
          {!disabled && (
            <div className='aracar-upload__image--preview__actionbuttons'>
              <button className='actionbuttons--edit' onClick={onClickUploadFile}>
                <EditOutlined />
              </button>
              <button className='actionbuttons--delete' onClick={onClickDeleteFile}>
                <DeleteOutlined />
              </button>
            </div>
          )}
          <img alt={label} src={shownSrc} />
          {!!progressPercent && progressPercent > 0 && progressPercent < 100 ? (
            <div className='aracar-upload__image--preview__progress'>
              <Progress percent={progressPercent} showInfo={false} />
            </div>
          ) : null}
        </div>
      ) : (
        <div
          onClick={onClickUploadFile}
          className={clsx('aracar-upload__image--main', {
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

      <input ref={inputFileRef} type='file' accept=' image/*, application/pdf' onChange={onChangeFile} />

      {label && (
        <div className='aracar-upload__image--footer'>
          <p>{label}</p>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
