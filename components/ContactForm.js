import React, { useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

export default function ContactForm() {
  const [token, setToken] = useState('')
  const { executeRecaptcha } = useGoogleReCaptcha()
  const clickHandler = async (e) => {
    e.preventDefault()
    if (!executeRecaptcha) {
      return
    }
    const result = await executeRecaptcha('contact')
    setToken(result)
  }

  return (
    <>
      <h1 className="text-4xl font-quicksand font-bold leading-8 tracking-tight">
        Get in touch...
      </h1>
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label htmlFor="name" className="text-2xl font-quicksand font-bold">
              Name
            </label>
            <input
              required
              aria-label="Name Input"
              type="text"
              placeholder="Your Name"
              className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label htmlFor="name" className="text-2xl font-quicksand font-bold">
              Email
            </label>
            <input
              required
              aria-label="Email Input"
              type="email"
              placeholder="Your Email Address"
              className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label htmlFor="name" className="text-2xl font-quicksand font-bold">
              Message
            </label>
            <textarea
              required
              aria-label="Message Input"
              placeholder="Your Message"
              className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        </div>

        <div className="flex">
          <button
            className="bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-400 text-white text-2xl font-quicksand font-bold py-2 px-4 rounded-lg"
            onClick={clickHandler}
            type="submit"
          >
            Send Message
          </button>
        </div>
      </form>
    </>
  )
}
