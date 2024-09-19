'use client'
import Link from 'next/link'
import { Button } from './ui/button'
import { Check, CopyIcon, EyeIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

type Url={
    id: string,
    shortCode:string,
    originalCode:string,
    visits:number
}

const UrlList=()=>{
    const [copied,setCopied] = useState<boolean>(false)
    const [copyUrl,setCopyUrl] = useState<string>('')
    const [urls, setUrls] = useState<Url[]>([])
    const[isLoading,setIsLoading]= useState<boolean>(false)
    const shortenerUrl = (code:string)=>`${process.env.NEXT_PUBLIC_BASE_URL}/${code}`
    const handleCopy = (code: string)=>{
        const fullUrl = `${shortenerUrl(code)}`
        navigator.clipboard.writeText(fullUrl).then(()=>{
          setCopied(true)  
          setCopyUrl(code)
          setTimeout(()=>{
            setCopied(false)
            setCopyUrl('')
          },2000)
        })
    }
    const fetchUrls=async()=>{
        setIsLoading(true)
        try{
            const response = await fetch('/api/fetchurls')
            const data = await response.json()
            setUrls(data)
        }catch(e){
            console.log('Error Url Fetch',e)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        fetchUrls();
    },[])



    return(
        <div>
            <h2 className="text-2xl font-bold mb-2">Recent Urls</h2>
            <ul className="space-y-2">
                {urls.map((url)=>(
                    <li key={url.id} className="flex items-center gap-2 justify-between border rounded-md border-zinc-500 p-3">
                    <Link href={`${url.shortCode}`} className='text-blue-500' target='_blank'>{shortenerUrl(url.shortCode)}</Link>
                    <div className='flex items-center gap-3'>
                        <Button size='icon' className='hover:bg-black' onClick={()=>handleCopy(url.shortCode)}>
                            {copied && copyUrl == url.shortCode ?(<Check className='w-4 h-4'/>):(<CopyIcon className='w-4 h-4'></CopyIcon>)}
                            <span className='sr-only'>Copy URL</span>
                        </Button>
                        <span className='flex items-center gap-2'>
                            <EyeIcon className='h-4 w-4 '/>{url.visits} views
                        </span>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default UrlList