import { ReactNode } from "react";

export default function MutedText({ children }: { children: ReactNode }) {
  return <span className="text-muted-foreground">{children}</span>;
}
