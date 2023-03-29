import Head from "next/head";

import { ListUsers, SendPrompt, AddUser } from "src/components";

import { Content } from "~/ui";

export default function Home() {
  return (
    <Content>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      Playthroughs
    </Content>
  );
}
