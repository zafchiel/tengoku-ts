"use client";

import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { UserInfoProvier } from "./user-info-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function GlobalProviders({ children }: { children: ReactNode }) {
	return (
		<>
			<TooltipProvider>
				<UserInfoProvier>
					{children}
					<Toaster
						richColors
						toastOptions={{
							duration: 3000,
						}}
					/>
				</UserInfoProvier>
			</TooltipProvider>
		</>
	);
}
