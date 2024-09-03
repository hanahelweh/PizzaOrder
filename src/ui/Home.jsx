import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser'
import Button from './Button';
function Home() {
  const userName=useSelector(state=>state.user.username);
    return (
      <div className='max-w-5xl px-5 mx-auto overflow-x-hidden'>
        <div className='relative sm:h-60 h-48 w-28 sm:w-64 bg-red-700 ml-auto'>
          <div className='absolute aspect-square bg-no-repeat bottom-0 w-44 sm:w-80 translate-x-[-30px] translate-y-[50%] bg-contain left-0 right-0 bg-center' style={{backgroundImage:'url(pizza.png)'}}></div>
        </div>
        <h1 className='text-2xl sm:text-6xl mt-14 sm:mt-0'>
          Are You
          <br />
          <span className='font-bold text-4xl sm:text-8xl text-red-700'>Hungry?</span>
        </h1>
        {userName==='' ? <CreateUser/> : <Button type='primary' to="/menu">Go To Menu</Button>}
      </div>
    );
  }
  
  export default Home;
  