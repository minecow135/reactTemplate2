import { Html, Preview, Head, Tailwind, Body } from "@react-email/components";

export default function WelcomeEmail() {
  return (
    <Html>
      <Preview>Email preview text</Preview>
      <Head>

      </Head>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#007291",
              },
            },
          },
        }}
      >
        <Body className="flex w-full h-full flex-grow flex-col items-center mt-5">
          <h1 className="font-extrabold tracking-tight text-3rem">Test</h1>
          <div className="flex flex-col w-4/5">
            <h1>AAA</h1>
          </div>
        </Body>
      </Tailwind>
    </Html>
    
  );
}