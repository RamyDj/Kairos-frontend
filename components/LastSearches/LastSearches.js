import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/LastSearches.module.css';

function LastSearches() {

    const search = useSelector((state) => state.search.value);
    

    return (
<></>
    )
}

export default LastSearches;