'use client'

import React, { useState } from 'react'
import Link from '@/components/Link'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import axios from 'axios'

export default function ContactForm() {
  const initialFormData = { name: '', email: '', message: '' }
  const [formData, setFormData] = useState(initialFormData)
  const [formStatus, setFormStatus] = useState('waiting')
  const [token, setToken] = useState('')
  const { executeRecaptcha } = useGoogleReCaptcha()
  const { register, handleSubmit, formState: { errors }, } = useForm()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const sendMail = async (name, email, message) => {
    const data = {
      name,
      email,
      message,
    }

    try {
      const res = await axios({
        method: 'post',
        url: '/api/contact',
        headers: {
          'Content-Type': 'application/json',
        },
        data,
      })
      // console.log(res)
      return res
    } catch (error) {
      return error
    }
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

  if (formStatus === 'waiting') {
    return (
      <>
        <div className="py-4 mb-2 text-3xl font-bold font-title leading-8 tracking-normal">
          Get in touch...
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label htmlFor="name" className="text-2xl font-title">
                Name
              </label>
              <input
                {...register("name", {
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
                className="block w-full px-4 py-2 font-body text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
              />
              {errors.name?.type === 'required' && (
                <p className="my-0 tracking-wide font-body text-red-500 text-xs">
                  Name is required
                </p>
              )}
              {errors.name?.type === 'minLength' && (
                <p className="my-0 tracking-wide font-body text-red-500 text-xs">
                  Minimum lenght is 2
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label htmlFor="name" className="text-2xl font-title">
                Email
              </label>
              <input
                {...register("email", {
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
                className="block w-full px-4 py-2 font-body text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
              />
              {errors.email?.type === 'required' && (
                <p className="my-0 tracking-wide font-body text-red-500 text-xs">
                  Email is required
                </p>
              )}
              {errors.email?.type === 'pattern' && (
                <p className="my-0 tracking-wide font-body text-red-500 text-xs">
                  Not a recognized email format
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label htmlFor="name" className="text-2xl font-title">
                Message
              </label>
              <TextareaAutosize
                rows={3}
                {...register("message", { required: true })}
                onChange={handleChange}
                aria-label="Message Input"
                value={formData.message}
                className="block w-full px-4 py-2 font-body text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
              />
              {errors.message && (
                <p className="tracking-wide font-body text-red-500 text-xs">
                  A message is required
                </p>
              )}
            </div>
          </div>

          <div className="flex">
            <button
              className="bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-400 text-white text-2xl font-title tracking-normal disabled:opacity-50 py-2 px-4 rounded-lg"
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
        <div className="py-4 mb-2 text-3xl font-bold font-title leading-8 tracking-normal">
          Thanks! I&apoll get back to you soon.
        </div>
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-400 text-white text-2xl font-title tracking-normal disabled:opacity-50 py-2 px-4 rounded-lg">
            Back to Homepage
          </button>
        </Link>
      </>
    )
  } else if (formStatus === 'error') {
    return (
      <>
        <div className="py-4 mb-2 text-3xl font-bold font-title leading-8 tracking-normal">
          Oops! Somthing went wrong. Please try again or email me directly
          (contact@tim-corley.dev)
        </div>
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-400 text-white text-2xl font-title tracking-normal disabled:opacity-50 py-2 px-4 rounded-lg">
            Back to Homepage
          </button>
        </Link>
      </>
    )
  }
}
