import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import { Button } from "@/shared/components/ui/button";
import { MapPin, Clock, Users } from "lucide-react";

const Careers = () => {
  const openings = [
    {
      title: "Senior Fashion Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
    },
    {
      title: "E-commerce Manager",
      department: "Digital",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Visual Merchandiser",
      department: "Retail",
      location: "Los Angeles, CA",
      type: "Full-time",
    },
    {
      title: "Social Media Coordinator",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Customer Experience Lead",
      department: "Operations",
      location: "New York, NY",
      type: "Full-time",
    },
  ];

  const benefits = [
    "Competitive salary & equity",
    "Health, dental & vision insurance",
    "Flexible work arrangements",
    "Generous PTO policy",
    "Employee discount (50% off)",
    "Professional development budget",
    "Wellness stipend",
    "Parental leave",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container-main text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Join Our Team
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Help us shape the future of sustainable fashion. We're always
              looking for passionate, creative individuals to join the
              Andelevate family.
            </p>
          </div>
        </section>

        {/* Culture */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl mb-6">
                  Our Culture
                </h2>
                <p className="text-muted-foreground mb-4">
                  At Andelevate, we believe that great work comes from great
                  people who feel supported, valued, and inspired. We foster an
                  environment of collaboration, creativity, and continuous
                  growth.
                </p>
                <p className="text-muted-foreground">
                  Whether you're designing the next collection or helping a
                  customer find their perfect outfit, every role at Andelevate
                  contributes to our mission of making fashion more beautiful
                  and sustainable.
                </p>
              </div>
              <div className="bg-muted aspect-[4/3] rounded-lg"></div>
            </div>

            {/* Benefits */}
            <div className="bg-muted/50 rounded-lg p-8 md:p-12 mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-center mb-8">
                Benefits & Perks
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-background rounded-lg p-4 text-center"
                  >
                    <p className="text-sm font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Open Positions */}
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-center mb-8">
                Open Positions
              </h2>
              <div className="space-y-4">
                {openings.map((job, index) => (
                  <div
                    key={index}
                    className="border border-border rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <h3 className="font-serif text-xl mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <Button>Apply Now</Button>
                  </div>
                ))}
              </div>
            </div>

            {/* No Match */}
            <div className="mt-12 text-center bg-muted/50 rounded-lg p-8">
              <h3 className="font-serif text-xl mb-2">
                Don't see the right fit?
              </h3>
              <p className="text-muted-foreground mb-4">
                We're always looking for talented people. Send us your resume
                and we'll keep you in mind for future opportunities.
              </p>
              <Button variant="outline">Send Resume</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
