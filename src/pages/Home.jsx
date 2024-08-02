    import homeImage from '../assets/images/home-photo.avif'
    import { useNavigate } from 'react-router-dom'


    export default function Home() {

    const navigate = useNavigate()

    const handleGetStarted = () => {
    navigate('/blogs')
    }


    return (
    <div className=' flex justify-center items-center min-h-screen'>
        <div className='home-grid grid grid-cols-1 lg:grid-cols-3 items-center bg-white bg-opacity-50 md:px-20 md:py-10 gap-5 rounded-lg' >
            <div className='home-intro lg:col-span-2 flex flex-col items-start px-5 gap-10'>
                <h1 className='text-2xl md:text-5xl'>Discover Stunning <span className='font text-2xl md:text-5xl font-extrabold'>Photography</span></h1>
                <p className='text-2xl'>Explore the world through our lens. Dive into captivating photo stories and blog posts.</p>
                <div className='home-buttons flex flex-row gap-8'>
                    <button className='btn capitalize text-white bg-blue-gray-800 py-2 px-5 md:py-3 md:px-8 rounded-md transition-all'
                    onClick={handleGetStarted}
                    >
                    get started
                    </button>
                </div>
            </div>
            <div>
                <img src={homeImage} alt='home-image' className='w-96 object-cover rounded-lg hidden lg:block' />
            </div>
        </div>
    </div>
        
    )
    }




