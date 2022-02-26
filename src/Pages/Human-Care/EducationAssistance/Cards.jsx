import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import SingleCard from "./SingleCard";
const people = [
  {
    case: 1,
    age: "12",
    skills: ["array of skills' names"],
    certificates: ["array of certificates's names"],
  },
  {
    case: 2,
    age: "15",
    skills: ["array of skills' names"],
    certificates: ["array of asdcertificates's names"],
  },
  {
    case: 3,
    age: "15",
    skills: ["array of skills' names"],
    certificates: ["array of asdcertificates's names"],
  },
  {
    case: 4,
    age: "15",
    skills: ["array of skills' names"],
    certificates: ["array of asdcertificates's names"],
  },
  {
    case: 5,
    age: "15",
    skills: ["array of skills' names"],
    certificates: ["array of asdcertificates's names"],
  },
  {
    case: 6,
    age: "15",
    skills: ["array of skills' names"],
    certificates: ["array of asdcertificates's names"],
  },
];

export default function Example() {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {people.map((person) => (
        <li
          key={person.case}
          className="col-span-1 bg-white rounded-lg  divide-y divide-gray-200"
        >
          <div className="w-full flex items-center justify-between p-6 space-x-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <SingleCard
                  key={person.case}
                  case={person.case}
                  age={person.age}
                  skills={person.skills}
                  certificates={person.certificates}
                />
              </div>
              <p className="mt-1 text-gray-500 text-sm truncate">
                {person.title}
              </p>
            </div>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200 hover:bg-yellow-400 shadow-lg ">
              <div className="w-0 flex-1 flex">
                <Link
                  to={`/details/${person.case}`}
                  className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                  <span className="ml-3 text-lg ">More Details</span>
                </Link>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
