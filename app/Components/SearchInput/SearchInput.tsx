import React, { useEffect, useRef, useState } from 'react';
import useOnClickOutside from '../../Hooks/useClickOutside';
import Bar from '../Bar/Bar';
import styles from './SearchInput.module.css'

interface Props {
    onChangeValue: (e: any) => void,
    onClickOutside: (e: any) => void,
    value: string
}

const SearchInput = (props: Props) => {
    const { onChangeValue, onClickOutside, value } = props

    const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    useOnClickOutside(ref, () => {  onClickOutside("") });

    return (
        <>
            <div className={styles.wrap} ref={ref}>
                <input value={value} onChange={(e) => onChangeValue(e.target.value)} autoComplete="off" id="search" type="text" placeholder="Search all news ?" />
                <input id="search_submit" type="submit" />
            </div>
        </>
    )
}

export default SearchInput