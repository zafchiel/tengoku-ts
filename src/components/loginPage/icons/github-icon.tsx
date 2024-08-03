import type { IconProps } from "../oauth-link";
import { Github } from "lucide-react";

export function GithubIcon({ className, size, color }: IconProps) {
	return <Github size={size} color={color} className={className} />;
}
