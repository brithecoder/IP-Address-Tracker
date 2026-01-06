import "./InfoDisplay.css";
import type { InfoDisplayProps } from '../../Types'

export default function InfoDisplay({ data, isLoading }: InfoDisplayProps) {
  if (isLoading) return <div className="info-card loading">Retrieving data...</div>;
  if (!data) return null;
  
    return (
    <div className="info-wrapper">
     <div className="info-card">
      <div className="info-item">
        <h6>IP ADDRESS</h6>
        <p>{data.ip}</p>
      </div>

      <div className="info-item">
        <h6>LOCATION</h6>
        <p>{`${data.location.city}, ${data.location.region}`}</p>
      </div>

      <div className="info-item">
        <h6>TIMEZONE</h6>
        <p>UTC {data.location.timezone}</p>
      </div>

      <div className="info-item">
        <h6>ISP</h6>
        <p>{data.isp}</p>
      </div>
    </div>
  </div>
  )
}
