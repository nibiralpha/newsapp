import React, { useEffect, useState } from 'react';
import styles from './Search.module.css';
import NewsCard from '../NewsCard/NewsCard';
import Card from '../Card/Card';
import SelectInput from '../SelectInput/SelectInput';
import { getNews } from '../../Service/News';
import { useDispatch, useSelector } from 'react-redux';
import NewsListResponse from '../../Models/Response.model';
import NewsModel from '../../Models/News.model';
import { getTopNewsSuccess, setSort } from '../../Store/search.slice';
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../Loading/Loading';

function Search() {
    const dispatch = useDispatch()
    const search = useSelector((state: any) => state.searchSlice.query)
    const sort = useSelector((state: any) => state.searchSlice.sort)
    // const loading = useSelector((state: any) => state.searchSlice.globalLoading)
    const data: NewsListResponse = useSelector((state: any) => state.searchSlice.data)

    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        getData()
    }, [sort, search])

    const getData = async () => {
        setLoading(true)
        let news = await getNews(
            {
                section: 'news',
                q: search,
                'order-by': sort,
                'show-fields': 'thumbnail',
                'page-size': 15,
                page: 1
            }
        );
        dispatch(getTopNewsSuccess(news))
        setLoading(false)
    }

    const fetchMore = async () => {
        let newNes = await getNews(
            {
                section: 'news',
                q: search,
                'order-by': sort,
                'show-fields': 'thumbnail',
                'page-size': 15,
                page: page + 1
            }
        );
        setPage(page + 1)
        dispatch(getTopNewsSuccess({ ...data, results: [...data.results, ...newNes.results] }))
    }

    if (loading) {
        return (<div><Loading /></div>)
    }

    return (
        <div className="App">
            <div className={`mb-30 mt-50 flex ${styles.filterArea}`}>
                <div>
                    <h1>Search Results</h1>
                    {!loading && data.results?.length == 0 && <div className='mt-20 size-18 '>No serach results found</div>}
                </div>
                <div>
                    <SelectInput selected={sort} onSelect={(e) => { dispatch(setSort(e.target.value)) }} />
                </div>
            </div>


            <div id='scrollableDiv'>
                <InfiniteScroll
                    dataLength={data.results?.length}
                    next={fetchMore}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    // scrollableTarget="scrollableDiv"
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            No more results found
                        </p>
                    }
                >
                    <div className={`row ${styles.categoriesSection}`}>
                        {data.results?.map((item: NewsModel) => {
                            return <div className='col-4 col-8-sm-12'>
                                <Card barColor='red'>
                                    <NewsCard
                                        overlayStyle={{ minHeight: "106px" }}
                                        id={item?.id}
                                        img={item?.fields?.thumbnail !== undefined ? item?.fields?.thumbnail : ''}
                                        height='347px'
                                        textSize='sm'
                                        title={item.webTitle}
                                        body={item.fields?.body}
                                    />
                                </Card>
                            </div>
                        })}
                    </div>
                </InfiniteScroll>
            </div>

            {/* <div className={`row ${styles.categoriesSection}`}>
                {data.results?.map((item: NewsModel) => {
                    return <div className='col-4 col-8-sm-12'>
                        <Card barColor='red'>
                            <NewsCard
                                overlayStyle={{ minHeight: "106px" }}
                                id={item?.id}
                                img={item?.fields?.thumbnail !== undefined ? item?.fields?.thumbnail : ''}
                                height='347px'
                                textSize='sm'
                                title={item.webTitle}
                                body={item.fields?.body}
                            />
                        </Card>
                    </div>
                })}
            </div> */}
        </div >
    );
}

export default Search;
