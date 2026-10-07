import Shell from "@/components/Shell";

export default function BetaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Shell>{children}</Shell>;
}
