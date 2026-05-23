export default function Skeleton() {
  return (
    <div className="space-y-4 p-6">
      <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}