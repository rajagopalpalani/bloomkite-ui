const businessTypeNames = ["Food \/ Drink", "Entertainment", "Shopping", "Health and Beauty", "Auto", "Lodging", "Events management", "Professional Services", "Home Repair", "Other"];
const businessSubTypeNames = {
  "PROFESSIONAL_SERVICE": ["Legal Services", "Financial Services", "Dry Cleaning"],
  "AUTO": ["Transportation", "Service\/Repair", "Dealers"],
  "HEALTH_BEAUTY": ["Medical", "Dental", "Spa", "Saloon", "Vendor"],
  "LODGING": ["Resorts", "Hotels", "Vacation Rentals"],
  "HOME_REPAIR": ["Landscape", "Appliances", "Construction", "Interior Design", "Cleaning", "Painting", "Pest Control", "Electrician", "Heating and Air", "Plumbing", "Other"]
};
const onlyBType = ["ENTERTAINMENT", "SHOPPING", "EVENT_MANAGEMENT", "FOOD_DRINK", "Other"];
const foodCuisineConstant = ['American', 'Asian', 'Bbq', 'Chinese', 'French', 'Greek', 'Hamburger', 'Hawaiian', 'Indian', 'Italian', 'Japanese', 'Mexican', 'Pizza', 'Sandwich', 'Seafood', 'Steak', 'Sushi', 'Thai', 'Vietnamese'];
const foodTypeConstant = ['Bakery', 'Bar \/ pub', 'Bistro', 'Buffet', 'Cafe', 'Diner', 'Drive - thru', 'Fast food', 'Fast casual restraunt', 'Family style', 'Fine dining', 'Food truck', 'Pizzeria', 'Sports bar and grill', 'Steakhouse', 'Teppanyaki-ya'];

export {
    businessTypeNames,
    businessSubTypeNames,
    onlyBType,
    foodCuisineConstant,
    foodTypeConstant
};