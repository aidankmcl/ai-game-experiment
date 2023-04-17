import Head from "next/head";
import { useEffect } from "react";

import { getAllActions } from "~/client-api";
import { SendPrompt } from "~/components";
import { useAppSelector, useAsync } from "~/hooks";
import { identitySelectors } from "~/state";
import { ActionType } from "~/types";
import { Content } from "~/ui";

export default function Home() {
  const [actions, getActions] = useAsync(getAllActions);
  const saveID = useAppSelector(identitySelectors.selectSaveID);

  useEffect(() => {
    if (saveID) getActions(saveID);
  }, [saveID]);

  let step: string[] = [];
  const recentActions: JSX.Element[] = [];

  (actions || []).forEach(action => {
    if (action.type === ActionType.USER) {
      step.push(`Player: ${action.content}`);
    } else if (action.type === ActionType.GENERATED) {
      step.push(`Narrator: ${action.content}`);
      recentActions.push(<p key={recentActions.length} className="mt-5">{step[0]}<br/>{step[1]}</p>);
      step = [];
    }
  });

  return (
    <Content>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <p>
        Player: walk up to the magical home<br/>
        AI: As you step up to the house you notice that it's slightly run-down but with a very cozy cottage feeling and a large green door.
      </p>

      <p className="mt-5">
        Player: open the door<br/>
        AI: Opening the door reveals a marvelous, if messy, interior where several parts of the house are animating themselves, for example a cooking pot in the fire stirs itself slowly, a broom seems to be taking a break and chatting with some well dressed mice.
      </p>

      {recentActions}

      <SendPrompt callback={() => saveID && getActions(saveID)} />
    </Content>
  );
}
