import Head from "next/head";

import { ListUsers, AddUser } from "src/components";

import { Content } from "~/ui";

export default () => {

  return (
    <Content>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <AddUser />
      <ListUsers />
    </Content>
  );
}
