import Image from "next/image";
import { Mail, User } from "lucide-react";

type FooterProps = {
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
};

export default function Footer({
  email,
  firstName,
  lastName,
  profileImage,
}: FooterProps) {
  // Fallbacks
  const contactEmail = email || "example@gmail.com";
  const fullName =
    firstName && lastName ? `${firstName} ${lastName}` : "Cofounds";

  return (
    <section className="mt-20 sm:mt-24 lg:mt-32">
      <div className="text-center">
        {/* Profile Image Stack */}
        <div className="relative overflow-hidden w-80 h-56 mx-auto">
          {profileImage ? (
            <Image
              src={profileImage}
              alt="Profile"
              width={160}
              height={160}
              className="absolute -bottom-10 rounded-full left-1/2 transform -translate-x-1/2 object-cover w-50 h-50"
            />
          ) : (
            <div className="absolute -bottom-16 rounded-full left-1/2 transform -translate-x-1/2 w-40 h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <User className="w-20 h-20 text-gray-400 dark:text-gray-500" />
            </div>
          )}
        </div>
        <div className="bg-secondary overflow-hidden relative rounded-t-[20px]  sm:p-12 max-w-4xl mx-auto">
          <div className="absolute h-full w-16 top-0 inset -left-10 bg-orange-800/30 blur-2xl" />
          <div className="absolute h-full w-16 top-0 inset -right-10 bg-orange-800/30 blur-2xl" />

          <Mail className="w-16 h-15 mx-auto mb-6" size={66} />
          <h2 className="font-medium text-4xl sm:text-5xl lg:text-[52px] text-foreground leading-tight mb-6">
            Let&apos;s work together
          </h2>

          <a
            href={`mailto:${contactEmail}`}
            className="mb-4 inline-block bg-primary text-secondary font-medium rounded-full transition-all duration-300 transform hover:-translate-y-1 px-8 py-4 text-lg"
          >
            {contactEmail}
          </a>
        </div>
        {/* Footer */}
        <div className="bg-secondary p-3">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 items-center max-w-6xl mx-auto">
            {/* Navigation Links */}
            <div className="bg-secondary rounded-[18px] px-4 py-2">
              <p className="font-normal text-base text-foreground/70">
                © {new Date().getFullYear()} {fullName}. All rights reserved.
              </p>
            </div>
            {/* Social Icons */}
            <div className="justify-center">
              <a
                href="/sign-in"
                className="text-foreground font-medium text-sm transition-all duration-300 hover:text-primary"
              >
                Build Your Own Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
