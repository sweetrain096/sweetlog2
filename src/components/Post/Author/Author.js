// @flow
import React from 'react';
import { getContactHref } from '../../../utils';
import styles from './Author.module.scss';
import { useSiteMetadata } from '../../../hooks';

const Author = () => {
  const { author } = useSiteMetadata();

  return (
    <div className={styles['author']}>
      <p className={styles['author__bio']}>
        {author.bio} - 
        <a
          className={styles['author__home']}
          href={"/."}
          rel="noopener noreferrer"
          // target="_blank"
        >
          <strong>{author.name}</strong> 홈으로 가기
        </a>
      </p>
    </div>
  );
};

export default Author;
