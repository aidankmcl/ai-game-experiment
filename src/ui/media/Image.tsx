import { FC } from "react";

type Props = {
  src: {
    src: string,
    width: string,
    height: string
  };
  width?: string;
  height?: string;
  alt?: string;
};

export const Image: FC<Props> = (props) => {
  return <img
    src={props.src.src}
    width={props.src.width}
    height={props.src.height}
    alt={props.alt}
    style={{
      'maxHeight': props.height || '100%',
      'maxWidth': props.width || '100%'
    }}
  />;
};
