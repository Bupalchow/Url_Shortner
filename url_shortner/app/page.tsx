import UrlSC from '../components/urlShortnerContainer'
export default function Home() {
  return (
    <div className='mx-auto max-w-xl py-12 md:py-24 space-y-6'>
      <div className='space-y-2 text-center'>
        <h1 className="text-3xl md:text-4xl font-bold">URL Shortner</h1>
        <p className="md:text-lg">Shorten your URLs and Share easily</p>
      </div>
      <UrlSC/>
    </div>
  );
}
