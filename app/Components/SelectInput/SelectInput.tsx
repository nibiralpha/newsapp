import React, { useEffect, useState } from 'react';
import Bar from '../Bar/Bar';
import styles from './SelectInput.module.css'

interface Props {
    onSelect: (e: any) => void,
    selected: string
}

const SelectInput = (props: Props) => {
    const { onSelect, selected } = props
    return (
        <>
            <div className={styles.select}>
                <select value={selected} id="standard-select" onChange={onSelect}>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
                <span className={styles.focus}></span>
            </div>
        </>
    )
}

export default SelectInput