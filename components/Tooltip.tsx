import * as RadixTooltip from "@radix-ui/react-tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { PropsWithChildren } from "react";

interface TooltipProps extends RadixTooltip.TooltipProps {
  content: string;
}

export function Tooltip({
  children,
  content,
  ...props
}: PropsWithChildren<TooltipProps>): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <RadixTooltip.Root open={open} onOpenChange={setOpen} delayDuration={0}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <AnimatePresence>
        {open ? (
          <RadixTooltip.Portal forceMount>
            <RadixTooltip.Content
              forceMount
              asChild
              side="top"
              sideOffset={16}
              align="center"
              aria-label={content}
            >
              <motion.div
                tabIndex={0}
                initial={{ opacity: 0, y: -5 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.1 },
                }}
                exit={{ opacity: 0, y: -5, transition: { duration: 0.1 } }}
                {...props}
                className="text-sm text-rose-800 dark:text-stone-800 bg-rose-300 dark:bg-amber-400 px-2 py-1 border border-rose-300 dark:border-stone-800 rounded-lg shadow-md dark:shadow-amber-800"
              >
                {content}
              </motion.div>
            </RadixTooltip.Content>
          </RadixTooltip.Portal>
        ) : null}
      </AnimatePresence>
    </RadixTooltip.Root>
  );
}
