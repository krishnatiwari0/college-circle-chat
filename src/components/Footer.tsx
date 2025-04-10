
import { Link } from "react-router-dom";

const Footer = ({ showFooter = true }: { showFooter?: boolean }) => {
  if (!showFooter) return null;

  return (
    <footer className="border-t py-6 bg-background">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} CollegeCircle. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            to="/about"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            About
          </Link>
          <Link
            to="/privacy"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Privacy
          </Link>
          <Link
            to="/terms"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
