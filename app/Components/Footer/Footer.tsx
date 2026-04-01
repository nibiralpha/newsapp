import React, { useEffect, useState } from 'react';
import Bar from '../Bar/Bar';
import styles from './Footer.module.css'

interface Props {
    style?: object
}

const Footer = (props: Props) => {
    const { style } = props
    return (
        <div style={{ ...style }} className={styles.footerContainer}>

        </div>
    )
}

export default Footer