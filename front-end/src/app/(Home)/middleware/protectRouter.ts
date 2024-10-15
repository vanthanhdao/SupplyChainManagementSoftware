

import { redirect } from 'next/navigation';

 
export function ProtectedPage() {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    return redirect("/signin-page");
  }
}
 
