import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewsDetailResponse } from '../../Models/Response.model';
import { getNewsById } from '../../Service/News';
import styles from './Artical.module.css'
import { useParams } from 'react-router-dom';
import moment from 'moment'
import 'moment-timezone';
import Loading from '../../Components/Loading/Loading';

const defaultState = {
    status: '',
    userTier: '',
    total: '',
    content: {
        id: '',
        type: '',
        sectionId: '',
        sectionName: '',
        webPublicationDate: '',
        webTitle: '',
        webUrl: '',
        apiUrl: '',
        isHosted: '',
        pillarId: '',
        pillarName: ''
    }
}

function Artical() {
    const { id } = useParams();
    const [data, setData] = useState<NewsDetailResponse>(defaultState)
    const [loading, setLoading] = useState<boolean>(false)
    const search = useSelector((state: any) => state.searchSlice.query)

    useEffect(() => {
        if (id !== undefined) {
            getDeta(id)
        }
    }, [id])

    const getDeta = async (id: string) => {
        setLoading(true)
        const detail = await getNewsById(id, { 'show-fields': 'body,headline,thumbnail' })
        setData(detail)
        setLoading(false)
    }

    const convertTime = (date: string) => {
        return moment.tz("Europe/London").format("ddd DD MMM YYYY HH.mm [BST]")
    }

    if (loading) {
        return (<div><Loading /></div>)
    }

    return (
        <>
            <div className={`${styles.articalContainer}`}>
                <div className={`${styles.articalHeaderArea}`}>
                    <div className={`weight-400 size-12 ${styles.articleTime}`}>{convertTime(data?.content?.webPublicationDate)}</div>

                    <div className='mt-10'>
                        <h2>
                            {data.content.webTitle}
                        </h2>
                    </div>

                    <div className='mt-10'>
                        <div className={`size-20 weight-700 ${styles.articalSubHead}`}>
                            {data.content?.fields?.headline}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${styles.articalBodyArea}`}>
                <div className={`${styles.articalContent}`}>
                    <hr className='mt-15 line'></hr>
                    <div className='mt-15' dangerouslySetInnerHTML={{ __html: data?.content?.fields?.body ?? '' }}></div>
                </div>

                {data?.content?.fields?.thumbnail && (
                    <div className={`${styles.articalThumb} mt-30`}>
                        <img src={data.content.fields.thumbnail} className={`${styles.articalImg}`} />
                        <p className={`${styles.articaThumbCaption} weight-400 size-12`}>
                            {data.content.webTitle}
                        </p>
                    </div>
                )}

            </div>
        </>
    );
}

export default Artical;
