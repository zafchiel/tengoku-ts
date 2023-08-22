import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function EmailInput() {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="email">Sign in with email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  );
}
