import Stars from "@/components/Stars";
import Link from "next/link";

const reviews = require("@/data/reviews.json");

export default function Restaurants() {
  console.log(reviews);
  return (
    <main>
      <div className="res-title">
        <h1>Restaurants</h1>
      </div>

      <section id="container">
        {reviews.map((restaurant) => (
          <Link href={`/restaurants/${restaurant.url}`} className="card">
            <h2>{restaurant.name}</h2>
            <p className="flex items-center justify-center gap-4">
              <span>Delivery Speed:</span>
              <Stars rating={restaurant.averageRatings.deliverySpeed} />
            </p>
            <p className="flex items-center justify-center gap-4">
              <span>Taste:</span>
              <Stars rating={restaurant.averageRatings.taste} />
            </p>
            <p className="flex items-center justify-center gap-4">
              <span>Price:</span>
              <Stars rating={restaurant.averageRatings.price} />
            </p>
            <p className="flex items-center justify-center gap-4">
              <span>Ambience:</span>
              <Stars rating={restaurant.averageRatings.ambience} />
            </p>
            <p className="flex items-center justify-center gap-4">
              <span>Service:</span>
              <Stars rating={restaurant.averageRatings.service} />
            </p>
            <p className="flex items-center justify-center gap-4">
              <span>User Rating:</span>
              <Stars rating={restaurant.averageRatings.user} />
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}
