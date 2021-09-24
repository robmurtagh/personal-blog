/**
 * Autoplay an mp4 video inline with the article
 */
export default function VideoAutoplay({ src }: { src: string }) {
  return (
    <video className="w-full" autoPlay muted loop playsInline>
      <source src={src} type="video/mp4" />
    </video>
  );
}
