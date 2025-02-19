import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RecipeEntities() {
    const [recipes, setRecipes] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(""); // To store selected user for filtering
    const navigate = useNavigate();

    // Fetch recipes based on selected user
    const fetchRecipes = async () => {
        try {
            const url = selectedUser
                ? `http://localhost:3010/CRUD/recipe?created_by=${selectedUser}` // Filter by user
                : "http://localhost:3010/CRUD/recipe"; // Fetch all recipes
            const response = await axios.get(url);
            setRecipes(response.data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    // Fetch all users to populate the dropdown for filtering
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3010/CRUD/users");
            // console.log(response.data)
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Delete recipe by ID
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3010/CRUD/${id}`);
            setRecipes(recipes.filter((recipe) => recipe._id !== id)); // Update UI after deletion
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    };

    // Navigate to the Edit page
    const handleEdit = (id) => {
        navigate(`/edit-recipe/${id}`);
    };

    // Handle dropdown change (filtering by user)
    const handleUserChange = (e) => {
      const userId = e.target.value;
      setSelectedUser(userId); // Update selected user state
  
      // Log the selected user after state change using useEffect
      console.log("User selected:", userId);
  };

    // Run fetch functions when the component is mounted or when selectedUser changes
    useEffect(() => {
        fetchRecipes();
        fetchUsers();
    }, [selectedUser]);

    const styles = {
        container: {
            padding: "24px",
            fontFamily: "sans-serif",
            background: "linear-gradient(to bottom right, #fef3f3, #f3f7ff, #f5f9e3)",
            minHeight: "100vh",
        },
        header: {
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "#7d4b9e",
            marginBottom: "32px",
            textAlign: "center",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "32px",
        },
        card: {
            padding: "24px",
            border: "2px solid #a3c4f3",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            background: "linear-gradient(to bottom right, #fff8fb, #f3f9ff, #f8fff6)",
            transition: "transform 0.3s, box-shadow 0.3s",
            cursor: "pointer",
        },
        recipeTitle: {
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#8b5e83",
            marginBottom: "8px",
        },
        text: {
            fontSize: "0.9rem",
            color: "#5f6a75",
            marginBottom: "4px",
        },
        label: {
            fontWeight: "600",
            color: "#5b75aa",
        },
        date: {
            fontSize: "0.8rem",
            color: "#a0a9b5",
            fontStyle: "italic",
            marginBottom: "16px",
        },
        subheading: {
            fontSize: "1.2rem",
            fontWeight: "600",
            color: "#6e7181",
            marginTop: "16px",
            marginBottom: "8px",
        },
        list: {
            paddingLeft: "16px",
            margin: "0",
            fontSize: "0.9rem",
            color: "#4a5562",
        },
    };

    const handleClick = () => {
        navigate('/add-entities');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>🍽️ Recipe Collection</h1>
            <button
                onClick={handleClick}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
            >
                Add Recipe
            </button>
            <br />
            <label>
                Filter by User:{" "}
                <select value={selectedUser} onChange={handleUserChange}>
                    <option value="">All Users</option>
               
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </label>

            <div style={styles.grid}>
                {recipes?.map((recipe) => (
                    <div
                        key={recipe._id}
                        style={styles.card}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.2)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                        }}
                    >
                        <h3 style={styles.recipeTitle}>{recipe.title}</h3>
                        <p style={styles.text}>
                            <span style={styles.label}>Category:</span> {recipe.category}
                        </p>
                        <p style={styles.text}>
                            <span style={styles.label}>Cook Time:</span> ⏳ {recipe.cook_time} mins
                        </p>
                        <p style={styles.text}>
                            <span style={styles.label}>Author:</span> ✍️ {recipe.author}
                        </p>
                        <p style={styles.date}>
                            📅 {new Date(recipe.created_at).toLocaleDateString()}
                        </p>
                        <h4 style={styles.subheading}>🛒 Ingredients:</h4>
                        <ul style={styles.list}>
                            {recipe.ingredients.map((ing, index) => (
                                <li key={index}>
                                    {ing.quantity} {ing.unit} {ing.ingredient_name}
                                </li>
                            ))}
                        </ul>
                        <h4 style={styles.subheading}>📖 Instructions:</h4>
                        <ol style={styles.list}>
                            {recipe.instructions.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                        <button
                            onClick={() => handleDelete(recipe._id)}
                            style={{
                                marginTop: "12px",
                                padding: "8px 12px",
                                fontSize: "14px",
                                backgroundColor: "#ff4d4d",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                transition: "background-color 0.3s ease",
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = "#e60000"}
                            onMouseOut={(e) => e.target.style.backgroundColor = "#ff4d4d"}
                        >
                            🗑️ Delete
                        </button>
                        <button
                            onClick={() => handleEdit(recipe._id)}
                            style={{
                                padding: "8px 12px",
                                fontSize: "14px",
                                backgroundColor: "#ffcc00",
                                color: "black",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                transition: "background-color 0.3s ease",
                              }}
                              onMouseOver={(e) => e.target.style.backgroundColor = "#e6b800"}
                              onMouseOut={(e) => e.target.style.backgroundColor = "#ffcc00"}
                          >
                              ✏️ Edit
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      );
  }
  
  export default RecipeEntities;
  
