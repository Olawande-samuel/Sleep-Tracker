function generateCustomUserId() {
	// Implement your logic to generate a custom user ID (e.g., using a combination of letters and numbers)
	return "custom_" + Math.random().toString(36).substring(2, 15);
}

module.exports = generateCustomUserId