import Link from 'next/link';
import { FileQuestion, Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-2xl mx-auto space-y-8">
        <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
          <FileQuestion className="w-24 h-24 text-primary relative z-10 animate-bounce" style={{ animationDuration: '3s' }} />
        </div>
        
        <div className="space-y-4 relative z-10">
          <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/40 drop-shadow-sm">
            404
          </h1>
          <h2 className="text-3xl font-bold">عذراً، الصفحة غير موجودة</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            يبدو أن الرابط الذي تبحث عنه قد تم نقله أو حذفه، أو أنك أدخلت العنوان بشكل خاطئ.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg font-bold w-full sm:w-auto shadow-lg shadow-primary/20">
            <Link href="/">
              <Home className="w-5 h-5 ml-2" />
              العودة للرئيسية
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg w-full sm:w-auto">
            <Link href="/services">
              تصفح خدماتنا
              <ArrowRight className="w-5 h-5 mr-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
