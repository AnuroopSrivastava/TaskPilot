import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/lib/auth-context";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import generatedImage from "@assets/generated_images/abstract_modern_geometric_saas_background.png";

// ✅ IMPORT TASKPILOT LOGO
import taskpilotLogo from "@/assets/taskpilot-logo.png";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function RegisterPage() {
  const { register, isLoading } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await register(values.name, values.email);
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* LEFT SIDE – BRAND / IMAGE */}
      <div className="hidden lg:block w-1/2 relative bg-muted">
        <div className="absolute inset-0 bg-indigo-900/20 z-10" />

        <img
          src={generatedImage}
          alt="Register Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 z-20 flex flex-col justify-between p-12 text-white">
          {/* LOGO + BRAND */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center shadow-lg overflow-hidden">
              <img
                src={taskpilotLogo}
                alt="TaskPilot Logo"
                className="h-6 w-6 object-contain"
              />
            </div>

            <span className="font-heading font-bold text-xl tracking-tight">
              Task<span className="text-indigo-300">Pilot</span>
            </span>
          </div>

          {/* TESTIMONIAL */}
          <div>
            <blockquote className="text-2xl font-medium leading-relaxed mb-4">
              "Joining TaskPilot was the best decision for our productivity. The
              scalability and ease of use are unmatched."
            </blockquote>
            <cite className="not-italic font-medium text-white/80">
              – Anuroop Srivastava, Developer
            </cite>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE – REGISTER FORM */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground">
              Create an account
            </h1>
            <p className="mt-2 text-muted-foreground">
              Enter your details to get started
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        data-testid="input-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        {...field}
                        data-testid="input-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        data-testid="input-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                data-testid="button-register"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth"
              className="font-medium text-primary hover:text-primary/90 underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
