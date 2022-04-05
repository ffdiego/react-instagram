export function HomeIcon() {
  return (
    <svg
      className="w-8 mr-6 text-black-light cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}

export function SignOutIcon() {
  return (
    <svg
      className="w-8 mr-6 text-black-light cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );
}

export function LikeIcon({ onClick, liked }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      tabIndex={0}
      onClick={onClick}
      className={`w-8 mr-4 select-none cursor-pointer focus:outline-none ${
        liked ? "fill-red text-red-primary" : "text-black-light"
      }`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
}

export function LikeIconFull() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-8 mr-4"
    >
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function CommentIcon({ onClick }) {
  return (
    <svg
      className="w-8 text-black-light select-none cursor-pointer focus:outline-none"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      tabIndex={0}
      onClick={onClick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

export function CommentIconFull() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-8 mr-4"
    >
      <path
        fillRule="evenodd"
        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 0"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function AddIcon({ onClick }) {
  return (
    <svg
      className="w-7 mr-6 cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 122.88 119.8"
      fill="currentColor"
      onClick={onClick}
    >
      <path d="M23.59,0h75.7a23.63,23.63,0,0,1,23.59,23.59V96.21A23.64,23.64,0,0,1,99.29,119.8H23.59a23.53,23.53,0,0,1-16.67-6.93l-.38-.42A23.49,23.49,0,0,1,0,96.21V23.59A23.63,23.63,0,0,1,23.59,0ZM55.06,38.05a6.38,6.38,0,1,1,12.76,0V53.51H83.29a6.39,6.39,0,1,1,0,12.77H67.82V81.75a6.38,6.38,0,0,1-12.76,0V66.28H39.59a6.39,6.39,0,1,1,0-12.77H55.06V38.05ZM99.29,12.77H23.59A10.86,10.86,0,0,0,12.77,23.59V96.21a10.77,10.77,0,0,0,2.9,7.37l.28.26A10.76,10.76,0,0,0,23.59,107h75.7a10.87,10.87,0,0,0,10.82-10.82V23.59A10.86,10.86,0,0,0,99.29,12.77Z" />
    </svg>
  );
}

export function PhotosUploadIcon() {
  return (
    <svg
      className="w-20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 33 32"
    >
      <g>
        <path
          fill="#828282"
          d="M1.5,28h26c0.827,0,1.5-0.673,1.5-1.5v-25C29,0.673,28.327,0,27.5,0h-26C0.673,0,0,0.673,0,1.5v25
		C0,27.327,0.673,28,1.5,28z M1,1.5C1,1.224,1.225,1,1.5,1h26C27.775,1,28,1.224,28,1.5v25c0,0.276-0.225,0.5-0.5,0.5h-26
		C1.225,27,1,26.776,1,26.5V1.5z"
        />
        <path
          fill="#828282"
          d="M18,11c1.103,0,2-0.897,2-2s-0.897-2-2-2s-2,0.897-2,2S16.897,11,18,11z M18,8c0.552,0,1,0.449,1,1
		s-0.448,1-1,1s-1-0.449-1-1S17.448,8,18,8z"
        />
        <path
          fill="#828282"
          d="M3.5,23h22c0.276,0,0.5-0.224,0.5-0.5v-19C26,3.224,25.776,3,25.5,3h-22C3.224,3,3,3.224,3,3.5v19
		C3,22.776,3.224,23,3.5,23z M4,22v-4.638c0.022-0.016,0.047-0.025,0.067-0.045l5.116-5.116c0.26-0.26,0.712-0.259,0.972,0
		l7.521,7.521c0.098,0.098,0.226,0.146,0.354,0.146c0.124,0,0.248-0.046,0.345-0.138l3.866-3.672c0.13-0.13,0.303-0.202,0.486-0.202
		c0.184,0,0.355,0.072,0.464,0.178L25,18.093V22H4z M25,4v12.581l-1.081-1.228c-0.317-0.319-0.741-0.495-1.191-0.495
		c-0.001,0-0.001,0-0.001,0c-0.451,0-0.875,0.176-1.185,0.486l-3.504,3.328l-7.176-7.177c-0.639-0.638-1.749-0.637-2.386,0L4,15.971
		V4H25z"
        />
        <path
          fill="#828282"
          d="M4.5,29.083c-0.276,0-0.5,0.224-0.5,0.5V30.5C4,31.327,4.673,32,5.5,32h26c0.827,0,1.5-0.673,1.5-1.5v-26
		C33,3.673,32.327,3,31.5,3h-0.917c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5H31.5C31.775,4,32,4.224,32,4.5v26
		c0,0.276-0.225,0.5-0.5,0.5h-26C5.225,31,5,30.776,5,30.5v-0.917C5,29.307,4.776,29.083,4.5,29.083z"
        />
      </g>
    </svg>
  );
}
