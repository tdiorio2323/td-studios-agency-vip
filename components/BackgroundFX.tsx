"use client";

/**
 * BackgroundFX renders premium vignette + chromatic blobs + subtle shimmer.
 * It sits behind all content and is pointer-events:none.
 */
export default function BackgroundFX(){
  return (
    <div className="fx-root">
      <div className="fx-vignette" />
      <div className="fx-blobs" />
      <div className="fx-shimmer" />
    </div>
  );
}
