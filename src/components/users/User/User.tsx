import { FC, useEffect } from "react";
import { User as UserType } from '@prisma/client';

import { Button, H } from "~/ui";
import moment from "moment";
import { useAsync } from "~/hooks";
import { deleteUser } from "~/client-api";

type Props = JSX.IntrinsicElements['div'] & {
  user: UserType;
  setUser?: (user: UserType) => void;
  deleteCallback?: (user: UserType) => void;
}

export const User: FC<Props> = (props) => {
  const [data, trigger, loading] = useAsync(deleteUser);
  const setUser = props.setUser;

  useEffect(() => {
    if (data && props.deleteCallback) props.deleteCallback(data);
  }, [loading]);

  return <div className={`group b-purple b-2 inline-block m-r-5 m-b-5 w-45 relative ${props.className}`}>
    <div className="display-none group-hover:block absolute top-0 right-0 absolute z-1">
      <Button className="bg-white" onClick={() => trigger(props.user.id)}>
        <span className="block i-mdi-close py-3"></span>
      </Button>
    </div>
    <img className="w-full" src="https://picsum.photos/id/660/200" />
    <div className="p-4">
      <H level={1}>[ID: {props.user.id}] {props.user.name}</H>
      <p>{moment(props.user.createdAt).format("DD-MM-YYYY")}</p>
      {setUser && <Button onClick={() => setUser(props.user)}>Set as user</Button>}
    </div>
  </div>
}
