import React, { useState } from 'react';

export const Suggest = () => {
  const [showForm, setShowForm] = useState(false);
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
            // @ts-ignore
            const title = e.target[0].value;
            // @ts-ignore
            const authors = e.target[1].value;
            // @ts-ignore
            const reason = e.target[2].value;

            if (!title || !authors || !reason) {
              alert('Please fill in all the fields');
              return;
            }

            fetch('/api/books/suggest', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title,
                authors,
                reason,
              }),
            })
              .then(() => {
                alert('Thanks for your suggestion!');
              })
              .catch((err) => {
                alert('Something went wrong, please try again later');
              });
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
              // type='text'
              name='why'
              id='why'
              placeholder='why'
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
