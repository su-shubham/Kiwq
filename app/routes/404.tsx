export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="text-center space-y-6">
        <div className="text-8xl font-press-start animate-pixel-pulse">404</div>
        <h1 className="text-2xl font-vt323">System Breach Detected</h1>
        <p className="text-gray-400 font-vt323">The requested resource was not found.</p>
        <button className="pixel-button mt-4">
          <span className="font-vt323">Return to Base</span>
        </button>
      </div>
    </div>
  );
}