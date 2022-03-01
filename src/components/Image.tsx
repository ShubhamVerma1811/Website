import Image from 'next/image';
import React, { useLayoutEffect, useState } from 'react';

const ImageComp = (props: any) => {
  const [dims, setDims] = useState({
    width: 0,
    height: 0,
  });

  const [hash, setHash] = useState('');

  useLayoutEffect(() => {
    const getDims = async () => {
      const resp = await fetch('/api/image', {
        method: 'POST',
        body: JSON.stringify({
          src: props.src,
        }),
      });

      const data = await resp.json();

      setDims({
        width: data.width,
        height: data.height,
      });
    };
    getDims();
  }, []);

  return (
    <figure className="">
      <Image
        src={props.src}
        alt={props.alt}
        className="prose my-0"
        layout="intrinsic"
        width={dims.width}
        height={dims.height}
      />
      {!props.hideCaption && (
        <figcaption className="prose">{props.alt}</figcaption>
      )}
    </figure>
  );
};

export default ImageComp;
