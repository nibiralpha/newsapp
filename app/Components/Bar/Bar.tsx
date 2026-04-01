import React, { useEffect, useState } from 'react';
import styles from './Bar.module.css'

interface Props {
    color?: 'red' | 'amber' | 'blue' | 'green'
}

const Bar = (props: Props) => {
    return (
        <>
            <div className={`${styles.barContainer} ${props.color ? styles[props.color] : ''}`}></div>
        </>
    )
}

export default Bar