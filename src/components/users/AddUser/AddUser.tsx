import { FC, FormEvent, useEffect, useState } from "react";

import { createUser } from "~/client-api";
import { useAsync } from "~/hooks";
import { Button, H } from "~/ui";

type CreateReturn = Awaited<ReturnType<typeof createUser>>;

type Props = {
  callback?: (data?: CreateReturn) => unknown;
}

export const AddUser: FC<Props> = (props) => {
  const [data, trigger, loading, err] = useAsync(createUser);  
  const [username, setUsernameInput] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      trigger({ name: username });
      setUsernameInput("");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (props.callback && data) props.callback(data);
  }, [loading])

  return <div>
    <form onSubmit={onSubmit} className="mb-10 b-purple b-1 p-5 flex justify-between items-center">
      <H level={0} className="mb-0 inline-block vertical-bottom">Add a user!</H>
      <div className="inline-block">
        {err && <p className="inline-block">{err.message}</p>}
        <input
          type="text"
          name="username"
          placeholder="Create a new user"
          className="inline-block b-purple b-1 p-2 ml-5"
          value={username}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        <Button className="inline-block px-3 py-2 ml-5 my-0">
          Create user
        </Button>
      </div>
    </form>
  </div>
}
