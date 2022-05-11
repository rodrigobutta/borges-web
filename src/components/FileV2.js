import { Button, Progress, Upload, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAxios } from '../hooks/useAxiosV2';
const { Text, Link } = Typography;

const File = ({
  endpoint,
  name,
  onChange,
  valueName = null,
  valueUrl = null,
  label = 'Clique para anexar o documento',
  disabled = false,
  className = '',
  showFileName = true,
}) => {
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState(null);
  const { axios } = useAxios();

  useEffect(() => {
    if (valueName && valueUrl) {
      setData({
        name: valueName,
        url: valueUrl,
      });
    }
  }, [valueName, valueUrl]);

  const uploadImage = async options => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: event => {
        const percent = Math.floor((event.loaded / event.total) * 90);
        setProgress(percent);
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append('file', file);
    fmData.append('name', name);
    try {
      !!axios &&
        axios.post(endpoint, fmData, config).then(res => {
          setData(res.data);
          onChange(name, res.data);
          setProgress(0);
          onSuccess('Ok');
        });
    } catch (err) {
      onError({ err });
    }
  };

  const handlRemove = e => {
    e.stopPropagation(); // we don't want to open a new selct dialog
    // await remove(endpoint, x.uid); // TODO handle removing phisical files for history purposes
    setData(null);
    onChange(name, null);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }} className={className}>
      <div>
        <>
          <Upload
            accept='image/*, application/pdf'
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
                {showFileName ? (
                  <Link href={data.url}>
                    <Text
                      href={data.url}
                      target='_blank'
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
                ) : null}
              </>
            )}
          </Upload>
          {progress > 0 && <Progress percent={progress} />}
        </>
      </div>
    </div>
  );
};

export default File;
