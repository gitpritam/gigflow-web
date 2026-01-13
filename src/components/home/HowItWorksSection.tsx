import React from "react";
import { Briefcase, Users, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Post a Gig",
      description: "Describe your project and set your budget in minutes",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Receive Bids",
      description: "Review proposals from skilled freelancers worldwide",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Hire Instantly",
      description: "Choose the best fit and start working immediately",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="bg-white/80 backdrop-blur-sm py-20 border-y border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Get started in three simple steps
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="hover:shadow-xl transition-all hover:-translate-y-2 bg-white border-gray-200">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-brand-icon rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg">
                    {step.icon}
                  </div>
                  <CardTitle className="text-2xl text-gray-900">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 connector-line"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
