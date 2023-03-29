import { FC, FormEvent, useState } from "react";

import { createUser } from "~/client-api";
import { useAsync } from "~/hooks";

type CreateReturn = Awaited<ReturnType<typeof createUser>>;

type Props = {
  callback?: (data: CreateReturn) => unknown;
}

export const AddUser: FC<Props> = (props) => {
  const [data, trigger] = useAsync(createUser);  
  const [username, setUsernameInput] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      trigger({ name: username });
      setUsernameInput("");
      if (props.callback && data) props.callback(data);
    } catch (error) {
      console.error(error);
    }
  }

  return <div>
    <h3>Add a user!</h3>
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Create a new user"
        value={username}
        onChange={(e) => setUsernameInput(e.target.value)}
      />
      <input type="submit" value="Create user" />
    </form>
  </div>
}
