import {NavLink} from 'react-router-dom'

const Sidebar: React.FC = () => {
  return (
    <nav className='w-30 mx-0 h-full p-2'>
        <ul className='flex flex-col justify-center'>
            <NavLink to='/'><li className='border border-white text-center border-b-0 p-4 text-xl cursor-pointer hover:bg-red-700 bg-red-400 text-white'>Home</li></NavLink>
            <NavLink to='/contacts'><li className='border border-white text-center border-b-0 p-4 text-xl cursor-pointer hover:bg-red-700 bg-red-400 text-white'>Contact</li></NavLink>
            <NavLink to='/charts'><li className='border border-white text-center border-b-0 p-4 text-xl cursor-pointer hover:bg-red-700 bg-red-400 text-white'>Charts</li></NavLink>
            <NavLink to='/maps'><li className='border border-white text-center p-4 text-xl cursor-pointer hover:bg-red-700 bg-red-400 text-white'>Maps</li></NavLink>
        </ul>
    </nav>
  )
}

export default Sidebar