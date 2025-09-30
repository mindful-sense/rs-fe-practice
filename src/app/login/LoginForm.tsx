import { Button } from "@/components";
import { Input } from "./Input";

export function LoginForm() {
  return (
    <form action="" className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Input id="username" type="text" placeholder="your_username123">
          Username
        </Input>
        <Input id="password" type="password">
          Password
        </Input>
      </div>
      <Button type="submit" size="full">
        Sign In
      </Button>
    </form>
  );
}
