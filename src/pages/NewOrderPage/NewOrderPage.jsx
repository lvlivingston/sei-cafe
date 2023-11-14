import { useState, useEffect } from 'react';

export default function NewOrderPage() {
  const [menuItems, setMenuItems] = useState([]);

  // - Fetch the menuItems from the server via AJAX
  // - When the data comes back, call setMenuItems to save in state

  useEffect(function() {
    console.log('NewOrderPage rendered');
  });
  // Add this useEffect with an empty dependency array that causes the effect to run only after the first render
  useEffect(function() {
    console.log('useEffect runs only after first render');
  }, []);

  useEffect(function() {
    console.log('useEffect runs when menuItems changes');
  }, [menuItems]);
  
  return (
    <>
    <h1>NewOrderPage</h1>
    <button onClick={() => setMenuItems(Date.now())}>Trigger re-render</button>
    </>
  );
}