import { FormEvent, useState } from "react";

import { sendPrompt } from "src/client-api";

import styles from './SendPrompt.module.css';

export const SendPrompt = () => {
  const [prompt, setPromptInput] = useState("");
  const [result, setResult] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const data = await sendPrompt({ prompt });

      setResult(data);
      setPromptInput("");
    } catch (error) {
      console.error(error);
    }
  }

  return <div>
    <img src="/dog.png" className={styles.icon} />
    <h3 className={styles.title}>Name my pet</h3>
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        className={styles.input}
        type="text"
        name="animal"
        placeholder="Enter an animal"
        value={prompt}
        onChange={(e) => setPromptInput(e.target.value)}
      />
      <input className={styles.input} type="submit" value="Generate names" />
    </form>
    {result && <div className={styles.result}>{result}</div>}
  </div>
}
