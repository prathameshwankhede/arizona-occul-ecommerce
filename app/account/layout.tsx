import PublicLayout from "@/components/layout/PublicLayout";
import AccountSidebar from "@/components/account/AccountSidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicLayout>
      <div className="bg-cream-50 min-h-[calc(100vh-140px)] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            <AccountSidebar />
            <main className="flex-1 bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm min-h-[500px]">
              {children}
            </main>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
