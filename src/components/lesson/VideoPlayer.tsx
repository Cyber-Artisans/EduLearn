interface VideoPlayerProps {
  src?: string
  poster?: string
  title: string
}

export function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  if (!src) {
    return (
      <div
        className="relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral"
        role="img"
        aria-label={`Video for ${title}`}
      >
        {poster && (
          <img
            src={poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center text-neutral-content/70">
          No video available for this lesson
        </div>
      </div>
    )
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
      {/* Keyed by src so the player resets when the lesson changes */}
      <video
        key={src}
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        className="h-full w-full"
        aria-label={title}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  )
}