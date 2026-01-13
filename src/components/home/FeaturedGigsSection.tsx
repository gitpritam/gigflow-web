import React from "react";
import { Calendar, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GigStatus } from "@/@types/gig.types";
import type { IGig } from "@/@types/gig.types";
import { formatBudget } from "@/utils/formatCurrency";
import { formatDeadline } from "@/utils/formatDeadline";

const featuredGigs: IGig[] = [
  {
    _id: "1",
    title: "Modern Website Design",
    budget: 750,
    description:
      "Need a sleek, responsive website for a tech startup. Must include animations.",
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    ownerId: "owner1",
    status: GigStatus.OPEN,
  },
  {
    _id: "2",
    title: "Mobile App Development",
    budget: 3500,
    description:
      "React Native app for food delivery service. iOS and Android needed.",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    ownerId: "owner2",
    status: GigStatus.OPEN,
  },
  {
    _id: "3",
    title: "SEO & Content Writing",
    budget: 450,
    description:
      "10 blog posts optimized for SEO. Experience in tech industry required.",
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
    ownerId: "owner3",
    status: GigStatus.OPEN,
  },
  {
    _id: "4",
    title: "Logo & Brand Identity",
    budget: 600,
    description:
      "Create complete brand identity for sustainable fashion brand.",
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    ownerId: "owner4",
    status: GigStatus.OPEN,
  },
  {
    _id: "5",
    title: "Python Data Analysis",
    budget: 900,
    description:
      "Analyze sales data and create interactive dashboards with Python.",
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
    ownerId: "owner5",
    status: GigStatus.OPEN,
  },
  {
    _id: "6",
    title: "Social Media Marketing",
    budget: 375,
    description:
      "Manage Instagram and TikTok for wellness brand. 3-month contract.",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    ownerId: "owner6",
    status: GigStatus.OPEN,
  },
];

const FeaturedGigsSection: React.FC = () => {
  const getStatusColor = (status: GigStatus): string => {
    switch (status) {
      case GigStatus.OPEN:
        return "badge-status-open";
      case GigStatus.ASSIGNED:
        return "badge-status-assigned";
      case GigStatus.COMPLETED:
        return "badge-status-completed";
      case GigStatus.CANCELLED:
        return "badge-status-cancelled";
      default:
        return "badge-status-completed";
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Gigs
          </h2>
          <p className="text-xl text-gray-600">
            Explore opportunities from top clients
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGigs.map((gig) => (
            <Card
              key={gig._id}
              className="hover:shadow-xl transition-all  bg-white border-gray-200"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl text-gray-900">
                    {gig.title}
                  </CardTitle>
                  <Badge className={`${getStatusColor(gig.status)} border-0`}>
                    {gig.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-4 h-4" />
                    <span className="font-semibold text-blue-600">
                      {formatBudget(gig.budget)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDeadline(gig.deadline)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600">
                  {gig.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button className="w-full btn-gradient-primary cursor-pointer">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGigsSection;
