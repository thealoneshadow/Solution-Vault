
import Image from "next/image";
import Link from "next/link";
import React from "react";


const Footer = () => {
  return (
    <footer style={{position:"absolute"}} className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo2.png"
          width={23}
          height={23}
          alt="Solution Vault"
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Solution<span className="text-primary-500">Vault</span>{" "}
        </p>
      </Link>
      
      <div className="flex flex-row gap-5">

      <a href="https://github.com/thealoneshadow" target="_blank">
    <Image
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub"
              width={24}
              height={24}
              className="cursor-pointer"
            />
      
    </a>
    <a href="https://www.linkedin.com/in/imdivyanshu/" target="_blank">
    <Image
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" 
              width={24}
              height={24}
              className="cursor-pointer"
            />
      
    </a>
      </div>
      {/* <div className="flex-between gap-5">
      
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div> */}
    </footer>
  );
};

export default Footer;
