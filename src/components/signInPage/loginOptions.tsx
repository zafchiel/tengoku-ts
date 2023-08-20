import { Provider } from "jotai";
import { BuiltInProviderType } from "next-auth/providers";
import { signIn } from "next-auth/react";

type Props = {
  providers: BuiltInProviderType[];
};

export default function LoginOptions({ providers }: Props) {
  return <section className="flex flex-col">{providers}</section>;
}
