import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-6xl font-black text-primary">404</h1>
        <p className="text-lg text-muted-foreground">
          The page you’re looking for doesn’t exist.
        </p>

        <div className="pt-4">
          <Button size="lg" className="font-bold" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
