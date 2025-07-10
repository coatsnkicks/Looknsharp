import React, { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        image: null,
        cost: "",
        sites: {
          poshmark: false,
          fb: false,
          offerup: false,
          depop: false,
          ebay: false,
          mercari: false,
        },
        suggestedPrice: null,
        category: "",
        color: "",
      },
    ]);
  };

  const updateItem = (id, field, value) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const updateSite = (id, site) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              sites: {
                ...item.sites,
                [site]: !item.sites[site],
              },
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const getSuggestedPrice = (item) => {
    const price = (parseFloat(item.cost) * 1.5 + 5).toFixed(2);
    updateItem(item.id, "suggestedPrice", price);
  };

  const createOutfit = (itemIds) => {
    const selectedItems = items.filter((item) => itemIds.includes(item.id));
    // Add outfit logic if needed
  };

  const suggestOutfits = () => {
    const grouped = {};
    items.forEach((item) => {
      const key = `${item.color}-${item.category}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item);
    });
    const suggested = Object.values(grouped).filter((group) => group.length > 1);
    console.log("Suggested Outfits:", suggested);
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={addItem}>Add Item</button>
      <button onClick={suggestOutfits}>Auto-Suggest Outfits</button>
      {items.map((item) => (
        <div key={item.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              updateItem(item.id, "image", URL.createObjectURL(e.target.files[0]))
            }
          />
          {item.image && <img src={item.image} alt="item" style={{ width: 60 }} />}
          <input
            type="number"
            placeholder="Cost to you ($)"
            value={item.cost}
            onChange={(e) => updateItem(item.id, "cost", e.target.value)}
          />
          <input
            type="text"
            placeholder="Category"
            value={item.category}
            onChange={(e) => updateItem(item.id, "category", e.target.value)}
          />
          <input
            type="text"
            placeholder="Color"
            value={item.color}
            onChange={(e) => updateItem(item.id, "color", e.target.value)}
          />
          <button onClick={() => getSuggestedPrice(item)}>Get Price</button>
          <button onClick={() => removeItem(item.id)}>Remove</button>
          <div>
            {Object.keys(item.sites).map((site) => (
              <label key={site}>
                <input
                  type="checkbox"
                  checked={item.sites[site]}
                  onChange={() => updateSite(item.id, site)}
                />
                {site}
              </label>
            ))}
          </div>
          {item.suggestedPrice && (
            <div style={{ color: "green" }}>
              Suggested Price: ${item.suggestedPrice}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
