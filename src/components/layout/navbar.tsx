import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Secondary navigation or mobile-responsive menu.
 */
export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-background border-b md:hidden">
            <div className="container px-4 h-14 flex items-center justify-between">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>

                <Link to="/" className="font-bold">FraudWallAuto</Link>

                <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                </Button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                'fixed inset-0 top-14 z-50 bg-background transition-transform duration-300 ease-in-out transform',
                isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            )}>
                <div className="flex flex-col p-4 space-y-4">
                    <Link
                        to="/dashboard"
                        className="text-lg font-medium p-2 hover:bg-muted rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/vin-lookup"
                        className="text-lg font-medium p-2 hover:bg-muted rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        VIN Decoder
                    </Link>
                    <Link
                        to="/vehicle-history"
                        className="text-lg font-medium p-2 hover:bg-muted rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Vehicle History
                    </Link>
                    <Link
                        to="/police/stolen"
                        className="text-lg font-medium p-2 hover:bg-muted rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Stolen Vehicles
                    </Link>
                </div>
            </div>
        </nav>
    );
};
