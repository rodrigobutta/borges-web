import { Button } from 'antd';
import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface SignatureProps {
  onSubmit?: any;
  onDrawEnd?: any;
}

export default function Signature({ onDrawEnd }: SignatureProps) {
  const padRef = useRef<any>();

  const handleDrawEnd = () => {
    const trimmedCanvas = padRef.current.getTrimmedCanvas();

    // convert black background to transparent so we can get transparent png
    const ctx = trimmedCanvas.getContext('2d');
    const imgd = ctx.getImageData(0, 0, trimmedCanvas.width, trimmedCanvas.height);
    const pix = imgd.data;
    const newColor = { r: 0, g: 0, b: 0, a: 0 };
    for (let i = 0, n = pix.length; i < n; i += 4) {
      const r = pix[i];
      const g = pix[i + 1];
      const b = pix[i + 2];
      if (r === 0 && g === 0 && b === 0) {
        pix[i] = newColor.r;
        pix[i + 1] = newColor.g;
        pix[i + 2] = newColor.b;
        pix[i + 3] = newColor.a;
      }
    }
    ctx.putImageData(imgd, 0, 0);

    const image = trimmedCanvas.toDataURL('image/png', 1.0);
    onDrawEnd(image);
    // setCanClear(false);
  };

  const handleClearSignature = () => {
    padRef.current.clear();
  };

  return (
    <div>
      <SignatureCanvas
        onEnd={handleDrawEnd}
        penColor='blue'
        canvasProps={{ width: 500, height: 200, className: 'signatureCanvas' }}
        ref={padRef}
      ></SignatureCanvas>
      <Button
        className={'mt-3'}
        // disabled={!validationOk}
        size={'large'}
        onClick={handleClearSignature}
        style={{ position: 'absolute' }}
      >
        X
      </Button>
    </div>
  );
}
