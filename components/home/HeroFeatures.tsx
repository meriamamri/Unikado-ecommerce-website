export function HeroFeatures() {
  return (
    <div className="flex items-center space-x-8 text-sm text-gray-600">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span>Livraison rapide</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <span>Qualité premium</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        <span>100% personnalisé</span>
      </div>
    </div>
  );
}
