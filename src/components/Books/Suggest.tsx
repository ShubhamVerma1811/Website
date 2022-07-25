import React, { useState } from 'react';

export const Suggest = () => {
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [reason, setReason] = useState('');

  const handleBookSubmit = () => {
    fetch('/api/books/suggest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        authors,
        reason
      })
    })
      .then(() => {
        setTitle('');
        setAuthors('');
        setReason('');
        setShowForm(false);
        alert('Thanks for your suggestion!');
      })
      .catch(() => {
        alert('Something went wrong, please try again later');
      });
  };

  return (
    <div>
      <p
        className='text-md my-2 cursor-pointer text-skin-accent'
        onClick={() => setShowForm((prev) => !prev)}>
        Suggest me a book!
      </p>

      {showForm && (
        <form
          className='my-4'
          onSubmit={(e) => {
            e.preventDefault();
            if (!title || !authors || !reason) {
              alert('Please fill in all the fields');
              return;
            }
            handleBookSubmit();
          }}>
          <div className='grid grid-cols-1 gap-3 lg:grid-cols-2'>
            <div className='relative'>
              <input
                required
                className='peer w-full rounded-md bg-skin-secondary-muted p-4 text-skin-secondary placeholder-transparent focus-within:outline-none'
                type='text'
                name='title'
                id='title'
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label
                className='absolute left-4 -top-3 text-skin-secondary transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-skin-primary-muted peer-focus:-top-3 peer-focus:text-skin-secondary'
                htmlFor='title'>
                Title
              </label>
            </div>
            <div className='relative'>
              <input
                required
                className='peer w-full rounded-md bg-skin-secondary-muted p-4 text-skin-secondary placeholder-transparent focus-within:outline-none'
                type='text'
                name='authors'
                id='authors'
                placeholder='Author'
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
              />
              <label
                className='absolute left-4 -top-3 text-skin-secondary transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-skin-primary-muted peer-focus:-top-3 peer-focus:text-skin-secondary'
                htmlFor='authors'>
                Author(s)
              </label>
            </div>
          </div>
          <div className='relative my-4'>
            <textarea
              className='peer w-full rounded-md bg-skin-secondary-muted p-4 text-skin-secondary placeholder-transparent focus-within:outline-none'
              name='why'
              id='why'
              placeholder='why'
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <label
              className='absolute left-4 -top-3 text-skin-secondary transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-skin-primary-muted peer-focus:-top-3 peer-focus:text-skin-secondary'
              htmlFor='why'>
              Why should I read this?
            </label>
          </div>
          <button
            className='rounded-md border-2 border-skin-primary-muted p-3 text-skin-secondary hover:bg-skin-secondary-muted'
            type='submit'>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};
