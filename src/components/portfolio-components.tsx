import Link from "next/link";
import React from "react";

const portfolioQuotes = [
  "Your portfolio is your professional story - make it compelling.",
  "Great portfolios don't just show work, they show thinking.",
  "A portfolio without context is just a gallery.",
  "Every project in your portfolio should solve a problem.",
  "Quality over quantity - curate, don't just collect.",
  "Your portfolio is your first impression and your lasting legacy.",
  "Design is not just what it looks like - design is how it works.",
  "A portfolio is a conversation starter, not a conversation ender.",
  "Show the journey, not just the destination.",
  "The best portfolios tell stories that resonate with real people.",
];

export const LoadingPortfolio = () => {
  const [currentQuote, setCurrentQuote] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % portfolioQuotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col min-h-dvh items-center justify-center space-y-8">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto" />
        <p className="text-lg text-muted-foreground max-w-md">
          {portfolioQuotes[currentQuote]}
        </p>
      </div>
    </main>
  );
};

export const ErrorPortfolio = ({ username }: { username: string }) => (
  <main className="flex flex-col min-h-dvh items-center justify-center space-y-8">
    <div className="text-center space-y-4">
      <h1 className="text-2xl font-bold">Portfolio Not Found</h1>
      <p className="text-muted-foreground">
        Error fetching portfolio details please check the username: {username}
      </p>
      {!username || username === "dev123" ? (
        <p className="text-muted-foreground">
          Let&apos;s get you a cool portfolio. Visit{" "}
          <Link
            href="https://www.cofounds.in"
            className="text-blue-500 hover:underline"
          >
            www.cofounds.in
          </Link>
        </p>
      ) : null}
    </div>
  </main>
);

export const NoSubdomainPortfolio = () => (
  <main className="flex flex-col min-h-dvh items-center justify-center space-y-8">
    <div className="text-center space-y-4">
      <p className="text-muted-foreground">
        Let&apos;s get you a cool portfolio. Visit{" "}
        <Link
          href="https://www.cofounds.in"
          className="text-blue-500 hover:underline"
        >
          www.cofounds.in
        </Link>
      </p>
    </div>
  </main>
);
