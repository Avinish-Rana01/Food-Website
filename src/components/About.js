import chef1 from "url:../assets/chef1.png";
import chef2 from "url:../assets/chef2.png";

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80')" }}>
        <div className="about-hero-overlay">
          <h1>About Avi Grills</h1>
          <p>Crafting Culinary Experiences since 2024</p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="about-section story-section">
        <div className="about-content">
          <div className="story-text">
            <h2>Our Story</h2>
            <p>
              Welcome to Avi Grills, where flavor isn’t just served — it’s
              celebrated. We’re driven by one simple belief: great food has the
              power to bring people together, lift moods, and turn everyday
              moments into something special.
            </p>
            <p>
              What began as a humble kitchen dream has grown into a brand loved
              by food enthusiasts who crave quality, consistency, and bold
              taste.
            </p>

            <p>
              At Avi Grills, every dish is crafted with fresh ingredients,
              time-tested recipes, and a whole lot of heart. We don’t cut
              corners — we grill, season, and serve the right way, just like
              it’s always been done.
            </p>

            <p>
              In a fast-paced world, we make sure you never have to compromise
              on taste or freshness. Whether it’s a quick bite or a full meal,
              our focus remains the same: authentic flavors, generous portions,
              and service you can trust.
            </p>

            <p>
              Avi Grills isn’t just about food delivery — it’s about creating
              experiences, one plate at a time.
            </p>

            <p>Good food. Honest cooking. Unmatched vibes. <span role="img" aria-label="fire">🔥</span></p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-container">
        <div className="stat-item">
          <h3>50+</h3>
          <p>Restaurants</p>
        </div>
        <div className="stat-item">
          <h3>10k+</h3>
          <p>Happy Customers</p>
        </div>
        <div className="stat-item">
          <h3>30+</h3>
          <p>Cities</p>
        </div>
        <div className="stat-item">
          <h3>4.8★</h3>
          <p>Average Rating</p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="about-section why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Fast Delivery</h3>
            <p>We ensure your food arrives hot and fresh within 30 minutes.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🥘</div>
            <h3>Quality Food</h3>
            <p>We partner only with the best rated restaurants in town.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Easy Payments</h3>
            <p>Multiple payment options including UPI, Cards, and Wallets.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎧</div>
            <h3>24/7 Support</h3>
            <p>Our dedicated support team is always there to help you.</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="about-section team-section">
        <h2>Meet Our Master Chefs</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src={chef1} alt="Chef Madhav" loading="lazy" />
            <h3>Chef Madhav</h3>
            <p>Executive Chef</p>
          </div>
          <div className="team-member">
            <img src={chef2} alt="Chef Meena" loading="lazy" />
            <h3>Chef Meena</h3>
            <p>Sous Chef</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
