import React from "react";
import { Shield, CheckCircle, Clock, IndianRupee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WhyGigFlowSection: React.FC = () => {
  const benefits = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Payments",
      description: "Protected transactions with escrow system",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Verified Freelancers",
      description: "All professionals are vetted and rated",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-time Hiring",
      description: "Connect and start projects within hours",
    },
    {
      icon: <IndianRupee className="w-6 h-6" />,
      title: "Flexible Roles",
      description: "Be a client or freelancer—or both",
    },
  ];

  return (
    <section className="bg-white/60 backdrop-blur-sm py-20 border-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why GigFlow?
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need for successful collaborations
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="text-center border-0 shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-brand-icon rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyGigFlowSection;
