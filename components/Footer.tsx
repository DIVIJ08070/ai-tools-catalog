export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/category/Chatbots" className="hover:text-foreground transition-colors">
                  Chatbots
                </a>
              </li>
              <li>
                <a href="/category/Image%20Generation" className="hover:text-foreground transition-colors">
                  Image Generation
                </a>
              </li>
              <li>
                <a href="/category/Coding" className="hover:text-foreground transition-colors">
                  Coding
                </a>
              </li>
              <li>
                <a href="/category/Writing" className="hover:text-foreground transition-colors">
                  Writing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Pricing</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/pricing/Free" className="hover:text-foreground transition-colors">
                  Free
                </a>
              </li>
              <li>
                <a href="/pricing/Freemium" className="hover:text-foreground transition-colors">
                  Freemium
                </a>
              </li>
              <li>
                <a href="/pricing/Paid" className="hover:text-foreground transition-colors">
                  Paid
                </a>
              </li>
              <li>
                <a href="/pricing/Free%20Trial" className="hover:text-foreground transition-colors">
                  Free Trial
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/tools" className="hover:text-foreground transition-colors">
                  All Tools
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <p className="text-sm text-muted-foreground">Your comprehensive catalog of 50+ top AI tools for 2025.</p>
          </div>
        </div>
        <div className="border-t border-border/40 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Tools Catalog. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">Built with passion for the AI community</p>
        </div>
      </div>
    </footer>
  )
}
