import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("User", {
    fields: t => ({
        id: t.exposeID("id"),
        name: t.exposeString("name"),
        messages: t.relation("messages")
    })
})

// 1
builder.queryField("users", (t) =>
  // 2
  t.prismaField({
    // 3
    type: ["User"],
    // 4
    resolve: async (query, root, args, ctx, info) => {
      console.log(`users query executing`)
      let users: any = []
      try {
         users = await prisma.user.findMany({ ...query });
      }
      catch(e) {
        console.log(`ERROR`, e)
      }
      console.log(`users`, users)
      return users
    },
  })
);