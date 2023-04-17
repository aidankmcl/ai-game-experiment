import Head from "next/head";

import { getAllActions } from "~/client-api";
import { useAsync } from "~/hooks";

import { Content } from "~/ui";
import { useEffect } from "react";
import { useAppSelector } from "src/hooks/useGlobalState";
import { identitySelectors } from "~/state";

export default () => {
  const [data, trigger] = useAsync(getAllActions);
  const saveID = useAppSelector(identitySelectors.selectSaveID)

  useEffect(() => {
    if (saveID) trigger(saveID);
  }, []);

  return (
    <Content>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      {<p>{data ? JSON.stringify(data, null, 2) : 'No saves available'}</p>}
    </Content>
  );
}
