import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HeroSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Hire Freelancers.{" "}
            <span className="text-gradient-brand">Get Work Done Faster.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            GigFlow connects clients with skilled freelancers in minutes. Post a
            job, receive bids, and start working—all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="btn-gradient-primary">
              Browse Gigs
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Post a Job
            </Button>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-brand-blur rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <Card className="hero-card-indigo border-0 hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 hero-card-circle-indigo rounded-full mb-4"></div>
                    <div className="h-3 bg-indigo-300 rounded mb-2 w-3/4"></div>
                    <div className="h-2 bg-indigo-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
                <Card className="hero-card-purple border-0 hover:scale-105 transition-transform mt-8">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 hero-card-circle-purple rounded-full mb-4"></div>
                    <div className="h-3 bg-purple-300 rounded mb-2 w-3/4"></div>
                    <div className="h-2 bg-purple-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
                <Card className="hero-card-pink border-0 hover:scale-105 transition-transform -mt-4">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 hero-card-circle-pink rounded-full mb-4"></div>
                    <div className="h-3 bg-pink-300 rounded mb-2 w-3/4"></div>
                    <div className="h-2 bg-pink-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
                <Card className="hero-card-blue border-0 hover:scale-105 transition-transform mt-4">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 hero-card-circle-blue rounded-full mb-4"></div>
                    <div className="h-3 bg-blue-300 rounded mb-2 w-3/4"></div>
                    <div className="h-2 bg-blue-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
