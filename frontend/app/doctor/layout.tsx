
import ProtectedLayout from "../components/ProtectedLayout";

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedLayout allowedRoles={["doctor"]}>
      {children}
    </ProtectedLayout>
  );
}


