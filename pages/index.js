import Head from 'next/head'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LargeCard from '../components/LargeCard'
import MediumCard from '../components/MediumCard'
import SmallCard from '../components/SmallCard'
import outdoors from '../assets/gratest_outdoors.png'
import { smallCardData } from '../data/smallCardData'
import { mediumCardData } from '../data/mediumCardData'

export default function Home() {
  return (
    <div className=''>
      <Head>
        <title>Airbmb-dev</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Banner />

      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5'>Explore Nearby</h2>

          {/* Pull data from server */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {smallCardData?.map(data => (
              <SmallCard
                key={data.img}
                img={data.img}
                location={data.location}
                distance={data.distance}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>
          <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3'>
            {mediumCardData?.map(data => (
              <MediumCard key={data.img} img={data.img} title={data.title} />
            ))}
          </div>
        </section>

        <section>
          <LargeCard
            img={outdoors}
            title='The Greatest Outdoors'
            description='Wishlists curated by Airbmb'
            buttonText='Get Inspired'
          />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const exploreData = await fetch('https://links.papareact.com/pyp').then(res =>
    res.json()
  )

  const liveAnywhereData = await fetch('https://links.papareact.com/zp1').then(
    res => res.json()
  )

  return {
    props: {
      exploreData,
      liveAnywhereData,
    },
  }
}
