import { EventCategoriesHeader } from './EventCategoriesHeader';
import { EventCategoriesGrid } from './EventCategoriesGrid';

export function EventCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <EventCategoriesHeader />
        <EventCategoriesGrid />
      </div>
    </section>
  );
}
