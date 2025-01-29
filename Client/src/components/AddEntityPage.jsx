import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddEntity() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        ingredients: [
            { ingredient_name: '', quantity: '', unit: '' },
        ],
        instructions: [''],
        cook_time: '',
        author: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleIngredientChange = (index, e) => {
        const { name, value } = e.target;
        const ingredients = [...formData.ingredients];
        ingredients[index] = { ...ingredients[index], [name]: value };
        setFormData({ ...formData, ingredients });
    };

    const handleInstructionChange = (index, e) => {
        const instructions = [...formData.instructions];
        instructions[index] = e.target.value;
        setFormData({ ...formData, instructions });
    };

    const addIngredient = () => {
        setFormData({
            ...formData,
            ingredients: [...formData.ingredients, { ingredient_name: '', quantity: '', unit: '' }],
        });
    };

    const addInstruction = () => {
        setFormData({ ...formData, instructions: [...formData.instructions, ''] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3010/CRUD/create", formData);
            console.log(response.data);
            navigate("/entities");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Add New Recipe</h1>

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required style={styles.input} />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Category</label>
                    <input type="text" name="category" value={formData.category} onChange={handleChange} required style={styles.input} />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Ingredients</label>
                    {formData.ingredients.map((ingredient, index) => (
                        <div key={index} style={styles.ingredientGroup}>
                            <input type="text" name="ingredient_name" value={ingredient.ingredient_name} onChange={(e) => handleIngredientChange(index, e)} required style={styles.input} placeholder="Ingredient Name" />
                            <input type="text" name="quantity" value={ingredient.quantity} onChange={(e) => handleIngredientChange(index, e)} required style={styles.input} placeholder="Quantity" />
                            <input type="text" name="unit" value={ingredient.unit} onChange={(e) => handleIngredientChange(index, e)} required style={styles.input} placeholder="Unit" />
                        </div>
                    ))}
                    <button type="button" onClick={addIngredient} style={styles.buttonSecondary}>Add Ingredient</button>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Instructions</label>
                    {formData.instructions.map((instruction, index) => (
                        <textarea key={index} name="instructions" value={instruction} onChange={(e) => handleInstructionChange(index, e)} required style={styles.textarea} placeholder="Step details..."></textarea>
                    ))}
                    <button type="button" onClick={addInstruction} style={styles.buttonSecondary}>Add Instruction</button>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Cook Time (minutes)</label>
                    <input type="number" name="cook_time" value={formData.cook_time} onChange={handleChange} required style={styles.input} />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Author</label>
                    <input type="text" name="author" value={formData.author} onChange={handleChange} required style={styles.input} />
                </div>

                <div style={styles.buttonGroup}>
                    <button type="submit" style={styles.buttonPrimary}>Submit</button>
                    <button type="button" onClick={() => navigate('/entities')} style={styles.buttonDanger}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

// Styles Object
const styles = {
    container: {
        padding: "32px",
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(to bottom right, #2d2d2d, #1a1a1a, black)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    heading: {
        fontSize: "36px",
        fontWeight: "bold",
        color: "white",
        marginBottom: "32px",
        textAlign: "center",
        textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)"
    },
    form: {
        maxWidth: "448px",
        background: "#333",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        width: "100%"
    },
    formGroup: {
        marginBottom: "16px"
    },
    label: {
        fontWeight: "bold",
        color: "#4fd1c5",
        display: "block",
        marginBottom: "6px"
    },
    input: {
        width: "100%",
        padding: "12px",
        background: "#444",
        color: "white",
        border: "1px solid #555",
        borderRadius: "6px",
        fontSize: "16px"
    },
    textarea: {
        width: "100%",
        padding: "12px",
        background: "#444",
        color: "white",
        border: "1px solid #555",
        borderRadius: "6px",
        fontSize: "16px",
        minHeight: "80px"
    },
    ingredientGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "12px"
    },
    buttonGroup: {
        display: "flex",
        justifyContent: "space-between"
    },
    buttonPrimary: {
        backgroundColor: "#4fd1c5",
        color: "white",
        padding: "10px 20px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        transition: "0.3s"
    },
    buttonSecondary: {
        backgroundColor: "#555",
        color: "#4fd1c5",
        padding: "10px 20px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        transition: "0.3s"
    },
    buttonDanger: {
        backgroundColor: "#e53e3e",
        color: "white",
        padding: "10px 20px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        transition: "0.3s"
    }
}

export default AddEntity;
