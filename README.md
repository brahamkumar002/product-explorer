
# 🛍️ Product Explorer Application

A responsive Product Explorer Application built using **React.js, JavaScript, Tailwind CSS, and the DummyJSON REST API**.

The application allows users to browse products, search by keywords, and filter products by category. It dynamically displays product images, prices, descriptions, ratings, and discounts using reusable React components.

## 🚀 Features

- 🛍️ Browse products fetched from the DummyJSON API
- 🔍 Search products by name, description, or category
- 📂 Filter products using dynamically generated categories
- 🔄 Combine product search with category filtering
- 🖼️ View product images and titles
- 💰 Display product prices in USD
- ⭐ Display product ratings
- 🏷️ Show product categories and discount percentages
- 📖 View product descriptions
- ❌ Clear search and reset category filters
- 🔢 Display the number of matching products
- ⏳ Loading indicator during API requests
- ⚠️ Error handling for failed API requests
- 📱 Responsive layout for desktop, tablet, and mobile
- 🧩 Reusable React functional components
- 🔄 Dynamic rendering using JavaScript array methods

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| React.js | Building the user interface |
| JavaScript (ES6+) | Application logic and array methods |
| Tailwind CSS | Responsive design and styling |
| DummyJSON REST API | Fetching product information |
| Fetch API | Making HTTP requests |
| React Hooks | Managing state and API requests |
| Vite | Development server and production builds |
| Git & GitHub | Version control and source code hosting |

## 📂 Project Structure

```text
product-explorer/
├── public/
├── src/
│   ├── components/
│   │   └── ProductCard.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Ensure Node.js and npm are installed on your computer.

### 1. Clone the repository

```bash
git clone https://github.com/brahamkumar002/product-explorer.git
```

### 2. Navigate to the project directory

```bash
cd product-explorer
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

http://localhost:5173/

### 5. Build for production

```bash
npm run build
```

### 6. Preview the production build

```bash
npm run preview
```

## 🌐 DummyJSON API Integration

This project uses the DummyJSON REST API to retrieve sample e-commerce product information.

### Products API

Endpoint:

```text
https://dummyjson.com/products?limit=0
```

The `limit=0` parameter requests the complete available product collection.

The API returns product details such as:

- Product ID
- Product title
- Description
- Price
- Category
- Thumbnail image
- Rating
- Discount percentage

### Example API Response

```json
{
  "products": [
    {
      "id": 1,
      "title": "Example Product",
      "description": "Sample product description",
      "category": "beauty",
      "price": 9.99,
      "rating": 4.5,
      "discountPercentage": 10,
      "thumbnail": "https://example.com/product.png"
    }
  ]
}
```

The example above illustrates the response structure.

### Fetching Products

The application uses JavaScript's Fetch API:

```javascript
const response = await fetch(
  "https://dummyjson.com/products?limit=0"
);

const data = await response.json();
setProducts(data.products || []);
```

The complete application also handles HTTP errors and cancels unfinished requests using `AbortController`.

**API Key:** DummyJSON does not require an API key for the public products endpoint used in this project.

Official documentation:

https://dummyjson.com/docs/products

## 🔍 Product Search Functionality

The application supports dynamic, case-insensitive product searching.

Users can search by:

- Product name
- Product description
- Product category

### How Search Works

1. The user enters a keyword in the search input.
2. React's `useState` stores the search query.
3. JavaScript's `filter()` method checks the product data.
4. Matching products are dynamically displayed.
5. The result count updates automatically.
6. Clearing the search restores the products allowed by the selected category.

### Example Search Logic

```javascript
const matchesSearch =
  product.title.toLowerCase().includes(query) ||
  product.description.toLowerCase().includes(query) ||
  product.category.toLowerCase().includes(query);
```

The full implementation also handles missing product fields safely.

The search is performed client-side using the products already fetched from DummyJSON.

## 📂 Category-Based Filtering

The application dynamically generates category options from the fetched products.

Examples of product categories include:

- Smartphones
- Laptops
- Fragrances
- Skin Care
- Men's Shoes
- Other categories returned by DummyJSON

### How Category Filtering Works

1. Product categories are extracted from API data.
2. Duplicate categories are removed using JavaScript's `Set`.
3. Categories are displayed in the sidebar.
4. The user selects a category.
5. React updates the selected category state.
6. The product grid displays matching products.
7. Selecting All Products removes the category restriction.

### Example Category Logic

```javascript
const matchesCategory =
  selectedCategory === "all" ||
  product.category === selectedCategory;
```

## 🔄 Combined Search and Category Filtering

The application supports using both filters simultaneously.

For example, selecting the Laptops category and searching for "gaming" displays only matching products within that category.

```javascript
const filteredProducts = products.filter((product) => {
  const query = searchQuery.trim().toLowerCase();

  const matchesSearch =
    (product.title || "").toLowerCase().includes(query) ||
    (product.description || "").toLowerCase().includes(query) ||
    (product.category || "").toLowerCase().includes(query);

  const matchesCategory =
    selectedCategory === "all" ||
    product.category === selectedCategory;

  return matchesSearch && matchesCategory;
});
```

The Reset All Filters button restores the complete product collection.

## 🧩 React Components

### App.jsx

The main application component handles:

- Fetching product data from DummyJSON
- Managing search input
- Managing selected categories
- Generating category options
- Filtering products
- Loading and error states
- Rendering the product grid
- Resetting search and category filters

### ProductCard.jsx

A reusable React functional component responsible for:

- Displaying product images
- Displaying product titles
- Showing product descriptions
- Displaying prices and ratings
- Showing category labels
- Displaying discount percentages
- Handling missing images or unavailable values
- Applying responsive Tailwind CSS styling

Product information is passed from App.jsx to ProductCard.jsx through React props.

## 🪝 React Hooks Used

### useState

Used to manage:

- Fetched products
- Search input
- Selected category
- Loading state
- Error messages

The ProductCard component also uses state to handle failed image loading.

### useEffect

Used to:

- Fetch products when the application loads
- Handle asynchronous API requests
- Cancel unfinished requests during component cleanup

## 💻 JavaScript Concepts Used

### map()

Used to dynamically display product cards and category buttons.

```javascript
products.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
  />
));
```

### filter()

Used to filter products by search keywords and category.

### Set

Used to generate a list of unique categories.

```javascript
const categories = [
  "all",
  ...new Set(
    products.map((product) => product.category)
  ),
];
```

### includes()

Used to check whether product text contains the entered search keyword.

### async / await

Used to manage asynchronous API requests.

## 📱 Responsive Design

The application uses Tailwind CSS utility classes to support different screen sizes.

### Desktop

- Category sidebar alongside the product grid
- Three-column product layout on sufficiently wide screens
- Product card hover effects
- Spacious search interface

### Tablet

- Responsive two-column product grid
- Adjusted spacing and typography
- Category filters positioned above the product grid

### Mobile

- Single-column product grid
- Full-width search input
- Touch-friendly category buttons
- Compact product cards

## 🔮 Future Improvements

- Product sorting by price and rating
- Pagination or infinite scrolling
- Product details page
- Price-range filtering
- Favorite products
- Shopping cart functionality
- Recently viewed products
- Dark mode
- Improved search suggestions

## 🎯 What I Learned

Through this project, I gained practical experience in:

- Building responsive applications using React.js
- Creating reusable React functional components
- Integrating REST APIs using Fetch API
- Managing state with React Hooks
- Working with asynchronous JavaScript
- Filtering data using JavaScript array methods
- Dynamically generating category options
- Combining search and category filters
- Handling loading and error states
- Styling applications using Tailwind CSS
- Using Git and GitHub for version control

## 👨‍💻 Author

**Braham Kumar Sah**

GitHub:
https://github.com/brahamkumar002

Project Repository:
https://github.com/brahamkumar002/product-explorer

## 📄 Acknowledgment

Sample product information and images are provided by [DummyJSON](https://dummyjson.com/).

This application was developed for learning and portfolio purposes.
