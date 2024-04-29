import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const generateID = customAlphabet(alphabet, 10);

const BlacklistSchema = new mongoose.Schema(
  {
    blacklistCode: {
      type: String,
      default: () => `blacklist_${generateID()}`, // Use generateID to generate unique ID
    },
    ipAddress: {
      type: [String],
      default: [],
    },
    ipCountry: {
      type: [String],
      default: [],
    },
    cardIssuer: {
      type: [String],
      default: [],
    },
    cardFingerprint: {
      type: [
        {
          cardNumber: String,
          fingerPrint: String,
        },
      ],
      default: [],
    },
    cardCountry: {
      type: [String],
      default: [],
      unique: true,
    },
    cardBin: {
      type: [String],
      default: [],
      unique: true,
    },
    metadata: {
      type: [
        {
          key: String,
          value: String,
        },
      ],
      default: [],
      unique: true,
    },
    email: { type: [String], default: [], unique: true },
    userAgent: { type: [String], default: [], unique: true },
    acceptLanguage: { type: [String], default: [], required: true },
  },
  { timestamps: true }
);

const Blacklist = mongoose.model("Blacklist", BlacklistSchema);

export default Blacklist;
