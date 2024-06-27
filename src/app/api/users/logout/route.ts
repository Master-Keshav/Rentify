import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true,
            }
        )
        response.cookies.set("token", "",
            {
                httpOnly: true,
                expires: new Date(0),
                path: "/",
            });
        // response.headers.append('Set-Cookie', 'token=; Max-Age=0; path=/; domain=rentify-lime.vercel.app; HttpOnly');
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}