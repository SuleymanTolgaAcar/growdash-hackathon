"use client";

import Stars from "@/components/Stars";
import Rate from "@/components/Rate";
import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";

export default function Home() {
  const [outputRating, setOutputRating] = useState({
    deliverySpeed: 0,
    taste: 0,
    price: 0,
    ambience: 0,
    service: 0,
  });
  const [inputRating, setInputRating] = useState({
    deliverySpeed: 0,
    taste: 0,
    price: 0,
    ambience: 0,
    service: 0,
  });
  const [recomendationText, setRecomendationText] = useState("");

  async function handleSubmitRating(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data.get("text"));
    const res = await fetch("/api/rating", {
      method: "POST",
      body: JSON.stringify({
        prompt: data.get("text"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resTxt = await res.json();
    console.log(resTxt);
    const resRatings = resTxt.split(" ");
    setOutputRating({
      deliverySpeed: resRatings[0],
      taste: resRatings[1],
      price: resRatings[2],
      ambience: resRatings[3],
      service: resRatings[4],
    });
  }

  async function handleSubmitRecomendation(event) {
    event.preventDefault();
    const res = await fetch("/api/recomendation", {
      method: "POST",
      body: JSON.stringify({
        prompt: `${inputRating.deliverySpeed} ${inputRating.taste} ${inputRating.price} ${inputRating.ambience} ${inputRating.service}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resTxt = await res.json();
    setRecomendationText(resTxt);
  }

  return (
    <main className="bg">
      <section id="mid">
        <form className="mid-section" onSubmit={handleSubmitRating}>
          <div className="answer">
            <p className="komment">
              Enter a comment to see how our rating system works.
            </p>
            <h1>Ratings</h1>
            <p className="flex items-center justify-center gap-4">
              <span>Delivery Speed:</span>
              <Stars rating={outputRating.deliverySpeed} />
            </p>
            <p className="flex items-center justify-center gap-4">
              <span>Taste:</span>
              <Stars rating={outputRating.taste} />
            </p>
            <p className="flex items-center justify-center gap-4">
              <span>Price:</span>
              <Stars rating={outputRating.price} />
            </p>
            <p className="flex items-center justify-center gap-4">
              <span>Ambience:</span>
              <Stars rating={outputRating.ambience} />
            </p>
            <p className="flex items-center justify-center gap-4">
              <span>Service:</span>
              <Stars rating={outputRating.service} />
            </p>
          </div>
          <div id="comment">
            <input
              type="text"
              name="text"
              className="input-box"
              placeholder="Enter your comment"
            />
            <button className="submit">
              <IoSendSharp />
            </button>
          </div>
        </form>

        <form onSubmit={handleSubmitRecomendation} className="mid-section">
          <div className="answer">
            <p className="komment">
              Select ratings for a restaurant and we will generate
              recomendations to improve your ratings.
            </p>
            <h1>Ratings</h1>
            <p className="flex items-center justify-center gap-4">
              <span>Delivery Speed:</span>
              <Rate
                rating={inputRating.deliverySpeed}
                setRating={setInputRating}
                criteria="deliverySpeed"
              />
            </p>
            <p className="flex items-center justify-center gap-4">
              <span>Taste:</span>
              <Rate
                rating={inputRating.taste}
                setRating={setInputRating}
                criteria="taste"
              />
            </p>
            <p className="flex items-center justify-center gap-4">
              <span>Price:</span>
              <Rate
                rating={inputRating.price}
                setRating={setInputRating}
                criteria="price"
              />
            </p>
            <p className="flex items-center justify-center gap-4">
              <span>Ambience:</span>
              <Rate
                rating={inputRating.ambience}
                setRating={setInputRating}
                criteria="ambience"
              />
            </p>
            <p className="flex items-center justify-center gap-4">
              <span>Service:</span>
              <Rate
                rating={inputRating.service}
                setRating={setInputRating}
                criteria="service"
              />
            </p>
            <button className="rat-sub">Submit</button>
          </div>
          <p class="rec-text2"> {recomendationText} </p>
        </form>
      </section>
    </main>
  );
}
