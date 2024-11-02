import { GiFlexibleStar } from "react-icons/gi"
import VietnamMap from "./VietnamMap.tsx"
import { useState } from "react"
import homeImg from "../assets/img/home.jpg"
import DestinationCard from "./DestinationCard.tsx"
import Footer from "./Footer.tsx"

const Home = () => {
  const [active, setActive] = useState("Home")
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const destinations = [
    {
      city: "Hà Nội",
      name: "Hồ Hoàn Kiếm",
      description: "Biểu tượng của thủ đô Hà Nội, nơi có Tháp Rùa và cầu Thê Húc nối với đền Ngọc Sơn.",
      image: homeImg
    },
    {
      city: "Hạ Long",
      name: "Vịnh Hạ Long",
      description: "Di sản thiên nhiên thế giới, nổi tiếng với hàng nghìn đảo đá vôi tuyệt đẹp giữa biển khơi.",
      image: homeImg
    },
    {
      city: "Huế",
      name: "Đại Nội Huế",
      description: "Kinh thành cổ kính của triều Nguyễn, nơi lưu giữ những giá trị văn hóa và lịch sử đặc sắc.",
      image: homeImg
    },
    {
      city: "Đà Nẵng",
      name: "Cầu Rồng",
      description: "Cây cầu nổi tiếng với kiến trúc hình rồng độc đáo và màn phun lửa, phun nước vào cuối tuần.",
      image: homeImg
    },
    // {
    //   city: "Hội An",
    //   name: "Phố cổ Hội An",
    //   description: "Khu phố cổ quyến rũ với kiến trúc cổ xưa, những con đường đèn lồng và không khí yên bình.",
    //   image: homeImg
    // },
    // {
    //   city: "Nha Trang",
    //   name: "Tháp Bà Ponagar",
    //   description: "Khu di tích Champa cổ xưa với kiến trúc độc đáo nằm giữa thiên nhiên tươi đẹp.",
    //   image: homeImg
    // },
    // {
    //   city: "Đà Lạt",
    //   name: "Thung Lũng Tình Yêu",
    //   description: "Địa điểm thơ mộng với cảnh quan thiên nhiên tươi đẹp, nổi tiếng là nơi lãng mạn cho các cặp đôi.",
    //   image: homeImg
    // },
    // {
    //   city: "Phú Quốc",
    //   name: "Bãi Sao",
    //   description: "Bãi biển cát trắng mịn, nước trong xanh, là điểm đến lý tưởng cho kỳ nghỉ biển.",
    //   image: homeImg
    // },
    // {
    //   city: "Cần Thơ",
    //   name: "Chợ Nổi Cái Răng",
    //   description: "Chợ nổi đặc trưng của miền Tây Nam Bộ, nơi bạn có thể trải nghiệm cuộc sống sông nước.",
    //   image: homeImg
    // },
    // {
    //   city: "TP. Hồ Chí Minh",
    //   name: "Nhà Thờ Đức Bà",
    //   description: "Công trình kiến trúc Pháp nổi tiếng, biểu tượng của TP. Hồ Chí Minh.",
    //   image: homeImg
    // }
  ];


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
        {false ?
          <div className="flex gap-6 text-xl w-1/3 justify-end">
            <button className="hover:text-red-400 rounded-lg">Sign in</button>
            <button className="hover:bg-red-500 rounded-lg pl-4 pr-4 pt-2 pb-2 bg-red-400">Sign up</button>
          </div> :
          <div className="flex items-center gap-2 w-1/3 justify-end">
            <p>User's Name</p>
            <div className="h-10 w-10 rounded-full relative bg-red-500 group cursor-pointer" onClick={toggleMenu}>
              {showMenu && (
                <>
                  <div className="absolute top-[40px] right-0 z-10 rounded-md overflow-hidden bg-white">
                    <a className="block px-4 py-2 text-black rounded-md bg-white hover:bg-red-100 whitespace-nowrap">Personal Profile</a>
                    <a className="block px-4 py-2 text-black rounded-md bg-white hover:bg-red-100">Log Out</a>
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
        <div className="grid grid-cols-4 gap-4 mt-4">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={index}
              city={destination.city}
              name={destination.name}
              description={destination.description}
              image={destination.image}
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