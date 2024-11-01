// client/src/App.js
import React from 'react';
import ShoppingLists from './components/ShoppingLists';

const App = () => {
    const userId = 'sampleUserId'; // Replace with actual user ID or implement authentication
    return (
        <div>
            <ShoppingLists userId={userId} />
        </div>
    );
};

export default App;
