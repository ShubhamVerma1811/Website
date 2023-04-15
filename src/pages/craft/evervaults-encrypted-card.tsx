import { PageLayout } from 'layouts';
import { MetaLayout } from 'layouts/MetaLayout';
import { useRef, useState } from 'react';

const Card = () => {
  const [text, setText] = useState(
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. In, fuga! Consequatur, minus? Eum aliquam quas similique cum doloremque ea voluptatem explicabo odit maxime, errorLorem ipsum dolor sit amet consectetur adipisicing elit. In, fuga! Consequatur, minus? Eum aliquam quas similique cum doloremque ea voluptatem explicabo odit maxime, errorLorem ipsum dolor sit amet consectetur adipisicing elit. In, fuga! Consequatur, minus? Eum aliquam quas similique cum doloremque ea voluptatem explicabo odit maxime, errorLorem ipsum dolor sit amet consectetur adipisicing elit. In, fuga! Consequatur, minus? Eum aliquam quas similique cum doloremque ea voluptatem explicabo odit maxime, errorLorem ipsum dolor sit amet consectetur adipisicing elit. In, fuga! Consequatur, minus? Eum aliquam quas similique cum doloremque ea voluptatem explicabo odit maxime, errorLorem ipsum dolor sit amet consectetur adipisicing elit. In, fuga! Consequatur, minus? Eum aliquam quas similique cum doloremque ea voluptatem explicabo odit maxime, errorLorem ipsum dolor sit amet consectetur adipisicing elit. In, fuga! Consequatur, minus? Eum aliquam quas similique cum doloremque ea voluptatem explicabo odit maxime, errorLorem ipsum dolor sit amet consectetur adipisicing elit. In, fuga! Consequatur, minus? Eum aliquam quas similique cum doloremque ea voluptatem explicabo odit maxime, errorLorem ipsum dolor sit amet consectetur adipisicing elit. In, fuga! Consequatur, minus? Eum aliquam quas similique cum doloremque ea voluptatem explicabo odit maxime, errorLorem ipsum dolor sit amet consectetur adipisicing elit. In, fuga! Consequatur, minus? Eum aliquam quas similique cum doloremque ea voluptatem explicabo odit maxime, errorLorem ipsum dolor sit amet consectetur adipisicing elit. In, fuga! Consequatur, minus? Eum aliquam quas similique cum doloremque ea voluptatem explicabo odit maxime, errorLorem ipsum dolor sit amet consectetur adipisicing elit. In, fuga! Consequatur, minus? Eum aliquam quas similique cum doloremque ea voluptatem explicabo odit maxime, errorLorem ipsum dolor sit amet consectetur adipisicing elit. In, fuga! Consequatur, minus? Eum aliquam quas similique cum doloremque ea voluptatem explicabo odit maxime, errorLorem ipsum dolor sit amet consectetur adipisicing elit. In, fuga! Consequatur, minus? Eum aliquam quas similique cum doloremque ea voluptatem explicabo odit maxime, errorLorem ipsum dolor sit amet consectetur adipisicing elit. In, fuga! Consequatur, minus? Eum aliquam quas similique cum doloremque ea voluptatem explicabo odit maxime, errorLorem ipsum dolor sit amet consectetur adipisicing elit. In, fuga! Consequatur, minus? Eum aliquam quas similique cum doloremque ea voluptatem explicabo odit maxime, errorLorem ipsum dolor sit amet consectetur adipisicing elit. In, fuga! Consequatur, minus? Eum aliquam quas similique cum doloremque ea voluptatem explicabo odit maxime, errorLorem ipsum dolor sit amet consectetur adipisicing elit. In, fuga! Consequatur, minus? Eum aliquam quas similique cum doloremque ea voluptatem explicabo odit maxime, errorLorem ipsum dolor sit amet consectetur adipisicing elit. In, fuga! Consequatur, minus? Eum aliquam quas similique cum doloremque ea voluptatem explicabo odit maxime, errorLorem ipsum dolor sit amet consectetur adipisicing elit. In, fuga! Consequatur, minus? Eum aliquam quas similique cum doloremque ea voluptatem explicabo odit maxime, error asperiores ratione debitis aperiam consequuntur vitae hic quae asperiores ratione debitis aperiam consequuntur vitae hic quae asperiores ratione debitis aperiam consequuntur vitae hic quaerat ipsa.'
  );

  function generateFakeEncryptedText(plaintext: string) {
    const key = 'abcdefghijklmnopqrstuvwxyz'; // the substitution key
    const shuffledKey = shuffleKey(key); // shuffle the key randomly
    let ciphertext = '';

    // iterate through each character in the plaintext
    for (let i = 0; i < plaintext.length; i++) {
      const plaintextChar = plaintext.charAt(i).toLowerCase();
      let ciphertextChar = plaintextChar;

      // if the character is a letter, substitute it using the key
      if (/[a-z]/i.test(plaintextChar)) {
        const keyIndex = key.indexOf(plaintextChar);
        ciphertextChar = shuffledKey.charAt(keyIndex);
      }

      ciphertext += ciphertextChar;
    }

    return ciphertext;
  }

  function shuffleKey(key: string) {
    let shuffledKey = '';

    // convert the key to an array and shuffle it using the Fisher-Yates algorithm
    const keyArray = key.split('');
    for (let i = keyArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [keyArray[i], keyArray[j]] = [keyArray[j], keyArray[i]];
    }

    // convert the shuffled array back to a string
    shuffledKey = keyArray.join('');

    return shuffledKey;
  }

  const textRef = useRef<HTMLParagraphElement>(null);

  function relativeCoords(e: any) {
    var bounds = e.target.getBoundingClientRect();
    var x = e.clientX - bounds.left;
    var y = e.clientY - bounds.top;
    return { x: x, y: y };
  }

  function handleMoveMove(e: any) {
    if (!textRef.current) {
      return;
    }

    setText(generateFakeEncryptedText(text));
    const { x, y } = relativeCoords(e);
    const bounds = e.currentTarget.getBoundingClientRect();

    // reduce the radius at the edges.
    if (
      e.clientX < bounds.left + 10 ||
      e.clientX > bounds.right - 10 ||
      e.clientY < bounds.top + 10 ||
      e.clientY > bounds.bottom - 10
    ) {
      textRef.current.style.background = `radial-gradient(circle 100px at ${x}px ${y}px, #aff,  #5040ac, #00000010)`;
      // @ts-ignore
      textRef.current.style['-webkit-background-clip'] = 'text';
      // @ts-ignore
      textRef.current.style['-webkit-text-fill-color'] = 'transparent';
      return;
    }

    textRef.current.style.background = `radial-gradient(circle 200px at ${x}px ${y}px, #aff,  #5040ac, #00000011)`;
    // @ts-ignore
    textRef.current.style['-webkit-background-clip'] = 'text';
    // @ts-ignore
    textRef.current.style['-webkit-text-fill-color'] = 'transparent';
  }

  return (
    <PageLayout title={`Evervault's Encrypted Card`}>
      <MetaLayout title={`Evervault's Encrypted Card | Craft`} />
      <div className='border rounded-md border-gray-700 flex flex-col p-4 w-[500px] h-[700px] mx-auto'>
        <div
          className='rounded-md h-[540px] overflow-clip relative'
          onMouseMove={handleMoveMove}
          onMouseLeave={() => {
            if (!textRef.current) {
              return;
            }

            textRef.current.style.background = 'initial';
            // @ts-ignore
            textRef.current.style['-webkit-background-clip'] = 'initial';
            // @ts-ignore
            textRef.current.style['-webkit-text-fill-color'] = 'initial';
          }}>
          <p
            ref={textRef}
            className='text-md text-transparent select-none transition-all duration-500 ease-in-out '>
            {text}
          </p>

          <div className='absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
            <div className='flex items-center justify-center w-44 h-44 rounded-full m-auto bg-skin-primary opacity-80'>
              <p className='text-skin-secondary text-5xl italic font-semibold select-none font-secondary'>
                Ness
              </p>
            </div>
          </div>
        </div>

        <div className='mt-auto'>
          <p className='text-md text-skin-secondary'>
            A points-based health and wellness credit card offering rewards and
            benefits with top brands to incentivize members to spend and live
            healthily.
          </p>

          <p className='text-md rounded-full border border-gray-500 p-2 my-2 w-max text-skin-secondary'>
            PCI Compliance
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Card;
