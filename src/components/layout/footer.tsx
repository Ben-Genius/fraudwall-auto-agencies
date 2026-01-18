/**
 * Simple app footer component.
 */
export const Footer = () => {
    return (
        <footer className="w-full border-t bg-background py-6">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-12 md:flex-row">
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} FraudWallAuto. All rights reserved.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <a href="#" className="hover:underline underline-offset-4">Privacy Policy</a>
                    <a href="#" className="hover:underline underline-offset-4">Terms of Service</a>
                    <a href="#" className="hover:underline underline-offset-4">Support</a>
                </div>
            </div>
        </footer>
    );
};
