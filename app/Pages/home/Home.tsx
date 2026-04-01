import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import TitleCard from '../../Components/TitleCard/TitleCard';
import NewsCard from '../../Components/NewsCard/NewsCard';
import Card from '../../Components/Card/Card';
import SelectInput from '../../Components/SelectInput/SelectInput';
import { getNews } from '../../Service/News';
import { useDispatch, useSelector } from 'react-redux';
import NewsListResponse from '../../Models/Response.model';
import NewsModel from '../../Models/News.model';
import Search from '../../Components/Search/Search';
import { setGlobalLoading, setSort } from '../../Store/search.slice';
import Loading from '../../Components/Loading/Loading';

interface Data {
    sports: NewsListResponse,
    topNews: NewsListResponse
}

const defaultState = {
    currentPage: 0,
    orderBy: '',
    pageSize: 0,
    pages: 0,
    startIndex: 0,
    status: '',
    total: 0,
    userTier: '',
    results: [],
}

function Home() {
    const dispatch = useDispatch()
    const sort = useSelector((state: any) => state.searchSlice.sort)
    const [loading, setLoading] = useState<boolean>(true)

    const [news, setNews] = useState<Data>(
        {
            sports: defaultState,
            topNews: defaultState
        }
    )

    useEffect(() => {
        getData()
    }, [sort])

    const getData = async () => {
        setLoading(true)
        let datas = await Promise.all([
            getNews({ section: 'news', 'order-by': sort, 'show-fields': 'thumbnail,body' }),
            getNews({ section: 'sport', 'order-by': sort, 'show-fields': 'thumbnail,body' }),
        ]);
        setLoading(false)
        setNews({ topNews: datas[0], sports: datas[1] })
    }


    if (loading) {
        return (<div className='container'><Loading /></div>)
    }

    return (
        <>
            <>
                <div className="App">
                    <div className={`mb-30 mt-50 flex filter-area`}>
                        <div>
                            <h1>Top stories</h1>
                        </div>
                        <div>
                            <SelectInput selected={sort} onSelect={(e) => { dispatch(setSort(e.target.value)) }} />
                        </div>
                    </div>
                    <div className='row'>

                        <div className={`col-6 col-sm-12 top-news`}>
                            <Card barColor='green'>
                                <NewsCard
                                    id={news.topNews?.results[0]?.id}
                                    img={news.topNews?.results[0]?.fields?.thumbnail}
                                    height='423px'
                                    title={news.topNews?.results[0]?.webTitle}
                                    body={news.topNews?.results[0]?.fields?.body}
                                />
                            </Card>
                        </div>

                        <div className='col-6 col-sm-12'>
                            <div className='row'>

                                <div className={`col-6 main-section-grid`}>
                                    <Card barColor='red'>
                                        <NewsCard
                                            overlayStyle={{ minHeight: "106px" }}
                                            id={news.topNews?.results[1]?.id}
                                            img={news.topNews?.results[1]?.fields?.thumbnail}
                                            height='252px'
                                            textSize='sm'
                                            title={news.topNews?.results[1]?.webTitle}
                                        />
                                    </Card>
                                </div>

                                <div className={`col-6 main-section-grid`}>
                                    <Card barColor='amber'>
                                        <NewsCard
                                            overlayStyle={{ minHeight: "106px" }}
                                            id={news.topNews?.results[2]?.id}
                                            img={news.topNews?.results[2]?.fields?.thumbnail}
                                            height='252px'
                                            textSize='sm'
                                            title={news.topNews?.results[2]?.webTitle}
                                        />
                                    </Card>
                                </div>

                                <div className={`col-6 main-section-grid`}>
                                    <Card barColor='blue'>
                                        <TitleCard
                                            id={news.topNews?.results[3]?.id}
                                            style={{ height: "150px" }}
                                            textSize='sm'
                                            title={news.topNews?.results[3]?.webTitle}
                                        />
                                    </Card>
                                </div>

                                <div className={`col-6 main-section-grid`}>
                                    <Card barColor='green'>
                                        <TitleCard
                                            id={news.topNews?.results[4]?.id}
                                            style={{ height: "150px" }}
                                            textSize='sm'
                                            title={news.topNews?.results[4]?.webTitle}
                                        />
                                    </Card>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className={`row categories-section`}>
                        {news.topNews.results.slice(5, 8).map((item: NewsModel) => {
                            return <div className='col-4 col-8-sm-12'>
                                <Card barColor='red'>
                                    <NewsCard
                                        overlayStyle={{ minHeight: "156px" }}
                                        id={news.topNews?.results[5]?.id}
                                        img={item.fields?.thumbnail}
                                        height='347px'
                                        textSize='sm'
                                        title={item.webTitle}
                                        body={item?.fields?.body}
                                    />
                                </Card>
                            </div>
                        })}
                    </div>

                    <div className='mb-30 mt-30'><h1>Sports</h1></div>
                    <div className={`row categories-section`}>
                        {news.sports.results.map((item: NewsModel) => {
                            return <div className='col-4 col-8-sm-12'>
                                <Card barColor='red'>
                                    <NewsCard
                                        overlayStyle={{ minHeight: "156px" }}
                                        id={item.id}
                                        img={item.fields?.thumbnail}
                                        height='347px'
                                        textSize='sm'
                                        title={item.webTitle}
                                        body={item?.fields?.body}
                                    />
                                </Card>
                            </div>
                        })}
                    </div>
                </div >
            </>
        </>
    );
}

export default Home;
