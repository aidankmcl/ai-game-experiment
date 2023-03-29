import type { FC, PropsWithChildren } from 'react';

import styles from './NavItem.module.css';

interface NavItemProps {
  href: string;
  active: boolean;
}

export const NavItem: FC<PropsWithChildren<NavItemProps>> = (props) => {
  return (
    <a href={props.href} className={`py-1 my-3 text-purple f-s-1 f-500 font-sans flex items-start ${styles.parent} ${props.active ? styles.active : ''}`}>
      {props.children}
      <div className={`pos-relative flex items-center ${styles.barContainer}`}>
        <span className={`bg-purple ${styles.bar}`} />
        <div className="i-mdi-chevron-right inline-block vertical-top" />
      </div>
    </a>
  );
};
