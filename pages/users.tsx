import Head from "next/head";

import { ListUsers, AddUser } from "~/components";
import { getAllUsers } from "~/client-api";
import { useAsync } from "~/hooks";

import { Content } from "~/ui";
import { useEffect } from "react";

export default () => {
  const [data, trigger] = useAsync(getAllUsers);

  useEffect(() => {
    trigger();
  }, []);

  return (
    <Content>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <AddUser callback={trigger} />
      <ListUsers users={data || []} deleteCallback={trigger} />
    </Content>
  );
}
