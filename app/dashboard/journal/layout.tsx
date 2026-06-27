export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 bg-gray-50">
        {children}
      </div>
    </div>
  );
}