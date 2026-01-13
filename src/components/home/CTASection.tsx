import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CTASection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-brand border-0 shadow-2xl text-center">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-white mb-4">
              Ready to start your next project?
            </CardTitle>
            <CardDescription className="text-xl text-blue-100">
              Join thousands of clients and freelancers on GigFlow today
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Get Started for Free
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default CTASection;
