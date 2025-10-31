import Image from "next/image";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/ui/AnimatedSection";

type HeroProps = {
  title?: string;
  imageSrc?: string;
  email?: string;
};

export default function Hero({ title, imageSrc, email }: HeroProps) {
  const defaultTitle = "Where Product design meets perfection";
  const defaultImageSrc =
    "https://assets.lummi.ai/assets/QmTunJ2TWiD8AJLaRP39H4avT97zBZKyHVjKxXb9LXxWqL?auto=format&w=1500";
  const defaultEmail = "example@gmail.com";

  return (
    <AnimatedSection className="mt-4">
      <div className="bg-secondary rounded-[20px] p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h1
              className="font-medium text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-tight text-foreground break-words"
              style={{ wordBreak: "break-word", whiteSpace: "pre-line" }}
            >
              {title || defaultTitle}
            </h1>
            <Button
              asChild
              className="mt-4 sm:mt-6 lg:mt-8 text-xl rounded-full px-8 py-6"
              size={"lg"}
            >
              <a href={`mailto:${email || defaultEmail}`}>Let&apos;s Connect</a>
            </Button>
          </div>

          {/* Right */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="aspect-video w-full relative">
              <Image
                src={imageSrc || defaultImageSrc}
                alt=""
                fill
                className="object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
