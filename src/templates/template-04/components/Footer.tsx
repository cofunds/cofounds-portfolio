const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--background)] py-6 ">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-sm text-[var(--muted-foreground)]">
                    Design & Developed by{" "}
                    <a
                        href="https://www.hirewiser.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--primary)] hover:underline"
                    >
                        www.hirewiser.in
                    </a>
                </p>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">
                    © {currentYear}. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;