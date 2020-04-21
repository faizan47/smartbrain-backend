const Clarifai = require('clarifai');
const model = 'a403429f2ddf4b49b307e318f00e528b';

const CLARIFAI_API_KEY = process.env.CLARIFAI_API_KEY;
const clarifaiApp = new Clarifai.App({
	apiKey: CLARIFAI_API_KEY
});
const sendImage = async (req, res) => {
	const { image } = req.body;
	const data = await clarifaiApp.models.predict(model, image);
	const response = data.outputs[0].data.regions;
	res.status(200).json(response);
};

module.exports = sendImage;
