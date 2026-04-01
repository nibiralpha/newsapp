import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TitleCard.module.css'
import parse from 'html-react-parser';
import { generateUrlFriendlyID, stripHTML } from '../../Utils/helper';

interface Props {
    id: string,
    title: string,
    body?: string,
    textSize?: 'lg' | 'sm',
    style?: object
}

const TitleCard = (props: Props) => {
    let { id, title, body, textSize, style } = props

    return (
        <Link to={`/artical/${generateUrlFriendlyID(id)}`}>
            <div style={{ ...style }} className={styles.cardContainer}>
                <div className={styles.body}>
                    <h3 className={`${styles.title} ${styles.cutText3} ${textSize ? styles[textSize] : 'lg'}`}>
                        {title}
                    </h3>
                    {body && (<p className={`${styles.subtext} ${styles.cutText2} mt-10`}>{stripHTML(body)}</p>)}
                </div>
            </div>
        </Link >
    )
}

export default TitleCard