const axios = require("axios");

module.exports = async function handler(req, res) {
  try {
    // Read Sheet ID from Vercel Environment Variable
    const SHEET_ID = process.env.SHEET_ID;
    const SHEET_NAME = "Sheet1";

    if (!SHEET_ID) {
      return res.status(500).json({
        success: false,
        message: "SHEET_ID not set in environment variables"
      });
    }

    // Fetch data from Google Sheet (via OpenSheet)
    const url = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;
    const response = await axios.get(url);

    return res.status(200).json({
      success: true,
      posts: response.data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch blog posts",
      error: error.message
    });
  }
};
