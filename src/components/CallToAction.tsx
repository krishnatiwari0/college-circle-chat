
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-16 px-4 md:px-6 bg-primary/10">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Find Your College Circle?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of students already connecting with peers who share their passions and interests.
        </p>
        <Link to="/signup">
          <Button className="text-base px-8 py-6 rounded-full">
            Get Started For Free
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
