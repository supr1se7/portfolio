export default function HomePage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-4">
      <video
        className="w-[150px] h-[150px] mb-4"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/rocket.webm" type="video/webm" />
      </video>
      <h1 className="text-2xl font-medium mb-2">Please wait, your webapp is generating!</h1>
      <p className="text-gray-600">Switch to the Code tab above to see the progress.</p>
    </div>
  );
}
