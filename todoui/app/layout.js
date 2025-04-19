export const metadata = {
  title: 'Todo App',
  description: 'Todo list built with Next.js and Tailwind',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
