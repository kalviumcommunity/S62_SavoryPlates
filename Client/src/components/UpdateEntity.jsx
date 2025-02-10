import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateRecipePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        ingredients: '',
        instructions: '',
        cook_time: 0,
        author: '',
        created_at: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:3010/CRUD/recipe/${id}`)
            .then((response) => {
                const data = response.data;
                setFormData({
                    ...data,
                    ingredients: data.ingredients.join(', '), // Convert array to comma-separated string
                    instructions: data.instructions.join('\n') // Convert array to newline-separated string
                });
            })
            .catch((error) => console.error("Error fetching recipe:", error));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3010/CRUD/${id}`, {
                ...formData,
                ingredients: formData.ingredients.split(',').map(item => item.trim()), // Convert back to array
                instructions: formData.instructions.split('\n').map(item => item.trim()) // Convert back to array
            });
            navigate('/entities');
        } catch (err) {
            console.log('Error while updating', err);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formWrapper}>
                <h2 style={styles.title}>Update Recipe</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        style={styles.input}
                        required
                    />
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Category"
                        style={styles.input}
                        required
                    />
                    <textarea
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        placeholder="Ingredients (comma separated)"
                        style={styles.textarea}
                        required
                    />
                    <textarea
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        placeholder="Instructions (one per line)"
                        style={styles.textarea}
                        required
                    />
                    <input
                        type="number"
                        name="cook_time"
                        value={formData.cook_time}
                        onChange={handleChange}
                        placeholder="Cook Time (minutes)"
                        style={styles.input}
                        required
                    />
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Author"
                        style={styles.input}
                        required
                    />
                    <input
                        type="date"
                        name="created_at"
                        value={formData.created_at}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                    <button type="submit" style={styles.button}>
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        padding: '20px',
    },
    formWrapper: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
    },
    title: {
        textAlign: 'center',
        color: '#4f46e5',
        marginBottom: '10px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #d1d5db',
        width: '100%',
    },
    textarea: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #d1d5db',
        width: '100%',
        minHeight: '80px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#4f46e5',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        textAlign: 'center',
    },
};

export default UpdateRecipePage;
