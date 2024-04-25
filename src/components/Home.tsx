import { useAuth } from "@/contexts/AuthContext";

import { Button } from "./ui/button";

export default function Home() {
    const { logout } = useAuth();

    return (
        <div>
            <Button
                className="absolute right-4 top-4"
                variant="secondary"
                size="lg"
                onClick={logout}
            >
                Logout
            </Button>
        </div>
    );
}
