export default function LocaleNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page not found</h2>
      <p className="text-lg mb-8 max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <a 
        href="/"
        className="px-6 py-3 bg-foreground text-background rounded-md hover:opacity-90 transition-opacity"
      >
        Return home
      </a>
    </div>
  );
} 