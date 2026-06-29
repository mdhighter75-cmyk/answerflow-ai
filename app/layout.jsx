import './globals.css';

export const metadata = {
  title: 'AnswerFlow AI — AI Receptionist for Your Business',
  description: 'Never miss another customer call. AnswerFlow AI answers calls 24/7.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
