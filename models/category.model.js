const { SCHEMA_OPTION, ignoreModel } = require("../utils/constaints");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
	{
		name: { type: String, default: "" },
		description: { type: String, default: "" },
		is_delete: { type: Boolean, default: false },
	},
	SCHEMA_OPTION
);

categorySchema.static({});

categorySchema.method({});

const CATEGORY = mongoose.model("CATEGORY", categorySchema, "CATEGORY");

module.exports = CATEGORY