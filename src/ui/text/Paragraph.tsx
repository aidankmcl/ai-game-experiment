
import type { FC, PropsWithChildren } from 'react';

export const Paragraph: FC<PropsWithChildren> = (props) => {
  return props.children ? <p>{props.children}</p> : <></>;
};
