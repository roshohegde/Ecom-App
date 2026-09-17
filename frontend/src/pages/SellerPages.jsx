import { useEffect, useState } from "react";
import { catalogApi } from "../api/catalogApi";
import { ErrorMessage, Loading } from "../components/State";
import "./adminStyles.css";

const blank = {
  sku: "",
  name: "",
  description: "",
  price: "",
  categoryId: "",
  availableQuantity: 0,
};

export function SellerCatalog() {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const load = () => {
    setError("");
    catalogApi
      .sellerProducts()
      .then(setProducts)
      .catch((e) => setError(e.message));
    catalogApi
      .categories()
      .then(setCategories)
      .catch((e) => setError(e.message));
  };
  useEffect(load, []);
  const update = (key, value) => setForm({ ...form, [key]: value });
  const saveProduct = async (event) => {
    event.preventDefault();
    try {
      const data = {
        ...form,
        price: Number(form.price),
        categoryId: Number(form.categoryId),
        availableQuantity: Number(form.availableQuantity),
      };
      if (editing) await catalogApi.updateSellerProduct(editing, data);
      else await catalogApi.createSellerProduct(data);
      setForm(blank);
      setEditing(null);
      setNotice("Product saved and published to the shop.");
      load();
    } catch (e) {
      setError(e.message);
    }
  };
  const edit = (product) => {
    setEditing(product.id);
    setForm({
      sku: product.sku,
      name: product.name,
      description: product.description || "",
      price: product.price,
      categoryId: categories.find((c) => c.name === product.category)?.id || "",
      availableQuantity: product.availableQuantity,
    });
    setNotice("");
  };
  const remove = async (product) => {
    if (!confirm(`Delete ${product.name}?`)) return;
    try {
      await catalogApi.deleteSellerProduct(product.id);
      setProducts(
        (current) =>
          current && {
            ...current,
            content: current.content.filter((item) => item.id !== product.id),
            totalElements: Math.max(0, current.totalElements - 1),
          },
      );
      setNotice("Product deleted.");
      load();
    } catch (e) {
      setError(e.message);
    }
  };
  if (!products) return <Loading />;
  return (
    <section className="admin">
      <p className="eyebrow">SELLER</p>
      <h1>Your product catalogue</h1>
      <p className="form-intro">
        Create listings, set prices, and keep your available stock current.
      </p>
      <ErrorMessage error={error} />
      {notice && <p className="notice">{notice}</p>}
      <div className="admin-grid">
        <form className="panel" onSubmit={saveProduct}>
          <h2>{editing ? "Edit product" : "List a product"}</h2>
          <label>
            SKU
            <input
              required
              value={form.sku}
              onChange={(e) => update("sku", e.target.value)}
            />
          </label>
          <label>
            Name
            <input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </label>
          <label>
            Description
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </label>
          <label>
            Price
            <input
              type="number"
              min="0.01"
              step="0.01"
              required
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
            />
          </label>
          <label>
            Available stock
            <input
              type="number"
              min="0"
              step="1"
              required
              value={form.availableQuantity}
              onChange={(e) => update("availableQuantity", e.target.value)}
            />
          </label>
          <label>
            Category
            <select
              required
              value={form.categoryId}
              onChange={(e) => update("categoryId", e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <div className="form-actions">
            <button className="button">
              {editing ? "Update product" : "Publish product"}
            </button>
            {editing && (
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setEditing(null);
                  setForm(blank);
                  setNotice("");
                }}
              >
                Cancel edit
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="table">
        {products.content.length === 0 && (
          <p className="muted">You have not listed any products yet.</p>
        )}
        {products.content.map((product) => (
          <div key={product.id}>
            <b>{product.name}</b>
            <span>{product.sku}</span>
            <span>{product.availableQuantity} in stock</span>
            <button onClick={() => edit(product)}>Edit</button>
            <button className="danger" onClick={() => remove(product)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
