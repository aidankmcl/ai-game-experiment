
import { FC } from 'react';

import { Button, H, NavItem, constants } from '~/ui';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { identityActions, identitySelectors } from '~/state';

type Props = {
  path?: string
}

export const Sidebar: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const userID = useAppSelector(identitySelectors.selectUserID);
  const saveID = useAppSelector(identitySelectors.selectSaveID);

  const logout = () => {
    dispatch(identityActions.clearSaveID());
    dispatch(identityActions.clearUserID());
  }

  return (
    <div className="flex flex-col bg-white p-9 grow min-w-75">
      <H level={0} className="m-b-0 text-center">Game</H>
      <hr className="b-purple b-1 my-6" />
      <div className="flex flex-col grow justify-between">
        <ul className="-mt-3">
          {constants.links.nav.map((link, i) => <li key={`${i}-nav`}>
            <NavItem href={`/${link.href}`} active={props.path === `/${link.href}`}>{link.text}</NavItem>
          </li>)}
        </ul>
        {userID && <Button onClick={logout}>Logout - User: {userID} | Save: {saveID}</Button>}
      </div>
    </div>
  );
};
