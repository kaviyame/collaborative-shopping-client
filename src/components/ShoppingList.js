// client/src/components/ShoppingList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShoppingList = ({ userId, listId, listName, onDeleteList }) => {
    const [items, setItems] = useState([]);
    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');

    const fetchItems = async () => {
        const res = await axios.get(`/api/items/${userId}/${listId}`);
        setItems(res.data);
    };

    const addItem = async (e) => {
        e.preventDefault();
        const newItem = { title, link, image, price, userId, listId };
        await axios.post('/api/items', newItem);
        fetchItems();
        setLink('');
        setTitle('');
        setImage('');
        setPrice('');
    };

    const deleteItem = async (id) => {
        await axios.delete(`/api/items/${id}`);
        fetchItems();
    };

    const moveItem = async (id, newListId) => {
        await axios.put(`/api/items/${id}`, { listId: newListId });
        fetchItems();
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div>
            <h2>{listName}</h2>
            <button onClick={onDeleteList}>Delete List</button>
            <form onSubmit={addItem}>
                <input
                    type="text"
                    placeholder="Item Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Item Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button type="submit">Add Item</button>
            </form>
            <ul>
                {items.map((item) => (
                    <li key={item._id}>
                        <h3>{item.title}</h3>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <img src={item.image} alt={item.title} width="100" />
                        </a>
                        <p>Price: ${item.price}</p>
                        <button onClick={() => deleteItem(item._id)}>Delete</button>
                        <button onClick={() => moveItem(item._id, 'anotherListId')}>Move to Another List</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShoppingList;
