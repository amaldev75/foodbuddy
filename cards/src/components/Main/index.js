import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { toast } from "react-toastify";

const Main = () => {
  const [cards, setCards] = useState([]); // State to store card data
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch card data when the page loads
    const fetchCards = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/data");
        setCards(data);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
      }
    };

    fetchCards();
  }, []);

  // Handle search submission
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.info("Please enter a food item to search."); // Empty search query
      return;
    }
  
    const matchedCard = cards.find((card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    if (matchedCard) {
      navigate(`/card/${matchedCard._id}`, { state: { from: "/main" } });
    } else {
      toast.error("No results found. Please try a different search term.");
      setSearchQuery(""); // Clear the search bar
       // alert("No matching item found!");
    }
  };
  
  
  

  return (
    <div className={styles.mainContainer}>
      <nav className={styles.navbar}>
        <h1 className={styles.title}>FoodBuddy</h1>
        {/* Search Bar */}
        <span>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search items..."
            className={styles.searchBar}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch} className={styles.searchButton}>
            Search
          </button>
        </div>
        
          <button className={styles.Button} onClick={() => navigate("/profile")}>
            Profile
          </button>
          <button className={styles.Button} onClick={() => navigate("/cart")}>
            Cart
          </button>
        </span>
      </nav>

      <div className={styles.cardContainer}>
        <div className={styles.cardsGrid}>
          {cards.map((card) => (
            <div key={card._id} className={styles.card}>
              <h3>{card.title}</h3>
              <img
                src={card.imgsrc}
                alt={card.title}
                className={styles.cardImage}
              />
              <p>Price: ₹ {card.price}</p>
              <p>{card.content}</p>
              <button
                className={styles.detailsButton}
                onClick={() =>
                  navigate(`/card/${card._id}`, { state: { from: "/main" } })
                }
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

            {/* Footer */}
            {/* <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; {new Date().getFullYear()} FoodBuddy. All rights reserved.</p>
          <div className={styles.footerLinks}>
            <a href="/about" className={styles.footerLink}>
              About Us
            </a>
            <a href="/contact" className={styles.footerLink}>
              Contact
            </a>
            <a href="/privacy" className={styles.footerLink}>
              Privacy Policy
            </a>
          </div>
        </div>
      </footer> */}

    </div>
  );
};

export default Main;
