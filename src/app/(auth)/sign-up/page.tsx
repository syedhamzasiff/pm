import { GalleryVerticalEnd } from "lucide-react"

import { SignUpForm } from "@/components/SignupForm"

export function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-black lg:block">
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-white">Projectify</h1>
        </div>
      </div>
    </div>
  )
}



export default SignUpPage;