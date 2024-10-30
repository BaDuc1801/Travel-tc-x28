import { GiFlexibleStar } from "react-icons/gi"
import VietnamMap from "./VietnamMap.tsx"
import { useState } from "react"

const Home = () => {
  const [active, setActive] = useState("Home")
  return (
    <div className="relative h-screen">
      <img src="../src/assets/img/home.webp" alt="" className="h-full w-full object-fit absolute -z-10 filter brightness-75"/>
      <div className="flex justify-between w-full bg-[#090c28] text-white pl-2 pr-2 pt-4 pb-4">
        <div className="flex items-center w-1/3">
          <GiFlexibleStar className="text-5xl" />
          {/* sau để thành Link back về home */}
          <p className="text-3xl font-bold ml-2">Travel</p>
        </div>
        <div className="flex gap-10 items-center w-1/3 justify-center text-2xl">
          <a href="#" className={(active === "Home") ? "text-red-400" : "white"} onClick={() => {setActive("Home")}}>Home</a>
          <a href="#" className={(active === "Explore") ? "text-red-400" : "white"} onClick={() => {setActive("Explore")}}>Explore</a>
          <a href="#" className={(active === "Destinations") ? "text-red-400" : "white"} onClick={() => {setActive("Destinations")}}>Destinations</a>
        </div>
        <div className="flex gap-6 text-2xl w-1/3 justify-end">
          <button className="hover:text-red-400 rounded-lg">Sign in</button>
          <button className="hover:bg-red-500 rounded-lg pl-4 pr-4 bg-red-400">Sign up</button>
        </div>
      </div>
      <div className="absolute">
        <VietnamMap/>
      </div>
    </div>
  )
}
export default Home