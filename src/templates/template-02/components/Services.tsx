import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { services } from "@/constants";
export default function Services() {
  return (
    <AnimatedSection className="mt-20 sm:mt-24 lg:mt-32">
      <div className="text-center mb-12 sm:mb-16">
        <Image
          src="/images/img_6625065aaabd00c_white_a700_60x60.svg"
          alt="Services Icon"
          width={60}
          height={60}
          className="w-12 sm:w-15 h-12 sm:h-15 mx-auto mb-4"
        />
        <p className=" font-medium text-base text-foreground/40 uppercase tracking-wider mb-2">
          SERVICES SECTION
        </p>
        <h2 className=" font-medium text-4xl sm:text-5xl lg:text-[52px] text-foreground leading-tight">
          Check my services
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-linear-to-b overflow-hidden from-secondary to-secondary/20 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset] rounded-[20px] p-8 sm:p-10 relative"
          >
            <div className="absolute -right-5 -top-5 z-10 h-40 w-40 rounded-full bg-linear-to-b from-primary/10 to-card blur-md" />
            <Image
              src={service.icon}
              alt={service.title}
              width={60}
              height={60}
              className="w-12 sm:w-15 h-12 sm:h-15 mb-8"
            />
            <h3 className=" font-medium text-2xl sm:text-3xl text-foreground mb-6">
              {service.title}
            </h3>
            <p className=" font-normal text-base text-foreground/30 leading-6 mb-6">
              {service.description}
            </p>
            <div className="flex items-center gap-2">
              <span className=" font-semibold text-base text-foreground">
                Learn More
              </span>
              <Image
                src="/images/img_6625065aaabd00c_24x24.svg"
                alt="Arrow"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
