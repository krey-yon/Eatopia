// // This is a mock implementation of menu item management
// // In a real application, you would use a database client

// type MenuItem = {
//   id: string
//   name: string
//   price: number
//   imageUrl: string
//   menuId: string
// }

// type Menu = {
//   id: string
//   restaurantId: string
//   menuItems: MenuItem[]
// }

// // Mock storage for menus
// const menus: Menu[] = []

// // Mock storage for menu items
// const menuItems: MenuItem[] = []

// export async function getRestaurantMenu(restaurantId: string): Promise<Menu | null> {
//   // Simulate API delay
//   await new Promise((resolve) => setTimeout(resolve, 500))

//   return menus.find((menu) => menu.restaurantId === restaurantId) || null
// }

// export async function createMenu(restaurantId: string): Promise<Menu> {
//   // Simulate API delay
//   await new Promise((resolve) => setTimeout(resolve, 1000))

//   // Check if menu already exists
//   const existingMenu = menus.find((menu) => menu.restaurantId === restaurantId)
//   if (existingMenu) {
//     return existingMenu
//   }

//   // Create new menu
//   const newMenu: Menu = {
//     id: crypto.randomUUID(),
//     restaurantId,
//     menuItems: [],
//   }

//   menus.push(newMenu)
//   return newMenu
// }

// export async function getMenuItems(menuId: string): Promise<MenuItem[]> {
//   // Simulate API delay
//   await new Promise((resolve) => setTimeout(resolve, 1000))

//   return menuItems.filter((item) => item.menuId === menuId)
// }

// export async function addMenuItem(item: Omit<MenuItem, "id">): Promise<MenuItem> {
//   // Simulate API delay
//   await new Promise((resolve) => setTimeout(resolve, 1000))

//   const newItem: MenuItem = {
//     ...item,
//     id: crypto.randomUUID(),
//   }

//   menuItems.push(newItem)

//   return newItem
// }
