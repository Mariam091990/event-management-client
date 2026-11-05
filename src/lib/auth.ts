import { betterAuth} from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"
const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db(process.env.DB_NAME as string);

export const auth = betterAuth({

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },

  },

  account: {
		accountLinking: {
			enabled: true,
			trustedProviders: [ "github"] // Add your providers
		}
	},

  plugins:[jwt(),],
  session:{
    cookieCache:{
      enabled:true,
      strategy: 'jwt',
      maxAge:7 * 24 * 60 * 60

    }
  }

});