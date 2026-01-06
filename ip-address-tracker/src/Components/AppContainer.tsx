import Navbar from './Navbar/Navbar'
import InfoDisplay from './InfoDisplay/InfoDisplay'
import MapContainter from './MapContainer/MapContainter'
import useFetch from '../CustomHooks/useFetch';
import type { IPData } from '../Types';

const API_KEY = import.meta.env.VITE_IPIFY_API_KEY;
const BASE_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`;

export default function AppContainer() {


    const { data,loading: isLoading, error, setUrl } = useFetch<IPData>(BASE_URL);

    const handleSearch = (searchTerm: string) => {
    // Defensive Logic: Is it a Domain (google.com) or an IP (8.8.8.8)?
    // A simple way to check: does it contain letters?
    const isDomain = /[a-zA-Z]/.test(searchTerm);
    const queryParam = isDomain ? `&domain=${searchTerm}` : `&ipAddress=${searchTerm}`;
    setUrl(`${BASE_URL}${queryParam}`);
    };
  return (
      <main className="app-wrapper">
        <Navbar onSearch={ handleSearch} />
        <InfoDisplay data={data} isLoading={isLoading}/>
        {error && (
        <div className="error-toast error-message">
          <p>⚠️ {error}</p>
        </div>
      )} 
        {/* MapContainer needs the lat/lng from API 2 */}    
        <MapContainter data={data} />
       </main>
  )
}
