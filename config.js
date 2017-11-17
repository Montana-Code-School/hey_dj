module.exports = {
	db: process.env.MONGODB_URI || 'mongodb://localhost/heydj',
	port: process.env.PORT || 3099
}