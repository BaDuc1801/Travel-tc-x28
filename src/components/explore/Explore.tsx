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
        <Footer />
      </div> */}
    </div>
  )
}
export default Explore