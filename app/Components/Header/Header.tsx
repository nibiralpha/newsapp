import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchInput from '../SearchInput/SearchInput';
import styles from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../../Store/search.slice';

interface Props {
    style?: object
}

const Header = (props: Props) => {
    const { style } = props
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const search = useSelector((state: any) => state.searchSlice.query)
    let timer: any = null;

    const onChangeSearch = (e: string) => {
        dispatch(setQuery(e))
        navigate(`/search`)
        // setTimeout(() => {
        // navigateRoute();
        // }, 1000);

    }

    const navigateRoute = useCallback(() => {

        if (timer !== undefined) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            navigate(`/search`)
        }, 1000);
    }, [])

    const onClickOutside = () => {
        dispatch(setQuery(""));
    }

    return (
        <div>
            <div style={{ ...style }} className={styles.headerContainer}>
                <div className='container' style={{ position: 'relative' }}>
                    <div className={styles.logo}>
                        <Link to="/"> <img src='/Logo_White.png'></img></Link>
                    </div>
                    <div className={styles.searchArea}>
                        <SearchInput onClickOutside={onClickOutside} value={search} onChangeValue={(val) => { onChangeSearch(val) }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header