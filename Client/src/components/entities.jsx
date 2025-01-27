import { useState, useEffect } from "react";
import axios from "axios";

function RecipeEntities() {
    const [recipes, setRecipes] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3010/CRUD/recipe");
            setRecipes(response.data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-6 font-sans bg-gradient-to-br from-red-200 via-orange-100 to-yellow-200 min-h-screen">
        <h1 className="text-4xl font-extrabold text-orange-900 mb-8 text-center drop-shadow-md">
            🍽️ Recipe Collection
        </h1>
    
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {recipes?.map((recipe) => (
                <div 
                    key={recipe._id} 
                    className="p-6 border-2 border-orange-400 rounded-lg shadow-lg bg-gradient-to-br from-yellow-50 via-orange-100 to-red-50 hover:shadow-2xl transition duration-300 transform hover:scale-105 flex flex-col"
                >
                    {/* Recipe Title */}
                    <h3 className="text-2xl font-bold text-orange-800 mb-2 border-b-2 border-orange-400 pb-2">
                        {recipe.title}
                    </h3>
    
                    {/* Category & Time */}
                    <div className="border-l-4 border-orange-300 pl-4 mb-2">
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold text-orange-900">Category:</span> {recipe.category}
                        </p>
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold text-orange-900">Cook Time:</span> ⏳ {recipe.cook_time} mins
                        </p>
                    </div>
    
                    {/* Author */}
                    <div className="border-l-4 border-orange-300 pl-4 mb-2">
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold text-orange-900">Author:</span> ✍️ {recipe.author}
                        </p>
                        <p className="text-sm text-gray-500 italic">
                            📅 {new Date(recipe.created_at).toLocaleDateString()}
                        </p>
                    </div>
    
                    {/* Ingredients */}
                    <div className="border-l-4 border-orange-300 pl-4 mb-4">
                        <h4 className="text-lg font-semibold text-orange-800 mt-4">🛒 Ingredients:</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {recipe.ingredients.map((ing, index) => (
                                <li key={index}>
                                    {ing.quantity} {ing.unit} {ing.ingredient_name}
                                </li>
                            ))}
                        </ul>
                    </div>
    
                    {/* Instructions */}
                    <div className="border-l-4 border-orange-300 pl-4">
                        <h4 className="text-lg font-semibold text-orange-800 mt-4">📖 Instructions:</h4>
                        <ol className="list-decimal list-inside text-gray-700 space-y-1">
                            {recipe.instructions.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            ))}
        </div>
    </div>
    
    );
}

export default RecipeEntities;
