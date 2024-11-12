import { GiFlexibleStar } from "react-icons/gi"
import VietnamMap from "./VietnamMap.tsx"
import { useEffect, useState } from "react"
import homeImg from "../assets/img/home.jpg"
import DestinationCard from "./DestinationCard.tsx"
import Footer from "./Footer.tsx"
import axios from "axios"
import { Link } from "react-router-dom"

interface DestinationCardType {
  city: string;
  destiName: string;
  description: string;
  img: string;
}
const Home = () => {
  const [active, setActive] = useState("Home")
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [desti, setDesti] = useState<DestinationCardType[]>([])


  useEffect(() => {
    const fetchData = async () :  Promise<void>  => {
      const data = await axios.get("https://be-travel-tc-x28-1end.vercel.app/destinations");
      setDesti(data.data);
    }
    fetchData();
  }, [])

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const isAuthenticated = window.localStorage.getItem('authenticated') === 'true';
  const user= JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="relative h-screen">
      <img src={homeImg} alt="" className="h-full w-full object-fit absolute -z-10 filter brightness-75" />
      <div className="flex justify-between w-full bg-[#090c28] text-white pl-2 pr-2 pt-2 pb-2">
        <div className="flex items-center w-1/3">
          <GiFlexibleStar className="text-3xl" />
          {/* sau để thành Link back về home */}
          <p className="text-2xl font-bold ml-2">Travel</p>
        </div>
        <div className="flex gap-10 items-center w-1/3 justify-center text-xl">
          <a href="#" className={(active === "Home") ? "text-red-400" : "white"} onClick={() => { setActive("Home") }}>Home</a>
          <a href="#" className={(active === "Explore") ? "text-red-400" : "white"} onClick={() => { setActive("Explore") }}>Explore</a>
          <a href="#" className={(active === "Destinations") ? "text-red-400" : "white"} onClick={() => { setActive("Destinations") }}>Destinations</a>
        </div>
        {!isAuthenticated ?
          <div className="flex gap-6 text-xl w-1/3 justify-end">
            <button className="hover:text-red-400 rounded-lg">Sign in</button>
            <button className="hover:bg-red-500 rounded-lg pl-4 pr-4 pt-2 pb-2 bg-red-400">Sign up</button>
          </div> :
          <div className="flex items-center gap-2 w-1/3 justify-end">
            <p>{user.name}</p>
            <div className="h-10 w-10 relative group cursor-pointer " onClick={toggleMenu}>
              <img src={user.profilePic.profilePicture} className="rounded-full"/>
              {showMenu && (
                <>
                  <div className="absolute top-[40px] right-0 z-10 rounded-md overflow-hidden bg-white">
                    <Link to={'/profile'} className="block px-4 py-2 text-black rounded-md bg-white hover:bg-red-100 whitespace-nowrap">Personal Profile</Link>
                    <Link to={'/login'} className="block px-4 py-2 text-black rounded-md bg-white hover:bg-red-100">Log Out</Link>
                  </div>
                </>
              )}
            </div>
          </div>

        }
      </div>
      <div className="">
        <VietnamMap />
      </div>
      <div className="pl-20 pr-20 pt-16">
        <p className="text-3xl font-semibold">Must-See Destinations</p>
        <p className="text-lg text-gray-500 mt-2 mb-2">Get inspired for your next trip with these must-visit locations.</p>
        <div className="grid grid-cols-4 gap-6 mt-4">
          {desti.map((destination, index) => (
            <DestinationCard
              key={index}
              city={destination.city}
              name={destination.destiName}
              description={destination.description}
              image={destination.img}
            />
          ))}
        </div>
        <div className="flex justify-center mt-10 "><button className="text-lg rounded-lg pr-4 pl-4 pt-2 pb-2 text-white bg-red-500 hover:bg-red-600">See More</button></div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}
export default Home