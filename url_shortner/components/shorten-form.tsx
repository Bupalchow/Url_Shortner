'use client';
import {useState} from 'react'
import {Input} from './ui/input'
import {Button} from './ui/button'

interface ShortenFormProps{
    handleUrlShortened:()=> void;
}
const UrlSF=({handleUrlShortened}:ShortenFormProps)=>{
    const [url,setUrl] = useState<string>('')
    const [isLoading,setIsLoading]= useState<boolean>(false)
    const handleSubmit =async (e: React.FormEvent) =>{
        e.preventDefault();

        setIsLoading(true);

        try{
            const response = await fetch('/api/shorten',{
                method: 'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({
                    url
                })
            })
            await response.json();
            setUrl('')
            handleUrlShortened();
        }catch(error){
            console.error('THiS Error',error)
        }finally{
            setIsLoading(false)
        }
    }
    return(
        <form onSubmit={handleSubmit} className='mb-4'>
            <div className="space-y-4">
                <Input className='h-12' type='url' placeholder='Enter Url to shorten' required value={url} onChange={e=>setUrl(e.target.value)}/>
                <Button className='w-full p-2' type='submit' disabled={isLoading}>{isLoading? 'Shortening...': 'Shorten URL'}</Button>
            </div>
        </form>
    )
}

export default UrlSF