import { validateRequest } from "@/lib/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const { user } = await validateRequest();

  if (!user || user.role !== Role.ADMIN) {
    redirect("/");
  }

  return ( 
    <div>
      Only admins can see this
    </div>
   );
}
 
export default AdminPage;