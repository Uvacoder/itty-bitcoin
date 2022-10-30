import * as RadixTabs from "@radix-ui/react-tabs";
import { PropsWithChildren } from "react";

export function Root({
  children,
  ...props
}: PropsWithChildren<RadixTabs.TabsProps>) {
  return (
    <RadixTabs.Root
      className="mt-4 font-gambetta mx-auto w-full md:max-w-lg lg:max-w-xl px-8 sm:px-14 md:px-0 transition-all duration-75 dark:text-slate-200 text-slate-800"
      {...props}
    >
      {children}
    </RadixTabs.Root>
  );
}

export function List({
  children,
  ...props
}: PropsWithChildren<RadixTabs.TabsListProps>) {
  return (
    <RadixTabs.List className="flex justify-around" {...props}>
      {children}
    </RadixTabs.List>
  );
}

export function Trigger({
  children,
  ...props
}: PropsWithChildren<RadixTabs.TabsTriggerProps>) {
  return (
    <RadixTabs.Trigger
      className="border-b-2 border-transparent data-[state=active]:border-yellow-300"
      {...props}
    >
      {children}
    </RadixTabs.Trigger>
  );
}

export function Content({
  children,
  ...props
}: PropsWithChildren<RadixTabs.TabsContentProps>) {
  return (
    <RadixTabs.Content asChild {...props}>
      {children}
    </RadixTabs.Content>
  );
}
