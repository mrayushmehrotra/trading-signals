import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import InputField from "../components/forms/InputField";
import FooterLink from "../components/forms/FooterLink";
import { signIn } from "../lib/auth-client";
import { toast } from "sonner";
import { authClient } from "~/lib/auth-client";

const SignIn = () => {
  const session = authClient.useSession();
  console.log(session);
  const navigate = useNavigate();
  if (session.data) {
    navigate({ to: "/" });
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signIn.email(data);
      if (result.data)
        navigate({
          to: "/",
        });
    } catch (e) {
      console.error(e);
      toast.error("Sign in failed", {
        description: e instanceof Error ? e.message : "Failed to sign in.",
      });
    }
  };

  return (
    <>
      <div className="flex w-full overflow-hidden">
        <section className="auth-left-section  overflow-x-hidden ">
          <section className="h-20 pt-4 m-4">
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
          <h1 className="form-title">Welcome back</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <InputField
              name="email"
              label="Email"
              placeholder="contact@jsmastery.com"
              register={register}
              error={errors.email}
              validation={{
                required: "Email is required",
                pattern: /^\w+@\w+\.\w+$/,
              }}
            />

            <InputField
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              register={register}
              error={errors.password}
              validation={{ required: "Password is required", minLength: 8 }}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="yellow-btn w-full mt-5"
            >
              {isSubmitting ? "Signing In" : "Sign In"}
            </Button>

            <FooterLink
              text="Don't have an account?"
              linkText="Create an account"
              href="/sign-up"
            />
          </form>
        </section>

        <section className="auth-right-section">
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
    </>
  );
};

export const Route = createFileRoute("/sign-in")({
  component: SignIn,
});
