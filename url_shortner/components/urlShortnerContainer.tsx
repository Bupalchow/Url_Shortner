'use client'
import UrlList from './url-list'
import UrlSF from './shorten-form'
import { useState } from 'react'
const UrlSC=()=>{
    const [refreshKey,setRefreshKey]=useState(0)

    const handleUrlShortened=()=>{
        setRefreshKey((prev)=>prev+1)
    }
    return(
        <div>
            <UrlSF handleUrlShortened={handleUrlShortened}/>
            <UrlList key={refreshKey}/>
        </div>
    )
}

export default UrlSC