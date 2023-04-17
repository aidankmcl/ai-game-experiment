import { FC } from "react";
import { User as UserType } from "@prisma/client";

import { H } from "~/ui";
import { User } from "~/components"
import { useAppDispatch } from "~/hooks";
import { identityActions } from "~/state";


type Props = {
  users: UserType[];
  deleteCallback?: (user: UserType) => void
}

export const ListUsers: FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const setUserID = (user: UserType) => dispatch(identityActions.setUserID(user.id));

  return <div className="w-full">
    <H level={0} className='m-b-0'>Users!</H>
    <hr className="b-purple m-t-3 m-b-5" />
    <div className="w-full">
      {props.users && (
        <ul className="flex items-stretch flex-wrap">
          {props.users.map((user, i) => (
            <li key={`${i}-user`} className="flex">
              <User className="grow" user={user} setUser={setUserID} deleteCallback={props.deleteCallback}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
}
