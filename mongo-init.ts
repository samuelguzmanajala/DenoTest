
const db: mongoDB.db = new mongoDB();
await db.createUser(
    {
        user : "admin",
        pwd : "admin",
        roles : [
            {
                role: "userAdminAnyDatabase",
                db: "admin"
            }
            ]
    }
)