import { NextRequest, NextResponse } from 'next/server';
import { UserRole } from './interfaces/user';
//import validateSession from './actions/validate-session';

const PUBLIC_ROUTES = ['/sign-in', '/sign-up'];
const STUDENT_ROUTES = ['/profile'];
const TEACHER_ROUTES = ['/dashboard', 'profile', '/students'];

function redirectToRoute(request: NextRequest, route: string) {
  return NextResponse.redirect(new URL(route, request.url));
}

function userCanAccess(path: string, roles: UserRole[]): boolean {
  if (roles.includes(UserRole.TEACHER) && TEACHER_ROUTES.includes(path)) return true;
  if (roles.includes(UserRole.STUDENT) && STUDENT_ROUTES.includes(path)) return true;
  return false;
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === '/') {
    return redirectToRoute(request, '/sign-in');
  }

  if (PUBLIC_ROUTES.includes(path)) {
    return NextResponse.next();
  }

  try {
    //const token = await validateSession();
    //const user: UserInformation = await fetchUser(token);
    const user = {
      user_id: '12345',
      name: 'John Doe',
      roles: [UserRole.STUDENT],
      status: 'active',
    };

    if (user.status !== 'active') {
      return redirectToRoute(request, '/disabled-user');
    }

    if (!userCanAccess(path, user.roles)) {
      return redirectToRoute(request, '/unauthorized');
    }

    return NextResponse.next();
  } catch (error: any) {
    return redirectToRoute(request, `/sign-in?message=${encodeURIComponent(error.message)}`);
  }
}

export const config = {
  matcher: [
    '/',
    '/sign-in',
    '/sign-up',
  //  '/dashboard',
    '/profile',
    '/users',
  ],
};
