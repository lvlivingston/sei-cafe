import { useState, useEffect, useRef } from 'react';
import * as itemsAPI from '../../utilities/items-api';
import './NewOrderPage.css';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import MenuList from '../../components/MenuList/MenuList';
import CategoryList from '../../components/CategoryList/CategoryList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function NewOrderPage({ user, setUser }) {
  const [menuItems, setMenuItems] = useState([]);
  // Add state to track the "active" category 
  const [activeCat, setActiveCat] = useState('');
  // Create and initialize the ref to an empty array
  const categoriesRef = useRef([]);

  // - Fetch the menuItems from the server via AJAX
  // - When the data comes back, call setMenuItems to save in state
  // Add this useEffect with an empty dependency array that causes the effect to run only after the first render
  useEffect(function() {
    async function getItems() {
      const items = await itemsAPI.getAll();
      // Remove dups of category names using a Set, then spread Set back into an array literal
      categoriesRef.current = [...new Set(items.map(item => item.category.name))];
      setMenuItems(items);
      setActiveCat(categoriesRef.current[0]);
    }
    getItems();
  }, []);
  
  return (
    <main className="NewOrderPage">
      <aside>
        <Logo />
        <CategoryList
          categories={categoriesRef.current}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
        />
        <Link to="/orders" className="button btn-sm">PREVIOUS ORDERS</Link>
        <UserLogOut user={user} setUser={setUser} />
      </aside>
      <MenuList
        menuItems={menuItems.filter(item => item.category.name === activeCat)}
      />
      <OrderDetail />
    </main>
  );
}