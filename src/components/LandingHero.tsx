
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Shield, Star } from "lucide-react";

const LandingHero = () => {
  return (
    <section className="py-20 px-4 md:px-6">
      <div className="container flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 md:mb-6">
          <span className="text-gradient">Connect</span> with College Friends
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-[800px] mb-8">
          Find your people based on shared interests and college affiliation, safely and anonymously.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/signup">
            <Button className="text-base px-8 py-6 rounded-full">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="text-base px-8 py-6 rounded-full">
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card">
            <div className="mb-5 p-3 rounded-full bg-primary/10">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">College Communities</h3>
            <p className="text-muted-foreground">
              Join your college's exclusive community using a special invite code.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card">
            <div className="mb-5 p-3 rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Safe & Anonymous</h3>
            <p className="text-muted-foreground">
              Start anonymously and reveal more about yourself when you're ready.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card">
            <div className="mb-5 p-3 rounded-full bg-primary/10">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Interest-Based</h3>
            <p className="text-muted-foreground">
              Connect with students who share your passions and interests.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
