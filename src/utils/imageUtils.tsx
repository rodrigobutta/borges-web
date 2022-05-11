import React from 'react';
import { FilePdfOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import { UploadDocument } from '../models/UploadDocument';

function getImageIfExists(nameDoc: string, document: UploadDocument | undefined, isImage: boolean, showModalFn?: any) {
  if (document && isImage && !isEmpty(document.url)) {
    return (
      <img
        onClick={() => (showModalFn ? showModalFn(document) : '')}
        alt={nameDoc}
        style={{
          height: '100%',
          width: '100%',
          background: `url(${document.url})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: document.url ? 'cover' : 'auto',
          backgroundPosition: 'center',
        }}
        src={document.url}
      />
    );
  } else if (document && !isImage && !isEmpty(document.url)) {
    return (
      <div style={{ width: '100%', height: '100%' }} onClick={() => window.open(document.url, '_blank')}>
        <FilePdfOutlined className={'document-icon'} />
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <h3 style={{ position: 'absolute', bottom: '1px' }}>Adicionar {nameDoc}</h3>
    </div>
  );
}

export { getImageIfExists };
