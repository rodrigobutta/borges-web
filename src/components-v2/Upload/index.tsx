import React from 'react';

import UploadImage from './Image';
import UploadFile from './File';

const Upload: IUploadFC<IUploadProps> = () => {
  return <></>;
};

interface IUploadProps {}

type IUploadFC<P> = React.FC<P> & {
  Image: typeof UploadImage;
  File: typeof UploadFile;
};

Upload.Image = UploadImage;
Upload.File = UploadFile;

export default Upload;
