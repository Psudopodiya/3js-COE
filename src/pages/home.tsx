import { useAuth } from "@/contexts/AuthContext";

import { Button } from "@/components/ui/button";

export default function HomePage() {
    const { logout } = useAuth();

    return (
        <div>
            <Button
                className="absolute right-4 top-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                variant="secondary"
                size="lg"
                onClick={logout}
            >
                Logout
            </Button>
        </div>
    );
}
