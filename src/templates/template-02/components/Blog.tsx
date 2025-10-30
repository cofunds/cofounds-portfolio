import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { blogArticles } from "@/constants";
import { Button } from "@/components/ui/button";
import { FaBook } from "react-icons/fa";

export default function Blogs() {
  return (
    <AnimatedSection className="mt-20 sm:mt-24 lg:mt-32">
      <div className="text-center mb-12 sm:mb-16">
        <FaBook className="text-foreground/40 w-15 h-15 mx-auto mb-4" />
        <p className=" font-medium text-base text-foreground/40 uppercase tracking-wider mb-2">
          Blog SECTION
        </p>
        <h2 className=" font-medium text-4xl sm:text-5xl lg:text-[52px] text-foreground leading-tight">
          Read my latest articles
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        {/* Featured Article */}
        <div className="lg:col-span-3 bg-linear-to-b overflow-hidden from-secondary to-secondary/20 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset] relative rounded-[20px] p-6 sm:p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg">
          <Image
            src={blogArticles[0]!.image!}
            alt={blogArticles[0]!.title}
            width={624}
            height={372}
            className="w-full h-auto rounded-[12px] mb-6"
          />
          <div className="flex justify-between items-center mb-4">
            <Button variant="outline" size="sm" className="rounded-full">
              {blogArticles[0]!.category}
            </Button>
            <div className="flex items-center gap-2 text-foreground/60">
              <Image
                src="/images/img_6625065aaabd00c_white_a700_20x20.svg"
                alt="Calendar"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span className=" font-normal text-base">
                {blogArticles[0]!.date}
              </span>
            </div>
          </div>
          <h3 className=" font-medium text-2xl sm:text-3xl text-foreground leading-tight mb-4">
            {blogArticles[0]!.title}
          </h3>
          <p className=" font-normal text-base text-foreground/60 leading-6 mb-6">
            {blogArticles[0]!.description}
          </p>
          <div className="flex items-center gap-2 cursor-pointer text-foreground hover:text-primary">
            <span className=" font-medium text-base">
              <a href={`/p/blogs/${blogArticles[0]!.id}`}>Read More</a>
            </span>
          </div>
        </div>
        {/* Article List */}
        <div className="lg:col-span-2 space-y-6">
          {blogArticles.slice(1).map((article, index) => (
            <div
              key={index}
              className="bg-linear-to-b overflow-hidden from-secondary to-secondary/20 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset] relative rounded-[20px] p-6 sm:p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg"
            >
              <Button variant="outline" size="sm" className="mb-4 rounded-full">
                {article.category}
              </Button>
              <h3 className=" font-medium text-xl sm:text-2xl text-foreground leading-tight mb-4">
                {article.title}
              </h3>
              <p className=" font-normal text-base text-foreground/60 leading-6">
                {article.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-12 sm:mt-16">
        <a
          href={"/p/blogs"}
          className="inline-block bg-primary text-white  font-medium rounded-full transition-all duration-300 transform hover:-translate-y-1 px-8 py-4 text-lg"
        >
          See All Blogs
        </a>
      </div>
    </AnimatedSection>
  );
}
