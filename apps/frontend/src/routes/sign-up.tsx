import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import InputField from "../components/forms/InputField";
import SelectField from "../components/forms/SelectField";
import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "../lib/constants";
import { CountrySelectField } from "../components/forms/CountrySelectField";
import FooterLink from "../components/forms/FooterLink";
import { signUp } from "../lib/auth-client";
import { toast } from "sonner";

export const Route = createFileRoute("/sign-up")({
  component: SignUp,
});

function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "US",
      investmentGoals: "Growth",
      riskTolerance: "Medium",
      preferredIndustry: "Technology",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const result = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.fullName,
      });
      if (result.data) navigate({ to: "/" });
      if (result.error) toast.error(result.error.message);
    } catch (e) {
      console.error(e);
      toast.error("Sign up failed", {
        description:
          e instanceof Error ? e.message : "Failed to create an account.",
      });
    }
  };

  return (
    <div className="flex w-full h-screen overflow-hidden relative">
      <section className="auth-left-section scrollbar-hide-default overflow-y-auto overflow-x-hidden relative z-10">
        <section className="h-20 pt-4  w-full m-4">
          <Link to="/" className="auth-logo">
            <div className="bg-white w-fit rounded-full p-2">
              <img
                src="favicon-32x32.png"
                alt="Signalist logo"
                width={140}
                height={32}
                className="h-8 w-auto"
              />
            </div>
          </Link>
        </section>
        <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <h1 className="form-title">Sign Up & Personalize</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <InputField
                name="fullName"
                label="Full Name"
                placeholder="John Doe"
                register={register}
                error={errors.fullName}
                validation={{ required: "Full name is required", minLength: 2 }}
              />

              <InputField
                name="email"
                label="Email"
                placeholder="contact@jsmastery.com"
                register={register}
                error={errors.email}
                validation={{
                  required: "Email name is required",
                  pattern: /^\w+@\w+\.\w+$/,
                  message: "Email address is required",
                }}
              />

              <InputField
                name="password"
                label="Password"
                placeholder="Enter a strong password"
                type="password"
                register={register}
                error={errors.password}
                validation={{ required: "Password is required", minLength: 8 }}
              />

              <CountrySelectField
                name="country"
                label="Country"
                control={control}
                error={errors.country}
                required
              />

              <SelectField
                name="investmentGoals"
                label="Investment Goals"
                placeholder="Select your investment goal"
                options={INVESTMENT_GOALS}
                control={control}
                error={errors.investmentGoals}
                required
              />

              <SelectField
                name="riskTolerance"
                label="Risk Tolerance"
                placeholder="Select your risk level"
                options={RISK_TOLERANCE_OPTIONS}
                control={control}
                error={errors.riskTolerance}
                required
              />

              <SelectField
                name="preferredIndustry"
                label="Preferred Industry"
                placeholder="Select your preferred industry"
                options={PREFERRED_INDUSTRIES}
                control={control}
                error={errors.preferredIndustry}
                required
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="yellow-btn w-full mt-5"
              >
                {isSubmitting
                  ? "Creating Account"
                  : "Start Your Investing Journey"}
              </Button>

              <FooterLink
                text="Already have an account?"
                linkText="Sign in"
                href="/sign-in"
              />
            </form>
          </div>
        </div>
      </section>

      <section className="auth-right-section relative z-0 overflow-hidden">
        <div className="z-10 relative lg:mt-4 lg:mb-16">
          <blockquote className="auth-blockquote">
            Signalist turned my watchlist into a winning list. The alerts are
            spot-on, and I feel more confident making moves in the market
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <cite className="auth-testimonial-author">- Ethan R.</cite>
              <p className="max-md:text-xs text-gray-500">Retail Investor</p>
            </div>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <img
                  src="/assets/icons/star.svg"
                  alt="Star"
                  key={star}
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          <img
            src="/assets/images/dashboard.png"
            alt="Dashboard Preview"
            width={1440}
            height={1150}
            className="auth-dashboard-preview absolute top-0"
          />
        </div>
      </section>
    </div>
  );
}

