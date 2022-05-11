import { Button, notification, Progress, Tooltip, Upload } from 'antd';
import React, { useState } from 'react';
import {
  CheckCircleTwoTone,
  CommentOutlined,
  ExclamationCircleTwoTone,
  ClockCircleTwoTone,
  PaperClipOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useAxios } from '../hooks/useAxiosV2';
// import { useAccountFiles } from '../hooks/useAccountFiles';
import imageCompressor from 'utils/imageCompressor';

const FilePreview = (props: any) => {
  const { data } = props;

  let datum = data[0];

  if (!datum) {
    return null;
  }

  return (
    <a href={datum.url}>
      <PaperClipOutlined /> {datum.originalName}
    </a>
  );
};

const FileUpload = ({ name, forceRefresh }: { name: string; forceRefresh: any }) => {
  const [progress, setProgress] = useState(0);
  const maxSizeInMB = 2; // For changing the max value accepted.

  const { axios } = useAxios();
  const data: any = []; //useAccountFiles(name);

  // const extension: string = useMemo(() => {
  //   return (
  //     data &&
  //     data.name &&
  //     data.name.substr(data.name.lastIndexOf(".") + 1).toLowerCase()
  //   );
  // }, [data]);

  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;
    // const allowedExtensions = [
    //   "jpg",
    //   "jpeg",
    //   "gif",
    //   "png",
    //   "tiff",
    //   "pdf",
    //   "jfif",
    // ];

    // if (allowedExtensions.indexOf(extension) === -1) {
    //   notification.error({
    //     message:
    //       "Formato de arquivo inválido. Somente " +
    //       allowedExtensions.join(", ") +
    //       " são permitidos",
    //     key: "1",
    //   });
    //   return false;
    // }

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
        axios.post(`account-files/add-by-logged-user`, fmData, config).then(_res => {
          setProgress(0);
          onSuccess('Ok');
          notification.success({
            message: 'Upload completado',
            key: '0',
          });
          forceRefresh && forceRefresh();
        });
    } catch (err) {
      onError({ err });
      notification.error({
        message: 'Erro no upload. Por favor, tente novamente',
        key: '1',
      });
    }
  };

  if (!data) {
    return null;
  }

  const onRemove = async (x: any) => {
    !!axios &&
      axios.delete(`account-files/${x.uid}`).then(_res => {
        forceRefresh && forceRefresh();
      });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ minWidth: 300, maxWidth: 300 }}>
        {data[0]?.status !== 'Aprobado' && (
          <>
            <Upload
              accept='image/*, application/pdf'
              onRemove={onRemove}
              customRequest={uploadImage}
              fileList={[]}
              className='image-upload-grid'
            >
              <Button icon={<UploadOutlined />}>Clique para anexar o documento</Button>
            </Upload>
            {progress > 0 && <Progress percent={progress} />}
          </>
        )}
        {data[0] && <FilePreview data={data} />}
      </div>
      <div>
        {data[0] ? (
          <i style={{ marginRight: 9 }}>
            {data[0].status === 'Aprovado' && (
              <Tooltip title={data[0].status}>
                <CheckCircleTwoTone twoToneColor='#52c41a' />
              </Tooltip>
            )}
            {data[0].status === 'Verificado' && (
              <Tooltip title={data[0].status}>
                <ExclamationCircleTwoTone twoToneColor='#D4A64B' />
              </Tooltip>
            )}
            {data[0].status === 'Sob Revisão' && (
              <Tooltip title={data[0].status}>
                <ClockCircleTwoTone twoToneColor='#D4A64B' />
              </Tooltip>
            )}
          </i>
        ) : (
          ''
        )}
      </div>
      <div>
        {data[0] && data[0].comment ? (
          <i>
            {' '}
            <CommentOutlined /> {data[0].comment}
          </i>
        ) : (
          ''
        )}
      </div>
      A
    </div>
  );
};

export default FileUpload;
