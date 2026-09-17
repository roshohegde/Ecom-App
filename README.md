# Nova Store

Nova Store is a Java 21 / Spring Boot 3 modular-monolith e-commerce application with a React 18 storefront. It includes JWT authentication, customer carts and orders, seller-owned product management, admin catalogue management, inventory reservations, optimistic locking, Caffeine caching, OpenAPI, Actuator, H2, and a mock UPI payment gateway.

## Run locally

From the repository root, start the backend:

```bash
mvn spring-boot:run
```

The checked-in Maven wrapper currently lacks `.mvn/wrapper/maven-wrapper.properties`; use installed Maven or restore that wrapper file before using `./mvnw`.

In a second terminal, start the React storefront:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. Vite proxies `/api` requests to `http://localhost:8080`.

Useful URLs:

- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- Health: `http://localhost:8080/actuator/health`
- H2 console: `http://localhost:8080/h2-console`

The default database is an in-memory H2 database. Demo data is recreated whenever the backend starts, so it is intentionally reset after a restart.

## Demo accounts

All demo accounts use `Password@123`.

| Role | Email | Destination after login |
| --- | --- | --- |
| Customer | `customer@nova.local` | Shop |
| Seller | `seller@nova.local` | Seller workspace |
| Admin | `admin@nova.local` | Admin catalogue |

The admin account is seeded and cannot be created through public registration. This prevents visitors from registering themselves as administrators.

## Customer flow

1. Sign in with the demo customer account, or choose **Create account** and select `Customer`.
2. Browse, search, filter, and open products from the shop.
3. Check the stock label before buying. Out-of-stock products are marked and their add-to-cart controls are disabled.
4. Click **Add +** on a product or **Add to cart** on its detail page.
5. Open **Cart** to change quantities or remove items. Cart additions and quantity increases are checked against available inventory.
6. Choose **Checkout with UPI**, review the confirmation dialog, and select **Confirm and pay**. Checkout reserves inventory, creates immutable order item snapshots, processes the mock payment, and consumes stock after success.
7. A successful payment shows a confirmation dialog with links to continue shopping or view orders.
8. Open **My orders** to see product names, quantities, line totals, order total, fulfillment status, and payment status. Select **View details** for an individual order.

Customer endpoints:

- Public: `GET /api/v1/products`, `GET /api/v1/products/{id}`, `GET /api/v1/categories`
- Authenticated cart: `GET/POST/PUT/DELETE /api/v1/cart/**`
- Authenticated orders: `POST /api/v1/orders`, `GET /api/v1/orders`, `GET /api/v1/orders/{id}`

## Seller flow

1. Choose **Create account** and select `Seller - list and manage your products`, or sign in with the demo seller account.
2. Open **Seller workspace** at `/seller/catalog`.
3. Create a product with a unique SKU, name, positive price, existing category, and available stock.
4. Click **Publish product**. Active products appear in the public shop immediately.
5. Edit price, description, category, or stock. **Cancel edit** resets the form without saving.
6. Delete a listing when it should leave the shop. Deletion is implemented as a safe soft delete, so existing cart/order references remain valid.

Sellers can manage only their own products:

- `GET /api/v1/seller/products`
- `POST /api/v1/seller/products`
- `PUT /api/v1/seller/products/{id}`
- `DELETE /api/v1/seller/products/{id}`

A listing with zero stock remains visible for catalogue awareness, but is marked **Out of stock** and cannot be added to a cart. Cart requests also reject quantities greater than available unreserved stock, protecting against stale browser data or concurrent purchases.

## Admin flow

1. Sign in with `admin@nova.local` / `Password@123`.
2. Open **Admin catalogue** at `/admin/catalog`.
3. Create categories and create, edit, or delete any product.
4. Set **Available stock** when creating or editing a product.
5. Use **Cancel edit** to abandon changes and reset the product form.

Admin endpoints:

- `POST /api/v1/admin/categories`
- `POST /api/v1/admin/products`
- `PUT /api/v1/admin/products/{id}`
- `DELETE /api/v1/admin/products/{id}`

Admin deletion is a soft delete (`DISCONTINUED`) rather than a physical row deletion. This prevents foreign-key failures for products referenced by carts or historical orders, while removing the product from public active listings.

## Authentication

Login and registration endpoints:

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

Protected requests use `Authorization: Bearer <token>`. The frontend persists the token and session role in local storage and displays navigation appropriate to that role. Roles are `CUSTOMER`, `SELLER`, and `ADMIN`; public registration can create customers or sellers, never admins.

## Checkout and idempotency

Send a unique `Idempotency-Key` to prevent duplicate orders when retrying checkout:

```http
POST /api/v1/orders
Authorization: Bearer <customer-token>
Idempotency-Key: checkout-2026-0001
Content-Type: application/json

{
  "paymentMethod": "UPI",
  "shippingAddress": "12 Market Street, Bengaluru"
}
```

Successful payment confirms the order and decrements inventory. Failed payment cancels the order and releases reservations.

## Troubleshooting

- **No products appear:** restart the backend and wait for startup to finish; the initializer creates three demo products and two categories.
- **Add to cart is disabled:** the product has no available stock. Edit it as seller/admin and increase **Available stock**.
- **Add to cart fails with insufficient inventory:** another purchase may have consumed stock, or the cart quantity is above current available stock. Reduce the quantity or refresh the shop/cart.
- **Cart or orders page appears blank/loading:** the current UI displays an error and a **Back to shop** link when an API request fails. Check that the backend is running on port 8080.
- **Product cannot be ordered:** edit it as seller/admin and set available stock above zero.
- **Admin login fails:** use the exact seeded email and password; do not register an admin through the public form.
- **Demo data disappears:** expected with the default in-memory H2 database after a backend restart.

## Verification

```bash
mvn test
cd frontend
npm run build
```