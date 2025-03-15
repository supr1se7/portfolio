"use client";

import { SpotifyLayout } from "@/components/SpotifyLayout";

export default function HomePage() {
  return (
    <>
      <SpotifyLayout />
      <iframe src="/static/spotify.html" style={{ display: 'none' }} />
    </>
  );
}
