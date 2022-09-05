import { createAuth } from "@keystone-next/auth";
import { withItemData, statelessSessions } from "@keystone-next/keystone/session";
import { config, createSchema } from "@keystone-next/keystone/schema";
import "dotenv/config";

import { User } from "./schemas/User";
import { Product } from "./schemas/Product";
import { ProductImage } from "./schemas/ProductImage";
import { insertSeedData } from "./seed-data";

const databaseURL = process.env.DATABASE_URL || "mongodb://localhost/keystone-sick-fits-tutorial";

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // How long should they stay signed in?
    secret: process.env.COOKIE_SECRET,
}

const { withAuth } = createAuth( {
    listKey: "User",
    identityField: "email",
    secretField: "password",
    initFirstItem: {
        fields: [ "name", "email", "password" ],
        // TODO: Add roles
    },
} )

export default withAuth( config( {
    server: {
        cors: {
            origin: [ process.env.FRONTEND_URL ],
            credentials: true,
        }
    },
    db: {
        adapter: "mongoose",
        url: databaseURL,
        async onConnect( keystone ) {
            if ( process.argv.includes( "--seed-data" ) ) {
                await insertSeedData( keystone );
            }
        },
    },
    lists: createSchema( {
        User,
        Product,
        ProductImage,
        // Schema items go in here
    } ),
    ui: {
        // TODO change this for roles
        isAccessAllowed: ( { session } ) => {
            console.log( session );
            return !!session?.data;
        },
    },
    session: withItemData( statelessSessions( sessionConfig ), {
        User: "id",
    } )
    // TODO: Add session values here.
} ) );