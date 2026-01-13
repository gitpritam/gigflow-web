import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import {
  Zap,
  AlertCircle,
  IndianRupee,
  FileText,
  Calendar,
  Briefcase,
} from "lucide-react";
import { apiRequest } from "@/utils/apiRequest";
import { Spinner } from "@/components/ui/spinner";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router";
import { createGigValidationSchema } from "@/validation/gig.validation";

const AddGigPage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<{
    title?: string;
    description?: string;
    budget?: string;
    deadline?: string;
  }>({});
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const resetFields = () => {
    setTitle("");
    setDescription("");
    setBudget("");
    setDeadline("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // Convert budget to number
      const budgetValue = budget ? parseFloat(budget) : NaN;

      // Validate form data
      const result = createGigValidationSchema.safeParse({
        title,
        description,
        budget: budgetValue,
        deadline,
      });

      if (!result.success) {
        const errors: {
          title?: string;
          description?: string;
          budget?: string;
          deadline?: string;
        } = {};
        result.error.issues.forEach((issue) => {
          const field = issue.path[0] as
            | "title"
            | "description"
            | "budget"
            | "deadline";
          if (!errors[field]) {
            errors[field] = issue.message;
          }
        });
        setFieldErrors(errors);
        setIsLoading(false);
        return;
      }

      // Prepare payload with ISO date
      const payload = {
        title: result.data.title,
        description: result.data.description,
        budget: result.data.budget,
        deadline: result.data.deadline,
      };

      await apiRequest("POST", `/gigs`, payload);
      setSuccess("Gig created successfully!");
      resetFields();

      // Redirect to gigs page after 2 seconds
      setTimeout(() => {
        navigate("/gigs");
      }, 3000);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "An error occurred while creating the gig"
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-page flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-2xl">
        {/* Add Gig Card */}
        <Card className="bg-white border-gray-200 shadow-xl">
          <CardHeader>
            <div className="flex justify-center items-center mb-5">
              <div className="inline-flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-brand-icon rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold text-gradient-brand">
                  GigFlow
                </span>
              </div>
            </div>
            <CardTitle className="text-2xl text-gray-900">
              Post a New Gig
            </CardTitle>
            <CardDescription className="text-gray-600">
              Fill in the details to create a new gig opportunity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Error Alert */}
              {error && (
                <Alert
                  variant="error"
                  icon={<AlertCircle className="w-4 h-4" />}
                >
                  {error}
                </Alert>
              )}

              {/* Success Alert */}
              {success && <Alert variant="success">{success}</Alert>}

              {/* Title Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-700"
                >
                  Gig Title
                </Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                  <Input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Modern Website Design"
                    className="pl-10 h-11"
                    required
                  />
                </div>
                {fieldErrors.title && (
                  <p className="text-sm text-red-600">{fieldErrors.title}</p>
                )}
              </div>

              {/* Description Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the gig requirements, deliverables, and any specific details..."
                    className="w-full pl-10 pr-3 py-2 min-h-30 rounded-md border border-input bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                    required
                  />
                </div>
                {fieldErrors.description && (
                  <p className="text-sm text-red-600">
                    {fieldErrors.description}
                  </p>
                )}
              </div>

              {/* Budget and Deadline Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Budget Input */}
                <div className="space-y-2">
                  <Label
                    htmlFor="budget"
                    className="text-sm font-medium text-gray-700"
                  >
                    Budget (₹)
                  </Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                    <Input
                      id="budget"
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="1000"
                      className="pl-10 h-11"
                      min="1"
                      step="0.01"
                      required
                    />
                  </div>
                  {fieldErrors.budget && (
                    <p className="text-sm text-red-600">{fieldErrors.budget}</p>
                  )}
                </div>

                {/* Deadline Input */}
                <div className="space-y-2">
                  <Label
                    htmlFor="deadline"
                    className="text-sm font-medium text-gray-700"
                  >
                    Deadline
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                    <Input
                      id="deadline"
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="pl-10 h-11"
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  {fieldErrors.deadline && (
                    <p className="text-sm text-red-600">
                      {fieldErrors.deadline}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full btn-gradient-primary h-11 text-base font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Spinner className="w-4 h-4" />
                    Creating gig...
                  </span>
                ) : (
                  "Create Gig"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600">
              Want to browse gigs instead?{" "}
              <Link
                to="/gigs"
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                View all gigs
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AddGigPage;
