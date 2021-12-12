import React, { useEffect } from 'react';
import Link from 'next/link';
import { Paper, Button, IconButton, Avatar } from '@material-ui/core';
import {
  AccountCircleOutlined as UserIcon,
  Menu as MenuIcon,
  ExpandMoreOutlined as ArrowBottom,
  NotificationsNoneOutlined as NotificationIcon,
  SearchOutlined as SearchIcon,
  SmsOutlined as MessageIcon,
} from '@material-ui/icons';

import styles from './Header.module.scss';
import { AuthDialog } from '../AuthDialog';
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/slices/user";

export const Header: React.FC = () => {
  const userData = useAppSelector(selectUserData);
  const [authVisible, setAuthVisible] = React.useState(false);

  const openAuthDialog = () => {
    setAuthVisible(true);
  };

  const closeAuthDialog = () => {
    setAuthVisible(false);
  };

  useEffect(() => {
    if (authVisible && userData) {
      setAuthVisible(false);
    }
  }, [authVisible, userData])

  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <div className="d-flex align-center">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <a>
            <img height={35} className="mr-20" src="/static/img/logo.svg" alt="Logo" />
          </a>
        </Link>

        <div className={styles.searchBlock}>
          <SearchIcon />
          <input placeholder="Поиск" />
        </div>

        <Link href="/write">
          <a>
            <Button variant="contained" className={styles.penButton}>
              Новая запись
            </Button>
          </a>
        </Link>
      </div>
      <div className="d-flex align-center">
        <IconButton>
          <MessageIcon />
        </IconButton>
        <IconButton>
          <NotificationIcon />
        </IconButton>
        {
          userData ? (
            <Link href="/profile/1">
              <a className="d-flex align-center">
                <Avatar
                  className={styles.avatar}
                  alt="Remy Sharp"
                  src="https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/"
                />
                <ArrowBottom />
              </a>
            </Link>
          ) : (
            <div className={styles.loginButton} onClick={openAuthDialog}>
              <UserIcon />
              Войти
            </div>
          )
        }
      </div>
      <AuthDialog onClose={closeAuthDialog} visible={authVisible} />
    </Paper>
  );
};
