import React, { useState, useEffect } from 'react';
import { Button, Card } from 'antd';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import Signature from '../components/Signature';

export interface DocumentViewProps {
  document: any;
  type: any;
  onSign?: any;
  signedDocument?: any;
  needsSignature?: any;
  signersName?: any;
  signersId?: any;
}

export default function DocumentView({
  document,
  type = 'embed',
  onSign = null,
  signedDocument = null,
  needsSignature = false,
  signersName = 'você',
  signersId = null,
}: DocumentViewProps) {
  const [loading, setLoading] = useState(true);
  const [signature, setSignature] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  const onSubmit = () => onSign(signature, signersId);

  const onSignatureChange = (trimmedImage: any) => setSignature(trimmedImage);

  // const handleClearSignature = () => {};

  if (!document) {
    return <></>;
  }

  const needsSign = !!(onSign && typeof onSign === 'function' && !signedDocument);

  const fileToShow = signedDocument || document;

  const validationOk = !!((!loading && !needsSignature) || (!loading && needsSignature && signature));

  return (
    <div>
      <Card
        title={
          <div className='grid-header'>
            <h1 style={{ marginBottom: '0' }}>{document.title}</h1>
            <div>
              {type !== 'embed' && (
                <>
                  <Button type='primary' href={fileToShow.url} target='_blank' rel='noreferrer'>
                    {document.name}
                  </Button>
                </>
              )}
            </div>
          </div>
        }
      >
        {needsSign && (
          <p>Para continuar, {signersName} Deve ler e estar de acordo com o seguinte documento:</p>
        )}
        {type === 'embed' && (
          <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js'>
            <div style={{ height: '750px' }}>
              <Viewer fileUrl={fileToShow.url} />
            </div>
          </Worker>
        )}
        {needsSign && (
          <>
            <Signature onDrawEnd={onSignatureChange} />
            <Button className={'mt-3'} disabled={!validationOk} size={'large'} type={'primary'} onClick={onSubmit}>
              Assinar
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}
