import { useState, useEffect } from 'react';
import * as itemsAPI from '../../utilities/items-api';

export default function NewOrderPage() {
  const [menuItems, setMenuItems] = useState([]);

  // - Fetch the menuItems from the server via AJAX
  // - When the data comes back, call setMenuItems to save in state
  // Add this useEffect with an empty dependency array that causes the effect to run only after the first render
  useEffect(function() {
    async function getItems() {
      const items = await itemsAPI.getAll();
      setMenuItems(items);
    }
    getItems();
  }, []);
  
  return (
    <h1>NewOrderPage</h1>
  );
}