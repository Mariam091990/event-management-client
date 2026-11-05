"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
  
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"


export default function SignUpPage() {

    const router = useRouter();
    const handleSignUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries()) as
            {
                name: string,
                image: string,
                email: string,
                password: string

            };


        // Password validation
        const { password } = user;

        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasMinimumLength = password.length >= 6;

        if (!hasUppercase) {
            toast.error("Password must contain at least one uppercase letter.");
            return;
        }

        if (!hasLowercase) {
            toast.error("Password must contain at least one lowercase letter.");
            return;
        }

        if (!hasMinimumLength) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }



        const { data: resData, error } = await authClient.signUp.email({
            ...user,
        })

        if (error) {
            console.log(error);
            toast.error(error.message as string);
        }
        else {
            console.log(resData);
            toast.success("Sign up done successfully");
            router.push("/upcoming-events");

        }
    }

    const handleGithubSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "github",
        });
        console.log(data);
    }

    return (
        <div className=" mt-5 flex flex-col max-w-1/2 mx-auto gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome </CardTitle>

                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignUp} >
                        <FieldGroup>
                            <Field>

                                <Button onClick={handleGithubSignIn} variant="outline" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.467-1.334-5.467-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 6.006 0c2.29-1.552 3.296-1.23 3.296-1.23.655 1.652.243 2.873.12 3.176.77.84 1.233 1.911 1.233 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .32.216.694.825.576A12 12 0 0 0 12 0Z"
                                        />
                                    </svg>
                                    Sign up with GitHub
                                </Button>
                            </Field>
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>

                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Your name ..."
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="image">PhotoURl</FieldLabel>
                                <Input
                                    id="image"
                                    type="url"
                                    name="image"
                                    placeholder="Your photo url..."
                                    required
                                />
                            </Field>

                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>

                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    required />
                                <FieldDescription>
                                    Must contain an uppercase letter,
                                    a lowercase letter, and at least
                                    6 characters.
                                </FieldDescription>

                            </Field>

                            <Field>
                                <Button type="submit">
                                    Sign up
                                </Button>

                                <FieldDescription className="text-center">
                                    Have an account?{" "}
                                    <a href="/login">Login</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    )
}
