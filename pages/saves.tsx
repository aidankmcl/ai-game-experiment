import Head from "next/head";
import { useEffect } from "react";
import { Save as SaveType } from "@prisma/client";

import { getAllSaves } from "~/client-api";
import { useAppDispatch, useAppSelector, useAsync } from "~/hooks";
import { Content } from "~/ui";
import { identityActions, identitySelectors } from "~/state";
import { Save } from "~/components";

export default () => {
  const [data, trigger] = useAsync(getAllSaves);
  const userID = useAppSelector(identitySelectors.selectUserID);

  const dispatch = useAppDispatch();
  const setSave = (save: SaveType) => dispatch(identityActions.setSaveID(save.id));


  useEffect(() => {
    trigger(userID || undefined);
  }, []);

  return (
    <Content>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      {data && (
        <ul>
          {data.map((save, i) => (
            <li key={i + '-save'} className="inline-block">
              <Save save={save} setSave={setSave} />
            </li>
          ))}
        </ul>
      )}
    </Content>
  );
}
