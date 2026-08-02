export const filterMenuItems = (
  menuItems,
  { search = '', category = 'all', diet = 'all' } = {}
) => {
  let filtered = menuItems;

  if (search.trim()) {
    const keyword = search.trim().toLowerCase();

    filtered = filtered.filter((item) => item.name.toLowerCase().includes(keyword));
  }

  if (category !== 'all') {
    filtered = filtered.filter((item) => item.category === category);
  }

  if (diet !== 'all') {
    filtered = filtered.filter((item) => (diet === 'veg' ? item.isVeg : !item.isVeg));
  }

  return filtered;
};

export const getMenuItemById = (menuItems, id) => {
  return menuItems.find((item) => item.id === Number(id)) || null;
};
