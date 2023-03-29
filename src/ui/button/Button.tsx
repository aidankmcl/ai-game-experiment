
import { FC, HTMLProps, PropsWithChildren } from 'react';

type ButtonProps = JSX.IntrinsicElements['button'];

export const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  const { children, ...rest } = props;

  return <button {...rest} className={`${rest.className} m-2 px-2 py-1 b-2 b-purple card`}>{children}</button>;
};