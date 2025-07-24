import AuthForm from "@/components/AuthForm";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Welcome to Photo Store</h2>
        <p className="text-gray-600">
          Sign in to upload and save your favorite photos.
        </p>
        <AuthForm />
      </div>
    </main>
  );
}