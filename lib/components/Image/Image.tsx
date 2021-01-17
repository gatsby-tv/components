import React, { useState, useEffect, useCallback } from "react";
import { IPFSContent } from "@gatsby-tv/types";
import { useIPFSContent } from "@gatsby-tv/utilities";

import { Size } from "@lib/types";
import { Box } from "@lib/components/Box";
import { Viewport } from "@lib/components/Viewport";

type ImageBaseProps = {
  w?: Size;
  rounded?: Size;
  aspectRatio?: number;
  overlay?: React.ReactNode;
  ariaLabel?: string;
} & Omit<React.ImgHTMLAttributes<HTMLElement>, "src">;

type ImageURLProps = ImageBaseProps & { src?: string };

type ImageIPFSProps = ImageBaseProps & { src: IPFSContent };

export type ImageProps = ImageURLProps | ImageIPFSProps;

function isImageURLProps(props: ImageProps): props is ImageURLProps {
  return typeof (props as ImageURLProps).src !== "object";
}

function ImageURL(props: ImageURLProps): React.ReactElement {
  const {
    aspectRatio = 1,
    w,
    overlay,
    rounded,
    ariaLabel,
    ...imgProps
  } = props;
  const [loading, setLoading] = useState(true);

  const handleLoad = useCallback(() => setLoading(false), []);

  useEffect(() => setLoading(true), [imgProps.src]);

  return (
    <Viewport
      placeholder
      overlay={overlay}
      aspectRatio={aspectRatio}
      w={w}
      rounded={rounded}
      ariaLabel={ariaLabel}
    >
      <Box
        as="img"
        alt=""
        style={
          loading
            ? { paddingTop: `${100 * aspectRatio}%`, height: 0 }
            : undefined
        }
        w={1}
        rounded={rounded}
        onLoad={handleLoad}
        {...imgProps}
      />
    </Viewport>
  );
}

function ImageIPFS(props: ImageIPFSProps): React.ReactElement {
  const { src, ...rest } = props;
  const { url } = useIPFSContent(src);

  return <ImageURL src={url} {...rest} />;
}

export function Image(props: ImageProps): React.ReactElement {
  if (isImageURLProps(props)) {
    return <ImageURL {...props} />;
  } else {
    return <ImageIPFS {...props} />;
  }
}
