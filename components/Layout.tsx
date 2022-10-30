import Head from "next/head";
import { ThemeProvider } from "next-themes";
import type { ReactElement } from "react";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export function Layout({ children }: { children: ReactElement }) {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={false}
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Head>
          <title>
            Tiny Wallet - A simple, secure, and private way to store your crypto
          </title>
        </Head>
        <div className="relative flex flex-col flex-1">{children}</div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
