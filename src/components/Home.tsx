import { GiFlexibleStar } from "react-icons/gi"
import VietnamMap from "./VietnamMap.tsx"
import { Tabs, TabsProps } from "antd"

const Home = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <span className="text-2xl pl-2 pr-2">Home</span>,
    },
    {
      key: '2',
      label: <span className="text-2xl pl-2 pr-2">Explore</span>,
    },
    {
      key: '3',
      label: <span className="text-2xl pl-2 pr-2">Explore</span>,
    },
    {
      key: '4',
      label: <span className="text-2xl pl-2 pr-2">Explore</span>,
    },
  ];

  return (
    <div className="relative bg-[#FAFAD2]">
      <div className="pl-4 pr-4 pt-2 flex justify-between sticky top-0 left-0 w-full bg-[#FAFAD2] z-10">
        <div className="flex items-center gap-2 pb-4 w-1/3">
          <GiFlexibleStar className="text-5xl" />
          <p className="text-3xl font-bold">Travel</p>
        </div>
        <div className="flex items-end w-1/3 justify-center">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
        <div className="flex gap-2 text-xl w-1/3 justify-end">
          <button className="hover:bg-[#1677ff] hover:text-white rounded-lg pl-4 pr-4">Sign in</button>
          <button className="hover:bg-[#1677ff] hover:text-white rounded-lg pl-4 pr-4">Sign up</button>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/3">1</div>
        <div className="rounded-md overflow-hidden w-1/3 sticky top-[72px] h-[calc(100vh-72px)]">
          <VietnamMap />
        </div>
        <div className="w-1/3 pl-10 pr-10 pt-2">
          <p className="text-3xl">Trending Destination</p>
          <div>
            <p className="text-xl mt-4 mb-4">Hà Nội</p>
            <img className="rounded-xl" src="https://media1.giphy.com/media/a93jwI0wkWTQs/giphy.gif?cid=6c09b952h8dwn0gwnt6vt16h9jjh8ubdvoph7g1rjd29vymb&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="" />
          </div>
          <div>
            <p className="text-xl mt-4 mb-4">Hà Nội</p>
            <img className="rounded-xl" src="https://media1.giphy.com/media/a93jwI0wkWTQs/giphy.gif?cid=6c09b952h8dwn0gwnt6vt16h9jjh8ubdvoph7g1rjd29vymb&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="" />
          </div><div>
            <p className="text-xl mt-4 mb-4">Hà Nội</p>
            <img className="rounded-xl" src="https://media1.giphy.com/media/a93jwI0wkWTQs/giphy.gif?cid=6c09b952h8dwn0gwnt6vt16h9jjh8ubdvoph7g1rjd29vymb&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="" />
          </div><div>
            <p className="text-xl mt-4 mb-4">Hà Nội</p>
            <img className="rounded-xl" src="https://media1.giphy.com/media/a93jwI0wkWTQs/giphy.gif?cid=6c09b952h8dwn0gwnt6vt16h9jjh8ubdvoph7g1rjd29vymb&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="" />
          </div><div>
            <p className="text-xl mt-4 mb-4">Hà Nội</p>
            <img className="rounded-xl" src="https://media1.giphy.com/media/a93jwI0wkWTQs/giphy.gif?cid=6c09b952h8dwn0gwnt6vt16h9jjh8ubdvoph7g1rjd29vymb&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="" />
          </div><div>
            <p className="text-xl mt-4 mb-4">Hà Nội</p>
            <img className="rounded-xl" src="https://media1.giphy.com/media/a93jwI0wkWTQs/giphy.gif?cid=6c09b952h8dwn0gwnt6vt16h9jjh8ubdvoph7g1rjd29vymb&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home