
import { Check } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Sign Up with Your College Code",
    description:
      "Join your college's exclusive community with a special invite code provided by your institution.",
  },
  {
    number: "02",
    title: "Create Your Anonymous Profile",
    description:
      "Share your interests, hobbies and college year without revealing your name or photo initially.",
  },
  {
    number: "03",
    title: "Browse Profiles & Connect",
    description:
      "Find students from your college with similar interests and start a conversation.",
  },
  {
    number: "04",
    title: "Rate & Build Trust",
    description:
      "After chatting, rate your experience and choose to reveal more about yourself if you both connect.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 md:px-6 bg-secondary/50">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How CollegeCircle Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col">
              <div className="text-primary font-mono text-xl font-bold mb-2">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-card p-6 md:p-8 rounded-xl">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Safety is Our Priority
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">College Verification</h4>
                <p className="text-muted-foreground text-sm">
                  Only students with valid college codes can join their community.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Anonymous Profiles</h4>
                <p className="text-muted-foreground text-sm">
                  Control what information you share and when you share it.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Reporting System</h4>
                <p className="text-muted-foreground text-sm">
                  Easy reporting of inappropriate behavior to keep the community safe.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Trust Ratings</h4>
                <p className="text-muted-foreground text-sm">
                  Rate interactions to help build a trustworthy community of real friends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
