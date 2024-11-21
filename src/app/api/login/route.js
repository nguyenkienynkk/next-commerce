import {NextResponse} from 'next/server';
import {userService} from "../../service/userService";
export async function POST(request) {
    try {
        const body = await request.json();
        const response = await userService.login(body);
        const nextResponse = NextResponse.json({success: true, message: 'Logged in successfully'});
        nextResponse.cookies.set('token', response.token);
        return nextResponse;
    } catch (error) {
        console.error('Login failed:', error);
        return NextResponse.json({success: false, message: 'Login failed'}, {status: 401});
    }
}