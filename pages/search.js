import Header from '../components/Header'
import Footer from '../components/Footer'
import InfoCard from '../components/InfoCard'
import { useRouter } from 'next/dist/client/router'
import { format } from 'date-fns'
import Map from '../components/Map'

const Search = ({ searchResults }) => {
  const router = useRouter()

  const { location, startDate, endDate, numGuests } = router.query

  const formattedStartDate = format(new Date(startDate), 'MMMM dd yy')
  const formattedEndDate = format(new Date(endDate), 'MMMM dd yy')
  const range = `${formattedStartDate} - ${formattedEndDate}`

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${numGuests} guests`} />

      <main className='flex'>
        <section className='flex-grow pt-14 px-6'>
          <p className='text-xs'>
            300+ Stays - {range} - for {numGuests} guests
          </p>
          <h1 className='text-3xl font-semibold mt-2 mb-6'>
            Stays in {location}
          </h1>

          <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
            <p className='button'>Cancellation Flexibility</p>
            <p className='button'>Type of Place</p>
            <p className='button'>Price</p>
            <p className='button'>Rooms and Beds</p>
            <p className='button'>More Filters</p>
          </div>

          <div className='flex flex-col'>
            {searchResults?.map(result => (
              <InfoCard
                key={result.title}
                img={result.img}
                location={result.location}
                title={result.title}
                description={result.description}
                star={result.star}
                price={result.price}
                total={result.total}
              />
            ))}
          </div>
        </section>

        <section className='hidden xl:inline-flex xl:min-w-[600px]'>
          <Map searchResults={searchResults} />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Search

export async function getServerSideProps() {
  const searchResults = await fetch('https://links.papareact.com/isz').then(
    res => res.json()
  )

  return {
    props: {
      searchResults,
    },
  }
}
