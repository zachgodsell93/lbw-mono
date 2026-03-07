import Image from "next/image";

export function PreviewLanding() {
  return (
    <div className="pb-6 sm:pb-16">
      <div className="container max-w-7xl">
        <div className="rounded-xl md:bg-muted/30 md:p-3.5 md:ring-1 md:ring-inset md:ring-border">
          <div className="relative overflow-hidden rounded-xl md:border md:rounded-lg ">
            <Image
              className="size-full object-fit object-center hidden md:block"
              src="/images/desktop-hero.png"
              alt="preview landing"
              width={2000}
              height={1000}
              priority={true}
            />
            <Image
              className="size-full object-fit object-center md:hidden block"
              src="/images/mobile-app.png"
              alt="preview landing"
              width={2000}
              height={1000}
              priority={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
