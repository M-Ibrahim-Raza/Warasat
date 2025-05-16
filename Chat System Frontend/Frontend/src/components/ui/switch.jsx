import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef(({ className, size = "default", ...props }, ref) => {
  const body_size_styling = size === "large" ? "h-[1.625rem] w-[2.85rem]" : "h-5 w-9";
  const ball_size_styling =
    size === "large" ? "h-[1.3rem] w-[1.3rem] data-[state=checked]:translate-x-[1.3rem]" : "h-4 w-4 data-[state=checked]:translate-x-4";

  return (
    <SwitchPrimitives.Root
      className={cn(
        `peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors 
         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-TCDG1 
         disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-TCDG1 data-[state=unchecked]:bg-gray-300 ${body_size_styling}`,
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          `pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0 ${ball_size_styling}`
        )}
      />
    </SwitchPrimitives.Root>
  );
});

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
