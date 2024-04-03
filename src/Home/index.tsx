import { UserAuthForm } from "./components/user-auth-form";
import BankLogo from "@/assets/bank-logo.svg";
import { ModeToggle } from "@/components/Theme/mode-toggle";


export default function Home() {
  return (
    <div className="w-[95vw] mx-auto">
      <div className="justify-center items-center w-full relative h-[92vh] xs:h-[95vh] grid md:grid-cols-2 px-0">
        {/* Navbar for md and lg scr */}
        <div className="hidden md:flex relative h-full flex-col p-10 text-white dark:border-r">
          <div className="relative" />

          <div className="relative z-20 flex items-center justify-center text-lg font-medium uppercase pt-5">
            <img src={BankLogo } alt="Logo" className="w-auto" />
          </div>
          
        </div>
        {/* Navbar for scr that's smaller than md */}
        <div className="md:hidden">
          <div className="w-fit pl-5 relative z-20 flex items-center text-lg font-medium uppercase xsm:pt-5 pt-10">
            <img src={BankLogo} alt="Logo" className="w-14 px-2 " />
            BankLogo 
          </div>
        </div>
        <div className="p-16 lg:p-24">
          <div className="flex justify-between items-center">
            <ModeToggle className="w-32 px-2" />
          </div>
          <div className="mx-auto flex w-full flex-col justify-center space-y-10 sm:w-5/6 lg:4/6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-4xl font-semibold tracking-tight uppercase">
                Log In
              </h1>
              <p className="text-sm text-muted-foreground">Welcome Back!</p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our
              <a
                href="/terms"
                className="underline underline-offset-4 hover:text-primary px-2"
              >
                Terms of Service
              </a>
              and
              <a
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary pl-2"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
