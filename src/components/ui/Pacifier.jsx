export default function Pacifier({ photo, size = 60, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      {photo && (
        <defs>
          <clipPath id="pacifier-face-clip">
            <circle cx="50" cy="40" r="18" />
          </clipPath>
        </defs>
      )}
      <ellipse
        cx="50"
        cy="12"
        rx="16"
        ry="9"
        fill="none"
        stroke="var(--gold-deep)"
        strokeWidth="6"
      />
      <circle
        cx="50"
        cy="40"
        r="24"
        fill="var(--white)"
        stroke="var(--brown-deep)"
        strokeWidth="3"
      />
      {photo && (
        <image
          href={photo}
          x="26"
          y="16"
          width="48"
          height="48"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#pacifier-face-clip)"
        />
      )}
      <path d="M38,60 Q50,92 62,60 Z" fill="var(--brown-deep)" />
      <circle cx="50" cy="87" r="6" fill="var(--brown-deep)" />
    </svg>
  );
}
