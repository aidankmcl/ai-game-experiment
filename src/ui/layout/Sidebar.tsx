
import { FC } from 'react';

import { H, NavItem, constants } from 'src/ui';

type Props = {
  path?: string
}

export const Sidebar: FC<Props> = (props) => {
  return (
    <div className="flex flex-col bg-white p-9 grow min-w-75">
      <H level={0}>Game</H>
      <hr className="b-purple b-1 my-6" />
      <div className="flex flex-col grow justify-between">
        <ul className="-mt-3">
          {constants.links.nav.map((link, i) => <li key={`${i}-nav`}>
            <NavItem href={`/${link.href}`} active={props.path === `/${link.href}`}>{link.text}</NavItem>
          </li>)}
        </ul>
      </div>
    </div>
  );
};
