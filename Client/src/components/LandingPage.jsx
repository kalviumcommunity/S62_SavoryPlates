import React from "react";

const LandingPage = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Header Section */}
      <header style={{ backgroundColor: "#FFA07A", padding: "20px 50px" }}>
        <h1 style={{ margin: 0, color: "#fff" }}>SavoryPlates</h1>
        <p style={{ margin: "5px 0", color: "#fff" }}>Your personalized recipe and meal planning assistant.</p>
      </header>

      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          padding: "50px 20px",
          backgroundColor: "#FFF3E0",
        }}
      >
        <h2>Discover Delicious Recipes</h2>
        <p style={{ maxWidth: "600px", margin: "0 auto" }}>
          Explore thousands of recipes tailored to your taste and dietary
          preferences. Whether you’re a home chef or a food enthusiast, we’ve
          got something for everyone!
        </p>
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#FF7043",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => alert("Let’s Get Cooking!")}
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section style={{ padding: "50px 20px" }}>
        <h2 style={{ textAlign: "center" }}>Features</h2>
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "30px", flexWrap: "wrap" }}>
          <div style={{ width: "30%", marginBottom: "20px", textAlign: "center" }}>
            <img src="https://teamnutrition.ca/sites/default/files/inline-images/Meal%20Plans%20-%20Plans%20alimentaires_0.jpg" alt="Personalized" style={{width:"200px",height:"200px"}}/>
            <h3>Personalized Meal Plans</h3>
            <p>Tailor recipes to your dietary preferences and lifestyle.</p>
          </div>
          <div style={{ width: "30%", marginBottom: "20px", textAlign: "center" }}>
            <img src="https://www.vikhrolicucina.com/uploads/stories/1696502679_fooddestinations.jpg" alt="Explore" style={{width:"200px",height:"200px",borderRadius:""}}/>
            <h3>Explore Recipes</h3>
            <p>Search through thousands of mouth-watering recipes.</p>
          </div>
          <div style={{ width: "30%", marginBottom: "20px", textAlign: "center" }}>
            <img src="https://miro.medium.com/v2/resize:fit:1400/0*oTfm1pTXLxitHHFy.jpg" alt="Save Favorites" style={{width:"200px",height:"200px"}} />
            <h3>Save Your Favorites</h3>
            <p>Bookmark recipes you love and access them anytime.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        style={{
          textAlign: "center",
          padding: "50px 20px",
          backgroundColor: "#FFF3E0",
        }}
      >
        <h2>What Our Users Say</h2>
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "30px", flexWrap: "wrap" }}>
          <blockquote style={{ width: "30%", marginBottom: "20px" }}>
            "SavoryPlates has completely transformed how I plan my meals. It's
            a game-changer!" – <strong>Emily</strong>
          </blockquote>
          <blockquote style={{ width: "30%", marginBottom: "20px" }}>
            "I love how easy it is to find recipes that suit my taste. Highly
            recommend!" – <strong>Michael</strong>
          </blockquote>
          <blockquote style={{ width: "30%", marginBottom: "20px" }}>
            "Meal planning has never been this fun and efficient!" –
            <strong>Sarah</strong>
          </blockquote>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section style={{ textAlign: "center", padding: "50px 20px" }}>
        <h2>Start Your Culinary Adventure Today</h2>
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#FF7043",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => alert("Welcome to SavoryPlates!")}
        >
          Join Now
        </button>
      </section>

      {/* Footer Section */}
      <footer style={{ backgroundColor: "#FFA07A", padding: "10px 50px", textAlign: "center", color: "#fff" }}>
        <p>© 2025 SavoryPlates. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;