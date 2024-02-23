const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

const verify = async (token) => {
	if(token){
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.OAUTH_CLIENT_ID,
		});
		const payload = ticket.getPayload();
		return { userId: payload.sub, email: payload.email, name: payload.name };
	}
	return null
};

module.exports = verify;
