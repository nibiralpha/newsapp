import React, { useEffect, useState } from 'react';
import Bar from '../Bar/Bar';
import TitleCard from '../TitleCard/TitleCard';
import styles from './NewsCard.module.css'

interface Props {
    id: string,
    img: string | undefined,
    title: string,
    body?: string,
    textSize?: 'lg' | 'sm',
    style?: object,
    overlayStyle?: object,
    height?: string,
}

const NewsCard = (props: Props) => {
    let { id, img, title, body, textSize, style, height, overlayStyle } = props

    return (
        <div style={{ ...style }} className={styles.cardContainer}>
            <div style={{ height: height ? height : 'auto' }}>
                <img className={styles.image} src={(img != "" && img !== undefined) ? img : '/thumb.jpg'}></img>
            </div>
            <div className={styles.content}>
                <TitleCard
                    style={{ ...overlayStyle }}
                    id={id}
                    title={title}
                    body={body}
                    textSize={textSize}
                />
            </div>
            <Bar></Bar>
        </div>
    )
}

export default NewsCard