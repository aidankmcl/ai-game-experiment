import { FC, FormEvent, useState } from "react";

import { sendPrompt } from "~/client-api";
import { useAppSelector } from "~/hooks";
import { identitySelectors, actionsSelectors } from "~/state";

import styles from './SendPrompt.module.css';

type Props = {
  callback?: (response: string) => void;
}

export const SendPrompt: FC<Props> = (props) => {
  const [prompt, setPromptInput] = useState("");
  const [loading, setPromptRequestLoading] = useState(false);

  const saveID = useAppSelector(identitySelectors.selectSaveID);
  const actions = useAppSelector(actionsSelectors.getPreviousActions);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setPromptRequestLoading(true);

    try {
      if (!saveID) throw new Error("need to have active save when generating");
      const data = await sendPrompt({ prompt, saveID, previousActions: actions });

      if (props.callback) props.callback(data);
      setPromptInput("");
    } catch (error) {
      console.error(error);
    }
    setPromptRequestLoading(false);
  }

  return <div>
    <form className={`${styles.form} mt-5`} onSubmit={onSubmit}>
      <input
        className={styles.input}
        type="text"
        name="next-action"
        placeholder="Enter your next step"
        value={prompt}
        onChange={(e) => setPromptInput(e.target.value)}
      />
      <input className={styles.input} type="submit" value="Submit" disabled={loading} />
    </form>
  </div>
}
