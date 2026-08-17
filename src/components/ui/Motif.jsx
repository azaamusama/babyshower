const shapes = {
  star: (
    <path d="M12 2l2.6 6.6L22 9l-5.5 4.6L18 21l-6-3.9L6 21l1.5-7.4L2 9l7.4-0.4L12 2z" />
  ),
  bow: (
    <path d="M12 12c-1.5-3-6-4.5-9-2.5C1 11 1.5 15 5 16.5c2 .9 5-.5 7-2 2 1.5 5 2.9 7 2C22.5 15 23 11 21 9.5c-3-2-7.5-.5-9 2.5zM12 12v9" />
  ),
  balloon: (
    <path d="M12 2a7 7 0 0 1 7 7c0 4-3 7.4-6 7.9l1 2.1h-4l1-2.1C8 16.4 5 13 5 9a7 7 0 0 1 7-7zM12 17v5" />
  ),
  rattle: (
    <path d="M8 8a5 5 0 1 1 8 4l6 6-2 2-6-6a5 5 0 0 1-6-6z" />
  ),
};

export default function Motif({ shape = "star", size = 40, className = "" }) {
  const path = shapes[shape] ?? shapes.star;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}
