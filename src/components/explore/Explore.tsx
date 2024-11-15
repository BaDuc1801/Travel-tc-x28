// import Footer from "./Footer.tsx"
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import VietnamMap from "./VietnamMap.tsx"
import homeImg from "../../assets/img/home.jpg"
import React from 'react'

const Explore : React.FC = () => {

  return (
    <div className="relative">
      <img src={homeImg} alt="" className="h-full w-full object-fit absolute -z-10 filter brightness-75" />
      <div className="">
        <VietnamMap />
      </div>
      {/* <div>
        <MapContainer center={[21.028182541862833, 105.83370094459077]} zoom={13} scrollWheelZoom={false} style={{height: '400px', width: '50%'}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[21.028182541862833, 105.83370094459077]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div> */}
      {/* <div>
        <Footer />
      </div> */}
    </div>
  )
}
export default Explore