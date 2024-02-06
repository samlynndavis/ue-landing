import React from 'react';
import styles from './Notice.css';

export default ({type}) => (
	<div
		className={styles.notice}
		dangerouslySetInnerHTML={{ __html: type.value }}
	/>
);