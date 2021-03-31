import React, { useState } from 'react'
import Link from '@/components/Link'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-autosize-textarea'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { sendMail } from '../lib/send-mail'

export default function ContactForm() {
  const initialFormData = { name: '', email: '', message: '' }
  const [formData, setFormData] = useState(initialFormData)
  const [formStatus, setFormStatus] = useState('waiting')
  const [token, setToken] = useState('')
  const { executeRecaptcha } = useGoogleReCaptcha()
  const { register, handleSubmit, errors } = useForm()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const onSubmit = async (data) => {
    if (!executeRecaptcha) {
      return
    }
    const result = await executeRecaptcha('contact')
    if (!result) {
      return
    }

    setToken(result)

    const { name, email, message } = data

    setFormData(initialFormData)

    const res = await sendMail(name, email, message)
    if (res.status < 300) {
      setFormStatus('sent')
    } else {
      setFormStatus('error')
    }
  }

  {
    if (formStatus === 'waiting') {
      return (
        <>
          <h1 className="text-4xl font-quicksand font-bold leading-8 tracking-tight">
            Get in touch...
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label htmlFor="name" className="text-2xl font-quicksand font-bold">
                  Name
                </label>
                <input
                  name="name"
                  ref={register({
                    required: true,
                    minLength: {
                      value: 2,
                      message: 'Minimum length is 2',
                    },
                  })}
                  onChange={handleChange}
                  aria-label="Name Input"
                  type="text"
                  value={formData.name}
                  placeholder="Your Name"
                  className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                />
                {errors.name?.type === 'required' && (
                  <p className="my-0 tracking-wide text-red-500 text-xs">Name is required</p>
                )}
                {errors.name?.type === 'minLength' && (
                  <p className="my-0 tracking-wide text-red-500 text-xs">Minimum lenght is 2</p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label htmlFor="name" className="text-2xl font-quicksand font-bold">
                  Email
                </label>
                <input
                  name="email"
                  ref={register({
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'This is not a recognized email format',
                    },
                  })}
                  onChange={handleChange}
                  aria-label="Email Input"
                  type="text"
                  value={formData.email}
                  placeholder="Your Email Address"
                  className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                />
                {errors.email?.type === 'required' && (
                  <p className="my-0 tracking-wide text-red-500 text-xs">Email is required</p>
                )}
                {errors.email?.type === 'pattern' && (
                  <p className="my-0 tracking-wide text-red-500 text-xs">
                    Not a recognized email format
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label htmlFor="name" className="text-2xl font-quicksand font-bold">
                  Message
                </label>
                <TextareaAutosize
                  rows={3}
                  name="message"
                  ref={register({ required: true })}
                  onChange={handleChange}
                  aria-label="Message Input"
                  value={formData.message}
                  placeholder="Your Message"
                  className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                />
                {errors.message && (
                  <p className="tracking-wide text-red-500 text-xs">A message is required</p>
                )}
              </div>
            </div>

            <div className="flex">
              <button
                className="bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-400 text-white text-2xl font-quicksand font-bold disabled:opacity-50 py-2 px-4 rounded-lg"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </form>
        </>
      )
    } else if (formStatus === 'sent') {
      return (
        <>
          <h1 className="text-4xl font-quicksand font-bold leading-8 tracking-tight">
            Thanks! I'll get back to you soon.
          </h1>
          <Link href="/">
            <button className="inline px-4 py-2 text-sm font-quicksand font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-blue hover:bg-blue-700 dark:hover:bg-blue-500">
              Back to homepage
            </button>
          </Link>
        </>
      )
    } else if (formStatus === 'error') {
      return (
        <>
          <h1 className="text-4xl font-quicksand font-bold leading-8 tracking-tight">
            Oops! Somthing went wrong. Please try again or email me directly.
          </h1>
          <Link href="/">
            <button className="inline px-4 py-2 text-sm font-quicksand font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-blue hover:bg-blue-700 dark:hover:bg-blue-500">
              Back to homepage
            </button>
          </Link>
        </>
      )
    }
  }
}
