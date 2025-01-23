import React from "react";

const SingleRecipePage = () => {
  // Example Recipe Data
  // You can replace this with actual data fetched from an API or passed via props
  const recipe= {
    title: "Vegetable Stir Fry",
    category: "lunch",
    ingredients: ["Broccoli", "Carrots", "Soy Sauce"],
    instructions: [
      "Chop the vegetables.",
      "Heat the pan.",
      "Stir fry and season.",
    ],
    cook_time: 20,
    author: "Alice Johnson",
    created_at: "2024-12-18",
  } 

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", backgroundColor: "#FFF3E0" }}>
      {/* Recipe Title */}
      <h1 style={{ textAlign: "center", color: "#FF7043" }}>{recipe.title}</h1>

      {/* Recipe Metadata */}
      <p style={{ textAlign: "center", fontStyle: "italic", color: "#555" }}>
        Category: <strong>{recipe.category}</strong> | Cook Time: <strong>{recipe.cook_time} mins</strong>
      </p>
      <p style={{ textAlign: "center", fontSize: "14px", color: "#777" }}>
        Created by: <strong>{recipe.author}</strong> on {new Date(recipe.created_at).toLocaleDateString()}
      </p>

      <hr />

      {/* Ingredients */}
      <section>
        <h2 style={{ color: "#FF7043" }}>Ingredients</h2>
        <ul style={{ lineHeight: "1.8" }}>
          {recipe.ingredients && recipe.ingredients.length > 0 ? (
            recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))
          ) : (
            <p>No ingredients provided.</p>
          )}
        </ul>
      </section>

      <hr />

      {/* Instructions */}
      <section>
        <h2 style={{ color: "#FF7043" }}>Instructions</h2>
        <ol style={{ lineHeight: "1.8" }}>
          {recipe.instructions && recipe.instructions.length > 0 ? (
            recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))
          ) : (
            <p>No instructions provided.</p>
          )}
        </ol>
      </section>

      <hr />

      {/* Footer */}
      <footer style={{ textAlign: "center", marginTop: "20px", color: "#555" }}>
        <p>
          Looking for more recipes? Explore <strong>SavoryPlates</strong> today!
        </p>
      </footer>
    </div>
  );
};

export default SingleRecipePage;
