
import { db } from "@/lib/db";
import { User as ClerkUser, currentUser } from "@clerk/nextjs/server";
import { User as PrismaUser } from "@prisma/client";

interface CurrentUser {
    currentUserPrisma: PrismaUser & {
        following: PrismaUser[]
    };
    currentUserClerk: ClerkUser;
}

export const getCurrentUser = async (): Promise<CurrentUser> => {
    const currentUserClerk = await currentUser();

    if (currentUserClerk === null) {
        throw new Error("Un authorized");
    }

    const currentUserPrisma = await db.user.findUnique({
        where: {
            externalUserId: currentUserClerk.id,
        },
        include: {
            following: true,
            followedBy: true,
        }
    });

    if (currentUserPrisma === null) {
        throw new Error("User not found");
    }

    return { currentUserPrisma, currentUserClerk}
}