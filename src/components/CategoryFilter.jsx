function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      <label className="filter-label">Фильтр по категориям:</label>
      <select
        className="filter-select"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {categories.map(category => (
          <option key={category} value={category}>
            {category === 'all' ? 'Все категории' : category}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CategoryFilter
