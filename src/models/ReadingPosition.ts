import mongoose, { Schema } from 'mongoose';

const ReadingPositionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    volume: { type: Schema.Types.ObjectId, ref: "Volume", required: true },
    lineNumber: { type: Number, required: true },
    wordNumber: { type: Number, required: true },
  });
  
  const ReadingPosition = mongoose.model(
    "ReadingPosition",
    ReadingPositionSchema
  );
  
  module.exports = ReadingPosition;