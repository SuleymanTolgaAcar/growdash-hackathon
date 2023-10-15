"use client";

import Stars from "@/components/Stars";
import { useState, useEffect } from "react";

const reviews = require("@/data/reviews.json");

export default function Restaurant({ params }) {
  const [recomendationText, setRecomendationText] = useState("");

  async function handleRecomendation(i) {
    if (recomendationText != "") return;
    const res = await fetch("/api/recomendation", {
      method: "POST",
      body: JSON.stringify({
        prompt: `${reviews[i].averageRatings.deliverySpeed} ${reviews[i].averageRatings.taste} ${reviews[i].averageRatings.price} ${reviews[i].averageRatings.ambience} ${reviews[i].averageRatings.service}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resTxt = await res.json();
    setRecomendationText(resTxt);
  }

  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i].url == params.restaurant) {
      useEffect(() => {
        handleRecomendation(i);
      }, []);
      return (
        <main>
          <section id="eval">
            <div className="rest-name">
              <h1>{params.restaurant}</h1>
            </div>
            <h2>Average Ratings</h2>
            <p className="flex items-center justify-center gap-4">
              <span>Delivery Speed:</span>
              <Stars rating={reviews[i].averageRatings.deliverySpeed} />
            </p>
            <p className="flex items-center justify-center gap-4">
              <span>Taste:</span>
              <Stars rating={reviews[i].averageRatings.taste} />
            </p>
            <p className="flex items-center justify-center gap-4">
              <span>Price:</span>
              <Stars rating={reviews[i].averageRatings.price} />
            </p>
            <p className="flex items-center justify-center gap-4">
              <span>Ambience</span>
              <Stars rating={reviews[i].averageRatings.ambience} />
            </p>
            <p className="flex items-center justify-center gap-4">
              <span>Service:</span>
              <Stars rating={reviews[i].averageRatings.service} />
            </p>
            <p className="flex items-center justify-center gap-4">
              <span>User Rating:</span>
              <Stars rating={reviews[i].averageRatings.user} />
            </p>
          </section>

          <section id="rec">
            <h1>Recommendations</h1>
            <p class="rec-title">
              Here are some recomendations to improve the restaurant's sales and
              customer's satisfaction:
            </p>
            <p class="rec-text">{recomendationText} </p>
          </section>

          <div className="res-title" id="review">
            <h1>Reviews</h1>
          </div>

          <section id="comments">
            {reviews[i].reviews.map((review) => (
              <div className="comment-card">
                <p>{review.text}</p>
                {review.deliverySpeed > 0 && (
                  <p className="flex items-center justify-center gap-4">
                    <span>Delivery Speed:</span>
                    <Stars rating={review.deliverySpeed} />
                  </p>
                )}
                {review.taste > 0 && (
                  <p className="flex items-center justify-center gap-4">
                    <span>Taste:</span>
                    <Stars rating={review.taste} />
                  </p>
                )}
                {review.price > 0 && (
                  <p className="flex items-center justify-center gap-4">
                    <span>Price:</span>
                    <Stars rating={review.price} />
                  </p>
                )}
                {review.ambience > 0 && (
                  <p className="flex items-center justify-center gap-4">
                    <span>Portion Size:</span>
                    <Stars rating={review.ambience} />
                  </p>
                )}
                {review.service > 0 && (
                  <p className="flex items-center justify-center gap-4">
                    <span>Service:</span>
                    <Stars rating={review.service} />
                  </p>
                )}
                {review.user > 0 && (
                  <p className="flex items-center justify-center gap-4">
                    <span>User Rating:</span>
                    <Stars rating={review.user} />
                  </p>
                )}
              </div>
            ))}
          </section>
        </main>
      );
    }
  }
  return (
    <main>
      <h1>Couldn't find the restaurant.</h1>
    </main>
  );
}
