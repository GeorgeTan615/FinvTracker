export const baseUrl = (
	process.env.NODE_ENV !== "production" 
	? "http://localhost:3000" 
	: "https://finvtracker.vercel.app"
)

export const expenseCategories = ["Shopping","Food & Beverages", "Transportation", "Subscription","Entertainment","Bills & Fees","Healthcare"]
export const incomeCategories = ["Salary", "Side Hustle", "Business Income", "Investment Income"]
export const months = ['Jan','Feb','Mar','Apr','May','Jun', 'Jul','Aug','Sept','Oct','Nov','Dec']

