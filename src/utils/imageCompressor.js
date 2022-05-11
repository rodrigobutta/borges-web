const Compressor = require('compressorjs');

export default function imageCompressor(file, maxSizeInMB = 2) {
  const maxSizeInBytes = maxSizeInMB * 1e6;
  // Rate of compression depending on initial file size
  const currentSize = file.size;

  if (currentSize < maxSizeInBytes) {
    return file;
  }
  if (file.type === 'application/pdf') {
    return file;
  }
  /*const compressionRate = maxSizeInBytes / currentSize
    //recomended quality between 0,4 and 0,8
    // achieves between 0,5 an 0,7 compression rate.
    const quality = 0.6 + 0.2*compressionRate
    // This may not be needes, quality = 0.6 static
    would work as well.*/

  const quality = 0.6;

  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: quality,
      success: resolve,
      error: reject,
    });
  }).then(resolve => {
    return new File([resolve], resolve.name, {
      type: resolve.type,
      uid: file.uid,
    });
  });
}
