import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { updateName } from './userSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [username, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateName(username));
    navigate('/menu')
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className='text-sm sm:text-lg font-semibold mt-6'>Your name:</p>

      <input
      className='input bg-slate-100 mt-2'
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div className='mt-3'>
          <Button type='primary'>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;