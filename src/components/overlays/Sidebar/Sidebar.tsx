"use client";

import { useEffect } from 'react';
import styles from './Sidebar.module.css';

import { usePathname } from 'next/navigation'
import Link from 'next/link';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { toggleIsSidebarOpen } from '@/store/uiSlice';

import { Line, Text } from '@/components/atoms';

import { MainIcon, HomeIcon, FeedbackIcon, ProfileIcon, InfoIcon, SettingsIcon, GuideIcon } from '@/public/icons';

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector(state => state.ui.isSidebarOpen);
  const isSignedIn = useAppSelector(state => state.userSettings.isSignedIn)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const thresholdInRem = 16;
      const clientXInRem = event.clientX / rootFontSize;

      if (clientXInRem < thresholdInRem && !isSidebarOpen) {
        dispatch(toggleIsSidebarOpen(true));
      } else if (clientXInRem >= thresholdInRem && isSidebarOpen) {
        dispatch(toggleIsSidebarOpen(false));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isSidebarOpen, dispatch]);

  const currentPath = usePathname()

  const returnLinkClass = (linkPath: string) => {
    let linkClass = `${styles.sidebarLink} `
    if (linkPath === currentPath) {
      linkClass += styles.activeLink;
    }
    return linkClass;
  }

  const sidebarClassName = `${styles.sidebarContainer} ${isSidebarOpen ? styles.sidebarOpen : ''}`

  return (
    <>
      <Link href="/" className={styles.mainLink}>
        <MainIcon height="3.75rem"/>
      </Link>

      <div className={sidebarClassName}>
        <div className={styles.blankDiv}></div>

        <Line width="11.875rem" height="0.0625rem" className={styles.linkDividerLine}/>

        <Link href="/" className={returnLinkClass('/')}>
          <HomeIcon width="2.25rem" height="2.25rem" />
          <Text text="Home" className={styles.sidebarLinkText} as="span" />
        </Link>
        <Link href="/settings" className={returnLinkClass('/settings')}>
          <SettingsIcon width="2.25rem" height="2.25rem" />
          <Text text="Settings" className={styles.sidebarLinkText} as="span" />
        </Link>
        <Link href="/progress" className={returnLinkClass('/progress')}>
          <ProfileIcon width="2.25rem" height="2.25rem" />
          <Text text="Progress" className={styles.sidebarLinkText} as="span" />
        </Link>

        <Line width="11.875rem" height="0.0625rem" className={styles.linkDividerLine}/>

        <Link href="/user-guide" className={returnLinkClass('/user-guide')}>
          <GuideIcon height="2rem" width="2.25rem" />
          <Text text="How To Use" className={styles.sidebarLinkText} as="span" />
        </Link>
        <Link href="/feedback" className={returnLinkClass('/feedback')}>
          <FeedbackIcon height="2.25rem" width="2.25rem" />
          <Text text="Feedback" className={styles.sidebarLinkText} as="span" />
        </Link>
        <Link href="/about" className={returnLinkClass('/about')}>
          <InfoIcon width="2.25rem" height="2.25rem" />
          <Text text="About" className={styles.sidebarLinkText} as="span" />
        </Link>

        <Line width="11.875rem" height="0.0625rem" className={styles.linkDividerLine}/>

        {isSignedIn ? 
          <Link href="/account" className={styles.accountButton}>
            <Text text="Account" as="span" />
          </Link> 
          :
          <Link href="/sign-in" className={styles.signInButton}>
            <Text text="Sign In" as="span" />
          </Link>
        }

      </div>
    </>
  )
}

export default Sidebar;