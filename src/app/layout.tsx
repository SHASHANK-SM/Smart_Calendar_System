import "./globals.css";

export const metadata = {
  title: "Interactive Calendar",
  description: "Wall calendar with date range selection and notes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased text-gray-800">
        {children}
      </body>
    </html>
  );
}
