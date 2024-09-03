import { Link, useNavigate, useRouteError } from 'react-router-dom';

function NotFound() {
  const navigate=useNavigate();
  const error = useRouteError();
  return (
    <div className='max-w-xl px-5 py-16 mx-auto'>
      <h1 className='text-2xl mb-6 font-semibold'>Something went wrong 😢</h1>
      <p className='text-slate-500 mb-3'>{error.message || error.data}</p>
      <button onClick={() => navigate(-1)} className="link">&larr; Go Back</button>
    </div>
  );
}

export default NotFound;
