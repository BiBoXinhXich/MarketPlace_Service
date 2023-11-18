const { SCHEMA_OPTION, ignoreModel } = require("../utils/constaints");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
	{
		title: String,
		description: String,
		createdBy: { type: Schema.Types.ObjectId, ref: "USER" },
		images: { default: [], type: [String] },
		is_delete: { type: Boolean, default: false },
	},
	SCHEMA_OPTION
);

postSchema.static({});

postSchema.method({});

const POST = mongoose.model("POST", postSchema, "POST");

module.exports = POST;