const { SCHEMA_OPTION, ignoreModel } = require("../utils/constaints");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
	{
		content: String,
		createdBy: { type: Schema.Types.ObjectId, ref: "USER" },
		is_delete: { type: Boolean, default: false },
	},
	SCHEMA_OPTION
);

commentSchema.static({});

commentSchema.method({});

const COMMENT = mongoose.model("COMMENT", commentSchema, "COMMENT");

module.exports = COMMENT;
