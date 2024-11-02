import React from 'react'
import { FaFacebook, FaInstagram, FaPhoneAlt, FaTwitter, FaYoutube } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { GiFlexibleStar } from 'react-icons/gi'
import { MdEmail } from 'react-icons/md'

const Footer: React.FC = () => {
    return (
        <div className='bg-red-500 text-white mt-20 flex pl-20 pr-20 pt-10 pb-10'>
            <div className="flex w-1/4">
                <GiFlexibleStar className="text-6xl" />
                <p className="text-6xl font-bold ml-2">Travel</p>
            </div>
            <div className='w-1/2 flex justify-around text-xl font-semibold'>
                <div>
                    <p className='flex items-center gap-2'><span><FaLocationDot /></span>Address</p>
                    <p className='font-normal text-sm mt-5'>120 Kim Giang, Hoang Mai, Ha Noi</p>
                </div>
                <div>
                    <p className='flex items-center gap-2'><span><FaPhoneAlt /></span>Phone</p>
                    <p className='font-normal text-sm mt-5'>+84 68 68 68 68</p>
                </div>
                <div>
                    <p className='flex items-center gap-2'><span><MdEmail /></span>Email</p>
                    <p className='font-normal text-sm mt-5'>travel.social.media@gmail.com</p>
                </div>
            </div>
            <div className='w-1/4'>
                <p className='text-center text-xl font-semibold'>FOLLOW US</p>
                <div className='flex justify-around mt-5 text-4xl cursor-pointer'>
                    <FaFacebook />
                    <FaYoutube />
                    <FaInstagram />
                    <FaTwitter />
                </div>
            </div>
        </div>
    )
}

export default Footer
