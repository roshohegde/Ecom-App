import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { catalogApi } from "../api/catalogApi";
import { commerceApi } from "../api/commerceApi";
import { Loading, Empty, ErrorMessage } from "../components/State";
import { useAuth } from "../context/AuthContext";
import "./catalogStyles.css";
const money = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    n,
  );
export function ProductList() {
  const { user } = useAuth(),
    [page, setPage] = useState(null),
    [query, setQuery] = useState(""),
    [category, setCategory] = useState(""),
    [categories, setCategories] = useState([]),
    [error, setError] = useState(""),
    [notice, setNotice] = useState("");
  const load = async (p = 0) => {
    try {
      setError("");
      setPage(
        await catalogApi.products({
          page: p,
          size: 12,
          sort: "createdAt,desc",
          ...(query && { q: query }),
          ...(category && { category }),
        }),
      );
    } catch (e) {
      setError(e.message);
    }
  };
  useEffect(() => {
    load();
    catalogApi
      .categories()
      .then(setCategories)
      .catch(() => {});
  }, []);
  const add = async (product) => {
    if (!user) return setNotice("Sign in to add products to your cart.");
    if (product.availableQuantity <= 0)
      return setNotice(`${product.name} is currently out of stock.`);
    try {
      await commerceApi.addItem({ productId: product.id, quantity: 1 });
      setNotice("Added to cart.");
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <>
      <section className="catalog-hero">
        <div>
          <p className="eyebrow">THE MODERN ESSENTIALS</p>
          <h1>
            Quietly excellent
            <br />
            <em>things.</em>
          </h1>
          <p>Useful, lasting pieces for the rhythm of your everyday.</p>
        </div>
        <div className="catalog-mark">
          N
          <span>
            NEW
            <br />
            ARRIVALS
          </span>
        </div>
      </section>
      <section className="page-heading">
        <p className="eyebrow">SHOP THE COLLECTION</p>
        <h2>Find your everyday.</h2>
        <form
          className="filters"
          onSubmit={(e) => {
            e.preventDefault();
            load();
          }}
        >
          <input
            placeholder="Search name or SKU"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <button>Search</button>
        </form>
      </section>
      <ErrorMessage error={error} />
      {notice && <p className="notice">{notice}</p>}
      {!page ? (
        <Loading />
      ) : page.content.length === 0 ? (
        <Empty>No products found.</Empty>
      ) : (
        <>
          <div className="grid">
            {page.content.map((p) => (
              <article className="product" key={p.id}>
                <Link to={`/products/${p.id}`} className="tile">
                  <span>{p.category}</span>
                  <b>{p.name[0]}</b>
                </Link>
                <small>{p.category}</small>
                <h3>{p.name}</h3>
                <p>{p.description || "A considered essential."}</p>
                <small
                  className={
                    p.availableQuantity > 0
                      ? "stock-label"
                      : "stock-label out-of-stock"
                  }
                >
                  {p.availableQuantity > 0
                    ? `${p.availableQuantity} available`
                    : "Out of stock"}
                </small>
                <div className="product-bottom">
                  <b>{money(p.price)}</b>
                  <button
                    type="button"
                    disabled={p.availableQuantity <= 0}
                    onClick={() => add(p)}
                  >
                    {p.availableQuantity > 0 ? "Add +" : "Unavailable"}
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className="pagination">
            <button disabled={page.first} onClick={() => load(page.number - 1)}>
              Previous
            </button>
            <span>
              Page {page.number + 1} of {page.totalPages || 1}
            </span>
            <button disabled={page.last} onClick={() => load(page.number + 1)}>
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}
export function ProductDetail() {
  const { id } = useParams(),
    { user } = useAuth(),
    [product, setProduct] = useState(null),
    [error, setError] = useState(""),
    [notice, setNotice] = useState("");
  useEffect(() => {
    catalogApi
      .product(id)
      .then(setProduct)
      .catch((e) => setError(e.message));
  }, [id]);
  if (error)
    return (
      <section className="state">
        <ErrorMessage error={error} />
        <Link to="/products">Back to shop</Link>
      </section>
    );
  if (!product) return <Loading />;
  return (
    <section className="detail">
      <div className="detail-art">{product.name[0]}</div>
      <div>
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <h2>{money(product.price)}</h2>
        <p>{product.description || "A considered essential for daily life."}</p>
        <p className="muted">SKU: {product.sku}</p>
        <p
          className={
            product.availableQuantity > 0
              ? "stock-label"
              : "stock-label out-of-stock"
          }
        >
          {product.availableQuantity > 0
            ? `${product.availableQuantity} available`
            : "Out of stock"}
        </p>
        <button
          className="button"
          disabled={product.availableQuantity <= 0}
          onClick={async () => {
            if (!user) return setNotice("Sign in to add this product.");
            try {
              await commerceApi.addItem({ productId: product.id, quantity: 1 });
              setNotice("Added to cart.");
            } catch (e) {
              setError(e.message);
            }
          }}
        >
          {product.availableQuantity > 0 ? "Add to cart" : "Out of stock"}
        </button>
        {notice && <p className="notice">{notice}</p>}
      </div>
    </section>
  );
}
