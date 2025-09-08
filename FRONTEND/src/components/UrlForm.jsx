// import React, { useState } from 'react';
// import createShortUrl from '../api/shortUrl.api.js';
// import { useSelector } from 'react-redux';
// import { QueryClient } from '@tanstack/react-query';

// const UrlForm = ({ onShorten }) => {

//   const [url, setUrl] = useState('');
//   const [error, setError] = useState('');
//   const [shortUrl, setShortUrl] = useState('');
//   const [copyText, setCopyText] = useState('copy');
//   const { isAuthenticated } = useSelector((state) => state.auth)
//   const [customSlug, setCustomSlug] = useState("")

//   const queryClient = new QueryClient()

//   const handleSubmit = async () => {
//     const shortUrl = await createShortUrl(url, customSlug)
//     setShortUrl(shortUrl);
//     queryClient.invalidateQueries({ queryKey: ['userUrls'] })

//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(shortUrl)
//       .then(() => {
//         setCopyText('Copied!');
//         setTimeout(() => setCopyText('Copy'), 2000);
//       })
//       .catch(err => {
//         setError('Failed to copy to clipboard');
//         console.error('Failed to copy: ', err);
//       });
//   }

//   return (

     
//     <div
//       className="space-y-4 mt-[50px] max-w-lg mx-auto bg-white/30 backdrop-blur-md shadow-lg rounded-lg border border-white/30 px-5 py-10"
//        style={{ background: "#F1F1F1" }}
//     >
//       <h2 className="text-2xl font-semibold text-center mb-2">Shorten Your URL</h2>
//       <input
//         type="url"
//         value={url}
//         onChange={e => setUrl(e.target.value)}
//         placeholder="https://example.com"
//         required
//         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       {isAuthenticated && (
//         <div className="mt-4">
//           <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700 mb-1">
//             Custom URL (optional)
//           </label>
//           <input
//             type="text"
//             id="customSlug"
//             value={customSlug}
//             onChange={(event) => setCustomSlug(event.target.value)}
//             placeholder="Enter custom slug"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       )}
//       <button
//         type="submit"
//         onClick={handleSubmit}
//         className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
//       >
//         Shorten URL
//       </button>

//       {shortUrl && (
//         <div className="mt-4 p-4 bg-gray-50 rounded-md">
//           <p className="text-sm font-medium text-gray-700 mb-2">Your shortened URL:</p>
//           <div className="flex items-center">
//             <p
//               className="text-blue-600 hover:underline mr-2 text-sm truncate flex-1"
//             >
//               {shortUrl}
//             </p>
//             <button
//               onClick={copyToClipboard}
//               className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none text-sm"
//             >
//               {copyText}
//             </button>
//           </div>
//         </div>
//       )}
//       {error && (
//         <div className="text-red-600 text-sm text-center">{error}</div>
//       )}
//     </div>
//   );
// };

// export default UrlForm;

import React, { useState, useEffect } from 'react';
import createShortUrl from '../api/shortUrl.api.js';
import { useSelector } from 'react-redux';
import { QueryClient } from '@tanstack/react-query';

const UrlForm = ({ onShorten }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copyText, setCopyText] = useState('copy');
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [customSlug, setCustomSlug] = useState('');

  const queryClient = new QueryClient();

  // 🔹 Loader state
  const [loading, setLoading] = useState(true);
  const [serverUp, setServerUp] = useState(false);

  useEffect(() => {
    const wakeServer = async () => {
      try {
        const res = await fetch('https://url-shortener-emz3.onrender.com/api/wakeup');
        if (res.ok) {
          setServerUp(true);
        }
      } catch (err) {
        console.log('Server still waking up...');
      } finally {
        setLoading(false);
      }
    };

    wakeServer();
  }, []);

  const handleSubmit = async () => {
    try {
      const shortUrl = await createShortUrl(url, customSlug);
      setShortUrl(shortUrl);
      queryClient.invalidateQueries({ queryKey: ['userUrls'] });
    } catch (err) {
      setError('Failed to shorten URL');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shortUrl)
      .then(() => {
        setCopyText('Copied!');
        setTimeout(() => setCopyText('Copy'), 2000);
      })
      .catch((err) => {
        setError('Failed to copy to clipboard');
        console.error('Failed to copy: ', err);
      });
  };

  // 🔹 Loader UI
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium">
        ⏳ Waking up server... please wait
      </div>
    );
  }

  if (!serverUp) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 font-medium">
        ❌ Server not available. Try again later.
      </div>
    );
  }

  return (
    <div
      className="space-y-4 mt-[50px] max-w-lg mx-auto bg-white/30 backdrop-blur-md shadow-lg rounded-lg border border-white/30 px-5 py-10"
      style={{ background: '#F1F1F1' }}
    >
      <h2 className="text-2xl font-semibold text-center mb-2">Shorten Your URL</h2>
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isAuthenticated && (
        <div className="mt-4">
          <label
            htmlFor="customSlug"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Custom URL (optional)
          </label>
          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(event) => setCustomSlug(event.target.value)}
            placeholder="Enter custom slug"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        Shorten URL
      </button>

      {shortUrl && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-700 mb-2">Your shortened URL:</p>
          <div className="flex items-center">
            <p className="text-blue-600 hover:underline mr-2 text-sm truncate flex-1">
              {shortUrl}
            </p>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none text-sm"
            >
              {copyText}
            </button>
          </div>
        </div>
      )}
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}
    </div>
  );
};

export default UrlForm;
