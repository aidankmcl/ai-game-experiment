import { FC } from "react";

import { Sidebar } from '~/ui';

import styles from './Content.module.css';

type Props = JSX.IntrinsicElements['div'];

export const Content: FC<Props> = (props) => {
  return <main className={`${styles.main} h-full relative`}>
    <div className={`${styles.sidebar} flex column b-r-2 b-purple`}>
      <Sidebar />
    </div>
    <div className={styles.content}>
      <div className="h-full overflow-auto">
        <div className="relative z-2">
          <div className="bg-white p-10 b-0 b-purple">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  </main>
}
