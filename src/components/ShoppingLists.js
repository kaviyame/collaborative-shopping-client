// client/src/components/ShoppingLists.js
import React, { useState } from 'react';
import ShoppingList from './ShoppingList';

const ShoppingLists = ({ userId }) => {
    const [lists, setLists] = useState([{ id: 'list1', name: 'My First List' }, { id: 'list2', name: 'My Second List' }]);

    const deleteList = (id) => {
        setLists(lists.filter(list => list.id !== id));
    };

    return (
        <div>
            <h1>My Shopping Lists</h1>
            {lists.map((list) => (
                <ShoppingList key={list.id} userId={userId} listId={list.id} listName={list.name} onDeleteList={() => deleteList(list.id)} />
            ))}
        </div>
    );
};

export default ShoppingLists;
