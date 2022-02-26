import React from 'react'
import Navbar from '../../Components/Navbar'
import { MailIcon, PhoneIcon } from '@heroicons/react/outline'

const ContactUsPage=()=> {
  return (
      <div>
          <Navbar />
    <div className="relative bg-white">
       
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
      </div>
      <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
        <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
          <div className="max-w-lg mx-auto">
            <h2  title="Feel Free to contact us and know much more!"className="text-5xl font-extrabold tracking-tight  text-indigo-900 lg:text-4xl animate-pulse	animation: pulse 7s cubic-bezier(0.4, 0, 0.6, 1) infinite;

@keyframes pulse {
  0%, 100% {
    opacity: 5;
    
    
  }
  50%,75% {
    opacity: 2;
    
  }
}">Get in <span className="font-extrabold tracking-tight text-4.5xl">Touch </span>!</h2>
            <p className="mt-3 text-lg leading-6 text-gray-500">
              Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus
              arcu.
            </p>
            <dl className="mt-8 text-base text-gray-500">
              <div>
                <dt className="sr-only">Postal address</dt>
                <dd>
                  <p>742 Evergreen Terrace</p>
                  <p>Springfield, OR 12345</p>
                </dd>
              </div>
              <div className="mt-6">
                <dt className="sr-only">Phone number</dt>
                <dd className="flex">
                  <PhoneIcon className="flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">+1 (555) 123-4567</span>
                </dd>
              </div>
              <div className="mt-3">
                <dt className="sr-only">Email</dt>
                <dd className="flex">
                  <MailIcon className="flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">support@example.com</span>
                </dd>
              </div>
            </dl>
            <p className="mt-6 text-base text-gray-500">
              Looking for careers?{' '}
              <a href="#" className="font-medium text-gray-700 underline">
                View all job openings
              </a>
              .
            </p>
          </div>
        </div>
        <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
          <div className="max-w-lg mx-auto lg:max-w-none">
            <form action="#" method="POST" className="grid grid-cols-1 gap-y-6">
              <div>
                <label className=" lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600" >
                  Full name
                </label>
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  required
                  autoComplete="name"
                  className=" text-[14px] shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)  block w-full py-3 px-4 placeholder:italic placeholder-gray-400 placeholder: focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  placeholder="FirstName FatherName LastName"
                />
              </div>
              <div>
                <label htmlFor="email" className=" color:text-gray-900 lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)  block w-full py-3 px-4 placeholder:italic  placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  placeholder="Email"
                />
              </div>
              <div>
                <label htmlFor="phone" className="lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  required
                  autoComplete="tel"
                  className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)  block w-full py-3 px-4 placeholder:italic placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  placeholder="Phone"
                />
              </div>
              <div>
                <label htmlFor="message" className="lg:text-1.5xl ">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) placeholder:italic  block w-full py-3 px-4 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                  placeholder="Leave a message here."
                  defaultValue={''}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) inline-flex justify-center py-3 px-8 ml-64	margin-left: 16rem; border border-transparent ;shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
export default ContactUsPage;