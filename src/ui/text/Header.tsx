

import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

interface HeaderProps extends HTMLAttributes<'h'> {
  level?: number
}

export const Header: FC<PropsWithChildren<HeaderProps>> = (props) => {
  switch (props.level) {
    case 0:
      return <h1 className={`${props.className} text-purple f-s-0 font-yeseva text-center`}>{props.children}</h1>;
    case 1:
      return <h1 className={`${props.className}`}>{props.children}</h1>;
    case 2:
      return <h2 className={`${props.className}`}>{props.children}</h2>;
    case 3:
    default:
      return <h3 className={`${props.className}`}>{props.children}</h3>;
  }
};
