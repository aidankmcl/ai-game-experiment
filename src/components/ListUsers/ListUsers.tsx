import { FC, useEffect } from "react";

import { getAllUsers } from "src/client-api";

import { useAsync } from "~/hooks";
import { Button } from "~/ui";

type Props = {
  callback?: () => unknown;
}

export const ListUsers: FC<Props> = (props) => {
  const [data, trigger] = useAsync(getAllUsers);

  const onRefresh = async () => {
    trigger();
    if (props.callback) props.callback();
  }

  useEffect(() => {
    onRefresh();
  }, [])

  return <div>
    <h3 className=''>Users!</h3>
    <Button onClick={onRefresh}>Retrieve users</Button>
    {data && <div className=''>{JSON.stringify(data)}</div>}
  </div>
}
