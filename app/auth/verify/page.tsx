export default function VerifyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
          <svg
            className="h-6 w-6 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Check your email
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          We've sent you a magic link to sign in. Click the link in your email to continue.
        </p>
        <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
          If you don't see the email, check your spam folder.
        </p>
      </div>
    </div>
  )
}