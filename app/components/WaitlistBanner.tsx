export const WaitlistBanner = () => {
  return (
    <div className="bg-royal px-6 py-2.5 sm:px-3.5">
      <p className="text-center text-sm font-medium text-white">
        <a
          href="https://www.noblocks.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start justify-center gap-1.5"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-[3.25px] flex-shrink-0"
          >
            <path
              d="M0 14H8.14902V4.35613C8.14902 3.5214 8.82378 2.84438 9.65626 2.84438C10.4887 2.84438 11.1635 3.5214 11.1635 4.35613V14H14V0H0V14Z"
              fill="white"
            />
          </svg>
          Introducing Noblocks, our sleek on and off ramp experience. Join the
          waitlist ↗
        </a>
      </p>
    </div>
  );
};
