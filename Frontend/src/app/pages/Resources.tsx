import { useEffect, useState } from "react";
import { BookOpen, Video, FileText, Code, Star, Clock, Bookmark } from "lucide-react";
import { getResources } from "../../api/api";

const categories = ["All", "Tutorials", "Courses", "Documentation", "Practice", "Projects"];

const iconMap: Record<string, any> = {
  Course: Video,
  Tutorial: BookOpen,
  Documentation: FileText,
  Practice: Code,
  Projects: Code,
};

const gradients = [
  "from-[#4f46e5] to-[#8b5cf6]",
  "from-[#10b981] to-[#06b6d4]",
  "from-[#f59e0b] to-[#ef4444]",
  "from-[#8b5cf6] to-[#ec4899]",
  "from-[#06b6d4] to-[#4f46e5]",
  "from-[#10b981] to-[#10b981]",
];

export function Resources() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cat = selectedCategory === "All" ? undefined : selectedCategory;
    setLoading(true);
    getResources(cat)
      .then(setResources)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Learning Resources</h1>
        <p className="text-muted-foreground">
          Curated resources to help you master your chosen career path
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              selectedCategory === category
                ? "bg-[#4f46e5] text-white shadow-md"
                : "bg-card border border-border text-muted-foreground hover:bg-accent"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading resources...</div>
      ) : resources.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No resources found. Add resources via the API to populate this page!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource: any, index: number) => {
            const IconComponent = iconMap[resource.type] || BookOpen;
            const gradient = gradients[index % gradients.length];
            return (
              <div
                key={resource.id}
                className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className={`h-32 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                  <IconComponent className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg mb-1">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">{resource.category}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#f59e0b] fill-[#f59e0b]" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                    <span className="text-xs text-muted-foreground">•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{resource.type}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {resource.url ? (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#4f46e5] text-white py-2 rounded-lg font-medium hover:bg-[#4338ca] transition-colors text-center"
                      >
                        Start Learning
                      </a>
                    ) : (
                      <button className="flex-1 bg-[#4f46e5] text-white py-2 rounded-lg font-medium hover:bg-[#4338ca] transition-colors">
                        Start Learning
                      </button>
                    )}
                    <button className="p-2 border border-border rounded-lg hover:bg-accent transition-colors">
                      <Bookmark className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
