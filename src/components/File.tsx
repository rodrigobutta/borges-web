import { Button, Progress, Upload, Typography, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAxios } from '../hooks/useAxiosV2';
import imageCompressor from 'utils/imageCompressor';
const { Text, Link } = Typography;

const File = ({
  endpoint,
  name,
  onChange,
  valueName = null,
  valueUrl = null,
  label = 'Clique para anexar o documento',
  disabled = false,
}: any) => {
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState<any | null>(null);
  const { axios } = useAxios();
  const allowedExtensions = ['jpg', 'jpeg', 'gif', 'png', 'tiff', 'pdf', 'jfif'];
  const maxSizeInMB = 2; // For changing the max value accepted.

  useEffect(() => {
    if (valueName && valueUrl) {
      setData({
        name: valueName,
        url: valueUrl,
      });
    }
  }, [valueName, valueUrl]);

  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;
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
    const fileCompressed = await imageCompressor(file, maxSizeInMB);
    const fmData = new FormData();
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event: any) => {
        const percent = Math.floor((event.loaded / event.total) * 90);
        setProgress(percent);
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append('file', fileCompressed);
    fmData.append('name', name);
    try {
      !!axios &&
        axios.post(endpoint, fmData, config).then(res => {
          setData(res.data);
          onChange(name, res.data);
          setProgress(0);
          onSuccess('Ok');
          notification.success({
            message: 'Upload completado',
            key: '0',
          });
        });
    } catch (err) {
      onError({ err });
    }
  };

  const handlRemove = (e: any) => {
    e.stopPropagation(); // we don't want to open a new selct dialog
    // await remove(endpoint, x.uid); // TODO handle removing phisical files for history purposes
    setData(null);
    onChange(name, null);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {!disabled ? (
        <>
          <Upload
            accept=' image/*, application/pdf'
            onRemove={handlRemove}
            customRequest={uploadImage}
            multiple={false}
            fileList={[]}
            className='image-upload-grid'
            disabled={disabled}
          >
            <Button icon={<UploadOutlined />} disabled={disabled}></Button>
            {data && (
              <>
                <Button icon={<DeleteOutlined />} onClick={handlRemove} disabled={disabled}></Button>
                <Link href={data.url} target='_blank'>
                  <Text
                    // href={data.url}
                    style={
                      data.name
                        ? {
                            width: 250,
                            lineHeight: '40px',
                            paddingLeft: '10px',
                            color: '#000',
                          }
                        : undefined
                    }
                    ellipsis={
                      data.name
                        ? {
                            tooltip: data.name,
                          }
                        : false
                    }
                  >
                    {data.name}
                  </Text>
                </Link>
              </>
            )}
          </Upload>
          {progress > 0 && <Progress percent={progress} />}
        </>
      ) : (
        <Text
          style={
            data?.name
              ? {
                  width: 250,
                  lineHeight: '40px',
                  paddingLeft: '10px',
                  color: '#000',
                }
              : undefined
          }
          ellipsis={
            data?.name
              ? {
                  tooltip: data.name,
                }
              : false
          }
        >
          {data?.name}
        </Text>
      )}
    </div>
  );
};

export default File;
