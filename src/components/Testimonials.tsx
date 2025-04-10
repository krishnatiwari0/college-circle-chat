
const testimonials = [
  {
    quote:
      "I was really nervous about making friends in my first semester, but CollegeCircle helped me find people who love photography as much as I do!",
    author: "Freshman, UCLA",
  },
  {
    quote:
      "As a transfer student, I felt like an outsider until I found my coding group through this app. Now we meet weekly for hackathons!",
    author: "Junior, MIT",
  },
  {
    quote:
      "I connected with someone who shares my passion for environmental activism. We're now working on a campus sustainability project together.",
    author: "Sophomore, UC Berkeley",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-4 md:px-6">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Students Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-xl border"
            >
              <p className="italic mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="text-sm text-muted-foreground font-medium">
                — {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
